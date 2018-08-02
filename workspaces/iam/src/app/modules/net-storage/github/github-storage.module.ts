import { NgModule } from '@angular/core';
import { GITHUB_AUTHENTICATION } from './tokens';
import { UserInfo } from './user-info';
import { GithubStorage } from './github';
import { AuthService } from './auth.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './auth-interceptor';
import { GithubCache } from './github-cache';
import { gitHubCacheUtil } from './github-cache.util';
import { NET_CACHE_TOKEN } from 'core';

@NgModule({
  imports: [],
  exports: [],
  providers: [
    { provide: NET_CACHE_TOKEN, useClass: GithubStorage },
    gitHubCacheUtil,
    GithubCache,
    {
      provide: GITHUB_AUTHENTICATION,
      useValue: new UserInfo('metasong', 'metaseed@gmail.com', 'mssong179')
    },
    AuthService,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ]
})
export class GithubStorageModule {}
