import { Component, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import * as document from '../../state/actions/document';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { select } from '@ngrx/store';
import * as fromMarkdown from './../../state';
import { DocumentMode } from './../../state/reducers/document';
import { MatToolbar } from '@angular/material';
import { Observable } from 'rxjs';
import { ScrollDown } from '../../state/actions/edit';
import { ScrollEvent } from 'core';
@Component({
  selector: 'ms-reader-toolbar',
  templateUrl: './reader-toolbar.component.html',
  styleUrls: ['./reader-toolbar.component.scss'],
  animations: [
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
        animate(
          '0.2s ease-out',
          style({
            opacity: 0,
            transform: 'translateY(-100%)'
          })
        )
      ])
    ])
  ]
})
export class ReaderToolbarComponent {
  @ViewChild('toolbar') toolbar: MatToolbar;
  isScrollDown: boolean | null = null;
  isPositionFixed: boolean;
  isEditMode: boolean;
  constructor(private store: Store<fromMarkdown.State>) {}

  isScrollDown$:Observable<ScrollEvent>;
  docMode$ = this.store.pipe(select(fromMarkdown.selectDocumentModeState));
  editWithView$ = this.store.pipe(select(fromMarkdown.selectDocumentShowPreviewState));
  editWithView: boolean;
  ngOnInit() {
    this.isScrollDown$ = this.store.pipe(select(fromMarkdown.selectViewScrollDownState));
    this.isScrollDown$.subscribe(value => {
      if(!value) return;
      this.isScrollDown = value.isDown;
      if (this.toolbar)
        this.isPositionFixed =
          (value.event.target as HTMLElement).scrollTop > this.toolbar._elementRef.nativeElement.offsetHeight;
    });
    this.editWithView$.subscribe(mode => {
      this.editWithView = mode;
    });
    this.docMode$.subscribe(mode => {
      switch (mode) {
        case DocumentMode.Edit: {
          this.isEditMode = true;
          break;
        }
        case DocumentMode.View: {
          this.isEditMode = false;
          break;
        }
      }
    });
  }

  onRefresh() {
    this.store.dispatch(new document.RefreshAction());
  }
  toEditMode() {
    this.isScrollDown = null;
    this.store.dispatch(new document.EditMode());
  }
}
