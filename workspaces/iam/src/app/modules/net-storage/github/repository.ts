import { Const } from './model/const';
import { UserInfo } from './user-info';
import { Requestable } from './requestable';
import { Injectable } from '@angular/core';
import { Content } from './model/content';
import { File } from './model/file';
import { HttpClient } from '@angular/common/http';
import { Issue } from './issues/issue';
import { from, Observable } from 'rxjs';
import { base64Encode, base64Decode } from 'core';
import { map, flatMap, tap, catchError, observeOn } from 'rxjs/operators';
// @Injectable()
export class Repository extends Requestable {
  // remoteRepo: any;
  public fullName: string;

  constructor(http: HttpClient, userInfo: UserInfo, private _name: string) {
    super(http, userInfo);
    this.fullName = `${this._userInfo.name}/${this._name}`;
    // this.remoteRepo = githubApi.getRepo(userInfo.name, _name);
  }

  get issue() {
    return new Issue(this._http, this._name, this._userInfo);
  }

  // https://developer.github.com/v3/repos/contents/
  file(path: string, contents: string, branch: string = 'master') {
    let getShaSuccess = false;
    return this.getSha(path, branch).pipe(
      tap(x => console.log('getSha' + x), e => console.error('getSha' + e)),
      flatMap(resp => {
        getShaSuccess = true;
        return this.updateFile(path, contents, resp['sha']);
      }),
      catchError((error, ca) => {
        if (getShaSuccess) {
          throw error;
        }
        const err = error;
        return this.newFile(path, contents);
      })
    );
  }
  // https://developer.github.com/v3/repos/contents/#update-a-file
  updateFile(path, contents, sha, branch = 'master') {
    return this.request('PUT', `/repos/${this.fullName}/contents/${path}`, {
      path: 'pp',
      message: 'update file',
      committer: {
        name: this._userInfo.name,
        email: this._userInfo.email
      },
      content: base64Encode(contents),
      sha: sha,
      branch
    }).pipe(
      tap(x => console.log(x), e => console.log(e))
    );
  }

  // https://developer.github.com/v3/repos/contents/#create-a-file
  newFile(path: string, content: string, isBase64 = false) {
    return this.request('PUT', `/repos/${this.fullName}/contents/${path}`, {
      message: 'create file',
      committer: {
        name: this._userInfo.name,
        email: this._userInfo.email
      },
      content: isBase64 ? content : base64Encode(content)
    }, undefined).pipe(
      tap(x => console.log('newFile', x), e => console.log('newFile', e))
    );
  }

  newFileReportProgress(path: string, content: string, isBase64 = false) {
    return this.requestWithProgress('PUT', `/repos/${this.fullName}/contents/${path}`, {
      message: 'create file',
      committer: {
        name: this._userInfo.name,
        email: this._userInfo.email
      },
      content: isBase64 ? content : base64Encode(content)
    }, undefined).pipe(
      tap(x => console.log('newFile', x), e => console.log('newFile', e))
    );
  }

  /**
   * https://developer.github.com/v3/repos/contents/#delete-a-file
   * @param path
   * @param branch
   */
  delFile(path: string, branch: string = 'master') {
    const filePath = path ? encodeURI(path) : '';
    return this.getSha(path, branch).pipe(
      tap(x => console.log(x), e => console.log(e)),
      flatMap(response => {
        return this._http.delete(`githubapi/repos/${this.fullName}/contents/${filePath}`, {
          params: {
            message: 'delete file',
            sha: response['sha'],
            branch
          }
        });
      }),
      tap(x => console.log(x), e => console.log(e)),
      map(x => <File>x)
    );
  }

  delFileViaSha(path: string, sha: string, branch: string = 'master') {
    const filePath = path ? encodeURI(path) : '';
    return this._http
      .delete<File>(`githubapi/repos/${this.fullName}/contents/${filePath}`, {
        params: {
          message: 'delete file',
          sha: sha,
          branch
        }
      })
      .pipe(tap(x => console.log(x), e => console.log(e)));
  }

  searchIssue(query: string) {
    return this._http.get(`githubapi/search/issues`, {
      headers: { Accept: 'application/vnd.github.v3.text-match+json' },
      params: {
        q: `${query.replace(' ', '+')}+state:open+repo:${this.fullName}`
      },
      observe: 'response'
    });
  }

  searchCode(query: string, folder = 'documents', extension = 'md') {
    return this._http.get(`githubapi/search/code`, {
      headers: { Accept: 'application/vnd.github.v3.text-match+json' },
      params: {
        q: `${query.replace(' ', '+')}+in:file+extension:${extension}+path:${folder}+repo:${
          this.fullName
          }`
      },
      observe: 'response'
    });
  }

  private decodeContent(content: Content | Array<Content>) {
    if (Array.isArray(content)) {
      content.forEach((con: Content) => {
        if (con.content) con.content = base64Decode(con.content);
      });
    } else {
      if (content.content) content.content = base64Decode(content.content);
    }
    return content;
  }

  // https://developer.github.com/v3/repos/contents/#get-contents
  getContents(path: string, branch: string = 'master') {
    path = path ? encodeURI(path) : '';
    return this.request('GET', `/repos/${this.fullName}/contents/${path}`).pipe(
      map(x => this.decodeContent(<Content | Array<Content>>x))
    );
  }

  getReadme(branch: string = 'master') {
    return this.request('GET', `/repos/${this.fullName}/readme`).pipe(
      map(x => this.decodeContent(<Content | Array<Content>>x))
    );
  }

  /**
   * https://developer.github.com/v3/repos/contents/#get-contentdm
   */
  private getSha(path: string, branch: string = '') {
    branch = branch ? `?ref=${branch}` : '';
    return this.request('GET', `/repos/${this.fullName}/contents/${path}${branch}`, {
      ref: branch
    });
  }
}
