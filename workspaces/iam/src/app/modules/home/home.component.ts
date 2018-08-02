import { Component, ViewChild, ElementRef } from '@angular/core';
import { DocService } from './services/doc.service';
import { Router, NavigationStart, NavigationEnd } from '@angular/router';
import { DocSearchService } from './services/doc-search.service';
import { Store, select } from '@ngrx/store';
import { Observable, from, Subject } from 'rxjs';
import { map, debounceTime, distinctUntilChanged, combineLatest, tap } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material';
import { DocSearchComponent } from './doc-search/doc-search.component';
import { switchIfEmit } from '../core/operators/switchIfEmit';
import { MSG_DISPLAY_TIMEOUT, Document } from 'core';

import {
  selectDocumentsState,
  ActionState,
  SharedState,
  DocumentEffectsReadBulkDocMeta
} from 'shared';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  private destroy$ = new Subject();

  @ViewChild(DocSearchComponent) docSearch: DocSearchComponent;
  @ViewChild('docList', { read: ElementRef })
  scrollDocs: ElementRef;

  defaultTimeoutHandler = (action: string, info?: string) => err => {
    console.warn(err.message + ' action:' + action + (info ? `--${info}` : ''));
    this.snackBar.open(err.message, 'ok', { duration: MSG_DISPLAY_TIMEOUT });
  };

  private initDocs$ = this.store.pipe(select(selectDocumentsState));
  docs$: Observable<Document[]>;
  ActionStatus = ActionState;

  constructor(
    private store: Store<SharedState>,
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
        if (this._scrollTop) this.scrollDocs.nativeElement.scrollTo(0, this._scrollTop);
      } else if (events instanceof NavigationStart && events.url !== '/home') {
        this._scrollTop = (this.scrollDocs.nativeElement as HTMLElement).scrollTop;
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
        if (docs.length <= 1) {
          if (!isSearching)
            // 0: initial value ; 1: nav back from url doc show;
            this.store.dispatch(new DocumentEffectsReadBulkDocMeta({ isBelowRange: false }));
        }
      })
    );
  }

  ngOnDestroy() {
    this.destroy$.next();
  }
}
