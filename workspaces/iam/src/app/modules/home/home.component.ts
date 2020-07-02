import { Component, ViewChild, ElementRef } from '@angular/core';
import { DocService } from './services/doc.service';
import { Router, NavigationStart, NavigationEnd } from '@angular/router';
import { StoreSearchService } from '../cache/services/store-search.service';
import { Store, select } from '@ngrx/store';
import { Observable, from, Subject } from 'rxjs';
import { map, debounceTime, distinctUntilChanged, combineLatest, tap, filter } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';
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

  @ViewChild('docList', { read: ElementRef })
  scrollDocs: ElementRef;

  defaultTimeoutHandler = (action: string, info?: string) => err => {
    console.warn(err.message + ' action:' + action + (info ? `--${info}` : ''));
    this.snackBar.open(err.message, 'ok', { duration: MSG_DISPLAY_TIMEOUT });
  };

  docs$ = this.store.select(selectDocumentsState).pipe(map(docs => docs.filter(d => d.id !== 1)));
  ActionStatus = ActionState;

  constructor(
    private store: Store<SharedState>,
    public docService: DocService,
    private docSearchService: StoreSearchService,
    private router: Router,
    private snackBar: MatSnackBar
  ) { }

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

    this.store.dispatch(new DocumentEffectsReadBulkDocMeta({ isBelowRange: false }));
    //   from([this.initDocs$, filteredDocs$]).pipe(

    //     switchIfEmit(),
    //     tap(docs => {
    //       if (docs.length <= 1) {
    //         if (!isSearching)
    //           // 0: initial value ; 1: nav back from url doc show;
    //           this.store.dispatch(new DocumentEffectsReadBulkDocMeta({ isBelowRange: false }));
    //       }
    //     })
    //   );
    // }
  }

  ngOnDestroy() {
    this.destroy$.next();
  }
}
