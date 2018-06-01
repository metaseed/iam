import { Injectable, EventEmitter } from '@angular/core';
import { Location } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { MatSnackBar } from '@angular/material';

import { ReplaySubject, Observable } from 'rxjs';
import { map, flatMap, take } from 'rxjs/operators';

import { base64Encode, ConfigService, ConfigModel } from 'core';

import { Document } from '../models/document';
import { GithubStorage, UserInfo, EditIssueParams } from '../../../storage/github/index';
import { Repository } from '../../../storage/github/repository';
import { DocsModel } from '../models/docs.model';
import { DocMeta } from '../models/doc-meta';
import { Content } from '../../../storage/github/model/content';
import { Store } from '@ngrx/store';
import { State } from '../state/document.reducer';
import { DocumentEffectsDelete, DocumentEffectsLoad } from '../state/document.effects.actions';

@Injectable()
export class DocService {
  static FolderName = 'documents';

  public docListLoaded = false;
  public docAdd$ = new EventEmitter();
  public docRemove$ = new EventEmitter();
  public docSaved$ = new EventEmitter();
  public docSaving$ = new EventEmitter();
  public model: DocsModel = new DocsModel();
  public docShow$ = new EventEmitter();

  private editor: CodeMirror.Editor;
  public isDocDirty = false;
  private _repoSub$:Observable<Repository>;

  constructor(
    private store: Store<State>,
    private snackBar: MatSnackBar,
    private location: Location,
    private router: Router,
    private activedRoute: ActivatedRoute,
    private _storage: GithubStorage
  ) {
    this._repoSub$ =this._storage.init();
  }
  newDoc() {
    let doc = {
      content: {
        content: base64Encode('# Title\n*summery*\n')
      }
    };
    this.model.currentDoc = null;
    this.docShow$.next(doc);
  }

  getContentUrl(issueNum, title) {
    return `https://metaseed.github.io/iam/doc?id=${issueNum}&title=${encodeURIComponent(title)}`;
  }
  // http://reactivex.io/documentation/operators/replay.html
  saveNew = (content: string) => {
    let title = DocMeta.getTitle(content);
    if (!title) throw 'must have title';
    return this._repoSub$.pipe(
      flatMap(repo =>
        repo.issue.create({ title }).pipe(
          flatMap(issue => {
            let id = issue.number;
            return repo.newFile(`${DocService.FolderName}/${title}_${id}.md`, content).pipe(
              flatMap(file => {
                let url = this.getContentUrl(id, title);
                return DocMeta.serializeContent(content, file.content.sha, url,'md').pipe(
                  flatMap(([metaString, metaData]) => {
                    let data: EditIssueParams = {
                      title: title,
                      body: <string>metaString
                    };
                    return repo.issue.edit(id, data).pipe(
                      map((doc: Document) => {
                        doc.metaData = <DocMeta>metaData;
                        this.model.docs.unshift(doc);
                        return doc;
                      })
                    );
                  })
                );
              })
            );
          })
        )
      )
    );
  };
  private modifyUrlAfterSaved(doc: Document) {
    const url = this.router
      .createUrlTree(['/doc'], {
        queryParams: {
          id: doc.number,
          title: doc.metaData.title,
          format: doc.metaData.format
        }
      })
      .toString();

    this.location.go(url);
  }
  save(content) {
    this.docSaving$.next(this.model.currentDoc);
    if (this.model.currentDoc) {
      this.edit(content, this.model.currentDoc).subscribe(doc => {
        this.model.currentDoc = doc;

        this.snackBar.open('Saved!', 'OK');
        this.modifyUrlAfterSaved(doc);
        this.docSaved$.next(this.model.currentDoc);
      });
    } else {
      this.saveNew(content).subscribe(doc => {
        this.model.currentDoc = doc;
        this.snackBar.open('New document saved!', 'OK');
        this.modifyUrlAfterSaved(doc);
        this.docSaved$.next(this.model.currentDoc);
      });
    }
  }

  edit = (content: string, doc: Document) => {
    let title = DocMeta.getTitle(content);
    if (!title) throw 'must have title';

    const changeTitle = doc.metaData ? title !== doc.metaData.title : true;
    return this._repoSub$.pipe(
      flatMap(repo =>
        repo
          .updateFile(
            `${DocService.FolderName}/${title}_${doc.number}.md`,
            content,
            doc.metaData.contentId
          )
          .pipe(
            flatMap(file => {
              let url = this.getContentUrl(doc.number, title);
              return DocMeta.serializeContent(content, file.content.sha, url,'md').pipe(
                flatMap(([metaString, metaData]) => {
                  let data: EditIssueParams = {
                    title: title,
                    body: <string>metaString
                  };
                  return repo.issue.edit(doc.number, data).pipe(
                    map(a => {
                      if (changeTitle) {
                        repo
                          .delFileViaSha(
                            `${DocService.FolderName}/${doc.metaData.title}_${doc.number}.md`,
                            doc.metaData.contentId
                          )
                          .subscribe();
                      }
                      doc.metaData = <DocMeta>metaData;
                      return doc;
                    })
                  );
                })
              );
            })
          )
      )
    );
  };


  // update(todo: Document) {
  //   console.log('Update');

  //   return this.http.put(TodoListService.baseUrl + '/todos/' + todo.id, todo)
  //     .catch(res => {
  //       console.error(res.toString());
  //       return Observable.throw(res.message || 'Server error')
  //     });
  // }
}
