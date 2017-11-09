import { Injectable, EventEmitter } from '@angular/core';
import { Document } from "../models/document";
import { Observable } from "rxjs/Observable";
import { HttpClient } from "@angular/common/http";
import { GithubStorage, UserInfo, EditIssueParams } from '../../storage/github/index';
import { Repository } from '../../storage/github/repository';

@Injectable()
export class DocService {
  public docAdd$ = new EventEmitter();
  public docRemove$ = new EventEmitter();
  public docModify$ = new EventEmitter();

  private docShow$ = new EventEmitter();
  private _doc;
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

  showDoc(doc) {
    this._doc = doc;
    this.docShow$.next(doc);
  }
  onShowDoc(fun) {
    this.docShow$.subscribe(fun);
  }
  edit = (data: EditIssueParams) => {
    this._doc && (this._repo.issue.edit(this._doc.number, data).subscribe(
      (a) => console.log(a)
    ));
  }
  private _storage = new GithubStorage(this._http, new UserInfo('metasong', 'metaseed@gmail.com', 'mssong179'));
  getAll() {
    return this._repoSub$.flatMap(repo => {
      return this._repo.issue.list();
    });
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
