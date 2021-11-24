import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MaterialModule } from 'material';
import { DocItemComponent } from './doc-item/doc-item.component';

import { DocListComponent } from './doc-list.component';

@NgModule({
  imports: [CommonModule, MaterialModule],
  exports: [DocListComponent],
  declarations: [DocListComponent, DocItemComponent],
  providers: [],
})
export class DocListModule { }
