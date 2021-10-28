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

}
