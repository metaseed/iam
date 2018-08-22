import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TocComponent } from './toc.component';
import { MatSnackBarModule, MatIconModule, MatButtonModule } from '@angular/material';
import { WithCustomElementComponent } from '../element-registry';
import { Type } from '@angular/core';

@NgModule({
  imports: [CommonModule, MatSnackBarModule, MatIconModule, MatButtonModule],
  declarations: [TocComponent],
  entryComponents: [TocComponent],
  exports: [TocComponent]
})
export class TocModule implements WithCustomElementComponent {
  customElementComponent: Type<any> = TocComponent;
}
