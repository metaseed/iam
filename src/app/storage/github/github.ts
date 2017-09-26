import { IStorage } from '../storage';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/do';
import 'rxjs/add/observable/throw';
import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers } from '@angular/http';
import { Const } from './const';
import { UserInfo } from './user-info';
import { Repository } from './repository';

@Injectable()
export class GithubStorage {

    constructor(private _http: Http, private _userInfo: UserInfo) {
    }

    getRepos(name: string) {
        return this._http.get(`${Const.baseUrl}/repos/${this._userInfo.name}/${name}`)
            .map(resp => {
                return new Repository(this._http, name, this._userInfo);
            })
            .catch(error => {
                return Observable.throw(
                    {
                        id: error.status,
                        message: `no such repository: ${name}, message:${error.json().message}`
                    }
                );
            });
    }

    newRepos(name: string) {
        let headers: Headers = new Headers();
        headers.append("Authorization", "Basic " + btoa(this._userInfo.name + ":" + this._userInfo.password));
        headers.append("Content-Type", "application/x-www-form-urlencoded");
        return this._http.post(
            Const.baseUrl + '/user/repos',
            {
                "name": name,
                "description": "This is your first repository",
                "homepage": "https://github.com",
                "private": false,
                "auto_init": true,
                "has_issues": true,
                "has_projects": true,
                "has_wiki": true
            },
            {
                headers: headers
            }
        ).map(value => {
            return new Repository(this._http, name, this._userInfo);
        });
    }

    repos(name: string) {
        return this.getRepos(name).catch((err) => {
            if (err.id === 404) {
                return this.newRepos(name);
            }
            else {
                return Observable.throw(err);
            }
        })
    }

}
