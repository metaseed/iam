import { Inject, Injectable, InjectionToken } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { CACHE_FACADE_TOKEN, DocContent, DocFormat, DocMeta, ICache, NET_COMMU_TIMEOUT, Logger } from "core";
import { forkJoin, map, of, pipe, switchMap, tap, throwError } from "rxjs";
import { DOC_HISTORY_VERSION_ID, NEW_DOC_ID } from "shared";
import { DocEffectsUtil } from "./document.effects.util";
import { EffectManager, EffectStateSubject, OperationStatusConsoleReporter } from "@rx-store/effect";
import { DocumentStore } from "./document.store";
import { Document } from "core";

export const DOCUMENT_EFFECTS_TOKEN = new InjectionToken<DocumentsEffects>('DOCUMENT_EFFECTS_TOKEN');
const EFFECT_TIMEOUT = NET_COMMU_TIMEOUT;

@Injectable({ providedIn: 'root' })
export class DocumentsEffects extends EffectManager {
  private logger = Logger('DocumentsEffects');

  constructor(
    @Inject(CACHE_FACADE_TOKEN)
    private cacheFacade: ICache,
    private util: DocEffectsUtil,
    private snackbar: MatSnackBar,
    private store: DocumentStore
  ) {
    super();
    this.addReporter(new OperationStatusConsoleReporter(), ['saveDocument_']);
  }

  createDocument_ = new EffectStateSubject<Pick<DocMeta, 'format'>>().addMonitoredEffect(
    effectInfo =>
      pipe(
        tap<Pick<DocMeta, 'format'>>(state => {
          (this.cacheFacade as any).createDoc(state.format);
          effectInfo.success(state);
        })
      ),
    { type: '[DocumentsEffects]createDocument', timeOut: EFFECT_TIMEOUT }
  );

  /**
   * read extend doc meta fetch in cache isBelowRange=true...(low, high]...isBelowRange=false
   */
  readBulkDocMeta_ = new EffectStateSubject<{ isBelowRange: boolean }>().addMonitoredEffect(
    effectInfo => pipe(
      map((state: { isBelowRange: boolean }) => {
        const keyRangeHigh = this.store.idRangHigh_.state;
        const keyRangeLow = this.store.idRangeLow_.state;
        const isBelowRange = state.isBelowRange;

        return { keyRangeHigh, keyRangeLow, isBelowRange };
      }),
      switchMap(({ keyRangeHigh, keyRangeLow, isBelowRange }) => {
        // (low, high]
        const key = isBelowRange ? keyRangeLow : keyRangeHigh;

        return this.cacheFacade
          .readBulkDocMeta(key, isBelowRange)
          .pipe(
            tap(docMetas => effectInfo.success(docMetas))
          );
      })
    ),
    { type: '[DocumentsEffects]readBulkDocMeta', timeOut: EFFECT_TIMEOUT }
  );

  readDocMetas_ = new EffectStateSubject<{ ids: number[] }>().addMonitoredEffect(
    effectInfo => pipe(
      switchMap(state =>
        forkJoin(
          state.ids.map(id => this.cacheFacade.readDocMeta(id, true))
        )
      ),
      tap<DocMeta[]>(docMetas => effectInfo.success(docMetas))
    ),
    { type: '[DocumentsEffects]readDocMetas', timeOut: EFFECT_TIMEOUT }
  );

  readDocument_ = new EffectStateSubject<{ id: number; title?: string; format?: string }>().addMonitoredEffect(
    effectInfo =>
      pipe(
        switchMap(state => {

          // history version doc only lives in store
          if (state.id === DOC_HISTORY_VERSION_ID) {
            return this.store.currentDocContent$;
          }
          return this.cacheFacade
            .readDocContent(state.id, state.format)
        }),
        tap({ next: result => effectInfo.success(result) })
      ),
    { type: '[DocumentsEffects]readDocument', timeOut: EFFECT_TIMEOUT }
  );

  private isCreatingDoc = false;
  private newContentDuringCreating:string = undefined;
  saveDocument_ = new EffectStateSubject<
    {
      content: string;
      id?: number;
      /*if user force save, show changeLog input box*/
      changeLog?: string;
      /*used by creating doc*/
      format?: DocFormat;
      forceUpdate?: boolean
    }
  >().addMonitoredEffect(
    effectInfo =>
      pipe(
        switchMap(state => {
          const { content, format, forceUpdate, changeLog } = state;
          let { id } = state;
          id ??= this.store.currentId_.state;
          this.logger.assert(typeof id === 'number')
          const docContent = DocContent.with(this.store.getDocContent(id), content);
          const title = DocMeta.getTitle(content);
          if (!title) {
            const msg = 'Must define a title!';
            this.snackbar.open(msg, 'OK');
            return throwError(() => new Error(msg));
          }

          if (id === NEW_DOC_ID) {
            if(this.isCreatingDoc) {
              this.logger.debug('new doc: waiting for doc created, then update');
              this.newContentDuringCreating = content;
              return of(new Document(null, null))
            }
            this.isCreatingDoc  = true;
            return this.cacheFacade.CreateDocument(content, format).pipe(
              tap({
                next: d => {
                  this.logger.debug('new document saved', d);
                  this.util.modifyUrlAfterSaved(d.metaData.id, title, format);
                  this.snackbar.open('New document saved!', 'OK');

                  if(this.newContentDuringCreating) {
                    this.logger.debug('new document: save new content during creating doc!', d);
                    this.saveDocument_.next({content: this.newContentDuringCreating, id: d.metaData.id, changeLog: 'auto save updated content during creating doc',format, forceUpdate: false});
                  }
                }, error: err => {
                  this.logger.error('new doc creating err:', err);
                }, complete: () => {
                  this.isCreatingDoc = false;
                  this.newContentDuringCreating = undefined;
                }
              }),
            );
          } else {
            const meta = this.store.getDocMeta(id);
            const ft = format ? format : meta.format;
            return this.cacheFacade
              .updateDocument(meta, docContent, forceUpdate, changeLog)
              .pipe(
                tap(d => {
                  if (d.metaData.id === this.store.currentId_.state)
                    this.util.modifyUrlAfterSaved(d.metaData.id, title, ft);
                })
              );
          }
        }),
        tap({
          next: result => {
            effectInfo.success(result);
            // this.snackbar.open('saved success!')
          }, error: err => {
            this.snackbar.open('error, not saved!')
          }
        })
      ),
    { type: '[DocumentsEffects]saveDocument', timeOut: EFFECT_TIMEOUT }
  );


  deleteDocument_ = new EffectStateSubject<{ /*if id not set it's current doc*/id?: number }>().addMonitoredEffect(
    effectInfo =>
      pipe(
        switchMap(state =>
          this.cacheFacade.deleteDoc(state.id ?? this.store.currentId_.state)
        ),
        tap<number>(id => effectInfo.success({ id }))
      ),
    { type: '[DocumentsEffects]deleteDocument', timeOut: EFFECT_TIMEOUT }
  );


  searchDocument_ = new EffectStateSubject<{ query: string; folder?: string; extension?: string }>().addMonitoredEffect(
    effectInfo =>
      pipe(
        switchMap(state =>
          this.cacheFacade.search(state.query).pipe(
            tap({
              complete: () => {
                let searchResult = this.store.searchResult_.state;
                if (searchResult.length === 0) {
                  this.snackbar.open('Find Nothing!', null, { duration: 2000 });
                } else {
                  this.snackbar.open(`Find ${searchResult.length} items!`, null, { duration: 2000 });
                }
              }
            })
          )
        ),
        tap(result => effectInfo.success(result))
      ),
    { type: '[DocumentsEffects]searchDocument', timeOut: EFFECT_TIMEOUT }
  );
}

