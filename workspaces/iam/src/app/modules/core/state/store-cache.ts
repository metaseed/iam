import { DataTables, ICache, DocMeta } from '../model';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DatabaseCache } from 'database';

@Injectable()
export class StoreCache implements ICache {
  docMetaData: { hightKey: number; lowKey: number };

  constructor(public nextLevelCache:DatabaseCache){}

  readBulkDocMeta(key: number, isBelowTheKey = true): Observable<DocMeta[]> {

    const ob = this.nextLevelCache.readBulkDocMeta(key,isBelowTheKey);
    return ob;
  }
}
