import { Observable } from 'rxjs';
import { DocMeta, DocContent, DocFormat, Document } from '../doc-model';

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
  init(nextLevelCache: ICache, ...args): ICache;

  CreateDocument(conternt: string, format: DocFormat): Observable<Document>;
  /**
   *
   * @param id   undefined: initial fetch
   *              Number.MAX_VALUE: refresh
   * @param isBelowTheId
   */
  readBulkDocMeta(id: number, isBelowTheId: boolean): Observable<DocMeta[]>;

  readDocMeta(id: number, checkNextCache?: boolean): Observable<DocMeta>;

  readDocContent(id: number, title: string, format: string): Observable<DocContent>;

  UpdateDocument(oldDocMeta: DocMeta, content: string): Observable<Document>;
  deleteDoc(id: number): Observable<number>; //retrun the id;  false is processed by observable error hanlder
}
