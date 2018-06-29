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
import { DocMeta, Document, DocContent } from 'core';
import {
  DocumentEffectsShow,
  SetCurrentDocumentId,
  selectCurrentDocumentState,
  UpdateDocument,
  DocumentEffectsCreate,
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
  CreateDocument = this.monitor.do<DocumentEffectsCreate>(
    DocumentEffectsActionTypes.Create,
    tap<DocumentEffectsCreate>(a => {
      this.storeCache.createDoc(a.payload.format);
    })
  );

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
  SaveDocument = this.monitor.do<DocumentEffectsSave>(DocumentEffectsActionTypes.Save,pipe(
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
            return this._saveNew(repo, newTitle, content, format);
          })
        );
      } else {
        return this._edit(repo, doc, newTitle, content, format);
      }
    })
  ));

  private _saveNew = (
    repo: Repository,
    title: string,
    content: string,
    format: string,
  ) => {
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
                  map(issue => {
                    const docContent = new DocContent(id, file.content.content, file.content.sha);
                    let doc = new Document(id, meta, docContent);
                    this.store.dispatch(
                      new UpdateDocument({
                        collectionDocument: { id, changes: doc }
                      })
                    );
                    this._modifyUrlAfterSaved(id, title, format);
                    this.snackbar.open('New document saved!', 'OK');
                    return doc;
                  })
                );
              })
            );
          })
        );
      })
    );
  };

  private _edit = (
    repo: Repository,
    doc: Document,
    newTitle: string,
    content: string,
    format: string,
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
                  this._modifyUrlAfterSaved(doc.id, newTitle, format);
                  return doc;
                })
              );
            })
          );
        })
      );
  };

  private _modifyUrlAfterSaved(num: number, title: string, format: string) {
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
  DeleteDocument = this.monitor.do<DocumentEffectsDelete>(
    DocumentEffectsActionTypes.Delete,
    switchMap(a => this.storeCache.deleteDoc(a.payload.id))
  );
}
