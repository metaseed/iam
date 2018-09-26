import { Injectable, Inject } from '@angular/core';
import { Effect } from '@ngrx/effects';
import { throwError, pipe } from 'rxjs';
import { Store } from '@ngrx/store';
import { State as StoreState } from '@ngrx/store';
import {
  DocumentEffectsReadBulkDocMeta,
  DocumentEffectsActionTypes,
  DocumentEffectsDelete
} from './effects-actions';
import { switchMap, tap } from 'rxjs/operators';
import { DocumentEffectsRead, DocumentEffectsCreate, DocumentEffectsSave } from './effects-actions';
import { MatSnackBar } from '@angular/material';
import { DocumentState } from './reducer';
import { StoreCache } from '../store-cache';
import { ActionMoniter } from '../action-stauts';
import { DocEffectsUtil } from './effects.util';
import { SetIdRangeLow, SetIdRangeHigh, SetCurrentDocumentId } from './actions';
import { DocMeta, ICache, NET_CACHE_TOKEN, DB_CACHE_TOKEN } from 'core';
import {
  selectIdRangeHighState,
  selectIdRangeLowState,
  selectCurrentDocumentState
} from './selectors';
import { NEW_DOC_ID } from './const';

@Injectable()
export class DocumentEffects {
  constructor(
    private actionMonitor: ActionMoniter,
    private storeCache: StoreCache,
    private util: DocEffectsUtil,
    private state: StoreState<DocumentState>,
    private snackbar: MatSnackBar,
    private store: Store<DocumentState>,
    @Inject(NET_CACHE_TOKEN) githubCache: ICache,
    @Inject(DB_CACHE_TOKEN) dbCache: ICache
  ) {
    storeCache.init(
      dbCache.init(
        githubCache.init(
          undefined,
          id => {
            this.store.dispatch(new SetIdRangeLow({ idRangeLow: id }));
          },
          id => {
            this.store.dispatch(new SetIdRangeHigh({ idRangeHigh: id }));
          }
        )
      )
    );
  }

  @Effect()
  CreateDocument = this.actionMonitor.do$<DocumentEffectsCreate>(
    DocumentEffectsActionTypes.Create,
    tap<DocumentEffectsCreate>(a => {
      this.storeCache.createDoc(a.payload.format);
    })
  );

  @Effect()
  ReadBulkDocMeta = this.actionMonitor.do$<DocumentEffectsReadBulkDocMeta>(
    DocumentEffectsActionTypes.ReadBulkDocMeta,
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
          return this.storeCache
            .readBulkDocMeta(key, isBelowRange)
            .pipe(this.actionMonitor.complete(action));
        })
      );
    })()
  );

  @Effect()
  ReadDocument = this.actionMonitor.do$<DocumentEffectsRead>(
    DocumentEffectsActionTypes.ReadDocument,
    pipe(
      tap(action => this.store.dispatch(new SetCurrentDocumentId({ id: action.payload.id }))),
      switchMap(action => {
        const actionDoc = action.payload;
        return this.storeCache
          .readDocContent(actionDoc.id, actionDoc.title, actionDoc.format)
          .pipe(this.actionMonitor.complete(action));
      })
    )
  );

  @Effect()
  SaveDocument = this.actionMonitor.do$<DocumentEffectsSave>(
    DocumentEffectsActionTypes.Save,
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
          return this.storeCache.CreateDocument(content, format).pipe(
            tap(d => {
              this.util.modifyUrlAfterSaved(d.id, newTitle, format);
              this.snackbar.open('New document saved!', 'OK');
            }, this.actionMonitor.complete(action))
          );
        } else {
          return this.storeCache.UpdateDocument(doc.metaData, content).pipe(
            tap(d => {
              this.util.modifyUrlAfterSaved(d.id, newTitle, format);
              this.snackbar.open('Saved!', 'OK');
            }, this.actionMonitor.complete(action))
          );
        }
      })
    )
  );

  @Effect()
  DeleteDocument = this.actionMonitor.do$<DocumentEffectsDelete>(
    DocumentEffectsActionTypes.Delete,
    switchMap(action =>
      this.storeCache.deleteDoc(action.payload.id).pipe(this.actionMonitor.complete(action))
    )
  );
}
