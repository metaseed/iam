import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, defer, of, throwError } from 'rxjs';
import { Database } from '../../db/database';
import { Action, Store } from '@ngrx/store';
import {
  DocumentEffectsLoad,
  DocumentEffectsActionTypes,
  ActionStatus,
  DocumentEffectsDelete
} from './document.effects.actions';
import { LoadDocuments, SetDocumentsMessage, DeleteDocument } from './document.actions';
import { GithubStorage, Repository } from '../../../storage/github';
import { switchMap, catchError, map, tap, take, retry } from 'rxjs/operators';
import { DocumentActionTypes } from '../../markdown/actions/document';
import { DocMeta } from '../models/doc-meta';
import { Document } from '../models/document';
import { State } from '../../markdown/reducers/document';
import {
  getDocumentEntitiesState,
  DocumentEffectsShow,
  SetCurrentDocumentId,
  getCurrentDocumentState,
  AddDocument,
  UpdateDocument
} from 'app/modules/docs/state';
import { DocService } from '../services/doc.service';
import { format } from 'util';

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
          this.store.dispatch(new LoadDocuments({ collectionDocuments: docList }));
          return new SetDocumentsMessage({
            status: ActionStatus.Success,
            action: DocumentEffectsActionTypes.Load,
            message: 'documents loaded'
          });
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
    tap(action => this.store.dispatch(new SetCurrentDocumentId({ id: action.payload.doc.number }))),
    tap(action =>
      this.store.dispatch(
        new SetDocumentsMessage({
          action: DocumentEffectsActionTypes.Show,
          status: ActionStatus.Start
        })
      )
    ),
    switchMap(action => {
      return this._storage.init().pipe(
        switchMap(repo => {
          let document: Document;
          const actionDoc = action.payload.doc;
          this.store
            .select(getDocumentEntitiesState)
            .pipe(take(1))
            .subscribe(documents => {
              document = documents[actionDoc.number];
            });

          let curDoc = document ? { ...document } : { ...action.payload.doc };
          const num = +actionDoc.number;
          const title = actionDoc.title;
          const format = actionDoc.format;
          return getContent(repo, num, title, format).pipe(
            tap(c => {
              (<any>curDoc).content = c;
              if (!document) {
                this.store.dispatch(new AddDocument({ collectionDocument: <any>curDoc }));
              } else {
                this.store.dispatch(
                  new UpdateDocument({
                    collectionDocument: { id: <string>curDoc.number, changes: <any>curDoc }
                  })
                );
              }
            }),
            map(c => {
              return new SetDocumentsMessage({
                action: DocumentEffectsActionTypes.Show,
                status: ActionStatus.Success
              });
            })
          );
        })
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

function getContent(repo: Repository, number: number, title: string, format: string, state = 0 ) {
  let content = `${DocService.FolderName}/${title}_${number}.${format}`;
  if (!format) content = `${DocService.FolderName}/${title}_${number}`;
  return repo.getContents(content).pipe(/*from url*/
    catchError(err => {
      if (err.status === 404) {
        if (state===0) {
          state=1;
          let doc: Document;
          return repo.issue.get(number).pipe(
            switchMap(doc => {
              let meta = DocMeta.deSerialize(doc.body);
              title = meta.title;
              format = meta.format || 'md';
              return getContent(repo, number, title, format, state);// from database
            })
          );
        } else if(format && state===1) {
          state=2; // stop
          return getContent(repo,number,title,'',state); // from database but without format
        }
      }
    })
  );
}
