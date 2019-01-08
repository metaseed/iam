import { NgModule } from '@angular/core';
import { DatabaseModule } from 'database';
import { DB_CACHE_TOKEN, NET_CACHE_TOKEN, STORE_CACHE_TOKEN, CACHE_FACADE_TOKEN } from 'core';
import { DatabaseCache } from './database-cache';
import { NetStorageModule } from 'net-storage';
import { GithubCache } from './github-cache';
import { gitHubCacheUtil } from './github-cache.util';
import { StoreCache } from './store-cache';
import { StoreSearchService } from './services/store-search.service';

@NgModule({
  imports: [DatabaseModule, NetStorageModule],
  exports: [],
  providers: [
    { provide: DB_CACHE_TOKEN, useClass: DatabaseCache },
    { provide: NET_CACHE_TOKEN, useClass: GithubCache },
    { provide: STORE_CACHE_TOKEN, useClass: StoreCache },
    gitHubCacheUtil,
    StoreSearchService
  ]
})
export class CacheModule {}
