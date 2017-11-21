import { Injectable, EventEmitter } from '@angular/core';
import { Document } from "../models/document";
import { Observable } from "rxjs/Observable";
import { HttpClient } from "@angular/common/http";
import { GithubStorage, UserInfo, EditIssueParams } from '../../storage/github/index';
import { Repository } from '../../storage/github/repository';
import { DocsModel } from '../models/docs.model';
import { DocMeta } from '../models/doc-meta';

@Injectable()
export class DocService {
  public docAdd$ = new EventEmitter();
  public docRemove$ = new EventEmitter();
  public docModify$ = new EventEmitter();
  public model: DocsModel;
  private docShow$ = new EventEmitter();
  private _repo: Repository;
  private _repoSub$: Observable<Repository>;
  private _storage = new GithubStorage(this._http, new UserInfo('metasong', 'metaseed@gmail.com', 'mssong179'));

  constructor(private _http: HttpClient) {
    this._repoSub$ = this._storage.repos('test2');
    this._repoSub$.subscribe(repo => this._repo = repo);
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
    this._repo.issue.edit(doc.number, { state: 'closed' }).subscribe(
      a => console.log(a)
    );
  }
  newDoc() {
    let doc = {
      body: '# Title\n*summery*\n'
    }
    this.showDoc(doc);
  }
  showDoc(doc) {
    this.model.currentDoc = doc;
    this.docShow$.next(doc);
  }
  onShowDoc(fun) {
    this.docShow$.subscribe(fun);
  }

  getContentUrl(issueNum) {
    return `https://metaseed.github.io/iam/${issueNum}`;
  }

  saveNew = (content: string) => {
    let title = DocMeta.getHeader(content);
    if (!title) throw 'must have title';
    return this._repo.issue.create({ title }).flatMap((issue) => {
      let id = issue.number;
      return this._repo.newFile(`documents/${title}_${id}`, content).flatMap((file) => {
        let sha = file.content.sha;
        let url = this.getContentUrl(id);
        return DocMeta.serializeContent(content, sha, url).flatMap((metaString) => {
          let data: EditIssueParams = { title: title, body: content };
          return this._repo.issue.edit(id, data).map((doc: Document) => {
            doc.metaData.contentId = sha;
            this.model.docs.unshift(doc);
            return doc;
          });

        })
      })
    });

  }



  edit = (content: string, doc: Document) => {
    let title = DocMeta.getHeader(content);
    if (!title) throw 'must have title';

    return this._repo.updateFile(`documents/${title}_${doc.number}`, content, doc.metaData.contentId).flatMap(
      file => {
        let summary = DocMeta.getSummary(content);
        let picUrl = DocMeta.getFirstPicture(content);
        return DocMeta.serialize(title, summary, picUrl, file.content.sha, this.getContentUrl(doc.number)).flatMap(
          (metaString) => {
            let data: EditIssueParams = { title: title, body: metaString };
            return this._repo.issue.edit(doc.number, data).map(
              (a) => {
                doc.metaData.contentId = file.content.sha;
                console.log(a);
                return doc;
              }
            );
          }
        );

      }
    );
  }
  getAll() {
    return this._repoSub$.flatMap(repo => {
      return repo.issue.list('open');
    }).subscribe(
      (docs: Document[]) => {
        docs.forEach(d => {
          d.metaData = DocMeta.deSerialize(d.body);
        });
        this.model = new DocsModel(docs);
      },
      (error) => {
        console.log(error);
      });;
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
