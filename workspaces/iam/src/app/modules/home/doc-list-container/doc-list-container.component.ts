import { Component, OnInit, Input, ElementRef, Inject } from '@angular/core';
import { MSG_DISPLAY_TIMEOUT, IContainer, ContainerRef, SubscriptionManager, DocMeta } from 'core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PAN_TO_REFRESH_MARGIN, PAN_TO_GET_MORE_MARGIN } from '../const';
import { asyncScheduler, tap } from 'rxjs';
import { filter, map, observeOn, auditTime, startWith, share } from 'rxjs/operators';
import { Router, NavigationExtras } from '@angular/router';
import { DocumentsEffects, DOCUMENT_EFFECTS_TOKEN } from 'app/modules/shared/store';
import { OperationStep } from 'packages/rx-store/src/effect';

const REFRESH_AUDIT_TIME = 3000;

@Component({
  selector: 'doc-list-container',
  templateUrl: './doc-list-container.component.html',
  styleUrls: ['./doc-list-container.component.scss']
})
export class DocListContainerComponent extends SubscriptionManager implements OnInit {

  private defaultTimeoutHandler(action: string, info?: string) {
    console.warn('action timeout:' + action + (info ? `--${info}` : ''));
    this.snackBar.open(action + 'time out.', 'ok', { duration: MSG_DISPLAY_TIMEOUT });
  };



  isLoadDone$ = this.documentEffects.readBulkDocMeta_.operationStatus$.pipe(
    filter(status => status.trigger.isBelowRange === false),
    map(status => {
      if (status.step === OperationStep.Timeout) {
        this.defaultTimeoutHandler('load doc list', 'init')
      }
      return status.isNotStartStatus()
    }),
    share(),
    observeOn(asyncScheduler)
  );

  public showGetMore$ = this.isLoadDone$.pipe(
    map(_ => this.elementRef.nativeElement.scrollHeight === this.elementRef.nativeElement.clientHeight)
  );

  isLoadMoreDone$ = this.documentEffects.readBulkDocMeta_.operationStatus$.pipe(
    filter(status => status.trigger.isBelowRange === true),
    observeOn(asyncScheduler),
    map(status => {
      if (status.step === OperationStep.Timeout) {
        this.defaultTimeoutHandler('load doc list', 'load more')
      }
      return status.isNotStartStatus();
    }),
    startWith(true)
  );

  public container: IContainer;
  constructor(
    @Inject(DOCUMENT_EFFECTS_TOKEN) private documentEffects: DocumentsEffects,
    public elementRef: ElementRef,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    super();
    this.container = new ContainerRef(elementRef.nativeElement);
  }

  @Input()
  set docMetas(v) {
    this._docMetas = v;
  }
  get docMetas() {
    return this._docMetas;
  }

  ngOnInit() {
    super.addSub(
      this.container.scrollDown$
        .pipe(
          filter(e => {
            if (!this.router.url.startsWith('/home')) return false;
            const margin = this.container.maxScrollTop - e.scrollTop;
            if (e.isDown && margin < PAN_TO_GET_MORE_MARGIN) {
              return true;
            }
            return false;
          }),
          auditTime(REFRESH_AUDIT_TIME),
          tap(_ => this.onGetMore())
        ));
    this.panToRefresh();
  }





  private refresh() {
    this.documentEffects.readBulkDocMeta_.next({ isBelowRange: false });

  }

  public onGetMore() {
    this.documentEffects.readBulkDocMeta_.next({ isBelowRange: true });
  }

  private panToRefresh() {
    let startY: number;
    let refreshStarted: boolean;

    super.addSub(this.container.touchStart$.pipe(tap(e => {
      startY = e.touches[0].pageY;
      refreshStarted = false;
    })));

    super.addSub(this.container.touchMove$
      .pipe(
        auditTime(REFRESH_AUDIT_TIME),
        tap(e => {
          const y = e.touches[0].pageY;
          const scrollTop = this.container.scrollTop;

          if (scrollTop === 0 && !refreshStarted && y - startY > PAN_TO_REFRESH_MARGIN) {
            refreshStarted = true;
            this.refresh();
          }
          if (scrollTop === this.container.maxScrollTop && !refreshStarted && startY - y > PAN_TO_GET_MORE_MARGIN) {
            this.onGetMore();
            refreshStarted = true;
          }
        })));
  }
}
