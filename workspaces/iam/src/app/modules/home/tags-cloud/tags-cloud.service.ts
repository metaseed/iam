import { Injectable } from '@angular/core';
import { DocumentStore } from 'app/modules/shared/store/document.store';
import { Tag } from 'core';
import { GithubStorage } from 'net-storage';
import { concat, Observable, of } from 'rxjs';
import { switchMap, take, tap } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class TagsCloudService {
  constructor(private githubStorage: GithubStorage, private docStore: DocumentStore) {

  }

  getAllTags() {
    return this.githubStorage.init().pipe(
      switchMap(repo => {
        const fromRemote=repo.issue.listAllRepoLabels().pipe(tap(
          (tags: Tag[]) => this.docStore.tags.upsertMany(tags)
        )) as Observable<Tag[]>;
        // should not use this.docStore.tags.values$, because it's never complete.
        const fromStore= of(this.docStore.tags.values$.state);
        return concat(fromStore,fromRemote);
      })
    )
  }
  deleteTag(label: string) {
    return this.githubStorage.init().pipe(
      switchMap(repo => {
        return repo.issue.deleteLabel(label);
      })
    );
  }

  addTag(tag: Tag) {
    return this.githubStorage.init().pipe(
      switchMap(repo => {
        return repo.issue.createLabel({ name: tag.name, color: tag.color, description: tag.description });
      })
    )
  }

  getTag(name) {
    return this.githubStorage.init().pipe(
      switchMap(repo => {
        return repo.issue.getLabel(name);
      })
    )
  }
  updateTag(originalName: string, tag: Tag) {
    return this.githubStorage.init().pipe(
      switchMap(repo => {
        return repo.issue.editLabel(originalName, { new_name: tag.name, color: tag.color, description: tag.description });
      })
    )
  }
  listDocuments(tag) {
    return this.githubStorage.init().pipe(
      switchMap(repo => {
        return repo.issue.listAllIssues({ labels: tag.name });
      })
    )
  }

}
