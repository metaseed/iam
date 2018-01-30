import { Component, AfterViewInit, Input } from '@angular/core';
import { DocumentRef, Scrollable } from 'core';
import { Store } from '@ngrx/store';
import * as fromDocument from '../../reducers/document';
import * as document from '../../actions/document';
import * as reducers from '../../reducers';
import * as fromView from '../../reducers/view'
import {
  trigger,
  state,
  style,
  animate,
  transition
} from '@angular/animations';
import { MarkdownViewerComponent } from '../markdown-viewer.component';
import { select } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'ms-reader-toolbar',
  templateUrl: './reader-toolbar.component.html',
  styleUrls: ['./reader-toolbar.component.scss'],
  animations: [
    trigger('show', [
      state('true', style({ height: '*' })),
      transition('* => void', [
        style({ height: '*' }),
        animate(250, style({ height: 0 }))
      ])
    ])
  ]

})
export class ReaderToolbarComponent {

  isScrollDown: boolean;
  constructor(private store: Store<reducers.State>) {
  }
  isScrollDown$;
  ngOnInit() {
    this.isScrollDown$ = this.store.pipe(select(reducers.selectViewScrollDownState));
    this.isScrollDown$.subscribe(value => {
      this.isScrollDown = value;
    })

  }

  toEditMode(event) {
    this.store.dispatch(new document.EditMode());
  }
}
