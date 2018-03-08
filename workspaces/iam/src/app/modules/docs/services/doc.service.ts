import { Injectable, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { Document } from "../models/document";
import { Observable } from "rxjs/Observable";
import { HttpClient } from "@angular/common/http";
import { GithubStorage, UserInfo, EditIssueParams } from '../../../storage/github/index';
import { Repository } from '../../../storage/github/repository';
import { DocsModel } from '../models/docs.model';
import { DocMeta } from '../models/doc-meta';
import { Content } from '../../../storage/github/model/content';
import { ReplaySubject } from 'rxjs';
import { MdcSnackbar } from '@angular-mdc/web';
import { base64Encode } from 'core';
import { map, flatMap } from 'rxjs/operators';
import { Location } from '@angular/common';
@Injectable()
export class DocService {
  static FolderName = 'documents';

  public docListLoaded = false;
  public docAdd$ = new EventEmitter();
  public docRemove$ = new EventEmitter();
  public docModify$ = new EventEmitter();
  public model: DocsModel = new DocsModel();
  public docShow$ = new EventEmitter();
  private _repoSub$ = new ReplaySubject<Repository>();
  private _storage = new GithubStorage(this._http, new UserInfo('metasong', 'metaseed@gmail.com', 'mssong179'));

  constructor(private _http: HttpClient, private snackBar: MdcSnackbar, private location: Location, private router: Router, private activedRoute: ActivatedRoute) {

    this._storage.repos('test2').subscribe(repo => this._repoSub$.next(repo));
  }

  // store(todo: Document) {
  //   console.log('Storing' + todo);
  //   return this.http.post(TodoListService.baseUrl + '/todos', todo)
  //     .map(resp => resp.json())
  //     .catch(res => {
  //       console.error(res.toString());
  //       return Observable.throw(res.message || 'Server error')
  //     });
  // }

  deleteDoc(doc) {
    this._repoSub$.subscribe(repo => repo.issue.edit(doc.number, { state: 'closed' }).subscribe(


      a => {
        const index = this.model.docs.indexOf(doc);
        if (index !== -1) this.model.docs.splice(index, 1);
        console.log(a)
      }
    ));
  }

  newDoc() {
    let doc = {
      content: {
        content: base64Encode('# Title\n*summery*\n')
      }

    }
    this.model.currentDoc = null;
    this.docShow$.next(doc);
  }

  showDoc(title: string, id: number | string) {
    let me = this;
    this._repoSub$.subscribe(repo => repo.getContents(`${DocService.FolderName}/${title}_${id}`).subscribe(
      (content: Content) => {
        let doc = me.model.docs.find((doc) => doc.number === +id);
        function showContent(doc) {
          doc.content = content;
          me.model.currentDoc = doc;
          me.docShow$.next(doc);
        }
        if (!doc) {
          me.get(+id).subscribe(doc => {
            showContent(doc);
          });
        } else {
          showContent(doc);
        }
      }
    ));
  }


  getContentUrl(issueNum) {
    return `https://metaseed.github.io/iam/${issueNum}`;
  }
  // http://reactivex.io/documentation/operators/replay.html
  saveNew = (content: string) => {
    let title = DocMeta.getTitle(content);
    if (!title) throw 'must have title';
    return this._repoSub$.pipe(flatMap(repo =>
      repo.issue.create({ title }).pipe(flatMap((issue) => {
        let id = issu.number;
        return repo.newFile(`${DocService.FolderName}/${title}_${id}`, content).pipe(flatMap((file) => {
          let url = this.getContentUrl(id);
          return DocMeta.serializeContent(content, file.content.sha, url).pipe(flatMap(([metaString, metaData]) => {
            let data: EditIssueParams = { title: title, body: <string>metaString };
            return repo.issue.edit(id, data).pipe(map((doc: Document) => {
              doc.metaData = <DocMeta>metaData;
              this.model.docs.unshift(doc);
              return doc;
            }));

          }))
        }))
      }))
    ));

  }

  save(content) {
    if (this.model.currentDoc) {
      this.edit(content, this.model.currentDoc).subscribe(doc => {
        this.model.currentDoc = doc;
        const url = this
          .router
          .createUrlTree([], { relativeTo: this.activedRoute, queryParams: { id: doc.number, title: DocMeta.getTitle(content) } })
          .toString();

        this.location.go(url);
        this.snackBar.show('Saved!');
      });
    } else {
      this.saveNew(content).subscribe(doc => {
        this.model.currentDoc = doc;
        this.snackBar.show('New document saved!')
      });
    }
  }

  edit = (content: string, doc: Document) => {
    let title = DocMeta.getTitle(content);
    if (!title) throw 'must have title';

    const changeTitle = doc.metaData ? title !== doc.metaData.title : true;
    return this._repoSub$.pipe(flatMap(repo =>
      repo.updateFile(`${DocService.FolderName}/${title}_${doc.number}`, content, doc.metaData.contentId).pipe(flatMap(
        file => {
          let url = this.getContentUrl(doc.number);
          return DocMeta.serializeContent(content, file.content.sha, url).pipe(flatMap(
            ([metaString, metaData]) => {
              let data: EditIssueParams = { title: title, body: <string>metaString };
              return repo.issue.edit(doc.number, data).pipe(map(
                (a) => {
                  if (changeTitle) {
                    repo.delFileViaSha(`${DocService.FolderName}/${doc.metaData.title}_${doc.number}`, doc.metaData.contentId).subscribe();
                  }
                  doc.metaData = <DocMeta>metaData;
                  return doc;
                }
              ));
            }
          ));

        }
      ))
    ));
  }

  getAll() {
    return this._repoSub$.pipe(flatMap(repo => {
      return repo.issue.list('open');
    })).subscribe(
      (docs: Document[]) => {
        let docList = new Array<Document>();
        docs.sort((a, b) => {
          if (a.updated_at < b.updated_at) {
            return 1;
          } else if (a.updated_at > b.updated_at) {
            return -1;
          } else {
            return 0;
          }
        })
        docs.forEach(d => {
          let meta = DocMeta.deSerialize(d.body);
          if (meta) {
            d.metaData = meta;
            docList.push(d);
          }
        });
        this.model.docs = docList;
        this.docListLoaded = true;
      },
      (error) => {
        console.log(error);
        this.docListLoaded = true;
      });
  }

  get(id: number) {
    return this._repoSub$.pipe(flatMap(repo => {
      return repo.issue.get(id).pipe(map((doc: Document) => {
        doc.metaData = DocMeta.deSerialize(doc.body);
        return doc;
      }))
    }));
  }
  // update(todo: Document) {
  //   console.log('Update');

  //   return this.http.put(TodoListService.baseUrl + '/todos/' + todo.id, todo)
  //     .catch(res => {
  //       console.error(res.toString());
  //       return Observable.throw(res.message || 'Server error')
  //     });
  // }
}
