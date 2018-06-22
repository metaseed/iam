import { ICache, DataTables, DocMeta } from 'core';
import { Observable, throwError, Subscription, concat } from 'rxjs';
import { Injectable } from '@angular/core';
import { GithubStorage } from './github';
import { switchMap, map, toArray } from 'rxjs/operators';
import { Document } from 'core';

const GITHUB_PAGE_SIZE = 50;

@Injectable()
export class GithubCache implements ICache {
  private highestKey;

  constructor(private githubStorage: GithubStorage) {}

  nextLevelCache: ICache;

  readBulkDocMeta(key: number, isBelowTheKey: boolean): Observable<DocMeta[]> {
    return new Observable(observer => {
      const subscription = new Subscription();
      let page: number;
      let nearFloor: boolean;

      const getMetaData = (page, isBelowTheKey, isNearfloor = undefined) => {
        const mapFuc = (issue, i) => {
          const meta = DocMeta.deSerialize(issue.body);
          meta.number = meta.number || issue.number;
          meta.tags = issue.labels;
          meta.updateDate = meta.updateDate || new Date(issue.updated_at);
          meta.createDate = meta.createDate || new Date(issue.created_at);
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
            map(mapFuc),
            toArray()
          );

        const d = getPageData(page);
        if (isNearfloor === undefined) {
          return d;
        }
        if (isBelowTheKey && !isNearfloor) {
          return concat(d, getPageData(page + 1));
        }
        if (!isBelowTheKey && isNearfloor) {
          return concat(d, getPageData(page - 1));
        }
        return d;
      };
      const getPage = key => Math.floor((this.highestKey - key) / GITHUB_PAGE_SIZE) + 1;
      const isNearfloor = (key, page) =>
        (this.highestKey - key) / GITHUB_PAGE_SIZE + 1 - page < 0.5;
      const isLastPage = (key, page) => page === Math.floor(this.highestKey / GITHUB_PAGE_SIZE);
      let page1Observable: Observable<DocMeta[]>;

      if (!this.highestKey) {
        page = 1;
        page1Observable = getMetaData(page, isBelowTheKey);
        const sub = page1Observable.subscribe(
          mArray => observer.next(mArray),
          err => observer.error(err)
        );
        subscription.add(sub);
      } else {
        page = getPage(key);
        nearFloor = isNearfloor(key, page);
      }

      const getPageNot1 = () => {
        if (isLastPage && isBelowTheKey) {
          const subData = getMetaData(page, isBelowTheKey).subscribe(observer);
        }
        const subData = getMetaData(page, isBelowTheKey, nearFloor).subscribe(observer);
        subscription.add(subData);
      };
      if (page1Observable) {
        const sub = page1Observable.subscribe(undefined, undefined, () => {
          page = getPage(key);
          nearFloor = isNearfloor(key, page);
          if (page === 1) {
            if (nearFloor) {
              observer.complete();
              return subscription;
            }
          }
          getPageNot1();
        });
        subscription.add(sub);
      }

      getPageNot1();

      return subscription;
    });
  }
}
