import { Inject, Injectable, InjectionToken } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { StateSubject } from "@rx-store/core";
import { State, Store } from "@ngrx/store";
import { CACHE_FACADE_TOKEN, DocFormat, DocMeta, ICache } from "core";
import { forkJoin, map, pipe, switchMap, tap, throwError } from "rxjs";
import { NEW_DOC_ID, selectCurrentDocument, selectIdRangeHigh, selectIdRangeLow, selectSearchResultState, SetCurrentDocumentId } from "shared";
import { DocEffectsUtil } from "../state/document/document.effects.util";
import { DocumentState } from "../state/document/document.reducer";
import { MonitoredStateSubject } from "@rx-store/effect";

export interface IDocumentEffects {
}

const EFFECT_TIMEOUT = 10_000; // 10s
export const DOCUMENT_EFFECTS_TOKEN = new InjectionToken<IDocumentEffects>('DOCUMENT_EFFECTS_TOKEN');

@Injectable({ providedIn: 'root' })
export class DocumentsEffects {
  constructor(
    @Inject(CACHE_FACADE_TOKEN)
    private cacheFacade: ICache,
    private util: DocEffectsUtil,
    private state: State<DocumentState>,
    private snackbar: MatSnackBar,
    private store: Store<DocumentState>
  ) { }

  createDocument_ = new StateSubject<Pick<DocMeta, 'format'>>().addEffect(
    pipe(
      tap<Pick<DocMeta, 'format'>>(state => (this.cacheFacade as any).createDoc(state.format))
    )
  );

  /**
   * read extend doc meta fetch in cache isBelowRange=true...(low, high]...isBelowRange=false
   */
  readBulkDocMeta_ = new MonitoredStateSubject<{ isBelowRange: boolean }>().addMonitoredEffect(
    effectState => pipe(
      map((state: { isBelowRange: boolean }) => {
        const keyRangeHigh = selectIdRangeHigh(this.state.value);
        const keyRangeLow = selectIdRangeLow(this.state.value);
        const isBelowRange = state.isBelowRange;

        return { keyRangeHigh, keyRangeLow, isBelowRange };
      }),
      switchMap(({ keyRangeHigh, keyRangeLow, isBelowRange }) => {
        // (low, high]
        const key = isBelowRange ? keyRangeLow : keyRangeHigh;

        return this.cacheFacade
          .readBulkDocMeta(key, isBelowRange)
          .pipe(
            tap(docMetas => effectState.success(docMetas))
          );
      })
    ),
    { type: '[DocumentsEffects]readBulkDocMeta', timeOut: EFFECT_TIMEOUT }
  );

  readDocMetas_ = new MonitoredStateSubject<{ ids: number[] }>().addMonitoredEffect(
    effectState => pipe(
      switchMap(state =>
        forkJoin(
          state.ids.map(id => this.cacheFacade.readDocMeta(id, true))
        )
      ),
      tap<DocMeta[]>(docMetas => effectState.success(docMetas))
    ),
    { type: '[DocumentsEffects]readDocMetas', timeOut: EFFECT_TIMEOUT }
  );

  readDocument_ = new MonitoredStateSubject<{ id: number; title?: string; format?: string }>().addMonitoredEffect(
    effectState =>
      pipe(
        tap(state => this.store.dispatch(new SetCurrentDocumentId({ id: state.id }))),
        switchMap(state => {
          return this.cacheFacade
            .readDocContent(state.id, state.title, state.format)
        }),
        tap(result => effectState.success(result))
      ),
    { type: '[DocumentsEffects]readDocument', timeOut: EFFECT_TIMEOUT }
  );

  saveDocument_ = new MonitoredStateSubject<{ content: string; format?: DocFormat; forceUpdate?: boolean }>().addMonitoredEffect(
    effectState =>
      pipe(
        switchMap(state => {
          const doc = selectCurrentDocument(this.state.value);
          const content = state.content;
          const format = state.format;
          const newTitle = DocMeta.getTitle(state.content);

          if (!newTitle) {
            const msg = 'Must define a title!';
            this.snackbar.open(msg, 'OK');
            return throwError(() => new Error(msg));
          }

          if (doc.id === NEW_DOC_ID) {
            return this.cacheFacade.CreateDocument(content, format).pipe(
              tap(d => {
                this.util.modifyUrlAfterSaved(d.id, newTitle, format);
                this.snackbar.open('New document saved!', 'OK');
                effectState.success(state);
              }),
            );
          } else {
            return this.cacheFacade
              .updateDocument(doc.metaData, content, state.forceUpdate)
              .pipe(
                tap(d => {
                  this.util.modifyUrlAfterSaved(d.id, newTitle, format);
                  console.log('Saved!');
                  effectState.success(d);
                })
              );
          }
        })
      ),
    { type: '[DocumentsEffects]saveDocument', timeOut: EFFECT_TIMEOUT }
  );

  deleteDocument_ = new MonitoredStateSubject<{ id: number }>().addMonitoredEffect(
    effectState =>
      pipe(
        switchMap(state =>
          this.cacheFacade.deleteDoc(state.id)
        ),
        tap(result => effectState.success(result))
      ),
    { type: '[DocumentsEffects]deleteDocument', timeOut: EFFECT_TIMEOUT }
  );


  searchDocument_ = new MonitoredStateSubject<{ query: string; folder?: string; extension?: string }>().addMonitoredEffect(
    effectState =>
      pipe(
        switchMap(state =>
          this.cacheFacade.search(state.query).pipe(
            tap({
              next: result => effectState.success(result),
              complete: () => {
                let searchResult = selectSearchResultState(this.state.value);
                if (searchResult.length === 0) {
                  this.snackbar.open('Find Nothing!', null, { duration: 2000 });
                } else {
                  this.snackbar.open(`Find ${searchResult.length} items!`, null, { duration: 2000 });
                }
              }
            })
          )
        )
      ),
    { type: '[DocumentsEffects]searchDocument', timeOut: EFFECT_TIMEOUT }
  );
}

