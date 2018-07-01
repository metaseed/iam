import { Injectable } from '@angular/core';
import { Effect } from '@ngrx/effects';
import { throwError, pipe } from 'rxjs';
import { Store } from '@ngrx/store';
import { State as StoreState } from '@ngrx/store';
import {
  DocumentEffectsReadBulkDocMeta,
  DocumentEffectsActionTypes,
  DocumentEffectsDelete
} from './document.effects.actions';
import { GithubStorage, GithubCache } from 'net-storage';
import { switchMap, tap, combineLatest } from 'rxjs/operators';
import { DocMeta } from 'core';
import {
  DocumentEffectsRead,
  SetCurrentDocumentId,
  selectCurrentDocumentState,
  DocumentEffectsCreate,
  DocumentEffectsSave,
  selectKeyRangeLowState,
  selectKeyRangeHighState
} from 'app/modules/home/state';
import { MatSnackBar } from '@angular/material';
import { State } from './document.reducer';
import { StoreCache } from 'core';
import { DatabaseCache } from 'database';
import { NEW_DOC_ID } from '../const';
import { EffectsMoniter } from './document.effects.monitor';
import { DocEffectsUtil } from './document.effects.util';

@Injectable()
export class DocumentEffects {
  constructor(
    private monitor: EffectsMoniter,
    private state: StoreState<State>,
    private storage: GithubStorage,
    private snackbar: MatSnackBar,
    private store: Store<State>,
    private util: DocEffectsUtil,
    private storeCache: StoreCache,
    dbCache: DatabaseCache,
    githubCache: GithubCache
  ) {
    storeCache.init(dbCache.init(githubCache.init(undefined)));
  }

  @Effect()
  CreateDocument = this.monitor.do<DocumentEffectsCreate>(
    DocumentEffectsActionTypes.Create,
    tap<DocumentEffectsCreate>(a => {
      this.storeCache.createDoc(a.payload.format);
    })
  );

  @Effect()
  ReadDocMetaTable = this.monitor.do<DocumentEffectsReadBulkDocMeta>(
    DocumentEffectsActionTypes.ReadBulkDocMeta,
    (() => {
      let keyRangeHigh: number;
      let keyRangeLow: number;
      let isBelowRange: boolean;

      return pipe(
        tap<DocumentEffectsReadBulkDocMeta>(action => {
          keyRangeHigh = selectKeyRangeHighState(this.state.value);
          keyRangeLow = selectKeyRangeLowState(this.state.value);
          isBelowRange = action.payload.isBelowRange;
        }),
        switchMap(_ => {
          const key = isBelowRange ? keyRangeLow : keyRangeHigh;
          return this.storeCache.readBulkDocMeta(key, isBelowRange);
        })
      );
    })()
  );

  @Effect()
  ReadDocument = this.monitor.do<DocumentEffectsRead>(
    DocumentEffectsActionTypes.Show,
    pipe(
      tap(action => this.store.dispatch(new SetCurrentDocumentId({ id: action.payload.id }))),
      switchMap(action => {
        const actionDoc = action.payload;
        return this.storeCache.readDocContent(actionDoc.id, actionDoc.title, actionDoc.format);
      })
    )
  );



  @Effect()
  SaveDocument = this.monitor.do<DocumentEffectsSave>(
    DocumentEffectsActionTypes.Save,
    pipe(
      combineLatest(this.storage.init(), this.store.select(selectCurrentDocumentState)),
      switchMap(([action,, doc]) => {
        const content = action.payload.content;
        let format = action.payload.format;
        let newTitle = DocMeta.getTitle(action.payload.content);

        if (!newTitle) return throwError(new Error('Must define a title!'));

        if (doc.id === NEW_DOC_ID) {
          return this.storeCache.CreateDocument(content, format).pipe(
            tap(doc=> {
              this.util.modifyUrlAfterSaved(doc.id,newTitle,format);
              this.snackbar.open('New document saved!', 'OK');
            })
          );
        } else {
          return this.storeCache.UpdateDocument(doc.metaData, content).pipe(
            tap(doc => {
              this.util.modifyUrlAfterSaved(doc.id,newTitle,format);
              this.snackbar.open('Saved!', 'OK');
            })
          );
        }
      })
    )
  );

  @Effect()
  DeleteDocument = this.monitor.do<DocumentEffectsDelete>(
    DocumentEffectsActionTypes.Delete,
    switchMap(a => this.storeCache.deleteDoc(a.payload.id))
  );
}
