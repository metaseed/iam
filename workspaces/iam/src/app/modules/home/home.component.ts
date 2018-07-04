import { Component, ViewChild } from '@angular/core';
import { Document } from 'core';
import { DocService } from './services/doc.service';
import { Router, NavigationStart, NavigationEnd } from '@angular/router';
import { NavigationExtras } from '@angular/router/src/router';
import { DocSearchService } from './services/doc-search.service';
import { State } from './state/document.reducer';
import { Store, select } from '@ngrx/store';
import {
  Observable,
  of,
  from,
  Subject,
  merge,
  asyncScheduler
} from 'rxjs';
import {
  map,
  filter,
  debounceTime,
  distinctUntilChanged,
  combineLatest,
  tap,
  takeUntil,
  observeOn} from 'rxjs/operators';
import { MatSnackBar } from '@angular/material';
import {
  DocumentEffectsActionTypes,
  selectDocumentsState,
  DocumentEffectsReadBulkDocMeta,
  DocumentEffectsDelete,
  ActionStatus,
  monitorActionStatus
} from './state';
import { DocSearchComponent } from './doc-search/doc-search.component';
import { switchIfEmit } from '../core/operators/switchIfEmit';
import { NET_COMMU_TIMEOUT, MSG_DISPLAY_TIMEOUT } from 'core';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  private destroy$ = new Subject();

  @ViewChild(DocSearchComponent) docSearch: DocSearchComponent;

  defaultTimeoutHandler = (action: DocumentEffectsActionTypes, info?: string) => err => {
    console.warn(err.message + ' action:' + action + (info ? `--${info}` : ''));
    this.snackBar.open(err.message, 'ok', { duration: MSG_DISPLAY_TIMEOUT });
  };

  private loadFromStoreDirectly$ = new Subject<boolean>();
  isLoadDone$ = merge(
    this.loadFromStoreDirectly$,
    monitorActionStatus(
      DocumentEffectsActionTypes.ReadBulkDocMeta,
      this.store,
      NET_COMMU_TIMEOUT,
      this.defaultTimeoutHandler(DocumentEffectsActionTypes.ReadBulkDocMeta)
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
      DocumentEffectsActionTypes.ReadBulkDocMeta,
      this.store,
      NET_COMMU_TIMEOUT,
      this.defaultTimeoutHandler(DocumentEffectsActionTypes.ReadBulkDocMeta, 'load-more')
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

  private _scrollTop;
  private _rememberScrollPosition() {
    if ('scrollRestoration' in history) {
      // Back off, browser: https://developers.google.com/web/updates/2015/09/history-api-scroll-restoration
      history.scrollRestoration = 'manual';
    }
    this.router.events.subscribe(events => {
      if (events instanceof NavigationEnd && events.url === '/home') {
        if (this._scrollTop) window.scrollTo(0, this._scrollTop);
      } else if (events instanceof NavigationStart && events.url !== '/home') {
        this._scrollTop = window.pageYOffset;
      }
    });
  }

  ngOnInit() {
    this._rememberScrollPosition();
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
    this.store.dispatch(new DocumentEffectsReadBulkDocMeta({ isBelowRange: true }));

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
        id: doc.id,
        title: doc.metaData.title,
        f: doc.metaData.format || 'md'
      }
    };
    this.router.navigate(['/doc'], navigationExtras);
  }

  deleteDoc(doc: Document) {
    this.store.dispatch(new DocumentEffectsDelete({ id: doc.id }));
  }
}
