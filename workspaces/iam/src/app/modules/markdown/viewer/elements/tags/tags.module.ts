import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatChipsModule } from '@angular/material/chips';
import {MatInputModule} from '@angular/material/input';
import { WithCustomElementComponent } from '../element-registry';
import { Type } from '@angular/core';
import { TagsComponent } from './tags.component';

@NgModule({
  imports: [CommonModule, MatSnackBarModule, MatIconModule, MatButtonModule, MatChipsModule, MatInputModule],
  declarations: [TagsComponent],
  entryComponents: [TagsComponent],
  exports: [TagsComponent]
})
export class TagsModule implements WithCustomElementComponent {
  customElementComponent: Type<any> = TagsComponent;
}
