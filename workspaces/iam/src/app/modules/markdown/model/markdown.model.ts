import { InjectionToken } from '@angular/core';
import { Observable } from 'rxjs';
import { IContainer } from 'core';

export const MARKDOWN_CONTAINER_SERVICE_TOKEN = new InjectionToken('MARKDOWN_CONTAINER_SERVICE_TOKEN');

export interface IMarkdownContainerService {
  viewer$: Observable<IContainer>;
  editor$: Observable<IContainer>;
  editorContentChanged$: Observable<string>;
}
