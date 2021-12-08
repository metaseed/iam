import { UserInfo } from './user-info';
import { Requestable } from './requestable';
import { Content } from './model/content';
import { File } from './model/file';
import { HttpClient } from '@angular/common/http';
import { Issue } from './issues/issue';
import { from, Observable } from 'rxjs';
import { base64Encode, base64Decode, Logger } from 'core';
import { map, flatMap, tap, catchError, switchMap } from 'rxjs/operators';
import { Commit } from './model/commit';
import { of } from 'rxjs';

export class Repository extends Requestable {

  private logger = Logger('githubRepository');
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
      tap(x => this.logger.log('getSha' + x), e => this.logger.error('getSha' + e)),
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
      tap({ next: x => this.logger.debug('updateFile success:', x), error: e => this.logger.error('updateFile error:', e) })
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
      tap({ next: x => this.logger.debug('newFile success:', x), error: e => this.logger.error('newFile ERROR:', e) })
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
      tap({ next: x => this.logger.debug('newFileReportProgress:', x), error: e => this.logger.error('newFileReportProgress ERROR:', e) })
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
      tap(x => this.logger.log(x), e => this.logger.log(e)),
      flatMap(response => {
        return this._http.delete(`githubapi/repos/${this.fullName}/contents/${filePath}`, {
          params: {
            message: 'delete file',
            sha: response['sha'],
            branch
          }
        });
      }),
      tap({ next: x => this.logger.debug('deleteFile success:', x), error: e => this.logger.error('deleteFile ERROR:', e) }),
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
      .pipe(
        tap({ next: x => this.logger.debug('delFileViaSha success:', x), error: e => this.logger.error('delFileViaSha ERROR:', e) })
      );
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
  /**
   * https://developer.github.com/v3/repos/contents/#get-contentdm
   */
   public getSha(path: string, branch: string = 'master') {
    return this.request('GET', `/repos/${this.fullName}/contents/${path}`, {
      ref: branch
    }) as Observable< { sha: string }>;
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
  getContents(path: string, ref: string = 'master') {
    path = path ? encodeURI(path) : '';
    return this.request('GET', `/repos/${this.fullName}/contents/${path}`, { ref }).pipe(
      map(x => this.decodeContent(<Content | Array<Content>>x)),
      tap({ next: x => this.logger.debug('getContents:', x), error: e => this.logger.error('getContents ERROR:', e) })
    );
  }

  /**
   * use public api vs authenticated api,
   * we generate sha instead of query sha
   *
   * Note: the raw is updated slow. so the sha may be for an old doc.
   */
  getContentsRaw(path: string, ref = 'master') {
    const url = `https://raw.githubusercontent.com/${this.fullName}/${ref}/${path}`
    return this._http.get(url,{responseType:'text'}).pipe(
      switchMap((content: string) => {
        return this.generateSha(content).pipe(map(
          sha=>({ content, sha } as Content)
        ))
      }))
  }

  getReadme(branch: string = 'master') {
    return this.request('GET', `/repos/${this.fullName}/readme`).pipe(
      map(x => this.decodeContent(<Content | Array<Content>>x))
    );
  }


  /**
   * https://git-scm.com/book/en/v2/Git-Internals-Git-Objects
   * https://remarkablemark.medium.com/how-to-generate-a-sha-256-hash-with-javascript-d3b2696382fd
   * @param path
   */
  private generateSha(content: string) {
    function hash(str) {
      const utf8 = new TextEncoder().encode(str);
      return crypto.subtle.digest('SHA-1', utf8).then((hashBuffer) => {
        const hashArray = Array.from(new Uint8Array(hashBuffer));
        const hashHex = hashArray
          .map((bytes) => bytes.toString(16).padStart(2, '0'))
          .join('');
        return hashHex;
      });
    }
    const shaContent = `blob ${content.length}\0${content}`
    return from(hash(shaContent));
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
    this.logger.debug(`@github.move: {oldPath:${oldPath}, newPath: ${newPath}}`);

    let oldSha;
    return this.getRef(`heads/${branch}`).pipe(
      tap(obj => this.logger.debug(`@github.move: getRef of branch ${branch}->{sha: ${obj.data.object.sha}}`)),
      switchMap(({ data: { object } }): Observable<any> => this.getTree(`${object.sha}?recursive=true`)),
      tap(obj => this.logger.debug(`github.move: getTree of sha`, obj)),
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
      tap(obj => this.logger.debug(`@github.move: create new tree:`, obj)),
      switchMap(({ data: tree }): Observable<any> => this.commit(oldSha, tree.sha, `Renamed '${oldPath}' to '${newPath}'`)),
      tap(obj => this.logger.debug(`@github.move: new commit:`, obj)),
      switchMap(({ data: commit }) => this.updateHead(`heads/${branch}`, commit.sha, true)),
      tap(obj => this.logger.debug(`@github.move: updateHead`, obj))
    )
  }

  // https://stackoverflow.com/questions/16700297/using-github-api-to-retrieve-all-versions-of-a-specific-file
  // https://docs.github.com/en/rest/reference/repos#commits
  /**
 * List the commits on a repository, optionally filtering by path, author or time range
 * @see https://developer.github.com/v3/repos/commits/#list-commits-on-a-repository
 * @param {Object} [options] - the filtering options for commits
 * @param {string} [options.sha] - the SHA or branch to start from
 * @param {string} [options.path] - the path to search on
 * @param {string} [options.author] - the commit author
 * @param {(Date|string)} [options.since] - only commits after this date will be returned
 * @param {(Date|string)} [options.until] - only commits before this date will be returned
 * @return for the http request
 */
  listCommits(options: { path?: string, sha?: string, author?: string, since?: Date | string, until?: Date | string }) {
    if (options.since)
      options.since = new Date(options.since).toISOString();
    if (options.until)
      options.until = new Date(options.until).toISOString();

    return this.request('GET', `/repos/${this.fullName}/commits`, options) as Observable<Commit[]>;
  }
}
