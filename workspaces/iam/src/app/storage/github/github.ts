import { IStorage } from '../storage';
import { Observable, combineLatest } from 'rxjs';
import { catchError, map, mergeMap, tap,shareReplay } from 'rxjs/operators';
import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Const } from './model/const';
import { UserInfo } from './user-info';
import { Repository } from './repository';
import { Requestable } from './requestable';
import * as GitHub from 'github-api';
import { GITHUB_AUTHENTICATION } from './tokens';
import { ConfigService } from 'core';

@Injectable()
export class GithubStorage extends Requestable {
  gh: GitHub;
  private _repo: Observable<Repository>;
  constructor(http: HttpClient, @Inject(GITHUB_AUTHENTICATION)userInfo: UserInfo) {
    super(http, userInfo);
    this.gh = new GitHub({
      username: userInfo.name,
      password: userInfo.password
      /* also acceptable:
               token: 'MY_OAUTH_TOKEN'
             */
    });
  }

  repo(name = 'iam-data'): Observable<Repository> {
    if(this._repo) return this._repo;
    return this._repo = this.getRepos(name).pipe(
      shareReplay(1),
      catchError(err => {
        if (err.id === 404) {
          return this.newRepos(name);
        } else {
          return Observable.throw(err);
        }
      })
    );
  }

  getRepos(name: string): Observable<Repository> {
    return this.request('GET', `/repos/${this._userInfo.name}/${name}`, null).pipe(
      map(resp => {
        return new Repository(this._http, this._userInfo, name, this.gh);
      }),
      catchError(error => {
        return Observable.throw({
          id: error.status,
          message: `get repository error: ${name}, message:${error.message}`
        });
      })
    );
  }

  newRepos(name: string) {
    return this.request('POST', '/user/repos', {
      name: name,
      description: 'This is your first repository',
      homepage: 'https://github.com',
      private: false,
      auto_init: true,
      has_issues: true,
      has_projects: true,
      has_wiki: true
    }).pipe(
      map(value => {
        return new Repository(this._http, this._userInfo, name, this.gh);
      })
    );
  }
}
