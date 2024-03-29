import { Component, Input, AfterViewInit, Inject, NgZone } from '@angular/core';
import {
  MSG_DISPLAY_TIMEOUT,
  ContainerRef,
  ScrollEvent,
  IContainer,
  DocumentRef,
  SubscriptionManager,
  Utilities
} from 'core';
import { ViewChild } from '@angular/core';
import { ElementRef } from '@angular/core';
import { merge, asyncScheduler, Observable, Subscription, fromEvent } from 'rxjs';

import { map, observeOn, switchMap, tap } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MARKDOWN_STORE_TOKEN, IMarkdownStore, DocumentMode } from '../model/markdown.model';
import { PlatformLocation } from '@angular/common';
import { DocumentsEffects, DOCUMENT_EFFECTS_TOKEN } from 'app/modules/shared/store';
import { OperationStep } from 'packages/rx-store/src/effect';
import { HammerGestureConfig, HAMMER_GESTURE_CONFIG } from '@angular/platform-browser';
import { viewSwipeToEditorLine } from '../view-edit-swipe-switch';
import { codeFenceConnectedCallback } from './services/markdown-it-plugins/code/highlight';

@Component({
  selector: 'markdown-viewer-container',
  templateUrl: './markdown-viewer-container.component.html',
  styleUrls: ['./markdown-viewer-container.component.scss']
})
export class MarkdownViewerContainerComponent extends SubscriptionManager implements AfterViewInit {
  DocumentMode = DocumentMode;
  docMode$ = this.markdownStore.documentMode_;
  editWithView$ = this.markdownStore.editWithPreview_;
  @Input()
  markdown$: Observable<string>;
  @Input()
  hideToolbar: false;
  @ViewChild('viewContainerDiv')
  viewerContainerDiv: ElementRef;
  @ViewChild('markdownViewer', { read: ElementRef })
  viewer: ElementRef;
  isLockScrollWithView$;
  isLockScrollWithView;


  isLoadDone$ = merge(
    this.documentEffects.readDocument_.operationStatus$,
    this.documentEffects.createDocument_.operationStatus$
  ).pipe(
    map(status => {
      if (status.step === OperationStep.Timeout) {
        this.snackBar.open(status.type + ' timeout', 'ok');
      }
      return status.isNotStartStatus()
    }),
    observeOn(asyncScheduler)
  )

  constructor(
    private snackBar: MatSnackBar,
    @Inject(DOCUMENT_EFFECTS_TOKEN) private documentEffects: DocumentsEffects,
    @Inject(MARKDOWN_STORE_TOKEN) public markdownStore: IMarkdownStore,
    @Inject(HAMMER_GESTURE_CONFIG) private gestureConfig: HammerGestureConfig,
    private ngZone: NgZone,
    private _docRef: DocumentRef,
    private _location: PlatformLocation,
    private utils: Utilities
  ) {
    super();
  }

  private container: IContainer;
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
    this.markdownStore.viewer_.next(this.container);

    setTimeout(_ => this.scrollToHashIdElement(), 500);

    let v_per_last = 0;

    super.addSub(
      this.markdownStore.isLockEditorScrollWithView_.pipe(
        tap(isLock => {
          this.isLockScrollWithView = isLock;
        })
      )
    ).addSub(
      this.markdownStore.editor_.pipe(
        switchMap(c => c.scrollDown$),
        tap(value => {
          if (this.isLockScrollWithView && value.event) {
            const edit_div = value.event.target as HTMLElement;
            const v_per = edit_div.scrollTop / (edit_div.scrollHeight - edit_div.clientHeight);
            const delta_per = v_per - v_per_last;
            v_per_last = v_per;
            const view_div = me.viewerContainerDiv.nativeElement;
            const delta_v_view = (view_div.scrollHeight - view_div.clientHeight) * delta_per;
            me.viewerContainerDiv.nativeElement.scrollTop += delta_v_view;
          }
        })
      ),
      this.markdownStore.scrollView_.subscribe(viewState => {
        const isScrollUp = viewState.isUp;
        // default value is null
        if (isScrollUp === null || !this.viewerContainerDiv) return;

        if (isScrollUp) {
          (this.viewerContainerDiv.nativeElement as HTMLElement).scrollTop -= 50;
        } else {
          (this.viewerContainerDiv.nativeElement as HTMLElement).scrollTop += 50;
        }
      })
    );

    (this.viewerContainerDiv.nativeElement as HTMLElement).addEventListener(
      'edit-it',
      (e: CustomEvent) => {
        this.markdownStore.editIt_.next(e.detail);
      }
    );
    (this.viewerContainerDiv.nativeElement as HTMLElement).addEventListener(
      'code-fence-loaded',
      (e: CustomEvent) => {
        const codeDiv = e.target as HTMLElement;
        codeFenceConnectedCallback(codeDiv);
      }
    );
    let hammer = null;
    super.addSub(this.utils.isWideScreen$.pipe(
      tap(wide => {
        if (!wide) { // small
          if (hammer === null) {
            hammer = this.gestureConfig.buildHammer(this.viewer.nativeElement);
            hammer.on('swiperight', this.swipe);
            hammer.on('swipeleft', this.swipe);
          }
        } else {
          if (hammer) {
            hammer.off('swiperight')
            hammer.off('swipeleft')
            hammer.destroy();
            hammer = null;
          }
        }
      })).subscribe())
  }

  private scrollToHashIdElement() {
    const id = decodeURIComponent(this._location.hash.replace(/^#/, ''));
    if (id) {
      const elementWithId = this._docRef.document.getElementById(id);
      if (!elementWithId) return;
      elementWithId.scrollIntoView();
      this.viewerContainerDiv.nativeElement.scrollTop = elementWithId.offsetTop - 64;
    }
  }

  private swipe = (e) => {
    const sourceLine = viewSwipeToEditorLine(e);
    this.markdownStore.editIt_.next({ sourceLine });
  }
}

