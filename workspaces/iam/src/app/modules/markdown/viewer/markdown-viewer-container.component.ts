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

  public swipe = (e) => {
    let element = e.target as HTMLElement;
    let lines = '';
    let i = 0;
    do {
      lines = element.getAttribute('data-source-lines');
    } while (!lines && !!(element = element.parentElement) && i++ < 4);

    const sourceLine = JSON.parse(lines);

    if (element.tagName === 'CODE') {
      const pre = element.querySelector('pre.code-with-line-numbers') as HTMLElement;
      if (pre) {
        // set to auto to get element from point
        pre.classList.remove('pointer-events-none');
        const swipeStartX = e.center.x - e.deltaX;;
        const swipeStartY = e.center.y - e.deltaY;
        // console.log(swipeStartX, swipeStartY);
        const actionElement = document.elementFromPoint(swipeStartX, swipeStartY);
        // console.log(actionElement);
        // reset to make touch event transparent to parent element
        pre.classList.add('pointer-events-none');

        let actionSpan = null;
        if (actionElement.tagName === 'SPAN') {
          actionSpan = actionElement;
        } else if (actionElement === pre) { // action at blank area
          /// try to find the nearest span
          const code = pre.querySelector('code');
          if (code) {
            let nearestY = Number.MAX_VALUE; // here we just consider nearest Y
            for (let i = 0; i < code.childNodes.length; i++) {
              const child = code.childNodes[i] as HTMLSpanElement;
              if (child.innerHTML.split('\n').join('').trim() === '') {
                // do not consider blank line, because it's bounds is 2 lines.
                continue;
              }
              const bound = child.getBoundingClientRect();
              const absTop = Math.abs(bound.top - swipeStartY);

              if (absTop < nearestY) {
                actionSpan = child;
                nearestY = absTop;
              }
            }

          }

        }

        if (actionSpan) {
          // console.log(actionSpan);
          const line = actionSpan.getAttribute('data-line');
          if (line) {
            const dataLine = Number(line);
            sourceLine[0] = sourceLine[0] + dataLine;
          }
        }

      }
    }

    this.markdownStore.editIt_.next({ sourceLine });

  }

}
