import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, defer, of, throwError } from 'rxjs';
import { Action, Store } from '@ngrx/store';

import { getContent, NEW_DOC_ID } from './document.effects.util';
import { Database } from '../../db/database';
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
  UpdateDocument,
  DocumentEffectsNew,
  DocumentEffectsSave
} from 'app/modules/docs/state';
import { DocService } from '../services/doc.service';
import { format } from 'util';
import { base64Encode } from 'core';

@Injectable()
export class DocumentEffects {
  private repo: Repository;

  constructor(
    private actions$: Actions,
    private db: Database,
    storage: GithubStorage,
    private store: Store<State>
  ) {
    storage
      .init()
      .pipe(take(1))
      .subscribe(r => {
        if (!r) throw 'could not initial repo';
        this.repo = r;
      });
  }

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
    switchMap(_ => this.repo.issue.list('open')),
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
      return getContent(this.repo, num, title, format).pipe(
        tap(c => {
          (<any>curDoc).content = c;
          if (!document) {
            this.store.dispatch(new AddDocument({ collectionDocument: <any>curDoc }));
          } else {
            this.store.dispatch(
              new UpdateDocument({
                collectionDocument: { id: curDoc.number, changes: <any>curDoc }
              })
            );
          }
        }),
        map(_ => {
          return new SetDocumentsMessage({
            action: DocumentEffectsActionTypes.Show,
            status: ActionStatus.Success
          });
        })
      );
    }),
    catchError(err =>
      of(
        new SetDocumentsMessage({
          status: ActionStatus.Fail,
          action: DocumentEffectsActionTypes.Show,
          message: err
        })
      )
    )
  );

  @Effect()
  NewDocument: Observable<Action> = this.actions$.pipe(
    ofType<DocumentEffectsNew>(DocumentEffectsActionTypes.New),
    tap(action =>
      this.store.dispatch(
        new SetDocumentsMessage({
          action: DocumentEffectsActionTypes.New,
          status: ActionStatus.Start
        })
      )
    ),
    map(action => {
      let num = NEW_DOC_ID;
      let doc = {
        number: num,
        format: action.payload.format,
        content: {
          content: base64Encode('# Title\n*summery*\n')
        }
      };
      this.store.dispatch(new AddDocument({ collectionDocument: <any>doc }));
      action => this.store.dispatch(new SetCurrentDocumentId({ id: num }));
      return new SetDocumentsMessage({
        action: DocumentEffectsActionTypes.New,
        status: ActionStatus.Success
      });
    }),
    catchError(err =>
      of(
        new SetDocumentsMessage({
          status: ActionStatus.Fail,
          action: DocumentEffectsActionTypes.New,
          message: err
        })
      )
    )
  );

  @Effect()
  SaveDocument: Observable<Action> = this.actions$.pipe(
    ofType<DocumentEffectsSave>(DocumentEffectsActionTypes.Save),
    tap(action => {
      return this.store.dispatch(
        new SetDocumentsMessage({
          action: DocumentEffectsActionTypes.Save,
          status: ActionStatus.Start
        })
      );
    }),
    switchMap(action => {
      let isNew = true;
      let title: string;
      this.store
        .select(getCurrentDocumentState)
        .pipe(take(1))
        .subscribe(
          doc => {
            if (doc.number === NEW_DOC_ID) {
              isNew = false;
            }
            title = DocMeta.getTitle(action.payload.content);
          },
          err => throwError(err)
        );

      if (!title) {
        return of(
          new SetDocumentsMessage({
            status: ActionStatus.Fail,
            action: DocumentEffectsActionTypes.Save,
            message: 'Must define a title!'
          })
        );
      }

      // let repo: Repository;
      // this._storage;

      // if (isNew) {
      // }

      return of(
        new SetDocumentsMessage({
          status: ActionStatus.Success,
          action: DocumentEffectsActionTypes.Save
        })
      );
    }),
    catchError(err =>
      of(
        new SetDocumentsMessage({
          status: ActionStatus.Fail,
          action: DocumentEffectsActionTypes.Save,
          message: err
        })
      )
    )
  );

  @Effect()
  DeleteDocument: Observable<Action> = this.actions$.pipe(
    ofType<DocumentEffectsDelete>(DocumentEffectsActionTypes.Delete),
    tap(action =>
      this.store.dispatch(
        new SetDocumentsMessage({
          action: DocumentEffectsActionTypes.Delete,
          status: ActionStatus.Start
        })
      )
    ),
    switchMap(action => {
      const number = action.payload.number;
      return this.repo.issue.edit(number, { state: 'closed' }).pipe(
        switchMap(issue => {
          const title = action.payload.title;
          return this.repo.delFile(`${DocService.FolderName}/${title}_${number}.md`).pipe(
            map(d => {
              this.store.dispatch(
                new SetDocumentsMessage({
                  status: ActionStatus.Success,
                  action: DocumentEffectsActionTypes.Delete,
                  message: `document: ${title} deleted`
                })
              );
              return new DeleteDocument({ id: number });
            })
          );
        })
      );
    }),
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
}
