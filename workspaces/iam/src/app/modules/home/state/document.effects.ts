import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, defer, of, throwError } from 'rxjs';
import { Action, Store } from '@ngrx/store';
import { State as StoreState } from '@ngrx/store';
import { getContent, NEW_DOC_ID, getContentUrl } from './document.effects.util';
import {
  DocumentEffectsLoad,
  DocumentEffectsActionTypes,
  ActionStatus,
  DocumentEffectsDelete
} from './document.effects.actions';
import { LoadDocuments, SetDocumentsMessage, DeleteDocument } from './document.actions';
import { GithubStorage, Repository, EditIssueParams, Issue, GithubCache } from 'net-storage';
import {
  switchMap,
  catchError,
  map,
  tap,
  take,
  retry,
  combineLatest,
  last,
  count
} from 'rxjs/operators';
import { DocMeta, Document } from 'core';
import {
  selectDocumentEntitiesState,
  DocumentEffectsShow,
  SetCurrentDocumentId,
  selectCurrentDocumentState,
  AddDocument,
  UpdateDocument,
  DocumentEffectsNew,
  DocumentEffectsSave,
  UpsertDocuments,
  selectKeyRangeLowState,
  selectKeyRangeHighState
} from 'app/modules/home/state';
import { DocService } from '../services/doc.service';
import { format } from 'util';
import { base64Encode } from 'core';
import { MatSnackBar } from '@angular/material';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { State, selectDocumentsKeyRangeHigh } from './document.reducer';
import { HttpResponse } from '@angular/common/http';
import { StoreCache } from 'core';
import { DatabaseCache } from 'database';

@Injectable()
export class DocumentEffects {
  constructor(
    private actions$: Actions,
    private state: StoreState<State>,
    private storage: GithubStorage,
    private snackbar: MatSnackBar,
    private store: Store<State>,
    private location: Location,
    private router: Router,
    private storeCache: StoreCache,
    dbCache: DatabaseCache,
    githubCache: GithubCache
  ) {
    storeCache.init(dbCache.init(githubCache.init(undefined)));
  }

  @Effect()
  LoadDocuments: Observable<Action> = ((coId = -1) => {
    let keyRangeHigh: number;
    let keyRangeLow: number;
    let isBelowRange: boolean;

    return this.actions$.pipe(
      ofType<DocumentEffectsLoad>(DocumentEffectsActionTypes.Load),
      tap(action => {
        keyRangeHigh = selectKeyRangeHighState(this.state.value);
        keyRangeLow = selectKeyRangeLowState(this.state.value);
        isBelowRange = action.payload.isBelowRange;

        this.store.dispatch(
          new SetDocumentsMessage({
            action: DocumentEffectsActionTypes.Load,
            status: ActionStatus.Start,
            corelationId: (coId = Date.now())
          })
        );
      }),
      switchMap(_ => {
        const key = isBelowRange ? keyRangeLow : keyRangeHigh;
        return this.storeCache.readBulkDocMeta(key, isBelowRange).pipe(
          count(),
          map(
            _ =>
              new SetDocumentsMessage({
                status: ActionStatus.Success,
                action: DocumentEffectsActionTypes.Load,
                corelationId: coId,
                message: 'documents loaded'
              })
          )
        );
      }),
      catchError((err, caught) => {
        console.error(err);
        this.store.dispatch(
          new SetDocumentsMessage({
            status: ActionStatus.Fail,
            action: DocumentEffectsActionTypes.Load,
            corelationId: coId,
            message: err
          })
        );
        return caught;
      })
    );
  })();

  @Effect()
  ShowDocument: Observable<Action> = ((coId = -1) =>
    this.actions$.pipe(
      ofType<DocumentEffectsShow>(DocumentEffectsActionTypes.Show),
      tap(action => this.store.dispatch(new SetCurrentDocumentId({ id: action.payload.key }))),
      tap(action =>
        this.store.dispatch(
          new SetDocumentsMessage({
            action: DocumentEffectsActionTypes.Show,
            status: ActionStatus.Start,
            corelationId: (coId = Date.now())
          })
        )
      ),
      switchMap(action => {
        const actionDoc = action.payload;
        return this.storeCache
          .readDocContent(actionDoc.key, actionDoc.title, actionDoc.format)
          .pipe(
            map(
              _ =>
                new SetDocumentsMessage({
                  action: DocumentEffectsActionTypes.Show,
                  status: ActionStatus.Success,
                  corelationId: coId
                })
            )
          );
      }),
      catchError((err, caught) => {
        console.error(err);
        this.store.dispatch(
          new SetDocumentsMessage({
            status: ActionStatus.Fail,
            action: DocumentEffectsActionTypes.Show,
            corelationId: coId,
            message: err
          })
        );
        return caught;
      })
    ))();

  @Effect()
  NewDocument: Observable<Action> = ((coId = -1) =>
    this.actions$.pipe(
      ofType<DocumentEffectsNew>(DocumentEffectsActionTypes.New),
      tap(action =>
        this.store.dispatch(
          new SetDocumentsMessage({
            action: DocumentEffectsActionTypes.New,
            status: ActionStatus.Start,
            corelationId: (coId = Date.now())
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
        this.store.dispatch(new SetCurrentDocumentId({ id: num }));
        return new SetDocumentsMessage({
          action: DocumentEffectsActionTypes.New,
          status: ActionStatus.Success,
          corelationId: coId
        });
      }),
      catchError((err, caught) => {
        console.error(err);
        this.store.dispatch(
          new SetDocumentsMessage({
            status: ActionStatus.Fail,
            action: DocumentEffectsActionTypes.New,
            corelationId: coId,
            message: err
          })
        );
        return caught;
      })
    ))();

  @Effect()
  SaveDocument: Observable<Action> = ((coId = -1) =>
    this.actions$.pipe(
      ofType<DocumentEffectsSave>(DocumentEffectsActionTypes.Save),
      tap(action => {
        return this.store.dispatch(
          new SetDocumentsMessage({
            action: DocumentEffectsActionTypes.Save,
            status: ActionStatus.Start,
            corelationId: (coId = Date.now())
          })
        );
      }),
      combineLatest(this.storage.init(), this.store.select(selectCurrentDocumentState)),
      switchMap(([action, repo, doc]) => {
        const content = action.payload.content;
        let format = action.payload.format;
        let newTitle = DocMeta.getTitle(action.payload.content);

        if (!newTitle) return throwError(new Error('Must define a title!'));
        if (!doc.metaData || !doc.metaData.contentId) {
          //from url show and save
          return repo.issue.get(doc.key).pipe(
            switchMap(doc => {
              let meta = DocMeta.deSerialize(doc.body);
              (<any>doc).metaData = meta;
              newTitle = meta.title;
              format = meta.format || format;
              return this.saveNew(repo, newTitle, content, format, coId);
            })
          );
        } else {
          return this.edit(repo, doc, newTitle, content, format, coId);
        }
      }),
      catchError((err, caught) => {
        console.error(err);
        this.store.dispatch(
          new SetDocumentsMessage({
            status: ActionStatus.Fail,
            action: DocumentEffectsActionTypes.Save,
            corelationId: coId,
            message: err.message + err.stack
          })
        );
        return caught;
      })
    ))();

  saveNew = (repo: Repository, title: string, content: string, format: string, coId: number) => {
    return repo.issue.create({ title }).pipe(
      switchMap(issue => {
        let id = issue.number;
        return repo.newFile(`${DocService.FolderName}/${title}_${id}.${format}`, content).pipe(
          switchMap(file => {
            let url = getContentUrl(id, title);
            return of(
              DocMeta.serializeContent(id, content, file.content.sha, url, format, new Date())
            ).pipe(
              switchMap(r => {
                const { meta, metaStr } = r;
                let data: EditIssueParams = {
                  title: title,
                  body: metaStr
                };
                return repo.issue.edit(id, data).pipe(
                  map((doc: Document) => {
                    doc.metaData = meta;
                    this.store.dispatch(
                      new UpdateDocument({
                        collectionDocument: { id: doc.key, changes: <any>doc }
                      })
                    );
                    this.modifyUrlAfterSaved(id, title, format);
                    this.snackbar.open('New document saved!', 'OK');
                    return new SetDocumentsMessage({
                      status: ActionStatus.Success,
                      action: DocumentEffectsActionTypes.Save,
                      corelationId: coId
                    });
                  })
                );
              })
            );
          })
        );
      })
    );
  };

  edit = (
    repo: Repository,
    doc: Document,
    newTitle: string,
    content: string,
    format: string,
    coId: number
  ) => {
    const changeTitle = doc.metaData ? newTitle !== doc.metaData.title : true;
    return repo
      .updateFile(
        `${DocService.FolderName}/${newTitle}_${doc.key}.${format}`,
        content,
        doc.metaData.contentId
      )
      .pipe(
        switchMap(file => {
          let url = getContentUrl(doc.key, newTitle);
          return of(
            DocMeta.serializeContent(
              doc.key,
              content,
              file.content.sha,
              url,
              format,
              doc.metaData.createDate
            )
          ).pipe(
            switchMap(({ meta, metaStr }) => {
              let data: EditIssueParams = {
                title: newTitle,
                body: metaStr
              };
              return repo.issue.edit(doc.key, data).pipe(
                tap(d => {
                  if (changeTitle) {
                    repo
                      .delFileViaSha(
                        `${DocService.FolderName}/${doc.metaData.title}_${doc.key}.${format}`,
                        doc.metaData.contentId
                      )
                      .pipe(take(1))
                      .subscribe();
                  }
                }),
                map(a => {
                  doc.metaData = meta;
                  this.store.dispatch(
                    new UpdateDocument({
                      collectionDocument: { id: doc.key, changes: <any>doc }
                    })
                  );
                  this.snackbar.open('Saved!', 'OK');
                  this.modifyUrlAfterSaved(doc.key, newTitle, format);
                  return new SetDocumentsMessage({
                    status: ActionStatus.Success,
                    action: DocumentEffectsActionTypes.Save,
                    corelationId: coId
                  });
                })
              );
            })
          );
        })
      );
  };
  modifyUrlAfterSaved(num: number, title: string, format: string) {
    const url = this.router
      .createUrlTree(['/doc'], {
        queryParams: {
          id: num,
          title: title,
          f: format
        }
      })
      .toString();

    this.location.go(url);
  }

  @Effect()
  DeleteDocument: Observable<Action> = ((coId = Date.now()) =>
    this.actions$.pipe(
      ofType<DocumentEffectsDelete>(DocumentEffectsActionTypes.Delete),
      tap(action =>
        this.store.dispatch(
          new SetDocumentsMessage({
            action: DocumentEffectsActionTypes.Delete,
            status: ActionStatus.Start,
            corelationId: (coId = Date.now())
          })
        )
      ),
      combineLatest(this.storage.init()),
      switchMap(([action, repo]) => {
        const key = action.payload.key;
        return repo.issue.edit(key, { state: 'closed' }).pipe(
          switchMap(issue => {
            const title = action.payload.title;
            return repo.delFile(`${DocService.FolderName}/${title}_${key}.md`).pipe(
              map(d => {
                this.store.dispatch(
                  new SetDocumentsMessage({
                    status: ActionStatus.Success,
                    action: DocumentEffectsActionTypes.Delete,
                    corelationId: coId,
                    message: `document: ${title} deleted`
                  })
                );
                return new DeleteDocument({ id: key });
              })
            );
          })
        );
      }),
      catchError((err, caught) => {
        console.error(err);
        this.store.dispatch(
          new SetDocumentsMessage({
            status: ActionStatus.Fail,
            action: DocumentEffectsActionTypes.Delete,
            corelationId: coId,
            message: err
          })
        );
        return caught;
      })
    ))();
}
