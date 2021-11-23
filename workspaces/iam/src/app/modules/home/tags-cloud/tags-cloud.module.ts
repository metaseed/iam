import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from 'material';

import { TagsCloudComponent } from './tags-cloud.component';

@NgModule({
  imports: [CommonModule,MaterialModule, FormsModule],
  exports: [],
  declarations: [TagsCloudComponent],
  providers: [],
})
export class TagsCloudModule { }
