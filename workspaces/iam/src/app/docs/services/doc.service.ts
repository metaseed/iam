import { Injectable, EventEmitter } from '@angular/core';
import { Document } from "../models/document";
import { Observable } from "rxjs/Observable";
import { HttpClient } from "@angular/common/http";
import { GithubStorage, UserInfo, EditIssueParams } from '../../storage/github/index';
import { Repository } from '../../storage/github/repository';
import { DocsModel } from '../models/docs.model';

@Injectable()
export class DocService {
  public docAdd$ = new EventEmitter();
  public docRemove$ = new EventEmitter();
  public docModify$ = new EventEmitter();
  public model: DocsModel;
  private docShow$ = new EventEmitter();
  private _repo;
  private _repoSub$;
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
  edit = (data: EditIssueParams) => {
    let doc = this.model.currentDoc;
    if (!doc || !doc.number) {
      this._repo.issue.create(data).subscribe(a => {
        this.model.currentDoc = a;
        this.model.docs.unshift(a);
        console.log(a)
      });
      return;
    }
    this._repo.issue.edit(doc.number, data).subscribe(
      (a) => console.log(a)
    );
  }
  private _storage = new GithubStorage(this._http, new UserInfo('metasong', 'metaseed@gmail.com', 'mssong179'));
  getAll() {
    return this._repoSub$.flatMap(repo => {
      return repo.issue.list('open');
    }).subscribe(
      (docs: Document[]) => {
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
