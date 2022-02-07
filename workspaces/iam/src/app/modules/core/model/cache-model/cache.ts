import { Observable } from 'rxjs';
import { DocMeta, DocContent, DocFormat, Document } from '../doc-model';
import { SearchResult } from '../doc-model';

export enum DataTables {
  DocMeta = 'doc_meta',
  DocContent = 'document',
  DirtyDocs = 'dirty_docs'
}
export const AUTO_SAVE_TO_STORE_AFTER_LAST_EDIT_INTERVAL = 800;
export const AUTO_SAVE_TO_DB_AFTER_LAST_EDIT_INTERVAL = 10 * 1000; // 10s
export const AUTO_SAVE_DIRTY_DOCS_IN_DB_INTERVAL = 5 * 60 * 1000; //5min

export interface ICache {
  nextLevelCache: ICache;

  init(nextLevelCache: ICache, ...args): ICache;

  CreateDocument(content: string, format: DocFormat): Observable<Document>;

  /**
   * @param id   undefined: initial fetch
   *              Number.MAX_VALUE: refresh
   * @param isBelowTheId (..., id] (id,...]
   *  true:  the result include the record at id.
   *  false: the result not include the record at id.
   */
  readBulkDocMeta(id: number, isBelowTheId: boolean): Observable<DocMeta[]>;

  readDocMeta(id: number, checkNextCache?: boolean): Observable<DocMeta>;

  readDocContent(id: number,  format: string): Observable<DocContent>;

  updateDocument(oldDocMeta: DocMeta, content: DocContent, forceUpdate: boolean, changeLog: string): Observable<Document>;

  // return the id;  fault would be processed by observable error handler
  deleteDoc(id: number): Observable<number>;

  search(query: string): Observable<SearchResult>;
}
