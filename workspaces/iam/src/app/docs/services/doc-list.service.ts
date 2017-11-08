import { Injectable } from '@angular/core';
import { Document } from "../models/document";
import { Observable } from "rxjs/Observable";
import { HttpClient } from "@angular/common/http";
import { GithubStorage, UserInfo } from '../../storage/github/index';
import { Repository } from '../../storage/github/repository';

@Injectable()
export class DocListService {

  private static baseUrl = '/api';

  constructor(private _http: HttpClient) { }

  // store(todo: Document) {
  //   console.log('Storing' + todo);
  //   return this.http.post(TodoListService.baseUrl + '/todos', todo)
  //     .map(resp => resp.json())
  //     .catch(res => {
  //       console.error(res.toString());
  //       return Observable.throw(res.message || 'Server error')
  //     });
  // }

  getAll() {

    let storage = new GithubStorage(this._http, new UserInfo('metasong', 'metaseed@gmail.com', 'mssong179'));
    return storage.repos('test2').flatMap(
      (repo: Repository) => {
        // console.log(repo);
        // repo.file('test010a8322.md', 'aafabaa7777778744o7acaaaaaa' + Date.now()).subscribe((file) => {
        //   // repo.delPost('test00').subscribe();
        //   const f = file;
        //   console.log(f);
        // });
        // repo.issue.create({
        //   title: 'title',
        //   body: 'body',
        //   labels: ['a', 'b']
        // }).subscribe((is) => {
        //   console.log(is);
        // });
        return repo.issue.list();
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
