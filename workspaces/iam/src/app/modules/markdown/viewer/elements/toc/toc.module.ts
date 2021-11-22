import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TocComponent } from './toc.component';
import { WithCustomElementComponent } from '../element-registry';
import { Type } from '@angular/core';
import { MatModules } from 'material';

@NgModule({
  imports: [CommonModule,MatModules],
  declarations: [TocComponent],
  entryComponents: [TocComponent],
  exports: [TocComponent]
})
export class TocModule implements WithCustomElementComponent {
  customElementComponent: Type<any> = TocComponent;
}
