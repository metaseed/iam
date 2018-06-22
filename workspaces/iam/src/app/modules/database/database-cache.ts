import { Database } from './database-engine';
import { Injectable } from '@angular/core';
import { Document, DocMeta } from 'core';
import { Observable, throwError } from 'rxjs';
import { toArray, tap, switchMap, concat } from 'rxjs/operators';
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
    const FromNext$ = this.nextLevelCache.readBulkDocMeta(key, isBelowTheKey).pipe(
      tap(array => {
        this.db.upsert(DataTables.DocumentMeta, array).subscribe(a => console.log('writeDB' + a));
      })
    );
    return FromDB$.pipe(concat(FromNext$));
  }
}
// todo: up low key state value;
