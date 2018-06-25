import { ICache, DataTables, DocMeta } from 'core';
import { Observable, throwError, Subscription, concat, asyncScheduler } from 'rxjs';
import { Injectable } from '@angular/core';
import { GithubStorage } from './github';
import { switchMap, map, toArray } from 'rxjs/operators';
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

  /// (...,key] (key,...]
  readBulkDocMeta(key: number, isBulkBelowTheKey: boolean): Observable<DocMeta[]> {
    if(key === undefined || key === Number.MAX_VALUE) {
      this.highestKey = undefined;
    }

    return new Observable(observer => {
      const subscription = new Subscription();
      let page: number;
      let keyNearPageFloor: boolean;

      const getMetaData = (
        page,
        isBelowTheKey,
        isNearPageFloor = undefined /*undefined: only this page*/
      ) => {
        const mapIssueToMeta = (issue: Issue, i) => {
          const meta = DocMeta.deSerialize(issue.body);
          meta.number = meta.number || issue.number;
          meta.tags = issue.labels;
          meta.updateDate = meta.updateDate || new Date(issue.updated_at);
          meta.createDate = meta.createDate || new Date(issue.created_at);
          meta.isDeleted =  !!issue.closed_at;
          meta._context = issue;
          if (i === 0 && page === 1) {
            this.highestKey = meta.number;
          }
          return meta;
        };

        const getPageData = page =>
          this.githubStorage.init().pipe(
            switchMap(repo => {
              return repo.issue.list('all', page, GITHUB_PAGE_SIZE);
            }),
            map(mapIssueToMeta),
            toArray()
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

      const getPageNum = key => Math.floor((this.highestKey - key) / GITHUB_PAGE_SIZE) + 1; // index start from 1

      const isNearPageFloor = (key, page) =>
        (this.highestKey - key) / GITHUB_PAGE_SIZE + 1 - page < 0.5;

      const isLastPage = page => page === Math.floor(this.highestKey / GITHUB_PAGE_SIZE);
      const isFirstPage = page => page === 1;

      let page1Observable: Observable<DocMeta[]>;

      if (!this.highestKey) {
        page = 1;
        page1Observable = getMetaData(page, isBulkBelowTheKey);
        const sub = page1Observable.subscribe(
          docMetaArray => observer.next(docMetaArray),
          err => observer.error(err)
        );
        subscription.add(sub);
      } else {
        page = getPageNum(key);
        keyNearPageFloor = isNearPageFloor(key, page);
      }

      const isInFirstPage = isFirstPage(page);
      const isInLastPage = isLastPage(page);

      if (isInFirstPage) {
        // only get first page(page1)
        if (!isBulkBelowTheKey || keyNearPageFloor) {
          if (page1Observable) {
            const sub = page1Observable.subscribe(undefined, undefined, () => observer.complete());
            subscription.add(sub);
            return subscription;
          } else {
            const subData = getMetaData(page, isBulkBelowTheKey).subscribe(observer);
            subscription.add(subData);
          }
        }
      }

      if (isInLastPage) {
        if (isBulkBelowTheKey || !keyNearPageFloor) {
          // only get last page
          if (isInFirstPage && page1Observable) {
            const sub = page1Observable.subscribe(undefined, undefined, () => observer.complete());
            subscription.add(sub);
            return subscription;
          } else {
            const subData = getMetaData(page, isBulkBelowTheKey).subscribe(observer);
            subscription.add(subData);
          }
        }
      }

      if (page1Observable) {
        const sub = page1Observable.subscribe(undefined, undefined, () => {
          const subData = getMetaData(page, isBulkBelowTheKey, keyNearPageFloor).subscribe(
            observer
          );
          subscription.add(subData);
        });
        subscription.add(sub);
        return subscription;
      }

      const subData = getMetaData(page, isBulkBelowTheKey, keyNearPageFloor).subscribe(observer);
      subscription.add(subData);

      return subscription;
    });
  }
}
