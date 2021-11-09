import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SubPageComponent } from './subpage.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatExpansionModule } from '@angular/material/expansion';
import { WithCustomElementComponent } from '../element-registry';
import { Type } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { SearchModule } from 'app/modules/shared/components/search/search.module';
import { MatDialogModule } from '@angular/material/dialog';
import { SubPageIdSearchComponent } from './subpage-id-search.component';

@NgModule({
  imports: [CommonModule, MatSnackBarModule, MatIconModule, MatButtonModule, MatExpansionModule, MatInputModule, SearchModule, MatDialogModule],
  declarations: [SubPageComponent, SubPageIdSearchComponent],
  entryComponents: [SubPageComponent],
  exports: [SubPageComponent]
})
export class SubPageModule implements WithCustomElementComponent {
  customElementComponent: Type<any> = SubPageComponent;
}
