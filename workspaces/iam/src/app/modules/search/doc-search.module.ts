import { NgModule } from '@angular/core';

import { DocSearchItemComponent } from './doc-search-item/doc-search-item.component';
import { DocSearchListComponent } from './doc-search-list/doc-search-list.component';
import { SharedModule } from 'shared';
import { StoreSearchService } from '../cache/services/store-search.service';

@NgModule({
  imports: [SharedModule],
  exports: [],
  declarations: [DocSearchItemComponent, DocSearchListComponent],
  providers: [StoreSearchService]
})
export class DocSearchModuel {}
