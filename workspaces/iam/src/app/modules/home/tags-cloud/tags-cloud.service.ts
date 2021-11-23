import { Injectable } from '@angular/core';
import { GithubStorage } from 'net-storage';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Injectable()
export class TagsCloudService {
  constructor(private githubStorage: GithubStorage) {

  }

  getAllTags() {
    return this.githubStorage.init().pipe(
      switchMap(repo => {
        return repo.issue.listRepoLabels() as Observable<Tag[]>
      })
    )
  }
  deleteTag(label: string){
    return this.githubStorage.init().pipe(
      switchMap(repo=> {
        return repo.issue.deleteLabel(label);
      })
    );
  }

}

export interface Tag {name: string, description?: string, color? :string}
