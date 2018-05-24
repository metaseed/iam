import { Component, Input, ViewChild } from '@angular/core';
import { Document } from './models/document';
import { DocService } from './services/doc.service';
import { DocsModel } from './models/docs.model';
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
import { DocumentEffectsActionTypes, getActionStatus, getDocumentsState, DocumentEffectsLoad } from './state';
import { DocSearchComponent } from './doc-search/doc-search.component';

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
      debounceTime(500),
      distinctUntilChanged(),
      combineLatest(this.initDocs$),
      map(([keyword, docs]) => {
        return this.docSearchService.search(docs, keyword);
      })
    );

    this.docs$ = from([this.initDocs$,filteredDocs$]).pipe(mergeAll());
  }

  addNewElement(element: string) {
    this.docService.newDoc();
    // let todo = { id: this.model.length + 1, text: element, done: false };
    // this._todoListService.store(todo)
    //   .subscribe(t => this.todoList.push(t), alert);
  }

  showDoc(doc: Document) {
    let navigationExtras: NavigationExtras = {
      queryParams: {
        id: doc.number,
        title: doc.metaData.title
      }
    };
    this.router.navigate(['/doc'], navigationExtras);
    // this._docService.showDoc(doc);
  }

  deleteDoc(doc: Document) {
    doc.state = 'closed';
    this.docService.deleteDoc(doc);
  }
}
