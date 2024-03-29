import { Observable, Observer, Subject, from, of } from 'rxjs';
import { mergeMap, tap, shareReplay, filter } from 'rxjs/operators';
import { InjectionToken, Inject, Injectable } from '@angular/core';
import { Logger } from '../core/services';

const IDB_SUCCESS = 'success';
const IDB_COMPLETE = 'complete';
const IDB_ERROR = 'error';
const IDB_UPGRADE_NEEDED = 'upgradeneeded';

const IDB_TXN_READ = 'readonly';
const IDB_TXN_READWRITE = 'readwrite';

const DB_INSERT = 'DB_INSERT';

export const DatabaseBackend = new InjectionToken('IndexedDBBackend');
export const IDB_SCHEMA = new InjectionToken('IDB_SCHEMA');
export enum ModifyAction {
  put = 'put',
  add = 'add',
  delete = 'delete',
  none = 'none'
}

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

  private _dbFactory: IDBFactory;
  private _schema: DBSchema;
  private logger = Logger(`${this.constructor.name}`);

  constructor(@Inject(DatabaseBackend) idbBackend: any, @Inject(IDB_SCHEMA) schema: any) {
    this._schema = schema;
    this._dbFactory = idbBackend;
  }

  private _mapRecord(objectSchema: DBStore) {
    return (dbResponseRec: any) => {
      if (!objectSchema.primaryKey) {
        dbResponseRec.record['$key'] = dbResponseRec['$key'];
      }
      return dbResponseRec.record;
    };
  }

  private _createObjectStore(db: IDBDatabase, storeName: string, schema: DBStore) {
    let objectStore = db.createObjectStore(storeName, {
      autoIncrement: schema.autoIncrement,
      keyPath: schema.primaryKey
    });
    return objectStore;
  }

  private _open$: Observable<IDBDatabase>;

  // lazy open, only when used
  open(
    dbName: string,
    version: number = 1,
    upgradeHandler?: DBUpgradeHandler
  ): Observable<IDBDatabase> {
    if (this._open$) return this._open$;

    const idb = this._dbFactory;

    return this._open$ = new Observable((observer: Observer<any>) => {
      const openReq = idb.open(dbName, this._schema.version);
      let db: IDBDatabase;

      const onSuccess = (event: any) => {
        db = event.target.result;
        observer.next(db);
        observer.complete(); // teardown
      };
      const onError = (err: any) => {
        console.log(err);
        observer.error(err);
      };

      const onUpgradeNeeded = (event: any) => {
        const db: IDBDatabase = event.target.result;

        for (let storeName in this._schema.stores) {
          if (db.objectStoreNames.contains(storeName)) {
            db.deleteObjectStore(storeName);
          }
          this._createObjectStore(db, storeName, this._schema.stores[storeName]);
        }
      }

      openReq.addEventListener(IDB_SUCCESS, onSuccess);
      openReq.addEventListener(IDB_ERROR, onError);
      openReq.addEventListener(IDB_UPGRADE_NEEDED, onUpgradeNeeded);

      // teardown on source complete
      return () => {
        openReq.removeEventListener(IDB_SUCCESS, onSuccess);
        openReq.removeEventListener(IDB_ERROR, onError);
        openReq.removeEventListener(IDB_UPGRADE_NEEDED, onUpgradeNeeded);
        // db?.close() do not close here, close() it explicitly
      };
    }).pipe(shareReplay(1)); // refCount in shareReplay by default is false, so it would not exe tear down of source even if no subscription (refCounter = 0)
  }

  close(){
    this._open$?.subscribe(db => db.close()).unsubscribe();
  }

  deleteDatabase(dbName: string): Observable<null> {
    return new Observable((observer: Observer<null>) => {
      const deleteRequest = this._dbFactory.deleteDatabase(dbName);

      const onSuccess = e => {
        observer.next(null);
        observer.complete();
      };

      const onError = err => observer.error(err);

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
    const write$ = this.executeWrite<T>(storeName, 'delete', records, undefined);

    return write$.pipe(
      tap((payload: T) => (notify ? this.changes.next({ type: DB_INSERT, payload }) : {}))
    );
  }

  private request<T>(
    storeName: string,
    txnMode: IDBTransactionMode,
    action: (store: IDBObjectStore, ...params) => IDBRequest,
    onRequestSuccess?: (observer: Observer<any>) => (ev) => void
  ): Observable<T> {
    const open$ = this.open(this._schema.name);

    return open$.pipe(
      mergeMap((db: IDBDatabase) => {
        return new Observable((observer: Observer<any>) => {
          const recordSchema = this._schema.stores[storeName];
          const mapper = this._mapRecord(recordSchema);
          const txn = db.transaction([storeName], txnMode);
          const objectStore = txn.objectStore(storeName);

          const request = action(objectStore);

          const onError = (err: any) => observer.error(err);
          const onTxnComplete = () => observer.complete();
          const onReqSuccess = onRequestSuccess?.(observer) ??(e => observer.next(request.result));

          txn.addEventListener(IDB_COMPLETE, onTxnComplete);
          txn.addEventListener(IDB_ERROR, onError);
          request.addEventListener(IDB_SUCCESS, onReqSuccess);
          request.addEventListener(IDB_ERROR, onError);

          return () => {
            request.removeEventListener(IDB_SUCCESS, onReqSuccess);
            request.removeEventListener(IDB_ERROR, onError);
            txn.removeEventListener(IDB_COMPLETE, onTxnComplete);
            txn.removeEventListener(IDB_ERROR, onError);
          };
        });
      })
    );
  }

  delete<T>(storeName: string, id): Observable<T> {
    return this.request(storeName, IDB_TXN_READWRITE, store => {
      this.logger.debug(`delete:`, storeName, id);
      return store.delete(id);
    });
  }

  add<T>(storeName: string, record: T): Observable<T> {
    return this.request<T>(storeName, IDB_TXN_READWRITE, store => {
      return store.add(record);
    });
  }

  get<T>(storeName: string, id: any): Observable<T> {
    return this.request(storeName, IDB_TXN_READ, store => {
      return store.get(id);
    });
  }

  getAllKeys<T>(storeName: string): Observable<T> {
    return this.request(storeName, IDB_TXN_READ, store => {
      return store.getAllKeys();
    });
  }
  getAll<T>(storeName: string): Observable<T[]> {
    return this.request(storeName, IDB_TXN_READ, store => {
      return store.getAll();
    });
  }

  put<T>(storeName: string, record: T): Observable<T> {
    return this.request<T>(storeName, IDB_TXN_READWRITE, store => {
      return store.put(record);
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
    const open$ = this.open(this._schema.name);

    return open$.pipe(
      mergeMap(db => {
        return new Observable((txnObserver: Observer<T>) => {
          const recordSchema = this._schema.stores[storeName];
          const mapper = this._mapRecord(recordSchema);
          const txn = db.transaction([storeName], IDB_TXN_READWRITE);
          const objectStore = txn.objectStore(storeName);

          const onTxnError = err => txnObserver.error(err);
          const onTxnComplete = () => txnObserver.complete();

          txn.addEventListener(IDB_COMPLETE, onTxnComplete);
          txn.addEventListener(IDB_ERROR, onTxnError);

          const makeRequest = (record: T) => {
            return new Observable((reqObserver: Observer<any>) => {
              let req: IDBRequest;
              if (recordSchema.primaryKey) {
                req = objectStore[actionName](record);
              } else {
                let $key = record['$key'];
                let $record = Object.assign({}, record);
                delete $record['$key'];
                req = objectStore[actionName]($record, $key);
              }
              req.addEventListener(IDB_SUCCESS, () => {
                let $key = req.result;
                reqObserver.next(mapper({ $key, record }));
              });
              req.addEventListener(IDB_ERROR, err => {
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

  executeModify<T>(
    storeName: string,
    records: T[],
    actionMap: (recordInDB: T, record: T) => ModifyAction
  ): Observable<T> {
    const open$ = this.open(this._schema.name);

    return open$.pipe(
      mergeMap(db => {
        return new Observable((observer: Observer<T>) => {
          const recordSchema = this._schema.stores[storeName];
          const mapper = this._mapRecord(recordSchema);
          const txn = db.transaction([storeName], IDB_TXN_READWRITE);
          const objectStore = txn.objectStore(storeName);

          const onTxnError = (err: any) => observer.error(err);
          const onTxnComplete = () => {
            observer.complete();
          };

          txn.addEventListener(IDB_COMPLETE, onTxnComplete);
          txn.addEventListener(IDB_ERROR, onTxnError);

          const makeRequest = record => {
            return new Observable((reqObserver: Observer<T>) => {
              let key = record[recordSchema.primaryKey];
              if (!key) {
                key = record['$key'];
              }
              let req = objectStore.get(key);

              req.addEventListener(IDB_ERROR, err => {
                reqObserver.error(err);
              });
              req.addEventListener(IDB_SUCCESS, _ => {
                const indb = req.result;
                const action = actionMap(indb, record);
                let request: IDBRequest;

                switch (action) {
                  case ModifyAction.add:
                  case ModifyAction.put:
                    if (recordSchema.primaryKey) {
                      request = (<any>objectStore[action])(record);
                    } else {
                      let $key = record['$key'];
                      let $record = Object.assign({}, record);
                      delete $record['$key'];
                      request = objectStore[action]($record, $key);
                    }

                    request.addEventListener(IDB_SUCCESS, () => {
                      let $key = request.result;
                      reqObserver.next(mapper({ $key, record }));
                      reqObserver.complete();
                    });
                    request.addEventListener(IDB_ERROR, err => {
                      reqObserver.error(err);
                    });
                    break;

                  case ModifyAction.delete:
                    key = recordSchema.primaryKey || record['$key'];
                    request = objectStore.delete(indb[key]);
                    request.onerror = err => reqObserver.error(err);
                    request.onsuccess = _ => {
                      reqObserver.next(indb);
                      reqObserver.complete();
                    };
                    break;

                  case ModifyAction.none:
                    reqObserver.complete();
                    break;

                  default:
                    reqObserver.complete();
                    throw new Error('action type error, must be one of ModifyAction value.');
                }
              });
            });
          };

          let requestSubscriber = from(records)
            .pipe(
              mergeMap(makeRequest)
              // tap(a => console.log(a), err => console.error(err), () => console.warn('aaaabbbb'))
            )
            .subscribe(observer);

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
    return this._dbFactory.cmp(a, b);
  }
}
