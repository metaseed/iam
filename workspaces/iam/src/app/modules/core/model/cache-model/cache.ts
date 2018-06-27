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

  /**
   *
   * @param key   undefined: initial fetch
   *              Number.MAX_VALUE: refresh
   * @param isBelowTheKey
   */
  readBulkDocMeta(key: number, isBelowTheKey:boolean): Observable<DocMeta[]>;
  nextLevelCache: ICache;
}


