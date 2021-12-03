import { ICache, DocMeta, DocContent, DocFormat, SearchResult, SearchResultSource, issueToDocMeta, Tag, scope } from 'core';
import { Observable, throwError, concat, asyncScheduler, of, merge } from 'rxjs';
import { Injectable } from '@angular/core';
import { GithubStorage } from '../net-storage/github/github';
import { switchMap, map, startWith, tap, catchError, take, zip, zipWith } from 'rxjs/operators';
import { Document } from 'core';
import { Issue } from '../net-storage/github/issues/issue';
import { Repository } from '../net-storage/github/repository';
import { Content } from 'net-storage';
import { DOCUMENTS_FOLDER_NAME } from '../home/const';
import { gitHubCacheUtil } from './github-cache.util';
import { EditIssueParams } from '../net-storage/github/model/issue';
import { EntityCacheStore } from '@rx-store/entity';

const GITHUB_PAGE_SIZE = 50;
const FIRST_PAGE_READY_TO_REFRESH = 5 * 60 * 1000;

@Injectable({ providedIn: 'platform' })
export class GithubCache implements ICache {
  // used to calculate the which page the key is in.
  private highestId: number;
  private logger = scope(console, '@GithubCache');

  constructor(private githubStorage: GithubStorage, private util: gitHubCacheUtil) {
    // refresh the first page every
    asyncScheduler.schedule(_ => (this.highestId = undefined), FIRST_PAGE_READY_TO_REFRESH);
  }

  nextLevelCache: ICache;

  private _setIdRangeLow?: (id: number) => void;
  private _setIdRangeHigh?: (id: number) => void;
  private _tagCache: EntityCacheStore<string, Tag>;

  init(
    nextLevelCache: ICache,
    tagCache: EntityCacheStore<string, Tag>,
    setIdRangeLow?: (id: number) => void,
    setIdRangeHigh?: (id: number) => void,
  ) {
    this.nextLevelCache = nextLevelCache;
    this._tagCache = tagCache;
    this._setIdRangeLow = setIdRangeLow;
    this._setIdRangeHigh = setIdRangeHigh;
    return this;
  }
  private commitMessage(title: string, version: string, change?: string) {
    let msg = `${title}`;
    if (version) msg += `, ver: ${version}`;
    if (change) msg += `, change: ${change}`;
    return msg;
  }

  CreateDocument(content: string, format: DocFormat) {
    const reusedClosedIssue = true;
    const issueInit = (repo: Repository, title: string) => {
      if (reusedClosedIssue) {
        return repo.issue.listIssues({ state: 'closed' }).pipe(switchMap(issues => {
          if (issues.length > 0) {
            this.logger.debug(`CreateDocument, reused closed issue:`, issues[0]);
            return of(issues[issues.length - 1]);
          }
          return repo.issue.create({ title });
        }));
      }
      this.logger.debug(`CreateDocument, create new issue:${title}`);
      return repo.issue.create({ title });
    }

    const title = DocMeta.getTitle(content);
    // create docMeta to get an id;
    return this.githubStorage.init().pipe(
      switchMap(repo => {
        let id: number;
        return issueInit(repo, title).pipe(
          switchMap(issue => {
            const id = issue.number;
            // save docContent;
            const commitMsg = this.commitMessage(title, '1.0.0', 'create document');
            const path = `${DOCUMENTS_FOLDER_NAME}/${id}.${format}`;
            return repo.newFile(path, content, commitMsg).pipe(
              tap(file => this.logger.debug(`CreateDocument.newFile:`, file)),
              catchError(err => {
                this.logger.debug(`CreateDocument.newFile error:`, err);
                // when the file already there.
                if (err.status === 422) {
                  return repo.getSha(path).pipe(
                    switchMap(resp => {
                      this.logger.debug(`CreateDocument.newFile by reuse existing file, sha:${resp.sha}`, content, resp);
                      return repo.updateFile(path, content, resp.sha, commitMsg)
                    })
                  );
                } else {
                  this.logger.error(`CreateDocument.newFile: errors when create a file`, err);
                  throw err;
                }

              }),
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
                  state: 'open',
                  body: metaStr
                };
                // save docMeta to update sha;
                return repo.issue.edit(id, data).pipe(
                  tap(ise => {
                    this.logger.debug(`edit issue:`, ise);
                  }),
                  map(() => {
                    const docContent = new DocContent(id, content, file.content.sha);
                    const doc = new Document(meta, docContent);
                    return doc;
                  }),
                );
              })
            );
          }),
          catchError(err => {
            if (id)
              repo.issue.edit(id, { state: 'closed' }).subscribe();
            throw err;
          }),
        )
      })
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
        return issues.map(i => issueToDocMeta(i, this._tagCache))
      };

      const getPageData = page =>
        this.githubStorage.init().pipe(
          switchMap(repo => {
            // need to get the closed one to mark deleted
            return repo.issue.listIssues({ state: 'all', page, per_page: GITHUB_PAGE_SIZE, sort: 'created' })
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
      tap(issue => { this.logger.debug(`issueToDocMeta: received issue:`, issue) }),
      map(issue => issueToDocMeta(issue, this._tagCache)),
      tap(meta => { this.logger.debug(`issueToDocMeta: meta from issue:`, meta); })
    );
  }

  readDocContent(id: number, format: string): Observable<DocContent> {
    const getContent = (
      repo: Repository,
      id: number,
      format: string,
      state = 0,
      isDeleted = false,
      title?: string
    ): Observable<DocContent> => {

      let uri = `${DOCUMENTS_FOLDER_NAME}/${title ? DocMeta.sanitizeTitle(title) + '_' : ''}${id}`;
      if (format) uri = `${uri}.${format}`;

      if (isDeleted) {
        this.logger.debug(`@github-cache.readDocContent: this doc is deleted: {id:${id}, format: ${format}}`)
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
                  this.logger.debug(`@github-cache.readDocContent: could not get content of id: ${id}, title: ${meta.title}, format:${format}\ntry again with remote meta: {title: ${meta.title}, format: ${meta.format}, isDeleted: ${meta.isDeleted}}`);
                  // using the meta from net via id, someone may has deleted it.
                  return getContent(repo, id, meta.format, state, meta.isDeleted, meta.title);
                })
              );
            } else if (format && state === 1) {
              state = 2; // stop
              this.logger.debug(`@github-cache.readDocContent: could not get content of id: ${id}, format:${format}\ntry to use get without file format`);
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
    const title = docMeta.title; //DocMeta.getTitle(content);
    // undefined if not has doc head meta
    const headMeta = DocMeta.getHeadMeta(content);

    const commitMessage = this.commitMessage(title, headMeta?.version, changeLog)

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
                body: metaStr,
                labels: meta.tag,
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
            const docMeta = issueToDocMeta(issue, this._tagCache);
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
    return this.githubStorage.init().pipe(
      switchMap(repo => {
        return repo.searchIssue(query).pipe(
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
          ),
          zipWith(
            repo.searchCode(query).pipe(
              map(rep => {
                return (rep.body as any).items.map(item => {
                  const { id, sanitizedTitle, ext } = DocMeta.parseDocumentName(item.name);
                  return { id, score: item.score, title: sanitizedTitle, text_matches: item.text_matches };
                });
              })
            )
          ))
      }),
      map(([issue, file]: [SearchResult, SearchResult]) => {
        for (const is of issue) {
          const ind = file.findIndex(v => v.id === is.id);
          if (ind !== -1) {
            file[ind].title = is.title;
          } else {
            file.push(is);
          }
        }

        return file;
      })
    );
  }
}
