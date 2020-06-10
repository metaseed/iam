import { Injectable, Inject } from '@angular/core';
import { Effect } from '@ngrx/effects';
import { throwError, pipe } from 'rxjs';
import { Store } from '@ngrx/store';
import { State as StoreState } from '@ngrx/store';
import {
  DocumentEffectsReadBulkDocMeta,
  DocumentEffectsActionType,
  DocumentEffectsDelete,
  DocumentEffectsSearch
} from './document.effects-actions';
import { switchMap, tap } from 'rxjs/operators';
import {
  DocumentEffectsRead,
  DocumentEffectsCreate,
  DocumentEffectsSave
} from './document.effects-actions';
import { DocumentState } from './document.reducer';
import { ActionMoniter } from '../action-stauts';
import { DocEffectsUtil } from './document.effects.util';
import { SetCurrentDocumentId } from './document.actions';
import { DocMeta, CACHE_FACADE_TOKEN, ICache } from 'core';
import {
  selectIdRangeHighState,
  selectIdRangeLowState,
  selectCurrentDocumentState,
  selectSearchResultState
} from './document.selectors';
import { NEW_DOC_ID } from './const';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable()
export class DocumentEffects {
  constructor(
    private actionMonitor: ActionMoniter,
    @Inject(CACHE_FACADE_TOKEN)
    private cacheFacade: ICache,
    private util: DocEffectsUtil,
    private state: StoreState<DocumentState>,
    private snackbar: MatSnackBar,
    private store: Store<DocumentState>
  ) {}

  @Effect()
  CreateDocument = this.actionMonitor.do$<DocumentEffectsCreate>(
    DocumentEffectsActionType.Create,
    tap<DocumentEffectsCreate>(a => {
      (this.cacheFacade as any).createDoc(a.payload.format);
    })
  );

  @Effect()
  ReadBulkDocMeta = this.actionMonitor.do$<DocumentEffectsReadBulkDocMeta>(
    DocumentEffectsActionType.ReadBulkDocMeta,
    (() => {
      let keyRangeHigh: number;
      let keyRangeLow: number;
      let isBelowRange: boolean;

      return pipe(
        tap<DocumentEffectsReadBulkDocMeta>(action => {
          keyRangeHigh = selectIdRangeHighState(this.state.value);
          keyRangeLow = selectIdRangeLowState(this.state.value);
          isBelowRange = action.payload.isBelowRange;
        }),
        switchMap(action => {
          // (low, high]
          const key = isBelowRange ? keyRangeLow : keyRangeHigh;
          return this.cacheFacade
            .readBulkDocMeta(key, isBelowRange)
            .pipe(this.actionMonitor.complete(action));
        })
      );
    })()
  );

  @Effect()
  ReadDocument = this.actionMonitor.do$<DocumentEffectsRead>(
    DocumentEffectsActionType.ReadDocument,
    pipe(
      tap(action => this.store.dispatch(new SetCurrentDocumentId({ id: action.payload.id }))),
      switchMap(action => {
        const actionDoc = action.payload;
        return this.cacheFacade
          .readDocContent(actionDoc.id, actionDoc.title, actionDoc.format)
          .pipe(this.actionMonitor.complete(action));
      })
    )
  );

  @Effect()
  SaveDocument = this.actionMonitor.do$<DocumentEffectsSave>(
    DocumentEffectsActionType.Save,
    pipe(
      switchMap(action => {
        const doc = selectCurrentDocumentState(this.state.value);
        const content = action.payload.content;
        const format = action.payload.format;
        const newTitle = DocMeta.getTitle(action.payload.content);

        if (!newTitle) {
          const msg = 'Must define a title!';
          this.snackbar.open(msg, 'OK');
          return throwError(new Error(msg));
        }

        if (doc.id === NEW_DOC_ID) {
          return this.cacheFacade.CreateDocument(content, format).pipe(
            tap(d => {
              this.util.modifyUrlAfterSaved(d.id, newTitle, format);
              this.snackbar.open('New document saved!', 'OK');
            }, this.actionMonitor.complete(action))
          );
        } else {
          return this.cacheFacade
            .UpdateDocument(doc.metaData, content, action.payload.forceUpdate)
            .pipe(
              tap(d => {
                this.util.modifyUrlAfterSaved(d.id, newTitle, format);
                // this.snackbar.open('Saved!', 'OK');
                console.log('Saved!');
              }, this.actionMonitor.complete(action))
            );
        }
      })
    )
  );

  @Effect()
  DeleteDocument = this.actionMonitor.do$<DocumentEffectsDelete>(
    DocumentEffectsActionType.Delete,
    switchMap(action =>
      this.cacheFacade.deleteDoc(action.payload.id).pipe(this.actionMonitor.complete(action))
    )
  );

  @Effect()
  SearchDocument = this.actionMonitor.do$<DocumentEffectsSearch>(
    DocumentEffectsActionType.Search,
    switchMap(action =>
      this.cacheFacade.search(action.payload.query).pipe(
        this.actionMonitor.complete(action),
        tap(null, null, () => {
          let searchResult = selectSearchResultState(this.state.value);
          if (searchResult.length === 0) {
            this.snackbar.open('Find Nothing!', null, { duration: 2000 });
          } else {
            this.snackbar.open(`Find ${searchResult.length} items!`, null, { duration: 2000 });
          }
        })
      )
    )
  );
}
