import { Inject, Injectable, InjectionToken } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { CACHE_FACADE_TOKEN, DocContent, DocFormat, DocMeta, ICache, NET_COMMU_TIMEOUT, Logger } from "core";
import { forkJoin, map, pipe, switchMap, tap, throwError } from "rxjs";
import { DOC_HISTORY_VERSION_ID, NEW_DOC_ID } from "shared";
import { DocEffectsUtil } from "./document.effects.util";
import { EffectManager, EffectStateSubject, OperationStatusConsoleReporter } from "@rx-store/effect";
import { DocumentStore } from "./document.store";

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
    this.addReporter(new OperationStatusConsoleReporter());
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
          this.store.currentId_.next(state.id);

          // history version doc only lives in store
          if (state.id === DOC_HISTORY_VERSION_ID) {
            return this.store.currentDocContent$;
          }
          return this.cacheFacade
            .readDocContent(state.id, state.format)
        }),
        tap(result => effectInfo.success(result))
      ),
    { type: '[DocumentsEffects]readDocument', timeOut: EFFECT_TIMEOUT }
  );

  saveDocument_ = new EffectStateSubject<
    { content: string; /*if user force save, show changeLog input box*/changeLog?: string; /** for new doc */format?: DocFormat; forceUpdate?: boolean }
  >().addMonitoredEffect(
    effectInfo =>
      pipe(
        switchMap(state => {
          const { content, format, forceUpdate, changeLog } = state;
          const docContent = DocContent.with(this.store.currentDocContent$.state, content);
          const newTitle = DocMeta.getTitle(content);
          const id = this.store.currentId_.state;
          if (!newTitle) {
            const msg = 'Must define a title!';
            this.snackbar.open(msg, 'OK');
            return throwError(() => new Error(msg));
          }

          if (id === NEW_DOC_ID) {
            return this.cacheFacade.CreateDocument(content, format).pipe(
              tap(d => {
                this.util.modifyUrlAfterSaved(d.metaData.id, newTitle, format);
                this.snackbar.open('New document saved!', 'OK');
              }),
            );
          } else {
            const meta = this.store.currentDocMeta$.state;

            return this.cacheFacade
              .updateDocument(meta, docContent, forceUpdate, changeLog)
              .pipe(
                tap(d => {
                  this.util.modifyUrlAfterSaved(d.metaData.id, newTitle, format);
                  this.logger.log('Saved!');
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

  deleteDocument_ = new EffectStateSubject<{ id: number }>().addMonitoredEffect(
    effectInfo =>
      pipe(
        switchMap(state =>
          this.cacheFacade.deleteDoc(state.id)
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

