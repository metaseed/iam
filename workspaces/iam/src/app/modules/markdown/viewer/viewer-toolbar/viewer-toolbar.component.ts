import { Component, ViewChild, Inject, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import * as document from '../../state/actions/document';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { select } from '@ngrx/store';
import * as fromMarkdown from './../../state';
import { DocumentMode } from './../../state/reducers/document';
import { MatToolbar } from '@angular/material';
import { Observable, Subject } from 'rxjs';
import { ScrollEvent } from 'core';
import { MARKDOWN_SERVICE_TOKEN, IMarkdownService } from '../../model/markdown.model';
import { map, share } from 'rxjs/operators';
@Component({
  selector: 'ms-viewer-toolbar',
  templateUrl: './viewer-toolbar.component.html',
  styleUrls: ['./viewer-toolbar.component.scss'],
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
export class ViewerToolbarComponent implements OnInit, OnDestroy {
  @ViewChild('toolbar') toolbar: MatToolbar;
  private destroy$ = new Subject();
  isEditMode: boolean;
  constructor(
    private store: Store<fromMarkdown.State>,
    @Inject(MARKDOWN_SERVICE_TOKEN) private markdownService: IMarkdownService
  ) {}
  DocumentMode = DocumentMode;
  docMode$ = this.store.pipe(select(fromMarkdown.selectDocumentModeState));
  editWithView$ = this.store.pipe(select(fromMarkdown.selectDocumentShowPreviewState));

  _viewerScroll$ = this.markdownService.viewerScroll$.pipe(share());
  isScrollDown$ = this._viewerScroll$.pipe(
    map(v => {

      return v.isDown;
    })
  );
  isPositionFixed$ = this._viewerScroll$.pipe(
    map(v => {
      if (this.toolbar) return;
      (v.event.target as HTMLElement).scrollTop >
        this.toolbar._elementRef.nativeElement.offsetHeight;
      return false;
    })
  );
  ngOnInit() {
    this.markdownService.viewerScroll$.subscribe(value => {});
  }

  ngOnDestroy() {
    this.destroy$.next();
  }

  onRefresh() {
    this.store.dispatch(new document.RefreshAction());
  }
  toEditMode() {
    this.store.dispatch(new document.EditMode());
  }
}
