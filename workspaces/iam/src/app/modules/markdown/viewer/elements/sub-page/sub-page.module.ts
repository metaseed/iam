import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SubPageComponent } from './sub-page.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { WithCustomElementComponent } from '../element-registry';
import { Type } from '@angular/core';

@NgModule({
  imports: [CommonModule, MatSnackBarModule, MatIconModule, MatButtonModule],
  declarations: [SubPageComponent],
  entryComponents: [SubPageComponent],
  exports: [SubPageComponent]
})
export class SubPageModule implements WithCustomElementComponent {
  customElementComponent: Type<any> = SubPageComponent;
}
