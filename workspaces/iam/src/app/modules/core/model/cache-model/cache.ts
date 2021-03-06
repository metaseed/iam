import { Observable } from 'rxjs';
import { DocMeta, DocContent, DocFormat, Document } from '../doc-model';
import { SearchResult } from '../doc-model';

export enum DataTables {
  DocMeta = 'doc_meta',
  DocContent = 'document',
  DirtyDocs = 'dirty_docs'
}

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

  readDocContent(id: number, title: string, format: string): Observable<DocContent>;

  UpdateDocument(oldDocMeta: DocMeta, content: string, forceUpdate: boolean): Observable<Document>;

  // return the id;  fault would be processed by observable error handler
  deleteDoc(id: number): Observable<number>;

  search(query: string): Observable<SearchResult>;
}
