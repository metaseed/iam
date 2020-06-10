import { ICache, Logger, NET_CACHE_TOKEN, DB_CACHE_TOKEN } from 'core';
import { Injectable, Inject } from '@angular/core';
import { Store, State } from '@ngrx/store';
import { SharedState } from './state/state';
import { SetIdRangeLow, SetIdRangeHigh } from './state/document/document.actions';
import { StoreCache, StoreSearchService } from '../cache';
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
