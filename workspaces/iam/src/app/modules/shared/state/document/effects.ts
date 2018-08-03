import { Injectable, Inject } from '@angular/core';
import { Effect } from '@ngrx/effects';
import { throwError, pipe } from 'rxjs';
import { Store } from '@ngrx/store';
import { State as StoreState } from '@ngrx/store';
import {
  DocumentEffectsReadBulkDocMeta,
  DocumentEffectsActionTypes,
  DocumentEffectsDelete
} from './effects.actions';
import { switchMap, tap } from 'rxjs/operators';
import { DocumentEffectsRead, DocumentEffectsCreate, DocumentEffectsSave } from './effects.actions';
import { MatSnackBar } from '@angular/material';
import { DocumentState } from './reducer';
import { StoreCache } from '../store-cache';
import { ActionStatusMoniter } from '../action-stauts';
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
    private monitor: ActionStatusMoniter,
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
  CreateDocument = this.monitor.do$<DocumentEffectsCreate>(
    DocumentEffectsActionTypes.Create,
    tap<DocumentEffectsCreate>(a => {
      this.storeCache.createDoc(a.payload.format);
    })
  );

  @Effect()
  ReadBulkDocMeta = this.monitor.do$<DocumentEffectsReadBulkDocMeta>(
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
            .pipe(this.monitor.complete(action));
        })
      );
    })()
  );

  @Effect()
  ReadDocument = this.monitor.do$<DocumentEffectsRead>(
    DocumentEffectsActionTypes.ReadDocument,
    pipe(
      tap(action => this.store.dispatch(new SetCurrentDocumentId({ id: action.payload.id }))),
      switchMap(action => {
        const actionDoc = action.payload;
        return this.storeCache
          .readDocContent(actionDoc.id, actionDoc.title, actionDoc.format)
          .pipe(this.monitor.complete(action));
      })
    )
  );

  @Effect()
  SaveDocument = this.monitor.do$<DocumentEffectsSave>(
    DocumentEffectsActionTypes.Save,
    pipe(
      switchMap(action => {
        const doc = selectCurrentDocumentState(this.state.value);
        const content = action.payload.content;
        const format = action.payload.format;
        const newTitle = DocMeta.getTitle(action.payload.content);

        if (!newTitle) return throwError(new Error('Must define a title!'));

        if (doc.id === NEW_DOC_ID) {
          return this.storeCache.CreateDocument(content, format).pipe(
            tap(d => {
              this.util.modifyUrlAfterSaved(d.id, newTitle, format);
              this.snackbar.open('New document saved!', 'OK');
            }, this.monitor.complete(action))
          );
        } else {
          return this.storeCache.UpdateDocument(doc.metaData, content).pipe(
            tap(d => {
              this.util.modifyUrlAfterSaved(d.id, newTitle, format);
              this.snackbar.open('Saved!', 'OK');
            }, this.monitor.complete(action))
          );
        }
      })
    )
  );

  @Effect()
  DeleteDocument = this.monitor.do$<DocumentEffectsDelete>(
    DocumentEffectsActionTypes.Delete,
    switchMap(action =>
      this.storeCache.deleteDoc(action.payload.id).pipe(this.monitor.complete(action))
    )
  );
}
