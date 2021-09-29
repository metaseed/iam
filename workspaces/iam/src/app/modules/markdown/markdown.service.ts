import { Injectable } from '@angular/core';
import { MarkdownState } from './state';
import { Store } from '@ngrx/store';
import { ReplaySubject, Subject } from 'rxjs';
import { IContainer } from 'core';
import { IMarkdownService } from './model/markdown.model';

@Injectable()
export class MarkdownService implements IMarkdownService {
  constructor(private store: Store<MarkdownState>) {}

  viewer$ = new ReplaySubject<IContainer>(1);
  editor$ = new ReplaySubject<IContainer>(1);
  editorContentChanged$ = new Subject<string>();
}
