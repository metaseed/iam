import { Injectable } from '@angular/core';
import { IContainer } from 'core';
import { DocumentMode, IMarkdownStore } from './model/markdown.model';
import { StateSubject } from '@metaseed/rx-store';
import { Subject } from 'rxjs';

@Injectable()
export class MarkdownStore implements IMarkdownStore {
  viewer_ = new StateSubject<IContainer>();
  editor_ = new StateSubject<IContainer>();
  editorContentChanged_ = new StateSubject<string>();
  isLockEditorScrollWithView_ = new Subject<boolean>();
  scrollView_ = new Subject<{ isUp: boolean }>();
  documentMode_ = new StateSubject<DocumentMode>(DocumentMode.View);
  editWithPreview_ = new StateSubject<boolean>();
  editIt_ = new Subject<{ element?: HTMLElement; sourceLine: [number, number] }>();

}
