import { NgModule } from '@angular/core';
import { GITHUB_AUTHENTICATION } from './tokens';
import { UserInfo } from './user-info';
import { GithubStorage } from './github';

@NgModule({
  imports: [],
  exports: [],
  providers: [
    GithubStorage,
    {
      provide: GITHUB_AUTHENTICATION,
      useValue: new UserInfo('metasong', 'metaseed@gmail.com', 'mssong179')
    }
  ]
})
export class GithubStorageModule {}
