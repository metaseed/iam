import { Injectable } from '@angular/core';
import { State } from './state';
import { Store } from '@ngrx/store';
import { ReplaySubject } from 'rxjs';
import { IContainer } from 'core';
import { IMarkdownService } from './model/markdown.model';

@Injectable()
export class MarkdownService implements IMarkdownService {
  constructor(private store: Store<State>) {}

  viewer$ = new ReplaySubject<IContainer>(1);
  editor$ = new ReplaySubject<IContainer>(1);
  editorContentChanged$ = new ReplaySubject<string>(1);
}
