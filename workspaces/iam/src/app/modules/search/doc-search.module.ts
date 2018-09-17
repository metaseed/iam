import { NgModule } from '@angular/core';

import { DocSearchItemComponent } from './doc-search-item/doc-search-item.component';
import { DocSearchListComponent } from './doc-search-list/doc-search-list.component';
import { SharedModule } from 'shared';

@NgModule({
  imports: [SharedModule],
  exports: [],
  declarations: [DocSearchItemComponent, DocSearchListComponent],
  providers: []
})
export class DocSearchModuel {}
