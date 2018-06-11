import { Component, Input, ViewChild } from '@angular/core';
import { Document } from './models/document';
import { DocService } from './services/doc.service';
import { Router } from '@angular/router';
import { NavigationExtras } from '@angular/router/src/router';
import { NgSpinKitModule } from 'ng-spin-kit';
import { DocSearchService } from './services/doc-search.service';
import { State } from './state/document.reducer';
import { Store, select } from '@ngrx/store';
import { Observable, TimeoutError, of, from, Subject, merge } from 'rxjs';
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
  takeUntil
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
@Component({
  selector: 'docs',
  templateUrl: './docs.component.html',
  styleUrls: ['./docs.component.scss']
})
export class DocsComponent {
  private destroy$ = new Subject();

  @ViewChild(DocSearchComponent) docSearch: DocSearchComponent;

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
  );

  onPanEnd(ev) {
    this.refresh();
    console.log(ev);
  }

  onPanDown(ev) {
    //this.refresh()
  }
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

  ngOnInit() {
    let isSearching;
    const filteredDocs$ = this.docSearch.Search.pipe(
      debounceTime(280),
      distinctUntilChanged(),
      tap(keyword=>{
        if(keyword.trim()===''){
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
