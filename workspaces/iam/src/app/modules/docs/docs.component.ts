import { Component, Input, ViewChild } from '@angular/core';
import { Document } from './models/document';
import { DocService } from './services/doc.service';
import { Router } from '@angular/router';
import { NavigationExtras } from '@angular/router/src/router';
import { NgSpinKitModule } from 'ng-spin-kit';
import { DocSearchService } from './services/doc-search.service';
import { State } from './state/document.reducer';
import { Store, select } from '@ngrx/store';
import { Observable, TimeoutError, of, from } from 'rxjs';
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
  mergeAll
} from 'rxjs/operators';
import { MatSnackBar } from '@angular/material';
import { DocumentEffectsActionTypes, getActionStatus, getDocumentsState, DocumentEffectsLoad, DocumentEffectsDelete } from './state';
import { DocSearchComponent } from './doc-search/doc-search.component';
import {switchIfEmit} from '../core/operators/switchIfEmit';
@Component({
  selector: 'docs',
  templateUrl: './docs.component.html',
  styleUrls: ['./docs.component.scss']
})
export class DocsComponent {
  @ViewChild(DocSearchComponent) docSearch: DocSearchComponent;

  defaultTimeoutHandler = err => this.snackBar.open(err.message, 'ok', { duration: 6000 });
  isLoaded$ = getActionStatus(
    DocumentEffectsActionTypes.Load,
    this.store,
    this.defaultTimeoutHandler
  );



  private initDocs$ = this.store.pipe(select(getDocumentsState));
  docs$: Observable<Document[]>;
  constructor(
    private store: Store<State>,
    public docService: DocService,
    private docSearchService: DocSearchService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    this.store.dispatch(new DocumentEffectsLoad());
    this.initDocs$.subscribe(a=>{
      console.log(a);
    })
  }

  ngOnInit() {
    const filteredDocs$ = this.docSearch.Search.pipe(
      tap(a=>{
        console.warn(a);
      }),
      debounceTime(500),
      distinctUntilChanged(),
      combineLatest(this.initDocs$),
      map(([keyword, docs]) => {
        return this.docSearchService.search(docs, keyword);
      })
    );

    this.docs$ = from([this.initDocs$,filteredDocs$]).pipe(switchIfEmit());
  }

  showDoc(doc: Document) {
    let navigationExtras: NavigationExtras = {
      queryParams: {
        id: doc.number,
        title: doc.metaData.title,
        f:doc.metaData.format || 'md'
      }
    };
    this.router.navigate(['/doc'], navigationExtras);
  }

  deleteDoc(doc: Document) {
   this.store.dispatch(new DocumentEffectsDelete({number:doc.number, title:doc.title}))
  }
}
