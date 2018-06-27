import { IStorage } from '../storage';
import { Observable, combineLatest, Subscriber, ReplaySubject, throwError } from 'rxjs';
import {
  catchError,
  map,
  mergeMap,
  tap,
  shareReplay,
  withLatestFrom,
  switchMap,
  take
} from 'rxjs/operators';
import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Const } from './model/const';
import { UserInfo } from './user-info';
import { Repository } from './repository';
import { Requestable } from './requestable';
import * as GitHub from 'github-api';
import { GITHUB_AUTHENTICATION } from './tokens';
import { ConfigService, ConfigModel } from 'core';

@Injectable()
export class GithubStorage extends Requestable {
  gh: GitHub;
  private _repo: Observable<Repository>;
  constructor(
    http: HttpClient,
    @Inject(GITHUB_AUTHENTICATION) userInfo: UserInfo,
    private configService: ConfigService
  ) {
    super(http, userInfo);
    this.gh = new GitHub({
      username: userInfo.name,
      password: userInfo.password
      /* also acceptable:
               token: 'MY_OAUTH_TOKEN'
             */
    });
  }

  init(): Observable<Repository> {
    if (this._repo) return this._repo;

    return (this._repo = this.configService.config$.lift(
      (_ => { //IIFE
        const me = this;
        let replayObservable: ReplaySubject<Repository>;
        let hasError = false;
        return function(this: Subscriber<Repository>, source: Observable<ConfigModel>) { // called every time when subscribe
          if (!replayObservable) {
            replayObservable = new ReplaySubject(1);
            source.pipe(switchMap(config => {
              let user = config.storage.github.userName;
              let name = config.storage.github.dataRepoName;
              return me.getRepos(user, name).pipe(
                catchError(err => {
                  if (err.status === 404) {
                    return me.newRepos(name);
                  } else {
                    return throwError(err);
                  }
                })
              );
            })).subscribe(o=>replayObservable.next(o));
          }
          return replayObservable.subscribe(this);
        };
      })()
    ).pipe(take<Repository>(1)));
  }

  private getRepos(user: string, name: string): Observable<Repository> {
    return this.request('GET', `/repos/${user}/${name}`, null).pipe(
      map(resp => {
        return new Repository(this._http, this._userInfo, name, this.gh);
      }),
      catchError(error => {
        return throwError({
          id: error.status,
          message: `get repository error: ${name}, message:${error.message}`
        });
      })
    );
  }

  private newRepos(name: string) {
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
