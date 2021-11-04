import { AfterViewInit, Component, Inject, ViewChild } from '@angular/core';
import { ISearchItem } from 'core';
import { DocSearchBarComponent } from '../doc-search-bar/doc-search-bar.component';
import { tap } from 'rxjs/operators';
import { debounceTime, distinctUntilChanged, Observable } from 'rxjs';
import { DocumentsEffects, DOCUMENT_EFFECTS_TOKEN } from 'app/modules/shared/store';
import { DocumentStore } from 'app/modules/shared/store/document.store';

@Component({
  selector: 'doc-search-list',
  templateUrl: './doc-search-list.component.html',
  styleUrls: ['./doc-search-list.component.scss']
})
export class DocSearchListComponent implements AfterViewInit {
  @ViewChild(DocSearchBarComponent)
  docSearchComponent: DocSearchBarComponent;

  constructor(private _store: DocumentStore,
    @Inject(DOCUMENT_EFFECTS_TOKEN) private documentEffects: DocumentsEffects,
    ) { }

  ngAfterViewInit() {
    this.docSearchComponent.search
      .pipe(debounceTime(500),
        distinctUntilChanged(),
        tap(keyword => {
          if (keyword.trim() === '') {
            return;
          }
          this.documentEffects.searchDocument_.next({ query: keyword });
        })
      )
      .subscribe();
  }

  searchResult$: Observable<ISearchItem[]> = this._store.searchResult_;

  onSearch(keyword: string) { }

  trackByFunc = (i, searchItem: ISearchItem) => searchItem.id;
}
