import { Http, RequestOptions, Headers, RequestMethod } from '@angular/http';
import { Const } from './const';
import { UserInfo } from './user-info';
import { Requestable } from './requestable';

export class Repository extends Requestable {
    public fullName: string;

    constructor(http: Http, userInfo: UserInfo, private _name: string) {
        super(http, userInfo);
        this.fullName = `${this._userInfo.name}/${this._name}`;
    }

    // https://developer.github.com/v3/repos/contents/
    file(path: string, contents: string, branch: string = 'master') {
        return this.getSha(path, branch)
            .do(x => console.log(x), e => console.log(e))
            .flatMap(resp => {
                return this.request(RequestMethod.Put,
                    `/repos/${this.fullName}/contents/${path}`,
                    {
                        'message': 'update file',
                        'committer': {
                            'name': this._userInfo.name,
                            'email': this._userInfo.email
                        },
                        'content': btoa(contents),
                        'sha': resp.json().sha,
                        branch
                    })
                    .do(x => console.log(x), e => console.log(e));
            })
            .catch(error => {
                const err = error.json();
                return this.newFile(path, contents);
            });
    }

    newFile(path: string, content: string) {
        return this.request(RequestMethod.Put, `/repos/${this.fullName}/contents/${path}`,
            {
                'message': 'create file',
                'committer': {
                    'name': this._userInfo.name,
                    'email': this._userInfo.email
                },
                'content': btoa(content)
            })
            .do(x => console.log(x), e => console.log(e));
    }

    /**
     * https://developer.github.com/v3/repos/contents/#delete-a-file
     * @param path
     * @param branch
     */
    delFile(path: string, branch: string = 'master') {
        return this.getSha(path, branch)
            .do(x => console.log(x), e => console.log(e))
            .flatMap(response => {
                return this.request(RequestMethod.Delete,
                    `/repos/${this.fullName}/contents/${path}`,
                    {
                        'message': 'delete file',
                        'committer': {
                            'name': this._userInfo.name,
                            'email': this._userInfo.email
                        },
                        'content': btoa('delete file'),
                        'sha': response.json().sha,
                        branch
                    });
            })
            .do(x => console.log(x), e => console.log(e));
    }
    /**
     * https://developer.github.com/v3/repos/contents/#get-contentdm
     * @param path
     * @param branch
     */
    private getSha(path: string, branch: string = '') {
        branch = branch ? `?ref=${branch}` : '';
        return this.request(RequestMethod.Get, `/repos/${this.fullName}/contents/${path}${branch}`);
    }
}
