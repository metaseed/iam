import { Database, ModifyAction } from './database-engine';
import { Injectable } from '@angular/core';
import { Document, DocMeta, DocContent } from 'core';
import { Observable, throwError, combineLatest, of, from, concat, asyncScheduler } from 'rxjs';
import {
  toArray,
  tap,
  switchMap,
  map,
  count,
  withLatestFrom,
  filter,
  observeOn,
  subscribeOn,
  catchError
} from 'rxjs/operators';
import { ICache, DataTables } from 'core';
import { GithubCache } from 'net-storage';
import { tapObservable } from '../core/utils/debug';

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

    const FromDB$ = this.db.query<DocMeta>(DataTables.DocMeta, keyRange, dir, DB_PAGE_SIZE).pipe(
      toArray(),
      tap(a => (cacheRecords = a))
    );

    const docMetaUpsert = new Array<DocMeta>();
    const docMetaDelete = new Array<DocMeta>();
    // only notify the change in the later array: add, remove, modify
    const fromNext$ = this.nextLevelCache.readBulkDocMeta(key, isBelowTheKey).pipe(
      // tap(a=>console.log(a),err=>console.error(err),()=>console.warn('aaaa')),
      switchMap(records => {
        return this.db.executeModify(DataTables.DocMeta, records, (dbRecord, record) => {
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
                if (cacheRecords && !cacheRecords.some(v => v.id === record.id)) {
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

  cacheRead<T extends { id: number }>(
    table: DataTables,
    cache$: Observable<T>,
    nextCache$: Observable<T>,
    shouldUpeate: (inCache: T, fromNext: T) => boolean,
    shouldDelete: (inCache: T, fromNext: T) => boolean
  ) {
    let inCache: T;
    const _cache$ = cache$.pipe(
      tap(d => (inCache = d))
      // tapObservable('BBB')
    );
    const _nextCache$ = nextCache$.pipe(
      filter(fromNext => {
        if (shouldDelete(inCache, fromNext)) {
          this.db
            .delete(table, fromNext.id)
            .pipe(
              subscribeOn(asyncScheduler),
              catchError(err => {
                throw err;
              })
            )
            .subscribe();

          return true;
        } else if (shouldUpeate(inCache, fromNext)) {
          this.db
            .put(table, fromNext)
            .pipe(
              subscribeOn(asyncScheduler),
              catchError(err => {
                throw err;
              })
            )
            .subscribe();
          return true;
        } else return false;
      })
    );
    return concat<T>(_cache$, _nextCache$);
  }

  readDocMeta(id: number, checkNextCache?: boolean): Observable<DocMeta> {
    const cache$ = this.db.get<DocMeta>(DataTables.DocMeta, id);

    const nextCache$ = this.nextLevelCache.readDocMeta(id);

    return this.cacheRead<DocMeta>(
      DataTables.DocContent,
      cache$,
      nextCache$,
      (inCache, fromNext) => !inCache || inCache.updateDate < fromNext.updateDate,
      (inCache, fromNext) => fromNext.isDeleted
    );
  }

  readDocContent(id: number, title: string, format: string): Observable<DocContent> {
    const cache$ = this.db.get<DocContent>(DataTables.DocContent, id);

    const nextCache$ = this.nextLevelCache.readDocContent(id, title, format);

    return this.cacheRead<DocContent>(
      DataTables.DocContent,
      cache$,
      nextCache$,
      (inCache, fromNext) => {
        const toUpeate = !inCache || inCache.sha !== fromNext.sha;
        // if(toUpeate) {
        //   this.readDocMeta(key).pipe(subscribeOn(asyncScheduler),catchError(err=>{throw err;})).subscribe()
        // }
        // should consider case: doc content not modified but doc meta modified?
        return toUpeate;
      },
      (inCache, fromNext) => fromNext.isDeleted
    );
  }

  deleteDoc(id: number) {
    return this.nextLevelCache.deleteDoc(id).pipe(
      observeOn(asyncScheduler),
      switchMap((r:true) =>{
        return this.db.delete(DataTables.DocMeta, id).pipe(
          switchMap(_ => {
            return this.db.delete(DataTables.DocContent, id).pipe(map<any,true>(_=>true));
          })
        )}
      )
    );
  }
}
// todo: up low key state value;
