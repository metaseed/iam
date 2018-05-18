import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, defer, of } from 'rxjs';
import { Database } from '../../db/database';
import { Action } from '@ngrx/store';
import { DocumentEffectsLoad, DocumentEffectsActionTypes } from './document.effects.actions';
import { LoadDocuments, SetDocumentsMessage } from './document.actions';
import { GithubStorage } from '../../../storage/github';
import { switchMap, catchError, map } from 'rxjs/operators';
import { Repository } from '../../../../../types/github-api';
import { DocumentActionTypes } from '../../markdown/actions/document';
import { DocMeta } from '../models/doc-meta';
import { Document } from '../models/document';

@Injectable()
export class DocumentEffects {
  @Effect({ dispatch: false })
  openDB$: Observable<any> = defer(() => {
    return this.db.open('iam_db');
  });

  @Effect()
  LoadDocuments: Observable<Action> = this.actions$.pipe(
    ofType<DocumentEffectsLoad>(DocumentEffectsActionTypes.Load),
    switchMap(action =>
      this._storage.repo().pipe(
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
          return new LoadDocuments({ collectionDocuments: docList });
        }),
        catchError(err => of(new SetDocumentsMessage({ type: 'fail', content: err })))
      )
    )
  );

  constructor(private actions$: Actions, private db: Database, private _storage: GithubStorage) {}
}
