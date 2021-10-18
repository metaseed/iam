import { Component, Input, AfterViewInit, Inject, NgZone } from '@angular/core';
import {
  MSG_DISPLAY_TIMEOUT,
  NET_COMMU_TIMEOUT,
  ContainerRef,
  ScrollEvent,
  IContainer,
  DocumentRef,
  SubscriptionManager
} from 'core';
import { ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { ElementRef } from '@angular/core';
import { merge, asyncScheduler, Observable } from 'rxjs';
import { DocumentEffectsActionType, monitorActionStatus$, actionStatusState$ } from 'shared';

import { map, observeOn, switchMap, tap } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MARKDOWN_STORE_TOKEN, IMarkdownStore, DocumentMode } from '../model/markdown.model';
import { PlatformLocation } from '@angular/common';

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
  isLockScrollWithView$;
  isLockScrollWithView;

  defaultTimeoutHandler = err =>
    this.snackBar.open(err.message, 'ok', { duration: MSG_DISPLAY_TIMEOUT });

  isLoadDone$ = merge(
    monitorActionStatus$(
      this.store,
      DocumentEffectsActionType.ReadDocument,
      NET_COMMU_TIMEOUT,
      this.defaultTimeoutHandler)
      .pipe(
        map(v => v.isNotStartStatus())
      ),
    actionStatusState$(this.store, DocumentEffectsActionType.Create).pipe(
      map(v => v.isNotStartStatus())
    )
  ).pipe(
    observeOn(asyncScheduler)
  );

  constructor(
    private store: Store<any>,
    private snackBar: MatSnackBar,
    @Inject(MARKDOWN_STORE_TOKEN) public markdownStore: IMarkdownStore,
    private ngZone: NgZone,
    private _docRef: DocumentRef,
    private _location: PlatformLocation
  ) {
    super();
  }

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
      )
    ).addSub(this.markdownStore.scrollView_
      .subscribe(viewState => {
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

  public swipe(e) {
    let element = e.target as HTMLElement;
    let lines = '';
    let i = 0;
    do {
      lines = element.getAttribute('data-source-lines');
      element = element.parentElement;
    } while (!lines && !!element && i++ < 4);
    this.markdownStore.editIt_.next({ sourceLine: JSON.parse(lines)});
  }

}
