import { NgModule } from '@angular/core';

import { DocSearchItemComponent } from './doc-search-item/doc-search-item.component';
import { DocSearchListComponent } from './doc-search-list/doc-search-list.component';
import { SharedModule } from 'shared';
import { StoreSearchService } from '../cache/services/store-search.service';
import { DocSearchBarComponent } from './doc-search-bar/doc-search-bar.component';
import { SearchRoutingModule } from './search-routing.module';
import { MaterialModule } from 'material';

@NgModule({
  imports: [SharedModule, MaterialModule, SearchRoutingModule],
  exports: [],
  declarations: [DocSearchItemComponent, DocSearchListComponent, DocSearchBarComponent],
  providers: [StoreSearchService]
})
export class DocSearchModule {}
