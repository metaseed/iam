import { ICache, DataTables } from 'core';
import { Observable, throwError } from 'rxjs';
import { Injectable } from '@angular/core';
import { GithubStorage } from './github';
import { switchMap } from 'rxjs/operators';
import { Document } from 'core';

@Injectable()
export class GithubCache  {
  constructor(private githubStorage: GithubStorage) {}

  init(nextLevelCache: ICache): void {}

  // readDocMetaByPage(pageIndex: number, pageSize: number): Observable<Document> {
    // return this.githubStorage.init().pipe(
    //   switchMap(repo => {
    //     return repo.issue.list('open', pageIndex + 1, pageSize);
    //   })
    // );
  // }
}
