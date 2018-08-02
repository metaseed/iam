import { Injectable, Inject } from '@angular/core';
import { Effect } from '@ngrx/effects';
import { throwError, pipe } from 'rxjs';
import { Store } from '@ngrx/store';
import { State as StoreState } from '@ngrx/store';
import {
  DocumentEffectsReadBulkDocMeta,
  DocumentEffectsActionTypes,
  DocumentEffectsDelete
} from './document.effects.actions';
import { GithubCache } from 'net-storage';
import { switchMap, tap } from 'rxjs/operators';
import {
  DocumentEffectsRead,
  SetCurrentDocumentId,
  selectCurrentDocumentState,
  DocumentEffectsCreate,
  DocumentEffectsSave,
  selectIdRangeLowState,
  selectIdRangeHighState
} from '.';
import { MatSnackBar } from '@angular/material';
import { DocumentState } from './document.reducer';
import { StoreCache } from '../store-cache';
import { DatabaseCache } from 'database';
import { ActionStatusMoniter } from '../action-stauts';
import { DocEffectsUtil } from './document.effects.util';
import { SetIdRangeLow, SetIdRangeHigh } from './document.actions';
import { NEW_DOC_ID, DB_CACHE_TOKEN, NET_CACHE_TOKEN } from './const';
import { DocMeta } from '../../model';

@Injectable()
export class DocumentEffects {
  constructor(
    private monitor: ActionStatusMoniter,
    private storeCache: StoreCache,
    private util: DocEffectsUtil,
    private state: StoreState<DocumentState>,
    private snackbar: MatSnackBar,
    private store: Store<DocumentState>,
    @Inject(NET_CACHE_TOKEN) githubCache: GithubCache,
    @Inject(DB_CACHE_TOKEN) dbCache: DatabaseCache
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
        let format = action.payload.format;
        let newTitle = DocMeta.getTitle(action.payload.content);

        if (!newTitle) return throwError(new Error('Must define a title!'));

        if (doc.id === NEW_DOC_ID) {
          return this.storeCache.CreateDocument(content, format).pipe(
            tap(doc => {
              this.util.modifyUrlAfterSaved(doc.id, newTitle, format);
              this.snackbar.open('New document saved!', 'OK');
            }, this.monitor.complete(action))
          );
        } else {
          return this.storeCache.UpdateDocument(doc.metaData, content).pipe(
            tap(doc => {
              this.util.modifyUrlAfterSaved(doc.id, newTitle, format);
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
