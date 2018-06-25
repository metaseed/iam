import { Database } from './database-engine';
import { Injectable } from '@angular/core';
import { Document, DocMeta } from 'core';
import { Observable, throwError, combineLatest, of, from } from 'rxjs';
import { toArray, tap, switchMap, concat, map } from 'rxjs/operators';
import { ICache, DataTables } from 'core';
import { GithubCache } from 'net-storage';

const DB_PAGE_SIZE = 20;
export interface IterableDocuments extends IterableIterator<Observable<Document>> {}
@Injectable()
export class DatabaseCache implements ICache {
  constructor(private db: Database, public nextLevelCache: GithubCache) {}

  readBulkDocMeta(key: number, isBelowTheKey: boolean): Observable<DocMeta[]> {
    const keyRange = isBelowTheKey
      ? IDBKeyRange.upperBound(key)
      : IDBKeyRange.lowerBound(key, true);
    const dir = isBelowTheKey ? 'next' : 'prev';

    const FromDB$ = this.db
      .query<DocMeta>(DataTables.DocumentMeta, keyRange, dir, DB_PAGE_SIZE)
      .pipe(toArray());

    // only notify the change in the later array: add, remove, modify
    const fromNext$ = this.nextLevelCache.readBulkDocMeta(key, isBelowTheKey);

    const update$ = combineLatest(FromDB$, fromNext$).pipe(
      switchMap(([arrayInDB, arrayFromNet]) => {
        const docMetaUpsert = new Array<DocMeta>();
        const docMetaDelete = new Array<DocMeta>();

        arrayFromNet.forEach(fromNet => {
          if (fromNet.isDeleted) {
            const indb = arrayInDB.find(v => v.number === fromNet.number);
            if (indb) docMetaDelete.push(indb);
          } else {
            const indb = arrayInDB.find(v => v.number === fromNet.number);
            if (indb) {
              if (indb.updateDate < fromNet.updateDate) {
                docMetaUpsert.push(indb);
              }
            } else {
              docMetaUpsert.push(indb);
            }
          }
        });

        this.db
          .upsert(DataTables.DocumentMeta, docMetaUpsert)
          .subscribe(a => console.log('writeDB:' + a.number));
        this.db
          .delete(DataTables.DocumentMeta, docMetaDelete)
          .subscribe(a => console.log('deleted:' + a.number));

        return from([docMetaDelete, docMetaUpsert]);
      })
    );
    return FromDB$.pipe(concat(update$));
  }
}
// todo: up low key state value;
