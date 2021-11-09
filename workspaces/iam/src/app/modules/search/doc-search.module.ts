import { NgModule } from '@angular/core';
import { SharedModule } from 'shared';
import { StoreSearchService } from '../cache/services/store-search.service';
import { SearchRoutingModule } from './doc-search-routing.module';
import { MaterialModule } from 'material';
import { SearchPageComponent } from './doc-search.component';

@NgModule({
  imports: [SharedModule, MaterialModule, SearchRoutingModule],
  exports: [],
  declarations: [SearchPageComponent],
  providers: [StoreSearchService]
})
export class DocSearchModule {}
