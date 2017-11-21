import { IStorage } from '../storage';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/do';
import 'rxjs/add/observable/throw';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Const } from './model/const';
import { UserInfo } from './user-info';
import { Repository } from './repository';
import { Requestable } from './requestable';
@Injectable()
export class GithubStorage extends Requestable {

    constructor(http: HttpClient, userInfo: UserInfo) {
        super(http, userInfo);
    }

    repos(name: string): Observable<Repository> {
        return this.getRepos(name)
            .catch((err) => {
                if (err.id === 404) {
                    return this.newRepos(name);
                } else {
                    return Observable.throw(err);
                }
            });
    }

    getRepos(name: string): Observable<Repository> {
        return this.request('GET', `/repos/${this._userInfo.name}/${name}`, null)
            .map(resp => {
                return new Repository(this._http, this._userInfo, name);
            })
            .catch(error => {
                return Observable.throw(
                    {
                        id: error.status,
                        message: `get repository error: ${name}, message:${error.message}`
                    }
                );
            });
    }

    newRepos(name: string) {
        return this.request('POST',
            '/user/repos',
            {
                'name': name,
                'description': 'This is your first repository',
                'homepage': 'https://github.com',
                'private': false,
                'auto_init': true,
                'has_issues': true,
                'has_projects': true,
                'has_wiki': true
            }
        ).map(value => {
            return new Repository(this._http, this._userInfo, name);
        });
    }

}
