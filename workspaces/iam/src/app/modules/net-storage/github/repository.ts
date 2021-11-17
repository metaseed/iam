import { UserInfo } from './user-info';
import { Requestable } from './requestable';
import { Content } from './model/content';
import { File } from './model/file';
import { HttpClient } from '@angular/common/http';
import { Issue } from './issues/issue';
import { Observable } from 'rxjs';
import { base64Encode, base64Decode } from 'core';
import { map, flatMap, tap, catchError, switchMap } from 'rxjs/operators';
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
  file(path: string, contents: string, message: string, branch: string = 'master') {
    let getShaSuccess = false;
    return this.getSha(path, branch).pipe(
      tap(x => console.log('getSha' + x), e => console.error('getSha' + e)),
      flatMap(resp => {
        getShaSuccess = true;
        return this.updateFile(path, contents, resp['sha'], message);
      }),
      catchError((error, ca) => {
        if (getShaSuccess) {
          throw error;
        }
        const err = error;
        return this.newFile(path, contents, message);
      })
    );
  }
  // https://docs.github.com/en/rest/reference/repos#create-or-update-file-contents
  updateFile(path, contents, sha, message: string, branch = 'master') {
    return this.request('PUT', `/repos/${this.fullName}/contents/${path}`, {
      message,
      committer: {
        name: this._userInfo.name,
        email: this._userInfo.email
      },
      content: base64Encode(contents),
      sha,
      branch
    }).pipe(
      tap({ next: x => console.log(x), error: e => console.log(e) })
    ) as Observable<File>;
  }

  // https://docs.github.com/en/rest/reference/repos#create-or-update-file-contents
  newFile(path: string, content: string, message: string) {
    return this.request('PUT', `/repos/${this.fullName}/contents/${path}`, {
      message,
      committer: {
        name: this._userInfo.name,
        email: this._userInfo.email
      },
      content: base64Encode(content)
    }, undefined).pipe(
      tap(x => console.log('newFile', x), e => console.log('newFile', e))
    ) as Observable<File>;
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
      .pipe(tap({ next: x => console.log(x), error: e => console.log(e) }));
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
        q: `${query.replace(' ', '+')}+in:file+extension:${extension}+path:${folder}+repo:${this.fullName
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

  /**
 * Get a reference
 * @see https://developer.github.com/v3/git/refs/#get-a-reference
 * @param {string} ref - the reference to get
 */
  private getRef(ref): Observable<any> {
    return this.request('GET', `/repos/${this.fullName}/git/refs/${ref}`);
  }
  /**
 * Get a description of a git tree
 * @see https://developer.github.com/v3/git/trees/#get-a-tree
 * @param {string} treeSHA - the SHA of the tree to fetch
 */
  private getTree(treeSHA) {
    return this.request('GET', `/repos/${this.fullName}/git/trees/${treeSHA}`);
  }
  /**
 * Create a new tree in git
 * @see https://developer.github.com/v3/git/trees/#create-a-tree
 * @param {Object} tree - the tree to create
 * @param {string} baseSHA - the root sha of the tree
 */
  private createTree(tree, baseSHA?) {
    return this.request('POST', `/repos/${this.fullName}/git/trees`, {
      tree,
      base_tree: baseSHA, // eslint-disable-line camelcase
    });
  }

  /**
 * Add a commit to the repository
 * @see https://developer.github.com/v3/git/commits/#create-a-commit
 * @param {string} parent - the SHA of the parent commit
 * @param {string} tree - the SHA of the tree for this commit
 * @param {string} message - the commit message
 * @param {Object} [options] - commit options
 * @param {Object} [options.author] - the author of the commit
 * @param {Object} [options.commiter] - the committer
 */
  private commit(parent, tree, message, options?) {
    if (typeof options === 'function') {
      options = {};
    }

    let data = {
      message,
      tree,
      parents: [parent],
    };

    data = Object.assign({}, options, data);

    return this.request('POST', `/repos/${this.fullName}/git/commits`, data)
  }

  /**
 * Update a ref
 * @see https://developer.github.com/v3/git/refs/#update-a-reference
 * @param {string} ref - the ref to update
 * @param {string} commitSHA - the SHA to point the reference to
 * @param {boolean} force - indicates whether to force or ensure a fast-forward update
 */
  private updateHead(ref, commitSHA, force) {
    return this.request('PATCH', `/repos/${this.fullName}/git/refs/${ref}`, {
      sha: commitSHA,
      force: force,
    });
  }
  /**
   * Change all references in a repo from oldPath to new_path
   * @param {string} branch - the branch to carry out the reference change, or the default branch if not specified
   * @param {string} oldPath - original path
   * @param {string} newPath - new reference path
   */
  private move(oldPath: string, newPath: string, branch = 'master') {
    console.debug(`@github.move: {oldPath:${oldPath}, newPath: ${newPath}}`);

    let oldSha;
    return this.getRef(`heads/${branch}`).pipe(
      tap(obj => console.debug(`@github.move: getRef of branch ${branch}->{sha: ${obj.data.object.sha}}`)),
      switchMap(({ data: { object } }): Observable<any> => this.getTree(`${object.sha}?recursive=true`)),
      tap(obj => console.debug(`github.move: getTree of sha`, obj)),
      switchMap(({ data: { tree, sha } }): Observable<any> => {
        oldSha = sha;
        let newTree = tree.map(ref => {
          if (ref.path === oldPath) {
            ref.path = newPath;
          }
          if (ref.type === 'tree') {
            delete ref.sha;
          }
          return ref;
        });
        return this.createTree(newTree);
      }),
      tap(obj => console.debug(`@github.move: create new tree:`, obj)),
      switchMap(({ data: tree }): Observable<any> => this.commit(oldSha, tree.sha, `Renamed '${oldPath}' to '${newPath}'`)),
      tap(obj => console.debug(`@github.move: new commit:`, obj)),
      switchMap(({ data: commit }) => this.updateHead(`heads/${branch}`, commit.sha, true)),
      tap(obj => console.debug(`@github.move: updateHead`, obj))
    )
  }
}
