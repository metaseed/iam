import { Component, Input, AfterViewInit } from '@angular/core';
import { Scrollable, MSG_DISPLAY_TIMEOUT, NET_COMMU_TIMEOUT } from 'core';
import { ViewChild } from '@angular/core';
import * as markdown from '../state';
import * as fromView from '../state/actions/view';
import { Store, select } from '@ngrx/store';
import { DocService } from 'docs';
import { ElementRef } from '@angular/core';
import { Subscription, of, Subject, merge } from 'rxjs';
import {
  getDocumentActionStatusState,
  DocumentEffectsActionTypes,
  DocumentActionTypes,
  ActionStatus,
  monitorActionStatus,
  getActionStatus
} from '../../docs/state';
import { filter, takeLast, takeUntil, map, mergeAll } from 'rxjs/operators';
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
      DocumentEffectsActionTypes.Show,
      this.store,
      NET_COMMU_TIMEOUT,
      this.defaultTimeoutHandler
    ).pipe(
      map(v => {
        return v.status === ActionStatus.Fail || v.status === ActionStatus.Success;
      })
    ),
    getActionStatus(DocumentEffectsActionTypes.New, this.store).pipe(
      map(v => v.status === ActionStatus.Success || v.status === ActionStatus.Fail)
    )
  ).pipe(takeUntil(this.destroy$));

  constructor(
    private store: Store<any>,
    private _docService: DocService,
    private snackBar: MatSnackBar
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

    new Scrollable(this.viewerContainerDiv.nativeElement).isScrollDown$
      .pipe(takeUntil(this.destroy$))
      .subscribe(e => {
        this.store.dispatch(new fromView.ScrollDown(e));
        this.isScrollDown = e.isDown;
      });
  }

  ngOnDestroy() {
    this.destroy$.next();
  }
}
