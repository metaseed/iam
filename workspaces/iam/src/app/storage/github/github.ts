import { IStorage } from '../storage';
import { Observable, combineLatest, Subscriber, ReplaySubject } from 'rxjs';
import {
  catchError,
  map,
  mergeMap,
  tap,
  shareReplay,
  withLatestFrom,
  switchMap
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
      (_ => {
        const me = this;
        let replayObservable
        let hasError = false;
        return function(this: Subscriber<Repository>, source: Observable<ConfigModel>) {
          if (!replayObservable) {
            replayObservable = new ReplaySubject(1);
            source.pipe(switchMap(config => {
              let user = config.storage.github.userName;
              let name = config.storage.github.dataRepoName;
              return me.getRepos(user, name).pipe(
                catchError(err => {
                  if (err.id === 404) {
                    return me.newRepos(name);
                  } else {
                    return Observable.throw(err);
                  }
                })
              );
            })).subscribe(o=>replayObservable.next(o));
          }
          return replayObservable.subscribe(this);
        };
      })()
    ));
  }

  private getRepos(user: string, name: string): Observable<Repository> {
    return this.request('GET', `/repos/${user}/${name}`, null).pipe(
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
