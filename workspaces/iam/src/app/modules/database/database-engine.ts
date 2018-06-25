import { Observable, Observer, Subject, from, of } from 'rxjs';
import { mergeMap, tap, share, shareReplay, filter } from 'rxjs/operators';
import { InjectionToken, Inject, Injectable, NgModule, ModuleWithProviders } from '@angular/core';
// ngrx/db 2.2.0-beta.0 modified to support rxjs 6

const IDB_SUCCESS = 'success';
const IDB_COMPLETE = 'complete';
const IDB_ERROR = 'error';
const IDB_UPGRADE_NEEDED = 'upgradeneeded';

const IDB_TXN_READ = 'readonly';
const IDB_TXN_READWRITE = 'readwrite';

export const DB_INSERT = 'DB_INSERT';

export const DatabaseBackend = new InjectionToken('IndexedDBBackend');
export const IDB_SCHEMA = new InjectionToken('IDB_SCHEMA');

export interface DBUpgradeHandler {
  (db: IDBDatabase): void;
}

export interface DBStore {
  primaryKey?: string;
  autoIncrement?: boolean;
}

export interface DBSchema {
  version: number;
  name: string;
  stores: { [storename: string]: DBStore };
}

export function getIDBFactory(): IDBFactory {
  return typeof window !== 'undefined' ? window.indexedDB : self.indexedDB;
}

@Injectable()
export class Database {
  public changes: Subject<any> = new Subject();

  private _idb: IDBFactory;
  private _schema: DBSchema;

  constructor(@Inject(DatabaseBackend) idbBackend: any, @Inject(IDB_SCHEMA) schema: any) {
    this._schema = schema;
    this._idb = idbBackend;
  }

  private _mapRecord(objectSchema: DBStore) {
    return (dbResponseRec: any) => {
      if (!objectSchema.primaryKey) {
        dbResponseRec.record['$key'] = dbResponseRec['$key'];
      }
      return dbResponseRec.record;
    };
  }

  private _upgradeDB(observer: Observer<IDBDatabase>, db: IDBDatabase) {
    for (let storeName in this._schema.stores) {
      if (db.objectStoreNames.contains(storeName)) {
        db.deleteObjectStore(storeName);
      }
      this._createObjectStore(db, storeName, this._schema.stores[storeName]);
    }
    observer.next(db);
    observer.complete();
  }

  private _createObjectStore(db: IDBDatabase, key: string, schema: DBStore) {
    let objectStore = db.createObjectStore(key, {
      autoIncrement: true,
      keyPath: schema.primaryKey
    });
  }

  private _open$;

  open(
    dbName: string,
    version: number = 1,
    upgradeHandler?: DBUpgradeHandler
  ): Observable<IDBDatabase> {
    if (this._open$) return this._open$;

    const idb = this._idb;
    return (this._open$ = Observable.create((observer: Observer<any>) => {
      const openReq = idb.open(dbName, this._schema.version);

      const onSuccess = (event: any) => {
        observer.next(event.target.result);
        observer.complete();
      };
      const onError = (err: any) => {
        console.log(err);
        observer.error(err);
      };

      const onUpgradeNeeded = (event: any) => {
        this._upgradeDB(observer, event.target.result);
      };

      openReq.addEventListener(IDB_SUCCESS, onSuccess);
      openReq.addEventListener(IDB_ERROR, onError);
      openReq.addEventListener(IDB_UPGRADE_NEEDED, onUpgradeNeeded);

      return () => {
        openReq.removeEventListener(IDB_SUCCESS, onSuccess);
        openReq.removeEventListener(IDB_ERROR, onError);
        openReq.removeEventListener(IDB_UPGRADE_NEEDED, onUpgradeNeeded);
      };
    }).pipe(shareReplay(1)));
  }

  deleteDatabase(dbName: string): Observable<any> {
    return new Observable((deletionObserver: Observer<any>) => {
      const deleteRequest = this._idb.deleteDatabase(dbName);

      const onSuccess = (event: any) => {
        deletionObserver.next(null);
        deletionObserver.complete();
      };

      const onError = (err: any) => deletionObserver.error(err);

      deleteRequest.addEventListener(IDB_SUCCESS, onSuccess);
      deleteRequest.addEventListener(IDB_ERROR, onError);

      return () => {
        deleteRequest.removeEventListener(IDB_SUCCESS, onSuccess);
        deleteRequest.removeEventListener(IDB_ERROR, onError);
      };
    });
  }

  upsert<T>(
    storeName: string,
    records: T[],
    notify: boolean = true,
    predicate: (T) => boolean = undefined
  ): Observable<T> {
    const write$ = this.executeWrite<T>(storeName, 'put', records, predicate);

    return write$.pipe(
      tap((payload: T) => (notify ? this.changes.next({ type: DB_INSERT, payload }) : {}))
    );
  }

  deleteBulk<T>(storeName: string, records: Array<T>, notify: boolean = true) {
    const write$ = this.executeWrite<T>(storeName, 'delete', records,undefined);

    return write$.pipe(
      tap((payload: T) => (notify ? this.changes.next({ type: DB_INSERT, payload }) : {}))
    );
  }

  private request(
    storeName: string,
    txnMode: IDBTransactionMode,
    action: (store: IDBObjectStore, ...params) => IDBRequest,
    onRequestSuccess?: (observer: Observer<any>) => (ev) => void
  ): Observable<any> {
    const open$ = this.open(this._schema.name);

    return open$.pipe(
      mergeMap((db: IDBDatabase) => {
        return new Observable((txnObserver: Observer<any>) => {
          const recordSchema = this._schema.stores[storeName];
          const mapper = this._mapRecord(recordSchema);
          const txn = db.transaction([storeName], txnMode);
          const objectStore = txn.objectStore(storeName);

          const request = action(objectStore);

          const onTxnReqError = (err: any) => txnObserver.error(err);
          const onTxnComplete = () => txnObserver.complete();
          const onReqSuccess = onRequestSuccess
            ? onRequestSuccess(txnObserver)
            : (ev: any) => txnObserver.next(request.result);

          txn.addEventListener(IDB_COMPLETE, onTxnComplete);
          txn.addEventListener(IDB_ERROR, onTxnReqError);

          request.addEventListener(IDB_SUCCESS, onReqSuccess);
          request.addEventListener(IDB_ERROR, onTxnReqError);

          return () => {
            request.removeEventListener(IDB_SUCCESS, onReqSuccess);
            request.removeEventListener(IDB_ERROR, onTxnReqError);
            txn.removeEventListener(IDB_COMPLETE, onTxnComplete);
            txn.removeEventListener(IDB_ERROR, onTxnReqError);
          };
        });
      })
    );
  }

  delete(storeName: string, key): Observable<any> {
    return this.request(storeName, IDB_TXN_READWRITE, store => {
      return store.delete(key);
    });
  }

  get(storeName: string, key: any): Observable<any> {
    return this.request(storeName, IDB_TXN_READ, store => {
      return store.get(key);
    });
  }

  count<T>(storeName: string, keyRange: IDBKeyRange): Observable<T> {
    return this.request(storeName, IDB_TXN_READ, store => {
      return store.count(keyRange);
    });
  }

  countAll<T>(storeName: string): Observable<T> {
    return this.request(storeName, IDB_TXN_READ, store => {
      return store.count();
    });
  }

  getByPage<T>(
    storeName: string,
    pageIndex: number,
    pageSize: number,
    predicate?: (rec: any) => boolean
  ): Observable<T> {
    return this.request(
      storeName,
      IDB_TXN_READ,
      store => {
        return store.openCursor();
      },
      (txnObserver, advanced?, counter = 0) => ev => {
        let cursor = ev.target.result;
        if (cursor) {
          if (!advanced) {
            cursor.advance(pageIndex * pageSize);
            advanced = true;
          }
          if (predicate) {
            const match = predicate(cursor.value);
            if (match) {
              txnObserver.next(cursor.value);
              counter++;
            }
          } else {
            txnObserver.next(cursor.value);
            counter++;
          }
          if (counter === pageSize) {
            txnObserver.complete();
          } else {
            cursor.continue();
          }
        } else {
          txnObserver.complete();
        }
      }
    );
  }

  query<T>(
    storeName: string,
    keyRange: IDBKeyRange,
    direction: IDBCursorDirection,
    maxNum?: number,
    predicate?: (rec: any) => boolean
  ): Observable<T> {
    if (maxNum <= 0) return of(undefined);
    return this.request(
      storeName,
      IDB_TXN_READ,
      store => {
        return store.openCursor(keyRange, direction);
      },
      (txnObserver, counter = 0) => ev => {
        let cursor = ev.target.result;
        if (cursor) {
          if (predicate) {
            const match = predicate(cursor.value);
            if (match) {
              txnObserver.next(cursor.value);
              counter++;
            }
          } else {
            txnObserver.next(cursor.value);
            counter++;
          }

          if (maxNum && counter === maxNum) {
            txnObserver.complete();
          } else {
            cursor.continue();
          }
        } else {
          txnObserver.complete();
        }
      }
    );
  }

  executeWrite<T>(
    storeName: string,
    actionName: string,
    records: T[],
    predicate: (T) => boolean
  ): Observable<T> {
    const changes = this.changes;
    const open$ = this.open(this._schema.name);

    return open$.pipe(
      mergeMap(db => {
        return new Observable((txnObserver: Observer<T>) => {
          const recordSchema = this._schema.stores[storeName];
          const mapper = this._mapRecord(recordSchema);
          const txn = db.transaction([storeName], IDB_TXN_READWRITE);
          const objectStore: any = txn.objectStore(storeName);

          const onTxnError = (err: any) => txnObserver.error(err);
          const onTxnComplete = () => txnObserver.complete();

          txn.addEventListener(IDB_COMPLETE, onTxnComplete);
          txn.addEventListener(IDB_ERROR, onTxnError);

          const makeRequest = (record: any) => {
            return new Observable((reqObserver: Observer<any>) => {
              let req: any;
              if (recordSchema.primaryKey) {
                req = objectStore[actionName](record);
              } else {
                let $key = record['$key'];
                let $record = Object.assign({}, record);
                delete $record.key;
                req = objectStore[actionName]($record, $key);
              }
              req.addEventListener(IDB_SUCCESS, () => {
                let $key = req.result;
                reqObserver.next(mapper({ $key, record }));
              });
              req.addEventListener(IDB_ERROR, (err: any) => {
                reqObserver.error(err);
              });
            });
          };

          let requestSubscriber = from(records)
            .pipe(
              filter(record => {
                if (predicate) return predicate(record);
                return true;
              }),
              mergeMap(makeRequest)
            )
            .subscribe(txnObserver);

          return () => {
            requestSubscriber.unsubscribe();
            txn.removeEventListener(IDB_COMPLETE, onTxnComplete);
            txn.removeEventListener(IDB_ERROR, onTxnError);
          };
        });
      })
    );
  }

  compare(a: any, b: any): number {
    return this._idb.cmp(a, b);
  }
}
