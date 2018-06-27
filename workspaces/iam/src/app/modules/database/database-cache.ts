import { Database, ModifyAction } from './database-engine';
import { Injectable } from '@angular/core';
import { Document, DocMeta, DocContent } from 'core';
import { Observable, throwError, combineLatest, of, from, concat } from 'rxjs';
import { toArray, tap, switchMap, map, count, withLatestFrom } from 'rxjs/operators';
import { ICache, DataTables } from 'core';
import { GithubCache } from 'net-storage';

const DB_PAGE_SIZE = 20;
export interface IterableDocuments extends IterableIterator<Observable<Document>> {}
@Injectable()
export class DatabaseCache implements ICache {
  public nextLevelCache: ICache;

  constructor(private db: Database) {}

  init(nextLevelCache: ICache) {
    this.nextLevelCache = nextLevelCache;
    return this;
  }

  readBulkDocMeta(key: number, isBelowTheKey: boolean): Observable<DocMeta[]> {
    let refreshFirstPage = false;
    if (!isBelowTheKey) {
      if (key === Number.MAX_VALUE) {
        /// refresh the first page
        refreshFirstPage = true;
      }
    }

    let keyRange: IDBKeyRange = undefined; // initial fetch
    if (key !== undefined) {
      keyRange = isBelowTheKey ? IDBKeyRange.upperBound(key) : IDBKeyRange.lowerBound(key, true);
    }
    const dir = isBelowTheKey ? 'next' : 'prev';

    let cacheRecords: DocMeta[];

    const FromDB$ = this.db
      .query<DocMeta>(DataTables.DocumentMeta, keyRange, dir, DB_PAGE_SIZE)
      .pipe(
        toArray(),
        tap(a => (cacheRecords = a))
      );

    const docMetaUpsert = new Array<DocMeta>();
    const docMetaDelete = new Array<DocMeta>();
    // only notify the change in the later array: add, remove, modify
    const fromNext$ = this.nextLevelCache.readBulkDocMeta(key, isBelowTheKey).pipe(
      // tap(a=>console.log(a),err=>console.error(err),()=>console.warn('aaaa')),
      switchMap(records => {
        return this.db.executeModify(DataTables.DocumentMeta, records, (dbRecord, record) => {
          if (record.isDeleted) {
            if (dbRecord) {
              // to delete
              docMetaDelete.push(dbRecord);
              return ModifyAction.delete;
            } else {
              return ModifyAction.none;
            }
          } else {
            // new or update(same)
            if (dbRecord) {
              // update or same
              if (dbRecord.updateDate < record.updateDate) {
                // new from net
                docMetaUpsert.push(record);
                return ModifyAction.put;
              } else {
                // same
                if (cacheRecords && !cacheRecords.some(v => v.key === record.key)) {
                  // not in quick cache data
                  docMetaUpsert.push(record);
                }
                return ModifyAction.none;
              }
            } else {
              // new
              docMetaUpsert.push(record);
              return ModifyAction.add;
            }
          }
        });
      }),
      count(),
      switchMap(_ => from([docMetaDelete, docMetaUpsert]))
    );

    if (refreshFirstPage) {
      return fromNext$;
    }
    return concat(FromDB$, fromNext$);
  }

  readDocContent(key: number, title: string, format: string): Observable<DocContent> {
    const fromDB$ = this.db.get<DocContent>(DataTables.Document, key);

    const fromNet$ = this.nextLevelCache.readDocContent(key, title, format).pipe(
      withLatestFrom(fromDB$),
      map(([fromDb, fromNet]) => {
        return;
      })
    );

    return concat(fromDB$, fromNet$);
  }
}
// todo: up low key state value;
