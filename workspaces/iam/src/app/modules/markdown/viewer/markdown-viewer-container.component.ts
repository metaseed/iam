import { Component, Input, AfterViewInit } from '@angular/core';
import { MSG_DISPLAY_TIMEOUT, NET_COMMU_TIMEOUT, ContainerRef, DocumentRef } from 'core';
import { ViewChild } from '@angular/core';
import * as markdown from '../state';
import * as fromView from '../state/actions/view';
import { Store, select } from '@ngrx/store';
import { ElementRef } from '@angular/core';
import { Subject, merge, asyncScheduler } from 'rxjs';
import {
  DocumentEffectsActionTypes,
  ActionStatus,
  monitorActionStatus,
  getActionStatus
} from '../../home/state';
import { takeUntil, map, observeOn } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material';
@Component({
  selector: 'markdown-viewer-container',
  templateUrl: './markdown-viewer-container.component.html',
  styleUrls: ['./markdown-viewer-container.component.scss']
})
export class MarkdownViewerContainerComponent implements AfterViewInit {
  destroy$ = new Subject();

  @Input() markdown: string;
  @Input() hideToolbar: false;
  @ViewChild('viewContainerDiv') viewerContainerDiv: ElementRef;
  isEditorScrollDown$;
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
      map(v=>v.isNotStartStatus())
    )
  ).pipe(
    takeUntil(this.destroy$),
    observeOn(asyncScheduler)
  );

  constructor(
    private store: Store<any>,
    private snackBar: MatSnackBar,
  ) {}
  isScrollDown = false;
  ngAfterViewInit() {
    this.isEditorScrollDown$ = this.store.pipe(select(markdown.selectEditScrollDownState));
    let me = this;
    let v_per_last = 0;
    this.isLockScrollWithView$ = this.store.pipe(
      select(markdown.selectEditLockScrollWithViewState)
    );
    this.isLockScrollWithView$.pipe(takeUntil(this.destroy$)).subscribe(isLock => {
      this.isLockScrollWithView = isLock;
    });

    this.isEditorScrollDown$.pipe(takeUntil(this.destroy$)).subscribe(value => {
      if (this.isLockScrollWithView && value.scroll) {
        let edit_div = value.scroll.target;
        let v_per = edit_div.scrollTop / (edit_div.scrollHeight - edit_div.clientHeight);
        let delta_per = v_per - v_per_last;
        v_per_last = v_per;
        let view_div = me.viewerContainerDiv.nativeElement;
        let delta_v_view = (view_div.scrollHeight - view_div.clientHeight) * delta_per;
        me.viewerContainerDiv.nativeElement.scrollTop += delta_v_view;
      }
    });

    new ContainerRef(this.viewerContainerDiv.nativeElement).scrollDown$
      .pipe(takeUntil(this.destroy$))
      .subscribe(e=> {
        this.store.dispatch(new fromView.ScrollDown(e));
        this.isScrollDown = e.isDown;
      });
  }

  ngOnDestroy() {
    this.destroy$.next();
  }
}
