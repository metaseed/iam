import { Injectable } from '@angular/core';
import { IContainer } from 'core';
import { IMarkdownContainerStore } from './model/markdown.model';
import { StateSubject } from '@metaseed/rx-store';
import { Subject } from 'rxjs';

@Injectable()
export class MarkdownContainerStore implements IMarkdownContainerStore {
  viewer_ = new StateSubject<IContainer>();
  editor_ = new StateSubject<IContainer>();
  editorContentChanged_ = new StateSubject<string>();
  isLockScrollWithView_ = new Subject<boolean>();

}
