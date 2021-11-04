import { ICache, Logger, NET_CACHE_TOKEN, DB_CACHE_TOKEN, STORE_CACHE_TOKEN } from 'core';
import { Injectable, Inject } from '@angular/core';
import { DocumentStore } from './store/document.store';
@Injectable({
  providedIn: 'platform'
})
export class CacheFacade{
  constructor(
    store: DocumentStore,
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
            store.idRangeLow_.next(id);
          },
          id => {
            store.idRangHigh_.next(id);
          }
        )
      )
    );
  }

}
