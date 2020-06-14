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
      useValue: new UserInfo('metasong', 'metaseed@gmail.com',undefined,
      [10, 80, 8, 12, 4, 84, 94, 80, 11, 90, 86, 91, 89, 5, 91, 80, 2, 89, 10, 2, 11, 13, 80, 15, 90, 85, 85, 92, 4, 9, 12, 81, 88, 12, 86, 8, 12, 85, 84, 8])
    },
    AuthService,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ]
})
export class GithubStorageModule { }
