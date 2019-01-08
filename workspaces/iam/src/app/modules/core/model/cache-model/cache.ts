import { Observable } from 'rxjs';
import { DocMeta, DocContent, DocFormat, Document } from '../doc-model';
import { SearchResult } from '../doc-model';

export enum DataTables {
  DocMeta = 'doc_meta',
  DocContent = 'document'
}

export interface ICache {
  nextLevelCache: ICache;

  init(nextLevelCache: ICache, ...args): ICache;

  CreateDocument(conternt: string, format: DocFormat): Observable<Document>;

  /**
   * @param id   undefined: initial fetch
   *              Number.MAX_VALUE: refresh
   * @param isBelowTheId
   *  true:  the result include the record at id.
   *  false: the result not include the record at id.
   */
  readBulkDocMeta(id: number, isBelowTheId: boolean): Observable<DocMeta[]>;

  readDocMeta(id: number, checkNextCache?: boolean): Observable<DocMeta>;

  readDocContent(id: number, title: string, format: string): Observable<DocContent>;

  UpdateDocument(oldDocMeta: DocMeta, content: string): Observable<Document>;

  // retrun the id;  fault would be processed by observable error hanlder
  deleteDoc(id: number): Observable<number>;

  search(query: string): Observable<SearchResult>;
}
