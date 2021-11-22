import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WithCustomElementComponent } from '../element-registry';
import { Type } from '@angular/core';
import { TagsComponent } from './tags.component';
import { MatModules } from 'material';

@NgModule({
  imports: [CommonModule,MatModules],
  declarations: [TagsComponent],
  entryComponents: [TagsComponent],
  exports: [TagsComponent]
})
export class TagsModule implements WithCustomElementComponent {
  customElementComponent: Type<any> = TagsComponent;
}
