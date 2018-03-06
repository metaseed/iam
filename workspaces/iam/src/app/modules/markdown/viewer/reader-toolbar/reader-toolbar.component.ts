import { Component, AfterViewInit, Input, ViewChild, ElementRef } from '@angular/core';
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
import { MdcToolbar } from '@angular-mdc/web';

@Component({
  selector: 'ms-reader-toolbar',
  templateUrl: './reader-toolbar.component.html',
  styleUrls: ['./reader-toolbar.component.scss']
  , animations: [
    trigger('show', [
      state('true', style({ opacity: 1, transform: 'translateY(0)' })),
      transition('void => true', [
        style({
          opacity: 0,
          transform: 'translateY(-100%)'
        }),
        animate('0.2s ease-in')
      ]),
      transition('true => void', [
        animate('0.2s ease-out', style({
          opacity: 0,
          transform: 'translateY(-100%)'
        }))
      ])
    ])
  ]

})
export class ReaderToolbarComponent {

  @ViewChild('toolbar')
  toolbar: MdcToolbar;
  isScrollDown: boolean | null = null;
  isPositionFixed: boolean;
  constructor(private store: Store<reducers.State>) {
  }
  isScrollDown$;
  ngOnInit() {
    this.isScrollDown$ = this.store.pipe(select(reducers.selectViewScrollDownState));
    this.isScrollDown$.subscribe(value => {
      this.isScrollDown = value.isDown;
      if (this.toolbar)
        this.isPositionFixed = value.scroll.target.scrollTop > this.toolbar.elementRef.nativeElement.offsetHeight;
    })

  }

  toEditMode(event) {
    this.store.dispatch(new document.EditMode());
  }
}
