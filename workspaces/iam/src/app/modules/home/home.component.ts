import { Component, Input, ViewChild, ElementRef } from '@angular/core';
import { Document } from './models/document';
import { DocService } from './services/doc.service';
import { Router } from '@angular/router';
import { NavigationExtras } from '@angular/router/src/router';
import { NgSpinKitModule } from 'ng-spin-kit';
import { DocSearchService } from './services/doc-search.service';
import { State } from './state/document.reducer';
import { Store, select } from '@ngrx/store';
import {
  Observable,
  TimeoutError,
  of,
  from,
  Subject,
  merge,
  Scheduler,
  asyncScheduler
} from 'rxjs';
import {
  map,
  filter,
  timeout,
  catchError,
  switchAll,
  take,
  skip,
  debounceTime,
  distinctUntilChanged,
  combineLatest,
  tap,
  mergeAll,
  takeUntil,
  observeOn,
  share,
  startWith
} from 'rxjs/operators';
import { MatSnackBar } from '@angular/material';
import {
  DocumentEffectsActionTypes,
  selectDocumentsState,
  DocumentEffectsLoad,
  DocumentEffectsDelete,
  ActionStatus,
  monitorActionStatus
} from './state';
import { DocSearchComponent } from './doc-search/doc-search.component';
import { switchIfEmit } from '../core/operators/switchIfEmit';
import { NET_COMMU_TIMEOUT, MSG_DISPLAY_TIMEOUT } from 'core';
import { PAN_ACTION_DELTY, PAN_ACTION_SCROLL_TRIGGER } from './const';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  private destroy$ = new Subject();

  @ViewChild(DocSearchComponent) docSearch: DocSearchComponent;
  @ViewChild('touchDiv') touchDiv: ElementRef;

  defaultTimeoutHandler = err =>
    this.snackBar.open(err.message, 'ok', { duration: MSG_DISPLAY_TIMEOUT });

  private loadFromStoreDirectly$ = new Subject<boolean>();
  isLoadDone$ = merge(
    this.loadFromStoreDirectly$,
    monitorActionStatus(
      DocumentEffectsActionTypes.Load,
      this.store,
      NET_COMMU_TIMEOUT,
      this.defaultTimeoutHandler
    ).pipe(
      takeUntil(this.destroy$),
      map(v => {
        return v.status === ActionStatus.Fail || v.status === ActionStatus.Success;
      })
    )
  ).pipe(observeOn(asyncScheduler));

  isLoadMoreDone$ = from([
    of(true),
    monitorActionStatus(
      DocumentEffectsActionTypes.Load,
      this.store,
      NET_COMMU_TIMEOUT,
      this.defaultTimeoutHandler
    ).pipe(
      takeUntil(this.destroy$),
      filter(a => a.context && a.context.isLoadMore === true),
      observeOn(asyncScheduler),
      map(v => {
        return v.status === ActionStatus.Fail || v.status === ActionStatus.Success;
      })
    )
  ]).pipe(switchIfEmit());

  private initDocs$ = this.store.pipe(select(selectDocumentsState));
  docs$: Observable<Document[]>;
  ActionStatus = ActionStatus;

  constructor(
    private store: Store<State>,
    public docService: DocService,
    private docSearchService: DocSearchService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  private refresh() {
    this.store.dispatch(new DocumentEffectsLoad());
  }

  private panToRefresh() {
    let startY: number;
    let refreshStarted;
    this.touchDiv.nativeElement.addEventListener(
      'touchstart',
      e => {
        startY = e.touches[0].pageY;
        refreshStarted = false;
      },
      { passive: true }
    );
    this.touchDiv.nativeElement.addEventListener(
      'touchmove',
      e => {
        const y = e.touches[0].pageY;
        const scrollTop =
          window.pageXOffset === undefined
            ? document.scrollingElement.scrollTop
            : window.pageYOffset;
        if (scrollTop === 0 && !refreshStarted && y > startY + PAN_ACTION_SCROLL_TRIGGER) {
          refreshStarted = true;
          this.refresh();
        }
        if (
          window.innerHeight + window.pageYOffset >= document.body.offsetHeight &&
          !refreshStarted &&
          startY - y > PAN_ACTION_DELTY
        ) {
          this.store.dispatch(new DocumentEffectsLoad({ isLoadMore: true }));
          refreshStarted = true;
        }
      },
      { passive: true }
    );
  }

  ngOnInit() {
    this.panToRefresh();
    let isSearching;
    const filteredDocs$ = this.docSearch.Search.pipe(
      debounceTime(280),
      distinctUntilChanged(),
      tap(keyword => {
        if (keyword.trim() === '') {
          isSearching = false;
        }
        isSearching = true;
      }),
      combineLatest(this.initDocs$),
      map(([keyword, docs]) => {
        return this.docSearchService.search(docs, keyword);
      })
    );

    this.docs$ = from([this.initDocs$, filteredDocs$]).pipe(
      switchIfEmit(),
      tap(docs => {
        if (docs.length <= 1 && !isSearching) {
          // 0: initial value ; 1: nav back from url doc show; potential problem: if only 1 doc created, we will always query not from store but first store then from net.
          this.refresh();
        } else {
          this.loadFromStoreDirectly$.next(true);
        }
      })
    );
  }

  ngOnDestroy() {
    this.destroy$.next();
  }

  showDoc(doc: Document) {
    let navigationExtras: NavigationExtras = {
      queryParams: {
        id: doc.number,
        title: doc.metaData.title,
        f: doc.metaData.format || 'md'
      }
    };
    this.router.navigate(['/doc'], navigationExtras);
  }

  deleteDoc(doc: Document) {
    this.store.dispatch(new DocumentEffectsDelete({ number: doc.number, title: doc.title }));
  }
}
