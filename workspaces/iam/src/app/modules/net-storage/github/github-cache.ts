import { ICache, DataTables, DocMeta } from 'core';
import { Observable, throwError, Subscription, concat, asyncScheduler, of } from 'rxjs';
import { Injectable } from '@angular/core';
import { GithubStorage } from './github';
import { switchMap, map, toArray, count, startWith } from 'rxjs/operators';
import { Document } from 'core';
import { AsyncScheduler } from 'rxjs/internal/scheduler/AsyncScheduler';
import { Issue } from './issues/issue';

const GITHUB_PAGE_SIZE = 50;
const FIRST_PAGE_READY_TO_REFRESH = 5 * 60 * 1000;

@Injectable()
export class GithubCache implements ICache {
  private highestKey;

  constructor(private githubStorage: GithubStorage) {
    // refresh the first page every
    asyncScheduler.schedule(_ => (this.highestKey = undefined), FIRST_PAGE_READY_TO_REFRESH);
  }

  nextLevelCache: ICache;

  init(nextLevelCache: ICache) {
    this.nextLevelCache = nextLevelCache;
    return this;
  }

  /// (...,key] (key,...]
  readBulkDocMeta(key: number, isBulkBelowTheKey: boolean): Observable<DocMeta[]> {
    if (key === undefined || key === Number.MAX_VALUE) {
      this.highestKey = undefined;
    }
    let page: number;
    let keyNearPageFloor: boolean;

    const getMetaData = (
      page,
      isBelowTheKey,
      isNearPageFloor = undefined /*undefined: only this page*/
    ) => {
      const mapIssueToMeta = (issues: Issue[], i) => {
        const docMetaArray = issues.map(issue => {
          let meta: DocMeta;
          meta = DocMeta.deSerialize(issue.body);
          if (!meta) meta = <DocMeta>{};
          meta.number = meta.number || issue.number;
          meta.tags = issue.labels;
          meta.updateDate = meta.updateDate || new Date(issue.updated_at);
          meta.createDate = meta.createDate || new Date(issue.created_at);
          meta.isDeleted = !!issue.closed_at;
          meta._context = issue;
          if (i === 0 && page === 1) {
            this.highestKey = meta.number;
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

    const getPageNum = (key, highestKey) => Math.floor((highestKey - key) / GITHUB_PAGE_SIZE) + 1; // index start from 1

    const isNearPageFloor = (key, page, highestKey) =>
      (highestKey - key) / GITHUB_PAGE_SIZE + 1 - page < 0.5;

    const isLastPage = (page, highestKey) =>
      page === Math.floor(this.highestKey / GITHUB_PAGE_SIZE);
    const isFirstPage = page => page === 1;

    const getHighestKey = () => {
      if (!this.highestKey) {
        return getMetaData(1, isBulkBelowTheKey).pipe(
          map(a => {
            return { highestKey: this.highestKey, metaArray: a };
          })
        );
      }
      return of({ highestKey: this.highestKey, metaArray: null });
    };

    return getHighestKey().pipe(
      switchMap(({ highestKey, metaArray }) => {
        if (key === undefined || key === Number.MAX_VALUE) key = this.highestKey;
        page = getPageNum(key, highestKey);
        keyNearPageFloor = isNearPageFloor(key, page, highestKey);
        const isInFirstPage = isFirstPage(page);
        const isInLastPage = isLastPage(page, highestKey);

        if (isInFirstPage) {
          // only get first page(page1)
          if (!isBulkBelowTheKey || keyNearPageFloor) {
            if (metaArray) {
              return of(metaArray);
            } else {
              return getMetaData(page, isBulkBelowTheKey);
            }
          }
        }

        if (isInLastPage) {
          if (isBulkBelowTheKey || !keyNearPageFloor) {
            // only get last page
            if (isInFirstPage && metaArray) {
              // only one page, so last is also first
              return of(metaArray);
            } else {
              // get last page
              return getMetaData(page, isBulkBelowTheKey);
            }
          }
        }

        if (metaArray) {
          // with first page
          return getMetaData(page, isBulkBelowTheKey, keyNearPageFloor).pipe(startWith(metaArray));
        }

        return getMetaData(page, isBulkBelowTheKey, keyNearPageFloor);
      })
    );
  }
}
