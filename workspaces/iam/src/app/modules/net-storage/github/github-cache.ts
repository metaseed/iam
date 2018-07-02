import { ICache, DataTables, DocMeta, DocContent, DocFormat } from 'core';
import { Observable, throwError, Subscription, concat, asyncScheduler, of } from 'rxjs';
import { Injectable } from '@angular/core';
import { GithubStorage } from './github';
import { switchMap, map, toArray, count, startWith, tap, catchError, take } from 'rxjs/operators';
import { Document } from 'core';
import { AsyncScheduler } from 'rxjs/internal/scheduler/AsyncScheduler';
import { Issue, EditIssueParams } from './issues/issue';
import { Repository } from './repository';
import { Content } from 'net-storage';
import { DOCUMENTS_FOLDER_NAME } from '../../home/const';
import { gitHubCacheUtil } from './github-cache.util';

const GITHUB_PAGE_SIZE = 50;
const FIRST_PAGE_READY_TO_REFRESH = 5 * 60 * 1000;

@Injectable()
export class GithubCache implements ICache {
  // used to caculate the which page the key is in.
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
    meta.tags = issue.labels;
    meta.updateDate = meta.updateDate || new Date(issue.updated_at);
    meta.createDate = meta.createDate || new Date(issue.created_at);
    // meta.format = meta.format || 'md';
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

  CreateDocument(content: string, format: DocFormat) {
    const title = DocMeta.getTitle(content);
    // create docMeta to get an id;
    return this.githubStorage.init().pipe(
      switchMap(repo =>
        repo.issue.create({ title }).pipe(
          switchMap(issue => {
            let id = issue.number;
            // save docContent;
            return repo.newFile(`${DOCUMENTS_FOLDER_NAME}/${title}_${id}.${format}`, content).pipe(
              switchMap(file => {
                let url = this.util.getContentUrl(id, title);

                const { meta, metaStr } = DocMeta.serializeContent(
                  id,
                  content,
                  file.content.sha, // update sha
                  url,
                  format,
                  new Date(issue.created_at)
                );
                let data: EditIssueParams = {
                  title: title,
                  body: metaStr
                };
                // save docMeta to update sha;
                return repo.issue.edit(id, data).pipe(
                  map(issue => {
                    const docContent = new DocContent(id, content, file.content.sha);
                    let doc = new Document(id, meta, docContent);

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
      const mapIssueToMeta = (issues: Issue[], i) => {
        const docMetaArray = issues.map(issue => {
          const meta = this._issueToDocMeta(issue);
          if (i === 0 && page === 1) {
            this.highestId = meta.id;
          }
          return meta;
        });
        return docMetaArray;
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
        return concat(d, getPageData(page - 1));
      }
      return d;
    };

    const getPageNum = (id, highestId) => Math.floor((highestId - id) / GITHUB_PAGE_SIZE) + 1; // page index start from 1, issue.num start from 1 too.

    const isNearPageFloor = (id, page, highestId) =>
      (highestId - id) / GITHUB_PAGE_SIZE + 1 - page < 0.5;

    const isLastPage = (page, highestId) => page === Math.floor(this.highestId / GITHUB_PAGE_SIZE);
    const isFirstPage = page => page === 1;

    const getHighestId = () => {
      if (!this.highestId) {
        return getMetaDataList(1, isBulkBelowTheId).pipe(
          map(a => {
            return { highestId: this.highestId, metaArray: a };
          })
        );
      }
      return of({ highestId: this.highestId, metaArray: null as DocMeta[] });
    };

    return getHighestId().pipe(
      switchMap(({ highestId, metaArray }) => {
        if (id === undefined || id === Number.MAX_VALUE) id = this.highestId;
        page = getPageNum(id, highestId);
        keyNearPageFloor = isNearPageFloor(id, page, highestId);
        const isInFirstPage = isFirstPage(page);
        const isInLastPage = isLastPage(page, highestId);

        const directlyReturnMetaArray = (metaArray: DocMeta[]) => {
          if (metaArray.length) {
            this._setIdRangeHigh(metaArray[0].id);
            this._setIdRangeLow(metaArray[metaArray.length - 1].id-1);
          }
          return of(metaArray);
        };

        const updateRange = (lastLow?: number, lastHigh?: number)=>(metaArray: DocMeta[]) => {
          const len = metaArray.length;
          if (len) {
            const currentHigh = metaArray[len - 1].id;
            if (!lastHigh || currentHigh > lastHigh) {
              lastHigh = currentHigh;
              this._setIdRangeHigh(currentHigh);
            }
            const currentLow = metaArray[0].id-1; // low is not included so -1
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

  readDocContent(id: number, title: string, format: string): Observable<DocContent> {
    const getContent = (
      repo: Repository,
      id: number,
      title: string,
      format: string,
      state = 0,
      isDeleted = false
    ) => {
      let uri = `${DOCUMENTS_FOLDER_NAME}/${title}_${id}`;
      if (format) uri = `${uri}.${format}`;

      let docMeta: DocMeta;
      if (isDeleted) return of(new DocContent(id, undefined, undefined, isDeleted));

      return (<Observable<Content>>repo.getContents(uri)).pipe(
        // directly get DocContent
        map(c => new DocContent(id, c.content, c.sha)),
        catchError(err => {
          if (err.status === 404) {
            if (state === 0) {
              state = 1;
              this.readDocMeta(id).pipe(
                switchMap(meta => {
                  docMeta = meta;
                  return getContent(repo, id, meta.title, meta.format, state, meta.isDeleted); // using the parameters from net via key; means title, format or format is modifyed.
                })
              );
            } else if (format && state === 1) {
              state = 2; // stop
              return getContent(repo, id, title, '', state); // try to geting DocContent saved without format sufix;
            } else {
              return throwError('getContents should stop!');
            }
          }
        })
      );
    };
    return this.githubStorage.init().pipe(
      switchMap(repo => {
        return getContent(repo, id, title, format);
      })
    );
  }

  UpdateDocument(oldDocMeta: DocMeta, content: string) {
    const newTitle = DocMeta.getTitle(content);

    return this.githubStorage.init().pipe(
      switchMap(repo =>
        repo
          // save docContent
          .updateFile(
            `${DOCUMENTS_FOLDER_NAME}/${newTitle}_${oldDocMeta.id}.${oldDocMeta.format}`,
            content,
            oldDocMeta.contentSha
          )
          .pipe(
            switchMap(file => {
              let url = this.util.getContentUrl(oldDocMeta.id, newTitle);
              const { meta, metaStr } = DocMeta.serializeContent(
                oldDocMeta.id,
                content,
                file.content.sha,
                url,
                oldDocMeta.format,
                oldDocMeta.createDate
              );
              let data: EditIssueParams = {
                title: newTitle,
                body: metaStr
              };

              // save docMeta
              return repo.issue.edit(meta.id, data).pipe(
                tap(d => {
                  if (newTitle !== oldDocMeta.title) {
                    repo
                      // delete old docContent, if title changed.
                      .delFileViaSha(
                        `${DOCUMENTS_FOLDER_NAME}/${oldDocMeta.title}_${oldDocMeta.id}.${
                          oldDocMeta.format
                        }`,
                        oldDocMeta.contentSha
                      )
                      .pipe(take(1))
                      .subscribe();
                  }
                }),
                map(a => {
                  const doc = new Document(
                    meta.id,
                    meta,
                    new DocContent(meta.id, content, file.content.sha)
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
            const title = issue.title;
            return repo.delFile(`${DOCUMENTS_FOLDER_NAME}/${title}_${id}.md`).pipe(
              map<File, true>(d => {
                return true; // false is processed by error of observable
              })
            );
          })
        );
      })
    );
  }
}
