import { Component, Input, AfterViewInit, Inject } from '@angular/core';
import {
  MSG_DISPLAY_TIMEOUT,
  NET_COMMU_TIMEOUT,
  ContainerRef,
  DocumentRef,
  ScrollEvent,
  IContainer
} from 'core';
import { ViewChild } from '@angular/core';
import * as markdown from '../state';
import { Store, select } from '@ngrx/store';
import { ElementRef } from '@angular/core';
import { Subject, merge, asyncScheduler, Observable } from 'rxjs';
import {
  DocumentEffectsActionTypes,
  ActionStatus,
  monitorActionStatus,
  getActionStatus
} from '../../home/state';
import { DocumentMode } from './../state/reducers/document';
import * as fromMarkdown from './../state';

import { takeUntil, map, observeOn, tap, share, switchMap } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material';
import { MARKDOWN_SERVICE_TOKEN, IMarkdownService } from '../model/markdown.model';
import { container } from '../../../../../../../node_modules/@angular/core/src/render3/instructions';
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
  @Input() markdown: string;
  @Input() hideToolbar: false;
  @ViewChild('viewContainerDiv') viewerContainerDiv: ElementRef;
  isLockScrollWithView$;
  isLockScrollWithView;

  defaultTimeoutHandler = err =>
    this.snackBar.open(err.message, 'ok', { duration: MSG_DISPLAY_TIMEOUT });

  isLoadDone$ = merge(
    monitorActionStatus(
      DocumentEffectsActionTypes.ReadDocument,
      this.store,
      NET_COMMU_TIMEOUT,
      this.defaultTimeoutHandler
    ).pipe(
      map(v => {
        return v.isNotStartStatus();
      })
    ),
    getActionStatus(DocumentEffectsActionTypes.Create, this.store).pipe(
      map(v => v.isNotStartStatus())
    )
  ).pipe(
    takeUntil(this.destroy$),
    observeOn(asyncScheduler)
  );

  constructor(
    private store: Store<any>,
    private snackBar: MatSnackBar,
    @Inject(MARKDOWN_SERVICE_TOKEN) public markdownService: IMarkdownService
  ) {}

  container: IContainer;

  ngAfterViewInit() {
    let me = this;
    this.container = new ContainerRef(this.viewerContainerDiv.nativeElement);
    (this.markdownService.viewer$ as Subject<IContainer>).next(this.container);

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
          let edit_div = value.event.target as HTMLElement;
          let v_per = edit_div.scrollTop / (edit_div.scrollHeight - edit_div.clientHeight);
          let delta_per = v_per - v_per_last;
          v_per_last = v_per;
          let view_div = me.viewerContainerDiv.nativeElement;
          let delta_v_view = (view_div.scrollHeight - view_div.clientHeight) * delta_per;
          me.viewerContainerDiv.nativeElement.scrollTop += delta_v_view;
        }
      });
  }

  ngOnDestroy() {
    this.destroy$.next();
  }
}
