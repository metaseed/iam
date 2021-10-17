import { Injectable } from '@angular/core';
import { IContainer } from 'core';
import { DocumentMode, IMarkdownContainerStore } from './model/markdown.model';
import { StateSubject } from '@metaseed/rx-store';
import { Subject } from 'rxjs';

@Injectable()
export class MarkdownContainerStore implements IMarkdownContainerStore {
  viewer_ = new StateSubject<IContainer>();
  editor_ = new StateSubject<IContainer>();
  editorContentChanged_ = new StateSubject<string>();
  isLockEditorScrollWithView_ = new Subject<boolean>();
  scrollView_ = new Subject<{ isUp: boolean }>();
  documentMode_ = new StateSubject<DocumentMode>(DocumentMode.View);
  editWithPreview_ = new StateSubject<boolean>();
}
