import { Component, ViewChild, Inject, OnInit, OnDestroy, HostBinding } from '@angular/core';
import { Store } from '@ngrx/store';
import * as document from '../../state/actions/document';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { select } from '@ngrx/store';
import * as fromMarkdown from './../../state';
import { DocumentMode } from './../../state/reducers/document';
import { MatToolbar } from '@angular/material';
import { Observable, Subject } from 'rxjs';
import { MARKDOWN_SERVICE_TOKEN, IMarkdownService } from '../../model/markdown.model';
import { map, share, tap, takeUntil } from 'rxjs/operators';
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
  constructor(
    private store: Store<fromMarkdown.State>,
    @Inject(MARKDOWN_SERVICE_TOKEN) private markdownService: IMarkdownService
  ) {}


  // _viewerScroll$ = this.markdownService.viewerScroll$.pipe(share());
  // isScrollDown$ = this._viewerScroll$.pipe(
  //   map(v => {
  //     return v.isDown;
  //   })
  // );
  // isPositionFixed$ = this._viewerScroll$.pipe(
  //   map(v => {
  //     if (this.toolbar && v.scrollTop > this.toolbar._elementRef.nativeElement.offsetHeight) {
  //       return true;
  //     }
  //     return false;
  //   })
  // );

  // [style.position]="(isPositionFixed$|async)?'fixed':'relative'"
  // @HostBinding('style.width') width = '100%';
  // @HostBinding('style.position') position;

  ngOnInit() {
    // this.markdownService.viewerScroll$.subscribe(value => {});
    // this.isPositionFixed$
    //   .pipe(
    //     takeUntil(this.destroy$),
    //     map(v => {
    //       return v ? 'fixed' : 'relative';
    //     })
    //   )
    //   .subscribe(v => (this.position = v));
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
