import { Injectable } from '@angular/core';
import { GithubStorage } from 'net-storage';
import { switchMap } from 'rxjs/operators';

@Injectable()
export class DocumentHistoryService {
  constructor(private githubStorage: GithubStorage) {

  }

  getHistory(id: string, format: string) {
    return this.githubStorage.init().pipe(
      switchMap(repo => {
        return repo.listCommits({ path: `documents/${id}.${format}` })
      })
    )
  }

  getHistoryVersion(id: string, format: string, sha: string) {
    // https://api.github.com/repos/metasong/iam-data/contents/documents/140.md?ref=master
    return this.githubStorage.init().pipe(
      switchMap(repo => {
        return repo.getContents(`documents/${id}.${format}`, sha);
      })
    )
  }

}
