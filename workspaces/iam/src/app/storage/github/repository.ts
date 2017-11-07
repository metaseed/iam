import { Http, RequestOptions, Headers, RequestMethod } from '@angular/http';
import { Const } from './model/const';
import { UserInfo } from './user-info';
import { Requestable } from './requestable';
import { Injectable } from '@angular/core';
import { Content } from './model/content';
import { File } from './model/file';

@Injectable()
export class Repository extends Requestable {
    public fullName: string;

    constructor(http: Http, userInfo: UserInfo, private _name: string) {
        super(http, userInfo);
        this.fullName = `${this._userInfo.name}/${this._name}`;
    }

    // https://developer.github.com/v3/repos/contents/
    file(path: string, contents: string, branch: string = 'master') {
        let getShaSuccess = false;
        return this.getSha(path, branch)
            .do(x => console.log('getSha' + x), e => console.log('getSha' + e))
            .flatMap(resp => {
                getShaSuccess = true;
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
                    .do(x => console.log(x), e => console.log(e))
                    .map(x => {
                        return <File>x.json();
                    });
            })
            .catch((error, ca) => {
                if (getShaSuccess) {
                    throw error;
                }
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
            .do(x => console.log('newFile' + x), e => console.log('newFile' + e))
            .map(x => {
                console.log(x);
                return <File>x.json();
            });
    }

    /**
     * https://developer.github.com/v3/repos/contents/#delete-a-file
     * @param path
     * @param branch
     */
    delFile(path: string, branch: string = 'master') {
        const filePath = path ? encodeURI(path) : '';
        return this.getSha(path, branch)
            .do(x => console.log(x), e => console.log(e))
            .flatMap(response => {
                return this.request(RequestMethod.Delete,
                    `/repos/${this.fullName}/contents/${filePath}`,
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
            .do(x => console.log(x), e => console.log(e))
            .map(x => <File>x.json());
    }

    // https://developer.github.com/v3/repos/contents/#get-contents
    getContents(path: string, branch: string = 'master') {
        path = path ? encodeURI(path) : '';
        return this.request(RequestMethod.Get, `/repos/${this.fullName}/contents/${path}`)
            .map(x => <Content | Array<Content>>x.json());
    }

    getReadme(branch: string = 'master') {
        return this.request(RequestMethod.Get, `/repos/${this.fullName}/readme`)
            .map(x => <Content | Array<Content>>x.json());
    }

    /**
     * https://developer.github.com/v3/repos/contents/#get-contentdm
     */
    private getSha(path: string, branch: string = '') {
        branch = branch ? `?ref=${branch}` : '';
        return this.request(RequestMethod.Get, `/repos/${this.fullName}/contents/${path}${branch}`, {
            ref: branch
        });
    }

}
