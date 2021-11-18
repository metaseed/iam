import { ICache, DocMeta, DocContent, DocFormat, SearchResult, SearchResultSource } from 'core';
import { Observable, throwError, concat, asyncScheduler, of, merge, BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';
import { GithubStorage } from '../net-storage/github/github';
import { switchMap, map, startWith, tap, catchError, take } from 'rxjs/operators';
import { Document } from 'core';
import { Issue, EditIssueParams } from '../net-storage/github/issues/issue';
import { Repository } from '../net-storage/github/repository';
import { Content } from 'net-storage';
import { DOCUMENTS_FOLDER_NAME } from '../home/const';
import { gitHubCacheUtil } from './github-cache.util';

const GITHUB_PAGE_SIZE = 50;
const FIRST_PAGE_READY_TO_REFRESH = 5 * 60 * 1000;

@Injectable({ providedIn: 'platform' })
export class GithubCache implements ICache {
  // used to calculate the which page the key is in.
  private highestId: number;

  constructor(private githubStorage: GithubStorage, private util: gitHubCacheUtil) {
    // refresh the first page every
    asyncScheduler.schedule(_ => (this.highestId = undefined), FIRST_PAGE_READY_TO_REFRESH);
  }

  nextLevelCache: ICache;

  private _setIdRangeLow?: (id: number) => void;
  private _setIdRangeHigh?: (id: number) => void;

  private _issueToDocMeta = (issue: Issue) => {
    let meta: DocMeta;
    meta = DocMeta.deSerialize(issue.body);
    if (!meta) meta = {} as DocMeta;
    meta.id = meta.id || issue.number;
    // meta.tags = issue.labels;
    meta.updateDate = meta.updateDate || new Date(issue.updated_at);
    meta.createDate = meta.createDate || new Date(issue.created_at);
    meta.format = meta.format || 'md';
    meta.isDeleted = !!issue.closed_at;
    meta._context = issue;
    return meta;
  };

  init(
    nextLevelCache: ICache,
    setIdRangeLow?: (id: number) => void,
    setIdRangeHigh?: (id: number) => void
  ) {
    this.nextLevelCache = nextLevelCache;
    this._setIdRangeLow = setIdRangeLow;
    this._setIdRangeHigh = setIdRangeHigh;
    return this;
  }
  private commitMessage(title: string, version: string, change?: string) {
    let msg = `${title}, ver: ${version}`;
    if (change) msg += `, change: ${change}`;
    return msg;
  }

  CreateDocument(content: string, format: DocFormat) {
    const title = DocMeta.getTitle(content);
    // create docMeta to get an id;
    return this.githubStorage.init().pipe(
      switchMap(repo =>
        repo.issue.create({ title }).pipe(
          switchMap(issue => {
            const id = issue.number;
            // save docContent;
            const commitMsg = this.commitMessage(title, '1.0.0', 'create document')
            return repo.newFile(`${DOCUMENTS_FOLDER_NAME}/${id}.${format}`, content, commitMsg).pipe(
              switchMap(file => {
                const url = this.util.getContentUrl(id, title, format);

                const { meta, metaStr } = DocMeta.serializeContent(
                  id,
                  content,
                  url,
                  format,
                  new Date(issue.created_at),
                  new Date(issue.updated_at),
                  undefined
                );
                const data: EditIssueParams = {
                  title: title,
                  body: metaStr
                };
                // save docMeta to update sha;
                return repo.issue.edit(id, data).pipe(
                  map(() => {
                    const docContent = new DocContent(id, content, file.content.sha);
                    const doc = new Document(meta, docContent);
                    return doc;
                  })
                );
              })
            );
          })
        )
      )
    );
  }

  /// (...,id] (id,...]
  /// this method have a assumption: the webapi's response gives a array that with id sorted by des.(sort by doc created time)
  /// but we want to get a list sorted by updating time, whose id is not sorted by des. so we need to create another function.
  /// todo: retire this function.
  readBulkDocMeta(id: number, isBulkBelowTheId: boolean): Observable<DocMeta[]> {
    if (id === undefined || id === Number.MAX_VALUE) {
      this.highestId = undefined; // to get the 1st page to know the hightestId.
    }
    let page: number;
    let keyNearPageFloor: boolean;

    const getMetaDataList = (
      page,
      isBelowTheKey,
      isNearPageFloor = undefined /*undefined: only this page*/
    ) => {
      const mapIssueToMeta = (issues: Issue[]) => {
        if (issues.length > 0 && page === 1) {
          this.highestId = issues[0].number;
        }
        return issues.map(this._issueToDocMeta)
      };

      const getPageData = page =>
        this.githubStorage.init().pipe(
          switchMap(repo => {
            return repo.issue.list('all', page, GITHUB_PAGE_SIZE);
          }),
          map(mapIssueToMeta)
        );

      const d = getPageData(page);
      if (isNearPageFloor === undefined) {
        return d;
      }
      if (isBelowTheKey && !isNearPageFloor) {
        return concat(d, getPageData(page + 1));
      }
      if (!isBelowTheKey && isNearPageFloor) {
        return concat(getPageData(page - 1), d);
      }
      return d;
    };

    const getPageNum = (id, highestId) => Math.ceil((highestId - id + 1) / GITHUB_PAGE_SIZE);
    // page index start from 1, issue.num start from 1 too.

    const isNearPageFloor = (id, highestId) => ((highestId - id + 1) / GITHUB_PAGE_SIZE) % 1 < 0.5;

    const isLastPage = (page, highestId) => page === Math.ceil(highestId / GITHUB_PAGE_SIZE);
    const isFirstPage = page => page === 1;

    const getHighestId = () => {
      if (!this.highestId) {
        return getMetaDataList(1, isBulkBelowTheId).pipe(
          map(a => ({ highestId: this.highestId /*updated in getMetaDataList*/, metaArray: a }))
        );
      }
      return of({ highestId: this.highestId, metaArray: null as DocMeta[] });
    };

    return getHighestId().pipe(
      switchMap(({ highestId, metaArray }) => {
        if (id === undefined || id === Number.MAX_VALUE) id = this.highestId;
        page = getPageNum(id, highestId);
        keyNearPageFloor = isNearPageFloor(id, highestId);
        const isInFirstPage = isFirstPage(page);
        const isInLastPage = isLastPage(page, highestId);

        const directlyReturnMetaArray = (metaArray: DocMeta[]) => {
          if (metaArray.length) {
            this._setIdRangeHigh(metaArray[0].id);
            this._setIdRangeLow(metaArray[metaArray.length - 1].id - 1);
          }
          return of(metaArray);
        };

        const updateRange = (lastLow?: number, lastHigh?: number) => (metaArray: DocMeta[]) => {
          const len = metaArray.length;
          if (len) {
            const currentHigh = metaArray[0].id;
            if (!lastHigh || currentHigh > lastHigh) {
              lastHigh = currentHigh;
              this._setIdRangeHigh(currentHigh);
            }
            const currentLow = metaArray[len - 1].id - 1; // low is not included so -1
            if (!lastLow || currentLow < lastLow) {
              lastLow = currentLow;
              this._setIdRangeLow(currentLow);
            }
          }
        };

        if (isInFirstPage) {
          // only get first page(page1)
          if (!isBulkBelowTheId || keyNearPageFloor) {
            if (metaArray) {
              return directlyReturnMetaArray(metaArray);
            } else {
              return getMetaDataList(page, isBulkBelowTheId).pipe(tap(updateRange()));
            }
          }
        }

        if (isInLastPage) {
          if (isBulkBelowTheId || !keyNearPageFloor) {
            // only get last page
            if (isInFirstPage && metaArray) {
              // only one page, so last is also first
              directlyReturnMetaArray(metaArray);
            } else {
              // get last page
              return getMetaDataList(page, isBulkBelowTheId).pipe(tap(updateRange()));
            }
          }
        }

        if (metaArray) {
          // with first page
          return getMetaDataList(page, isBulkBelowTheId, keyNearPageFloor).pipe(
            tap(updateRange()),
            startWith(metaArray)
          );
        }

        return getMetaDataList(page, isBulkBelowTheId, keyNearPageFloor).pipe(tap(updateRange()));
      })
    );
  }

  readDocMeta(id: number, checkNextCache = false) {
    return this.githubStorage.init().pipe(
      switchMap(repo => repo.issue.get(id)),
      map(issue => this._issueToDocMeta(issue))
    );
  }

  readDocContent(id: number, format: string): Observable<DocContent> {
    const getContent = (
      repo: Repository,
      id: number,
      format: string,
      state = 0,
      isDeleted = false,
      title?:string
    ): Observable<DocContent> => {

      let uri = `${DOCUMENTS_FOLDER_NAME}/${title?DocMeta.sanitizeTitle(title)+'_':''}${id}`;
      if (format) uri = `${uri}.${format}`;

      if (isDeleted) {
        console.debug(`@github-cache.readDocContent: this doc is deleted: {id:${id}, format: ${format}}`)
        return of(new DocContent(id, undefined, undefined, format, isDeleted));
      }

      return (<Observable<Content>>repo.getContents(uri)).pipe(
        // directly get DocContent
        map(content => new DocContent(id, content.content, content.sha, format)),
        catchError(err => {
          if (err.status === 404) {
            if (state === 0) {
              state = 1;
              return this.readDocMeta(id).pipe(
                switchMap(meta => {
                  console.debug(`@github-cache.readDocContent: could not get content of id: ${id}, title: ${meta.title}, format:${format}\ntry again with remote meta: {title: ${meta.title}, format: ${meta.format}, isDeleted: ${meta.isDeleted}}`);
                  // using the meta from net via id, someone may has deleted it.
                  return getContent(repo, id, meta.format, state, meta.isDeleted, meta.title);
                })
              );
            } else if (format && state === 1) {
              state = 2; // stop
              console.debug(`@github-cache.readDocContent: could not get content of id: ${id}, format:${format}\ntry to use get without file format`);
              return getContent(repo, id, '', state);
            } else {
              return throwError(() => new Error(`@github-cache.readDocContent: could not get content of id: ${id}, format:${format}`));
            }
          } else {
            throw err;
          }
        })
      );
    };

    return this.githubStorage.init().pipe(
      switchMap(repo => {
        return getContent(repo, id, format);
      })
    );
  }

  updateDocument(docMeta: DocMeta, docContent: DocContent, forceUpdate: boolean, changeLog: string) {
    const { id, content, format, sha } = docContent;
    const title = DocMeta.getTitle(content);
    const headMeta = DocMeta.getHeadMeta(content);

    // todo: add change message to api.
    const commitMessage = this.commitMessage(title, headMeta.version, changeLog)

    return this.githubStorage.init().pipe(
      switchMap(repo =>
        repo.updateFile(
            `${DOCUMENTS_FOLDER_NAME}/${id}.${format}`,
            content,
            sha,
            commitMessage
          )
          .pipe(
            switchMap(file => {
              const url = this.util.getContentUrl(id, title, format);
              const { meta, metaStr } = DocMeta.serializeContent(
                id,
                content,
                url,
                docContent.format,
                docMeta.createDate,
                new Date(file.commit.committer.date),
                docMeta
              );
              const data: EditIssueParams = {
                title,
                body: metaStr
              };

              // save docMeta
              return repo.issue.edit(meta.id, data).pipe(
                map(() => {
                  const doc = new Document(
                    meta,
                    new DocContent(meta.id, docContent.content, file.content.sha)
                  );
                  return doc;
                })
              );
            })
          )
      )
    );
  }

  deleteDoc(id: number) {
    return this.githubStorage.init().pipe(
      switchMap(repo => {
        return repo.issue.edit(id, { state: 'closed' }).pipe(
          switchMap(issue => {
            const docMeta = this._issueToDocMeta(issue);
            return repo.delFile(`${DOCUMENTS_FOLDER_NAME}/${id}.${docMeta.format}`).pipe(
              catchError(err => {
                if (err.status === 404) {
                  // already deleted on other computer.
                  return of(id);
                }
                throw err;
              }),
              map(_ => {
                return id;
              })
            );
          })
        );
      })
    );
  }

  search(query: string): Observable<SearchResult> {
    let lastSearchResult: SearchResult = null;
    return this.githubStorage.init().pipe(
      switchMap(repo => {
        return merge(
          repo.searchIssue(query).pipe(
            map(reps =>
              (reps.body as any).items.map(item => {
                return {
                  id: +item.number,
                  score: item.score,
                  title: <string>item.title,
                  text_matches: item.text_matches,
                  source: SearchResultSource.netIssue
                };
              })
            )
          ),
          repo.searchCode(query).pipe(
            map(rep => {
              return (rep.body as any).items.map(item => {
                const { id, sanitizedTitle, ext } = DocMeta.parseDocumentName(item.name);
                return { id, score: item.score, title: sanitizedTitle, text_matches: item.text_matches };
              });
            })
          )
        );
      }),
      map(searchR => {
        if (!lastSearchResult) {
          lastSearchResult = searchR;
          return searchR;
        }
        searchR.forEach(item => {
          const index = lastSearchResult.findIndex(v => v.id === item.id);
          if (index !== -1) {
            if (item.source !== SearchResultSource.netIssue) {
              lastSearchResult = [...lastSearchResult];
              lastSearchResult[index] = item;
            }
          } else {
            lastSearchResult = [...lastSearchResult, item];
          }
        });
        return lastSearchResult;
      })
    );
  }
}
