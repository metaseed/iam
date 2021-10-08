import { Database, ModifyAction } from '../database/database-engine';
import { Injectable } from '@angular/core';
import { Document, DocMeta, DocContent, DocFormat, SubscriptionManager } from 'core';
import { Observable, from, concat, asyncScheduler } from 'rxjs';
import {
  toArray,
  tap,
  switchMap,
  map,
  count,
  filter,
  subscribeOn,
  catchError,
} from 'rxjs/operators';
import { ICache, DataTables } from 'core';
import { DatabaseCacheSaver } from './database-cache-saver';
import { Store, State } from '@ngrx/store';
import { selectCurrentDocStatus_IsDbDirty, selectCurrentDocumentId, UpdateCurrentDocumentStatus } from 'shared';

const DB_PAGE_SIZE = 50;
export interface IterableDocuments extends IterableIterator<Observable<Document>> { }
@Injectable({
  providedIn: 'platform'
})
export class DatabaseCache extends SubscriptionManager implements ICache {
  public nextLevelCache: ICache;
  private dbSaver: DatabaseCacheSaver;

  constructor(private db: Database, private store: Store<any>, private state: State<any>) {
    super();
  }

  init(nextLevelCache: ICache) {
    this.nextLevelCache = nextLevelCache;
    this.dbSaver = new DatabaseCacheSaver(this.db, this.nextLevelCache, this.store, this.state);
    super.addSub(this.dbSaver.autoSave$);
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

    let keyRange: IDBKeyRange;
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
    shouldUpdate: (inCache: T, fromNext: T) => boolean,
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
        } else
          if (shouldUpdate(inCache, fromNext)) {
            this.db.put(table, fromNext)
              .pipe(
                subscribeOn(asyncScheduler),
                catchError(err => {
                  throw err;
                })
              )
              .subscribe();
            return true;
          }
          else
            return false;
      })
    );
    return concat(_cache$, _nextCache$).pipe(filter(t => !!t));
  }

  readDocMeta(id: number, checkNextCache?: boolean): Observable<DocMeta> {
    const cache$ = this.db.get<DocMeta>(DataTables.DocMeta, id);

    const nextCache$ = this.nextLevelCache.readDocMeta(id);

    return this.cacheRead<DocMeta>(
      DataTables.DocMeta,
      cache$,
      nextCache$,
      // shouldUpdate: another app instance changed remote data
      // Note: local DB may have modified data, but the updateDate is the same, means I'm the only one edit the doc, so we do not update local db
      (inCache, fromNext) => !inCache || inCache.updateDate < fromNext.updateDate,
      (inCache, fromNext) => fromNext.isDeleted
    );
  }

  readDocContent(id: number, title: string, format: string): Observable<DocContent> {
    const cache$ = this.db.get<DocContent>(DataTables.DocContent, id);
    const nextCache$ = this.nextLevelCache.readDocContent(id, title, format);
    // do it 1s later to wait the read data has saved to store (wait 0s not work)
    setTimeout(() => {
      this.updateDbDirtyStatus();
    }, 1000);
    return this.cacheRead<DocContent>(
      DataTables.DocContent,
      cache$,
      nextCache$,
      // shouldUpdate
      (inCache, fromNext) => {
        // another app instance changed remote data, so update local with remote
        // Note: local DB may have modified data sync to remote, but the sha is the same, means I'm the only one edit this doc, so we do not update the local
        const toUpdate = !inCache || inCache.sha !== fromNext.sha;
        return toUpdate;
      },
      // shouldDelete
      (inCache, fromNext) => fromNext.isDeleted
    );
  }

  updateDocument(oldDocMeta: DocMeta, content: string, forceUpdate: boolean) {
    return this.dbSaver.saveToDb(oldDocMeta, content, forceUpdate);
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

  search(query: string) {
    return this.nextLevelCache.search(query);
  }

  // if db is dirty, and user F5, after reload, set the save button blue
  private updateDbDirtyStatus() {
    const isDbDirty = selectCurrentDocStatus_IsDbDirty(this.state.value);
    if(isDbDirty) return;
    const currentDocId = selectCurrentDocumentId(this.state.value);
    this.db.getAllKeys<number[]>(DataTables.DirtyDocs).subscribe(dirtyDocIds=>{
      if(dirtyDocIds.includes(currentDocId)) {
        this.store.dispatch(new UpdateCurrentDocumentStatus({ isDbDirty: true }))
      }
    });
  }
}
// todo: up low key state value;
