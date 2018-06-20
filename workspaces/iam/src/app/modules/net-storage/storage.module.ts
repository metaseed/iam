import { NgModule } from '@angular/core';
import { GithubStorageModule } from './github/github-storage.module';


@NgModule({
  imports: [GithubStorageModule],
  exports: [GithubStorageModule],
  providers: [],
})
export class StorageModule { }
