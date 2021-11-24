import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from 'material';
import { DocListModule } from '../doc-list/doc-list-module';

import { TagsCloudComponent } from './tags-cloud.component';

@NgModule({
  imports: [CommonModule,MaterialModule, FormsModule, DocListModule],
  exports: [],
  declarations: [TagsCloudComponent],
  providers: [],
})
export class TagsCloudModule { }
