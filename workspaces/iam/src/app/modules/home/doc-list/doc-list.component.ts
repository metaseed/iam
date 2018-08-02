import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  ViewChild,
  ElementRef
} from '@angular/core';
import {
  Document,
  WindowRef,
  NET_COMMU_TIMEOUT,
  MSG_DISPLAY_TIMEOUT,
  IContainer,
  ContainerRef
} from 'core';
import { MatDialog, MatSnackBar } from '@angular/material';
import { Store, select } from '@ngrx/store';
import {
  State,
  DocumentEffectsReadBulkDocMeta,
  DocumentEffectsDelete,
  monitorActionStatus$,
  DocumentEffectsActionTypes,
  selectDocumentsState,
  ActionStatus,
  ActionState
} from 'shared';
import { PAN_TO_REFRESH_MARGIN, PAN_TO_GET_MORE_MARGIN } from '../const';
import { Subject, ReplaySubject, merge, asyncScheduler, from, of } from 'rxjs';
import { takeUntil, filter, map, observeOn, tap, auditTime } from 'rxjs/operators';
import { Router, RouterState, NavigationExtras } from '@angular/router';
import { switchIfEmit } from 'core';

const REFRESH_AUDITE_TIME = 3000;

@Component({
  selector: 'doc-list',
  templateUrl: './doc-list.component.html',
  styleUrls: ['./doc-list.component.scss']
})
export class DocListComponent implements OnInit {
  private docs;
  private destroy$ = new Subject();

  private defaultTimeoutHandler = (action: string, info?: string) => (start: ActionStatus) => {
    console.warn('action timeout:' + action + (info ? `--${info}` : ''));
    this.snackBar.open(action + 'time out.', 'ok', { duration: MSG_DISPLAY_TIMEOUT });
  };

  isDeleteDone = (doc: Document) =>
    monitorActionStatus$(
      this.store,
      DocumentEffectsActionTypes.Delete,
      NET_COMMU_TIMEOUT,
      this.defaultTimeoutHandler(DocumentEffectsActionTypes.Delete),
      actionStatus => actionStatus.action.payload.id === doc.id
    ).pipe(
      takeUntil(this.destroy$),
      map(v => {
        if (v.action.payload.id === doc.id) {
          if (v.state === ActionState.Fail) {
            this.snackBar.open(`delete: ${doc.metaData.title} failed!`);
            return true;
          }
          return (
            // v.status === ActionStatus.Succession ||
            v.state === ActionState.Complete || v.state === ActionState.Timeout
          );
        }
        return false;
      })
    );

  isLoadDone$ = merge(
    this.store.pipe(select(selectDocumentsState)),
    monitorActionStatus$(
      this.store,
      DocumentEffectsActionTypes.ReadBulkDocMeta,
      NET_COMMU_TIMEOUT,
      this.defaultTimeoutHandler(DocumentEffectsActionTypes.ReadBulkDocMeta)
    ).pipe(
      takeUntil(this.destroy$),
      filter(a => a.action.payload.isBelowRange === false),
      map(v => {
        return (
          v.state === ActionState.Fail ||
          v.state === ActionState.Succession ||
          v.state === ActionState.Complete ||
          v.state === ActionState.Timeout
        );
      })
    )
  ).pipe(observeOn(asyncScheduler));

  private _showGetMore = false;
  get showGetMore() {
    if (!this.elementRef) return false;
    setTimeout(
      _ =>
        (this._showGetMore =
          this.elementRef.nativeElement.scrollHeight === this.elementRef.nativeElement.clientHeight)
    );
    return this.elementRef;
  }

  isLoadMoreDone$ = monitorActionStatus$(
    this.store,
    DocumentEffectsActionTypes.ReadBulkDocMeta,
    NET_COMMU_TIMEOUT,
    this.defaultTimeoutHandler(DocumentEffectsActionTypes.ReadBulkDocMeta, 'load-more')
  ).pipe(
    takeUntil(this.destroy$),
    filter(a => a.action.payload.isBelowRange === true),
    observeOn(asyncScheduler),
    map(v => {
      return (
        v.state === ActionState.Fail ||
        v.state === ActionState.Succession ||
        v.state === ActionState.Complete ||
        v.state === ActionState.Timeout
      );
    })
  );

  public container: IContainer;
  constructor(
    public elementRef: ElementRef,
    private store: Store<State>,
    private router: Router,
    private windowRef: WindowRef,
    private snackBar: MatSnackBar
  ) {
    this.container = new ContainerRef(elementRef.nativeElement);
  }

  @Input()
  set documents(v) {
    this.docs = v;
  }
  get documents() {
    return this.docs;
  }

  ngOnInit() {
    this.container.scrollDown$
      .pipe(
        takeUntil(this.destroy$),
        filter(e => {
          if (!this.router.url.startsWith('/home')) return false;
          const margin = this.container.maxScrollTop - e.scrollTop;
          if (e.isDown && margin < PAN_TO_GET_MORE_MARGIN) {
            return true;
          }
        }),
        auditTime(REFRESH_AUDITE_TIME)
      )
      .subscribe(e => {
        this.getMore();
      });
    this.panToRefresh();
  }

  ngOnDestroy() {
    this.destroy$.next();
  }

  trackByFunc = (i, doc) => doc.id;

  onShow(doc: Document) {
    let navigationExtras: NavigationExtras = {
      queryParams: {
        id: doc.id,
        title: doc.metaData.title,
        f: doc.metaData.format || 'md'
      }
    };
    this.router.navigate(['/doc'], navigationExtras);
  }

  onDelete(doc: Document) {
    this.store.dispatch(new DocumentEffectsDelete({ id: doc.id }));
  }

  private refresh() {
    this.store.dispatch(new DocumentEffectsReadBulkDocMeta({ isBelowRange: false }));
  }

  private getMore() {
    this.store.dispatch(new DocumentEffectsReadBulkDocMeta({ isBelowRange: true }));
  }

  private panToRefresh() {
    let startY: number;
    let refreshStarted: boolean;

    this.container.touchStart$.pipe(takeUntil(this.destroy$)).subscribe(e => {
      startY = e.touches[0].pageY;
      refreshStarted = false;
    });

    this.container.touchMove$
      .pipe(
        takeUntil(this.destroy$),
        auditTime(REFRESH_AUDITE_TIME)
      )
      .subscribe(e => {
        const y = e.touches[0].pageY;
        const scrollTop = this.container.scrollTop;

        if (scrollTop === 0 && !refreshStarted && y - startY > PAN_TO_REFRESH_MARGIN) {
          refreshStarted = true;
          this.refresh();
        }
        if (
          scrollTop === this.container.maxScrollTop &&
          !refreshStarted &&
          startY - y > PAN_TO_GET_MORE_MARGIN
        ) {
          this.getMore();
          refreshStarted = true;
        }
      });
  }
}
