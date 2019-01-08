import { NgModule } from '@angular/core';
import { GITHUB_AUTHENTICATION } from './tokens';
import { UserInfo } from './user-info';
import { GithubStorage } from './github';
import { AuthService } from './auth.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './auth-interceptor';

@NgModule({
  imports: [],
  exports: [],
  providers: [
    GithubStorage,
    {
      provide: GITHUB_AUTHENTICATION,
      useValue: new UserInfo('metasong', 'metaseed@gmail.com', 'mssong179')
    },
    AuthService,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ]
})
export class GithubStorageModule {}
