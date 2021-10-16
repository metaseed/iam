import { Injectable } from '@angular/core';
import { Observable, ReplaySubject, Subject } from 'rxjs';
import { IContainer } from 'core';
import { IMarkdownContainerService } from './model/markdown.model';
import { StateSubject } from '@metaseed/rx-store';

@Injectable()
export class MarkdownContainerService implements IMarkdownContainerService {
  markdown$:Observable<string>;

  viewer_ = new StateSubject<IContainer>();
  editor_ = new StateSubject<IContainer>();
  editorContentChanged$ = new Subject<string>();

}
