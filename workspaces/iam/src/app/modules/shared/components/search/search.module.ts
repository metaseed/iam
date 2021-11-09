import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { DocSearchBarComponent } from './doc-search-bar/doc-search-bar.component';
import { DocSearchItemComponent } from './doc-search-item/doc-search-item.component';
import { DocSearchListComponent } from './doc-search-list/doc-search-list.component';

@NgModule({
  imports: [CommonModule],
  exports: [DocSearchListComponent],
  declarations: [DocSearchListComponent, DocSearchBarComponent, DocSearchItemComponent],
  providers: [],
})
export class SearchModule { }
