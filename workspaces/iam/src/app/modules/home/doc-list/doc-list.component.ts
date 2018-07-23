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
import { Store } from '@ngrx/store';
import {
  State,
  DocumentEffectsReadBulkDocMeta,
  DocumentEffectsDelete,
  monitorActionStatus,
  DocumentEffectsActionTypes,
  ActionStatus,
  DocumentActionStatus
} from '../state';
import { PAN_TO_REFRESH_MARGIN, PAN_TO_GET_MORE_MARGIN } from '../const';
import { Subject, ReplaySubject } from 'rxjs';
import { takeUntil, filter, map } from 'rxjs/operators';
import { Router, RouterState, NavigationExtras } from '@angular/router';

@Component({
  selector: 'doc-list',
  templateUrl: './doc-list.component.html',
  styleUrls: ['./doc-list.component.scss']
})
export class DocListComponent implements OnInit {
  private docs;
  private destroy$ = new Subject();

  private defaultTimeoutHandler = (action: DocumentEffectsActionTypes, info?: string) => (
    start: DocumentActionStatus
  ) => {
    console.warn('action timeout:' + action + (info ? `--${info}` : ''));
    this.snackBar.open(action + 'time out.', 'ok', { duration: MSG_DISPLAY_TIMEOUT });
  };

  isDeleteDone = (doc: Document) =>
    monitorActionStatus(
      DocumentEffectsActionTypes.Delete,
      this.store,
      NET_COMMU_TIMEOUT,
      this.defaultTimeoutHandler(DocumentEffectsActionTypes.Delete),
      actionStatus => actionStatus.action.payload.id === doc.id
    ).pipe(
      takeUntil(this.destroy$),
      map(v => {
        if (v.action.payload.id === doc.id) {
          if (v.status === ActionStatus.Fail) {
            this.snackBar.open(`delete: ${doc.metaData.title} failed!`);
            return true;
          }
          return (
            // v.status === ActionStatus.Succession ||
            v.status === ActionStatus.Complete || v.status === ActionStatus.Timeout
          );
        }
        return false;
      })
    );

  public container: IContainer;
  constructor(
    private _elementRef: ElementRef,
    private store: Store<State>,
    private router: Router,
    private windowRef: WindowRef,
    private snackBar: MatSnackBar
  ) {
    this.container = new ContainerRef(_elementRef.nativeElement);
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
        })
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

    this.container.touchMove$.pipe(takeUntil(this.destroy$)).subscribe(e => {
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