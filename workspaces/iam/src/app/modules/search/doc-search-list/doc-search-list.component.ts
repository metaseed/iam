import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { ISearchItem } from 'core';
import { Store } from '@ngrx/store';
import { selectSearchResultState, DocumentEffectsSearch } from 'shared';
import { DocSearchBarComponent } from '../doc-search-bar/doc-search-bar.component';
import { tap } from 'rxjs/operators';
import { debounceTime, distinctUntilChanged, Observable } from 'rxjs';

@Component({
  selector: 'doc-search-list',
  templateUrl: './doc-search-list.component.html',
  styleUrls: ['./doc-search-list.component.scss']
})
export class DocSearchListComponent implements AfterViewInit {
  @ViewChild(DocSearchBarComponent)
  docSearchComponent: DocSearchBarComponent;

  constructor(private _store: Store<any>) { }

  ngAfterViewInit() {
    this.docSearchComponent.search
      .pipe(debounceTime(500),
        distinctUntilChanged(),
        tap(keyword => {
          if (keyword.trim() === '') {
            return;
          }
          this._store.dispatch(new DocumentEffectsSearch({ query: keyword }));
        })
      )
      .subscribe();
  }

  searchResult$: Observable<ISearchItem[]> = this._store.select(selectSearchResultState);

  onSearch(keyword: string) { }

  trackByFunc = (i, searchItem: ISearchItem) => searchItem.id;
}
