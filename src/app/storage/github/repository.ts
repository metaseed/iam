import { Http, RequestOptions, Headers } from '@angular/http';
import { Const } from './const';
import { UserInfo } from './user-info';

export class Repository {

    public fullName: string;
    constructor(private _http: Http, private _name: string, private _userInfo: UserInfo) {
        this.fullName = `${this._userInfo.name}/${this._name}`;
    }

    newPost(path: string) {
        let headers: Headers = new Headers();
        headers.append("Authorization", "Basic " + btoa(this._userInfo.name + ":" + this._userInfo.password));
        headers.append("Content-Type", "application/x-www-form-urlencoded");

        return this._http.put(
            `${Const.baseUrl}/repos/${this.fullName}/contents/${path}`,
            {
                "message": "create post",
                "committer": {
                    "name": this._userInfo.name,
                    "email": this._userInfo.email
                },
                "content": btoa('')
            },
            new RequestOptions({
                headers: headers
            })
        )
            .do(x => console.log(x), e => console.log(e));
    }

    //https://developer.github.com/v3/repos/contents/
    post(path: string, contents: string, branch: string = 'master') {
        return this.getSha(path, branch)
            .do(x => console.log(x), e => console.log(e))
            .flatMap(resp => {
                let headers: Headers = new Headers();
                headers.append("Authorization", "Basic " + btoa(this._userInfo.name + ":" + this._userInfo.password));
                headers.append("Content-Type", "application/x-www-form-urlencoded");

                return this._http.put(
                    `${Const.baseUrl}/repos/${this.fullName}/contents/${path}`,
                    {
                        "message": "update post",
                        "committer": {
                            "name": this._userInfo.name,
                            "email": this._userInfo.email
                        },
                        "content": btoa(contents),
                        "sha": resp.json().sha,
                        branch
                    },
                    new RequestOptions({
                        headers: headers
                    })
                )
                    .do(x => console.log(x), e => console.log(e));

            })
            .catch(error => {
                let err = error.json();
                return this.newPost(path);
            });
    }

    /**
     * https://developer.github.com/v3/repos/contents/#delete-a-file
     * @param path 
     * @param branch 
     */
    delPost(path: string, branch: string = 'master') {
        return this.getSha(path, branch)
            .do(x => console.log(x), e => console.log(e))
            .flatMap(response => {
                let headers: Headers = new Headers();
                headers.append("Authorization", "Basic " + btoa(this._userInfo.name + ":" + this._userInfo.password));
                headers.append("Content-Type", "application/x-www-form-urlencoded");

                return this._http.delete(
                    `${Const.baseUrl}/repos/${this.fullName}/contents/${path}`,
                    new RequestOptions({
                        headers: headers,
                        body: {
                            "message": "delete post",
                            "committer": {
                                "name": this._userInfo.name,
                                "email": this._userInfo.email
                            },
                            "content": btoa('delete post'),
                            "sha": response.json().sha,
                            branch
                        }
                    })
                )
                    .do(x => console.log(x), e => console.log(e));
            });
    }
    /**
     * https://developer.github.com/v3/repos/contents/#get-contentdm
     * @param path 
     * @param branch 
     */
    private getSha(path: string, branch: string = '') {
        branch = branch ? `?ref=${branch}` : '';
        return this._http.get(`${Const.baseUrl}/repos/${this.fullName}/contents/${path}${branch}`);
    }
}