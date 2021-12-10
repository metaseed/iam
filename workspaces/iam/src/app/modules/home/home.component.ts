import { Component, ViewChild, ElementRef, Inject } from '@angular/core';
import { DocService } from './services/doc.service';
import { Router, NavigationStart, NavigationEnd } from '@angular/router';
import { StoreSearchService } from '../cache/services/store-search.service';
import { map } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MSG_DISPLAY_TIMEOUT } from 'core';

import { DocumentsEffects, DOCUMENT_EFFECTS_TOKEN, DOC_HISTORY_VERSION_ID, ROOT_DOC_ID } from '../shared/store';
import { DocumentStore } from '../shared/store/document.store';
import { MatDialog } from '@angular/material/dialog';
import { TagsCloudComponent } from './tags-cloud/tags-cloud.component';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  @ViewChild('docList', { read: ElementRef })
  scrollDocs: ElementRef;

  defaultTimeoutHandler = (action: string, info?: string) => err => {
    console.warn(err.message + ' action:' + action + (info ? `--${info}` : ''));
    this.snackBar.open(err.message, 'ok');
  };

  docMetas$ = this.store.docMeta.sortedValues$.pipe(
    map(docs => docs.filter(d => d.id !== ROOT_DOC_ID && d.id !== DOC_HISTORY_VERSION_ID))
  );

  constructor(
    @Inject(DOCUMENT_EFFECTS_TOKEN) private documentEffects: DocumentsEffects,
    private store: DocumentStore,
    public docService: DocService,
    private docSearchService: StoreSearchService,
    private router: Router,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,

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

  showTags(){
    this.dialog.open(TagsCloudComponent, { width: '95vw', height: '90vh' });
  }
  ngOnInit() {
    this._rememberScrollPosition();
    this.documentEffects.readBulkDocMeta_.next({ isBelowRange: false });

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

}
