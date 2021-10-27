import { ICache, Logger, NET_CACHE_TOKEN, DB_CACHE_TOKEN, DocContent, DocFormat, DocMeta, Document, SearchResult, STORE_CACHE_TOKEN } from 'core';
import { Injectable, Inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { SharedState } from './state/state';
import { SetIdRangeLow, SetIdRangeHigh } from './state/document/document.actions';
@Injectable({
  providedIn: 'platform'
})
export class CacheFacade{
  constructor(
    store: Store<SharedState>,
    _logger: Logger,
    @Inject(NET_CACHE_TOKEN) githubCache: ICache,
    @Inject(DB_CACHE_TOKEN) dbCache: ICache,
    @Inject(STORE_CACHE_TOKEN) private storeCache: ICache,
  ) {
    (this as any).__proto__ = storeCache;
    storeCache.init(
      dbCache.init(
        githubCache.init(
          undefined,
          id => {
            store.dispatch(new SetIdRangeLow({ idRangeLow: id }));
          },
          id => {
            store.dispatch(new SetIdRangeHigh({ idRangeHigh: id }));
          }
        )
      )
    );
  }
  // init(nextLevelCache: ICache, ...args: any): ICache {
  //   return this.storeCache.init(nextLevelCache, ...args);
  // }
  // CreateDocument(content: string, format: DocFormat): Observable<Document> {
  //   return this.storeCache.CreateDocument(content, format);
  // }
  // readBulkDocMeta(id: number, isBelowTheId: boolean): Observable<DocMeta[]> {
  //   return this.storeCache.readBulkDocMeta(id, isBelowTheId);
  // }
  // readDocMeta(id: number, checkNextCache?: boolean): Observable<DocMeta> {
  //   return this.storeCache.readDocMeta(id, checkNextCache);
  // }
  // readDocContent(id: number, title: string, format: string): Observable<DocContent> {
  //   return this.storeCache.readDocContent(id, title, format);
  // }
  // updateDocument(oldDocMeta: DocMeta, content: string, forceUpdate: boolean): Observable<Document> {
  //   return this.storeCache.updateDocument(oldDocMeta, content, forceUpdate);
  // }
  // deleteDoc(id: number): Observable<number> {
  //   return this.storeCache.deleteDoc(id);
  // }
  // search(query: string): Observable<SearchResult> {
  //   return this.storeCache.search(query);
  // }
}
