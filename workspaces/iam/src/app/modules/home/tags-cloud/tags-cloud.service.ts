import { Injectable } from '@angular/core';
import { GithubStorage } from 'net-storage';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Injectable({providedIn:'root'})
export class TagsCloudService {
  constructor(private githubStorage: GithubStorage) {

  }

  getAllTags() {
    return this.githubStorage.init().pipe(
      switchMap(repo => {
        return repo.issue.listAllRepoLabels() as Observable<Tag[]>
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

  addTag(tag: Tag){
    return this.githubStorage.init().pipe(
      switchMap(repo=>{
        return repo.issue.createLabel({name:tag.name, color: tag.color, description: tag.description});
      })
    )
  }

  getTag(name){
    return this.githubStorage.init().pipe(
      switchMap(repo=>{
        return repo.issue.getLabel(name);
      })
    )
  }
  updateTag(originalName:string,tag: Tag){
    return this.githubStorage.init().pipe(
      switchMap(repo=>{
        return repo.issue.editLabel(originalName, {new_name:tag.name, color: tag.color, description: tag.description});
      })
    )
  }
  listDocuments(tag){
    return this.githubStorage.init().pipe(
      switchMap(repo=>{
        return repo.issue.listAllIssues({labels:tag.name});
      })
    )
  }

}

export interface Tag {name: string, description?: string, color? :string}
