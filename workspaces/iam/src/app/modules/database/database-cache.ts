import { Database, ModifyAction } from './database-engine';
import { Injectable } from '@angular/core';
import { Document, DocMeta, DocContent, DocFormat } from 'core';
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

const DB_PAGE_SIZE = 50;
export interface IterableDocuments extends IterableIterator<Observable<Document>> {}
@Injectable({ providedIn: 'root' })
export class DatabaseCache implements ICache {
  public nextLevelCache: ICache;

  constructor(private db: Database) {}

  init(nextLevelCache: ICache) {
    this.nextLevelCache = nextLevelCache;
    return this;
  }

  CreateDocument(content: string, format: DocFormat) {
    return this.nextLevelCache.CreateDocument(content, format).pipe(
      tap(doc => {
        this.db
          .add<DocContent>(DataTables.DocContent, doc.content)
          .pipe(
            subscribeOn(asyncScheduler),
            catchError(err => {
              throw err;
            })
          )
          .subscribe();

        this.db
          .add<DocMeta>(DataTables.DocMeta, doc.metaData)
          .pipe(
            subscribeOn(asyncScheduler),
            catchError(err => {
              throw err;
            })
          )
          .subscribe();
      })
    );
  }

  readBulkDocMeta(key: number, isBelowTheKey: boolean): Observable<DocMeta[]> {
    let refreshFirstPage = false;
    if (!isBelowTheKey) {
      if (key === Number.MAX_VALUE) {
        /// refresh the first page
        refreshFirstPage = true;
      }
    }

    let keyRange: IDBKeyRange = undefined;
    let dir: IDBCursorDirection = isBelowTheKey ? 'next' : 'prev';
    if (key !== undefined) {
      keyRange = isBelowTheKey ? IDBKeyRange.upperBound(key) : IDBKeyRange.lowerBound(key, true);
    } else {
      /// initial fetch
      keyRange = IDBKeyRange.lowerBound(0, true);
      dir = 'prev';
    }

    let cacheRecords: DocMeta[];

    const FromDB$ = this.db.query<DocMeta>(DataTables.DocMeta, keyRange, dir, DB_PAGE_SIZE).pipe(
      toArray(),
      filter(a => a.length > 0),
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
      switchMap(_ => from([docMetaDelete, docMetaUpsert])),
      filter(a => a.length > 0)
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
    const _cache$ = cache$.pipe(tap(d => (inCache = d)));
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
    return concat<T>(_cache$, _nextCache$).pipe(filter(t => !!t));
  }

  readDocMeta(id: number, checkNextCache?: boolean): Observable<DocMeta> {
    const cache$ = this.db.get<DocMeta>(DataTables.DocMeta, id);

    const nextCache$ = this.nextLevelCache.readDocMeta(id);

    return this.cacheRead<DocMeta>(
      DataTables.DocMeta,
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
        return toUpeate;
      },
      (inCache, fromNext) => fromNext.isDeleted
    );
  }

  UpdateDocument(oldDocMeta: DocMeta, content: string) {
    return this.nextLevelCache.UpdateDocument(oldDocMeta, content).pipe(
      tap(doc => {
        this.db
          .put<DocContent>(DataTables.DocContent, doc.content)
          .pipe(
            subscribeOn(asyncScheduler),
            catchError(err => {
              throw err;
            })
          )
          .subscribe();

        this.db
          .put<DocMeta>(DataTables.DocMeta, doc.metaData)
          .pipe(
            subscribeOn(asyncScheduler),
            catchError(err => {
              throw err;
            })
          )
          .subscribe();
      })
    );
  }

  deleteDoc(id: number) {
    return this.nextLevelCache.deleteDoc(id).pipe(
      switchMap(_ => {
        return this.db.delete(DataTables.DocMeta, id).pipe(
          subscribeOn(asyncScheduler),
          switchMap(_ => {
            return this.db.delete(DataTables.DocContent, id).pipe(map(_ => id));
          })
        );
      })
    );
  }
}
// todo: up low key state value;
