import { ICache, Logger, NET_CACHE_TOKEN, DB_CACHE_TOKEN } from 'core';
import { Injectable, Inject } from '@angular/core';
import { Store, State } from '@ngrx/store';
import { SharedState } from './state/state';
import { SetIdRangeLow, SetIdRangeHigh } from './state/document/document.actions';
import { StoreCache, StoreSearchService } from '../cache';
import { DocumentsEffects, DOCUMENT_EFFECTS_TOKEN } from './store';
@Injectable({
  providedIn: 'platform'
})
export class CacheFacade extends StoreCache {
  constructor(
    store: Store<SharedState>,
    state: State<SharedState>,
    _logger: Logger,
    storeSearchService: StoreSearchService,
    @Inject(NET_CACHE_TOKEN) githubCache: ICache,
    @Inject(DB_CACHE_TOKEN) dbCache: ICache,
    @Inject(DOCUMENT_EFFECTS_TOKEN) documentEffects: DocumentsEffects
  ) {
    super(store, state, _logger, storeSearchService, documentEffects);
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
