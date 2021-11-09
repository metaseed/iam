import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { DocSearchBarComponent } from './doc-search-bar/doc-search-bar.component';
import { DocSearchItemComponent } from './doc-search-item/doc-search-item.component';
import { DocSearchListComponent } from './doc-search-list/doc-search-list.component';

@NgModule({
  imports: [CommonModule, MatCardModule,MatIconModule],
  exports: [DocSearchListComponent],
  declarations: [DocSearchListComponent, DocSearchBarComponent, DocSearchItemComponent],
  providers: [],
})
export class SearchModule { }
