import { Injectable } from '@angular/core';
import { Observable, ReplaySubject, Subject } from 'rxjs';
import { IContainer } from 'core';
import { IMarkdownContainerService } from './model/markdown.model';

@Injectable()
export class MarkdownContainerService implements IMarkdownContainerService {
  markdown$:Observable<string>;

  viewer$ = new ReplaySubject<IContainer>(1);
  editor$ = new ReplaySubject<IContainer>(1);
  editorContentChanged$ = new Subject<string>();

}
