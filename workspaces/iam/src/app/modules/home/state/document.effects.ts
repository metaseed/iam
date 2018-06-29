import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, defer, of, throwError, Operator, OperatorFunction, pipe } from 'rxjs';
import { Action, Store } from '@ngrx/store';
import { State as StoreState } from '@ngrx/store';
import { getContentUrl } from './document.effects.util';
import {
  DocumentEffectsLoad,
  DocumentEffectsActionTypes,
  ActionStatus,
  DocumentEffectsDelete
} from './document.effects.actions';
import { SetDocumentsMessage, DeleteDocument } from './document.actions';
import { GithubStorage, Repository, EditIssueParams, Issue, GithubCache } from 'net-storage';
import { switchMap, catchError, map, tap, take, combineLatest, count } from 'rxjs/operators';
import { DocMeta, Document } from 'core';
import {
  DocumentEffectsShow,
  SetCurrentDocumentId,
  selectCurrentDocumentState,
  UpdateDocument,
  DocumentEffectsNew,
  DocumentEffectsSave,
  selectKeyRangeLowState,
  selectKeyRangeHighState
} from 'app/modules/home/state';
import { MatSnackBar } from '@angular/material';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { State } from './document.reducer';
import { StoreCache } from 'core';
import { DatabaseCache } from 'database';
import { DOCUMENTS_FOLDER_NAME } from '../const';
import { EffectsMoniter } from './document.effects.monitor';

@Injectable()
export class DocumentEffects {
  constructor(
    private monitor: EffectsMoniter,
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
  LoadDocuments = this.monitor.do<DocumentEffectsLoad>(
    DocumentEffectsActionTypes.Load,
    (() => {
      let keyRangeHigh: number;
      let keyRangeLow: number;
      let isBelowRange: boolean;

      return pipe(
        tap<DocumentEffectsLoad>(action => {
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
  ShowDocument = this.monitor.do<DocumentEffectsShow>(
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
  NewDocument = this.monitor.do<DocumentEffectsNew>(
    DocumentEffectsActionTypes.New,
    tap<DocumentEffectsNew>(a => {
      this.storeCache.createNewDoc(a.payload.format);
    })
  );

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
          return repo.issue.get(doc.id).pipe(
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
        return repo.newFile(`${DOCUMENTS_FOLDER_NAME}/${title}_${id}.${format}`, content).pipe(
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
                        collectionDocument: { id: doc.id, changes: <any>doc }
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
        `${DOCUMENTS_FOLDER_NAME}/${newTitle}_${doc.id}.${format}`,
        content,
        doc.metaData.contentId
      )
      .pipe(
        switchMap(file => {
          let url = getContentUrl(doc.id, newTitle);
          return of(
            DocMeta.serializeContent(
              doc.id,
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
              return repo.issue.edit(doc.id, data).pipe(
                tap(d => {
                  if (changeTitle) {
                    repo
                      .delFileViaSha(
                        `${DOCUMENTS_FOLDER_NAME}/${doc.metaData.title}_${doc.id}.${format}`,
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
                      collectionDocument: { id: doc.id, changes: <any>doc }
                    })
                  );
                  this.snackbar.open('Saved!', 'OK');
                  this.modifyUrlAfterSaved(doc.id, newTitle, format);
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
  DeleteDocument = this.monitor.do<DocumentEffectsDelete>(DocumentEffectsActionTypes.Delete,

  );

  : Observable<Action> = ((coId = Date.now()) =>
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
