import { ICache, Logger, NET_CACHE_TOKEN, DB_CACHE_TOKEN } from 'core';
import { StoreCache } from './store-cache';
import { Injectable, Inject } from '@angular/core';
import { SetIdRangeLow, SetIdRangeHigh, SharedState } from 'shared';
import { Store, State } from '@ngrx/store';
import { StoreSearchService } from './services/store-search.service';
@Injectable()
export class CacheFacade extends StoreCache {
  constructor(
    store: Store<SharedState>,
    state: State<SharedState>,
    _logger: Logger,
    storeSearchService: StoreSearchService,
    @Inject(NET_CACHE_TOKEN) githubCache: ICache,
    @Inject(DB_CACHE_TOKEN) dbCache: ICache
  ) {
    super(store, state, _logger, storeSearchService);
    this.init(
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
