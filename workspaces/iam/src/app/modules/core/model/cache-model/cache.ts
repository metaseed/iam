import { Observable } from "rxjs";
import { DocMeta, DocContent } from "../doc-model";

export enum DataTables {
  DocMeta = 'doc_meta',
  DocContent = 'document'
}

export interface ICache {

  nextLevelCache: ICache;

  /**
   * isBelowKey =
   *  true:  the result include the record at key.
   *  false: the result not include the record at key.
   * @param isBelowTheKey
   */
  init(nextLevelCache: ICache):ICache;

  /**
   *
   * @param id   undefined: initial fetch
   *              Number.MAX_VALUE: refresh
   * @param isBelowTheKey
   */
  readBulkDocMeta(id: number, isBelowTheKey:boolean): Observable<DocMeta[]>;

  readDocMeta(id: number, checkNextCache?:boolean):Observable<DocMeta>;

  readDocContent(id:number, title:string, format: string): Observable<DocContent>;
}


