import { Injectable } from '@angular/core';
import { DocumentStore } from 'app/modules/shared/store/document.store';
import { NET_COMMU_TIMEOUT, Tag } from 'core';
import { GithubStorage } from 'net-storage';
import { EffectManager, EffectStateSubject, OperationStatusConsoleReporter } from 'packages/rx-store/src/effect';
import { Observable, pipe } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class TagsCloudService extends EffectManager{
  constructor(private githubStorage: GithubStorage, private docStore: DocumentStore) {
    super();
    this.addReporter(new OperationStatusConsoleReporter());

  }

  getAllTags = new EffectStateSubject<undefined>().addMonitoredEffect(
    effectInfo => pipe(
      switchMap(state => {
        return this.githubStorage.init().pipe(
          switchMap(repo => {
            return repo.issue.listAllRepoLabels().pipe(tap(
              (tags: Tag[]) => this.docStore.tags.upsertMany(tags)
            )) as Observable<Tag[]>;
          })
        )
      }),
      tap(tags=> effectInfo.success(tags))
    ),
    { type: '[TagsCloudService]getAllTags', timeOut: NET_COMMU_TIMEOUT }
  )

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
