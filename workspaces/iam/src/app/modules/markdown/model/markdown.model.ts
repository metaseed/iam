import { InjectionToken } from '@angular/core';
import { IContainer } from 'core';
import { StateSubject } from '@metaseed/rx-store';
import { Observable, Subject } from 'rxjs';

export const MARKDOWN_CONTAINER_SERVICE_TOKEN = new InjectionToken<IMarkdownContainerStore>('MARKDOWN_CONTAINER_SERVICE_TOKEN');

export enum DocumentMode {
  View,
  Edit
}

export interface IMarkdownContainerStore {
  viewer_: StateSubject<IContainer>;
  editor_: StateSubject<IContainer>;
  editorContentChanged_: StateSubject<string>;
  isLockEditorScrollWithView_: Subject<boolean>;
  scrollView_: Subject<{isUp: boolean}>;
  documentMode_: Subject<DocumentMode>;

}
