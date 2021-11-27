import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MaterialModule } from 'material';
import { SpinnerModule } from '../../../../../projects/spinner/src/public_api';
import { DocDeleteComponent } from './doc-item/doc-delete/doc-delete.component';
import { DocItemComponent } from './doc-item/doc-item.component';

import { DocListComponent } from './doc-list.component';

@NgModule({
  imports: [CommonModule, MaterialModule, SpinnerModule],
  exports: [DocListComponent],
  declarations: [DocListComponent, DocItemComponent, DocDeleteComponent],
  providers: [],
})
export class DocListModule { }
