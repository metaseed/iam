import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, defer, of } from 'rxjs';
import { Database } from '../../db/database';
import { Action, Store } from '@ngrx/store';
import {
  DocumentEffectsLoad,
  DocumentEffectsActionTypes,
  ActionStatus,
  DocumentEffectsDelete
} from './document.effects.actions';
import { LoadDocuments, SetDocumentsMessage, DeleteDocument } from './document.actions';
import { GithubStorage } from '../../../storage/github';
import { switchMap, catchError, map, tap, take, retry } from 'rxjs/operators';
import { Repository } from '../../../../../types/github-api';
import { DocumentActionTypes } from '../../markdown/actions/document';
import { DocMeta } from '../models/doc-meta';
import { Document } from '../models/document';
import { State } from '../../markdown/reducers/document';
import {
  getDocumentEntitiesState,
  DocumentEffectsShow,
  SetCurrentDocumentId
} from 'app/modules/docs/state';
import { DocService } from '../services/doc.service';

@Injectable()
export class DocumentEffects {
  @Effect({ dispatch: false })
  openDB$: Observable<any> = defer(() => {
    return this.db.open('iam_db');
  });

  @Effect()
  LoadDocuments: Observable<Action> = this.actions$.pipe(
    ofType<DocumentEffectsLoad>(DocumentEffectsActionTypes.Load),
    tap(action =>
      this.store.dispatch(
        new SetDocumentsMessage({
          action: DocumentEffectsActionTypes.Load,
          status: ActionStatus.Start
        })
      )
    ),
    switchMap(action =>
      this._storage.init().pipe(
        switchMap(repo => repo.issue.list('open')),
        map((docs: Document[]) => {
          let docList = new Array<Document>();
          docs.forEach(d => {
            let meta = DocMeta.deSerialize(d.body);
            if (meta) {
              d.metaData = meta;
              docList.push(d);
            }
          });
          this.store.dispatch(
            new SetDocumentsMessage({
              status: ActionStatus.Success,
              action: DocumentEffectsActionTypes.Load,
              message: 'documents loaded'
            })
          );
          return new LoadDocuments({ collectionDocuments: docList });
        }),
        catchError(err =>
          of(
            new SetDocumentsMessage({
              status: ActionStatus.Fail,
              action: DocumentEffectsActionTypes.Load,
              message: err
            })
          )
        )
      )
    )
  );

  @Effect()
  ShowDocument: Observable<Action> = this.actions$.pipe(
    ofType<DocumentEffectsShow>(DocumentEffectsActionTypes.Show),
    tap(action => this.store.dispatch(new SetCurrentDocumentId({ id: action.payload.doc.id }))),
    tap(action =>
      this.store.dispatch(
        new SetDocumentsMessage({
          action: DocumentEffectsActionTypes.Show,
          status: ActionStatus.Start
        })
      )
    ),

    switchMap(action => {
      let withFormat = true;
      return this._storage.init().pipe(
        switchMap(repo => {
          function getContent() {
            const doc = action.payload.doc;
            const id = doc.id;
            const title = doc.title;
            const format = doc.format;
            let content = `${DocService.FolderName}/${title}_${id}.${format}`;
            if(!withFormat) content = `${DocService.FolderName}/${title}_${id}`;
            withFormat = false;
            return repo.getContents(content).pipe(
              map(c => {
                doc.content = <any>c;
                return new SetDocumentsMessage({
                  action: DocumentEffectsActionTypes.Show,
                  status: ActionStatus.Success
                });
              })
            );
          }
          return getContent();
        }),
        retry(2)
      );
    }),
    catchError(err =>
      of(
        new SetDocumentsMessage({
          status: ActionStatus.Fail,
          action: DocumentEffectsActionTypes.Load,
          message: err
        })
      )
    )
  );

  @Effect()
  DEleteDocument: Observable<Action> = this.actions$.pipe(
    ofType<DocumentEffectsDelete>(DocumentEffectsActionTypes.Delete),
    tap(action =>
      this.store.dispatch(
        new SetDocumentsMessage({
          action: DocumentEffectsActionTypes.Delete,
          status: ActionStatus.Start
        })
      )
    ),
    switchMap(action =>
      this._storage.init().pipe(
        switchMap(repo => {
          const number = action.payload.number;
          return repo.issue.edit(number, { state: 'closed' }).pipe(
            // switchMap(issue =>
            //   this.store.select(getDocumentEntitiesState).pipe(take(1), map(entity => entity[id]))
            // ),
            switchMap(issue => {
              const title = action.payload.title;
              return repo.delFile(`${DocService.FolderName}/${title}_${number}.md`).pipe(
                map(d => {
                  this.store.dispatch(
                    new SetDocumentsMessage({
                      status: ActionStatus.Success,
                      action: DocumentEffectsActionTypes.Delete,
                      message: `document: ${title} deleted`
                    })
                  );
                  const id = action.payload.id;
                  return new DeleteDocument({ id });
                })
              );
            })
          );
        })
      )
    ),
    catchError(err =>
      of(
        new SetDocumentsMessage({
          status: ActionStatus.Fail,
          action: DocumentEffectsActionTypes.Delete,
          message: err
        })
      )
    )
  );

  constructor(
    private actions$: Actions,
    private db: Database,
    private _storage: GithubStorage,
    private store: Store<State>
  ) {}
}
