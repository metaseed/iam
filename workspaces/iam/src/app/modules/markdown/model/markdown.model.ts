import { InjectionToken } from '@angular/core';
import { IContainer } from 'core';
import { StateSubject } from '@rx-store/core';
import { Subject } from 'rxjs';

export const MARKDOWN_STORE_TOKEN = new InjectionToken<IMarkdownStore>('MARKDOWN_STORE_TOKEN');

export enum DocumentMode {
  View,
  Edit
}

export interface IMarkdownStore {
  viewer_: StateSubject<IContainer>;
  editor_: StateSubject<IContainer>;
  isLockEditorScrollWithView_: Subject<boolean>;
  scrollView_: Subject<{isUp: boolean}>;
  documentMode_: Subject<DocumentMode>;
  editWithPreview_: StateSubject<boolean>;
  editIt_: Subject<{ element?: HTMLElement; sourceLine: [number, number] }>;

}
