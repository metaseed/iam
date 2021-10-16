import { InjectionToken } from '@angular/core';
import { IContainer } from 'core';
import { StateSubject } from '@metaseed/rx-store';

export const MARKDOWN_CONTAINER_SERVICE_TOKEN = new InjectionToken<IMarkdownContainerStore>('MARKDOWN_CONTAINER_SERVICE_TOKEN');

export interface IMarkdownContainerStore {
  viewer_: StateSubject<IContainer>;
  editor_: StateSubject<IContainer>;
  editorContentChanged_: StateSubject<string>;
}
