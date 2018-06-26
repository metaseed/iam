import { Observable } from "rxjs";
import { DocMeta } from "../doc-model";

export enum DataTables {
  DocumentMeta = 'documents'
}

export interface ICache {
  /**
   * isBelowKey =
   *  true:  the result include the record at key.
   *  false: the result not include the record at key.
   * @param key
   * @param isBelowTheKey
   */
  init(nextLevelCache: ICache):ICache;

  readBulkDocMeta(key: number, isBelowTheKey:boolean): Observable<DocMeta[]>;
  nextLevelCache: ICache;
}


