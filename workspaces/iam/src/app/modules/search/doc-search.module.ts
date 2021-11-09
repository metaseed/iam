import { NgModule } from '@angular/core';
import { SharedModule } from 'shared';
import { StoreSearchService } from '../cache/services/store-search.service';
import { SearchRoutingModule } from './doc-search-routing.module';
import { MaterialModule } from 'material';

@NgModule({
  imports: [SharedModule, MaterialModule, SearchRoutingModule],
  exports: [],
  declarations: [],
  providers: [StoreSearchService]
})
export class DocSearchModule {}
