import { Component, Input, AfterViewInit, Inject, NgZone } from '@angular/core';
import {
  MSG_DISPLAY_TIMEOUT,
  NET_COMMU_TIMEOUT,
  ContainerRef,
  ScrollEvent,
  IContainer,
  DocumentRef
} from 'core';
import { ViewChild } from '@angular/core';
import * as markdown from '../state';
import { Store, select } from '@ngrx/store';
import { ElementRef } from '@angular/core';
import { Subject, merge, asyncScheduler, Observable } from 'rxjs';
import { DocumentEffectsActionType, monitorActionStatus$, actionStatusState$ } from 'shared';
import { DocumentMode } from '../state/reducers/document';
import * as fromMarkdown from '../state';

import { takeUntil, map, observeOn, switchMap } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MARKDOWN_SERVICE_TOKEN, IMarkdownService } from '../model/markdown.model';
import { PlatformLocation } from '@angular/common';
import { EditItAction, selectViewState } from '../state';

@Component({
  selector: 'markdown-viewer-container',
  templateUrl: './markdown-viewer-container.component.html',
  styleUrls: ['./markdown-viewer-container.component.scss']
})
export class MarkdownViewerContainerComponent implements AfterViewInit {
  destroy$ = new Subject();
  DocumentMode = DocumentMode;
  docMode$ = this.store.pipe(select(fromMarkdown.selectDocumentModeState));
  editWithView$ = this.store.pipe(select(fromMarkdown.selectDocumentShowPreviewState));
  @Input()
  markdown$: Observable<string>;
  @Input()
  hideToolbar: false;
  @ViewChild('viewContainerDiv')
  viewerContainerDiv: ElementRef;
  isLockScrollWithView$;
  isLockScrollWithView;

  defaultTimeoutHandler = err =>
    this.snackBar.open(err.message, 'ok', { duration: MSG_DISPLAY_TIMEOUT });

  isScrollDown$ = this.store
    .select(selectViewState)
    .pipe(takeUntil(this.destroy$))
    .subscribe(viewState => {
      // default value is null
      const v = viewState.isScrollDown;
      if (v === null || !this.viewerContainerDiv) return;
      if (v) {
        this.viewerContainerDiv.nativeElement.scrollTop += 50;
      } else {
        this.viewerContainerDiv.nativeElement.scrollTop -= 50;
      }
    });

  isLoadDone$ = merge(
    monitorActionStatus$(
      this.store,
      DocumentEffectsActionType.ReadDocument,
      NET_COMMU_TIMEOUT,
      this.defaultTimeoutHandler
    ).pipe(
      map(v => {
        return v.isNotStartStatus();
      })
    ),
    actionStatusState$(this.store, DocumentEffectsActionType.Create).pipe(
      map(v => v.isNotStartStatus())
    )
  ).pipe(
    takeUntil(this.destroy$),
    observeOn(asyncScheduler)
  );

  constructor(
    private store: Store<any>,
    private snackBar: MatSnackBar,
    @Inject(MARKDOWN_SERVICE_TOKEN) public markdownService: IMarkdownService,
    private ngZone: NgZone,
    private _docRef: DocumentRef,
    private _location: PlatformLocation
  ) { }

  container: IContainer;
  scrollDown$: Observable<ScrollEvent>;

  ngAfterViewInit() {
    const me = this;
    this.container = new ContainerRef(
      this.viewerContainerDiv.nativeElement,
      undefined,
      undefined,
      this.ngZone
    );
    this.viewerContainerDiv.nativeElement.focus();
    this.scrollDown$ = this.container.scrollDown$;
    (this.markdownService.viewer$ as Subject<IContainer>).next(this.container);

    setTimeout(_ => this.scroll(), 500);

    let v_per_last = 0;
    this.isLockScrollWithView$ = this.store.pipe(
      select(markdown.selectEditLockScrollWithViewState)
    );
    this.isLockScrollWithView$.pipe(takeUntil(this.destroy$)).subscribe(isLock => {
      this.isLockScrollWithView = isLock;
    });

    this.markdownService.editor$
      .pipe(
        takeUntil(this.destroy$),
        switchMap(c => c.scrollDown$)
      )
      .subscribe(value => {
        if (this.isLockScrollWithView && value.event) {
          const edit_div = value.event.target as HTMLElement;
          const v_per = edit_div.scrollTop / (edit_div.scrollHeight - edit_div.clientHeight);
          const delta_per = v_per - v_per_last;
          v_per_last = v_per;
          const view_div = me.viewerContainerDiv.nativeElement;
          const delta_v_view = (view_div.scrollHeight - view_div.clientHeight) * delta_per;
          me.viewerContainerDiv.nativeElement.scrollTop += delta_v_view;
        }
      });

    (this.viewerContainerDiv.nativeElement as HTMLElement).addEventListener(
      'edit-it',
      (e: CustomEvent) => {
        this.store.dispatch(new EditItAction(e.detail));
      }
    );
  }
  private scroll() {
    const hash = this.getCurrentHash();
    if (hash) {
      const elementWithId = this._docRef.document.getElementById(hash);
      if (!elementWithId) return;
      elementWithId.scrollIntoView();
      this.viewerContainerDiv.nativeElement.scrollTop = elementWithId.offsetTop - 64;
    }
  }
  private getCurrentHash() {
    return decodeURIComponent(this._location.hash.replace(/^#/, ''));
  }

  ngOnDestroy() {
    this.destroy$.next();
  }

  private swipe(e) {
    let element = e.target as HTMLElement;
    let lines = '';
    let i = 0;
    do {
      lines = element.getAttribute('data-source-lines');
      element = element.parentElement;
    } while (!lines && !!element && i++ < 4);
    this.store.dispatch(new EditItAction({ sourceLine: JSON.parse(lines) }
    ));
  }

  swipeLeft(e) {
    this.swipe(e);
  }

  swipeRight(e) {
    this.swipe(e);
  }
}
