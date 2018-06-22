import { Database } from './database-engine';
import { Injectable } from '@angular/core';
import { Document } from 'core';
import { Observable, throwError } from 'rxjs';
import { toArray, tap, switchMap } from 'rxjs/operators';
import { ICache, DataTables } from 'core';

const DB_PAGE_SIZE = 20;
export interface IterableDocuments extends IterableIterator<Observable<Document>> {}
@Injectable()
export class DatabaseCacheService implements ICache {
  private nextLevelCache: ICache;

  constructor(private db: Database) {}

  init(nextLevelCache: ICache) {
    this.nextLevelCache = nextLevelCache;
  }

  readDocMetaByPage(pageIndex: number, pageSize: number): Observable<any> {
    pageSize = pageSize || DB_PAGE_SIZE;
    let isEnd = false;

      const ob = this.db.countAll(DataTables.DocumentMeta).pipe(
        switchMap(c => {
          if (c < (pageIndex+1)*pageSize) {

            if (this.nextLevelCache) {
                this.nextLevelCache.readDocMetaByPage(pageIndex,pageSize).subscribe()
            }
            isEnd = true;
          }
          return this.db.getByPage<any>(DataTables.DocumentMeta, pageIndex, pageSize);
        })
      );
      return ob;
  }
  readByPage_____<T>(pageIndex: number, pageSize: number): IterableIterator<Observable<T>> {
    pageSize = pageSize || DB_PAGE_SIZE;
    let me = this;
    let isEnd = false;
    let keyRange = IDBKeyRange.bound(undefined, undefined);
    return {
      [Symbol.iterator]() {
        return this;
      },
      next() {
        const ob = me.db.count(DataTables.DocumentMeta, keyRange).pipe(
          switchMap(c => {
            if (c < pageSize) {
              if (me.nextLevelCache) {
                //me.nextLevelCache.
              }
              isEnd = true;
            }
            return me.db.query<T>(DataTables.DocumentMeta, keyRange, 'prev', DB_PAGE_SIZE);
          })
        );
        return { value: ob, done: isEnd };
      }
    };
  }
}
