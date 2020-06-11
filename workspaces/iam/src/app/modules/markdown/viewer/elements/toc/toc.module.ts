import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TocComponent } from './toc.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule } from '@angular/material/snack-bar';
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
