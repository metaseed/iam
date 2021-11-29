import { NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatTabsModule } from '@angular/material/tabs';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatCardModule } from '@angular/material/card';
import { MatSnackBarModule, MAT_SNACK_BAR_DEFAULT_OPTIONS } from '@angular/material/snack-bar';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatDialogModule, MAT_DIALOG_DEFAULT_OPTIONS } from '@angular/material/dialog';
import { MatTreeModule } from '@angular/material/tree';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatInputModule } from '@angular/material/input';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatListModule } from '@angular/material/list'
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatChipsModule } from '@angular/material/chips';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatExpansionModule } from '@angular/material/expansion';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { MSG_DISPLAY_TIMEOUT } from 'core';

export const MatModules = [
  MatAutocompleteModule,
  MatProgressSpinnerModule,
  MatIconModule,
  MatMenuModule,
  MatTabsModule,
  MatButtonModule,
  MatCheckboxModule,
  MatCardModule,
  MatProgressBarModule,
  MatToolbarModule,
  MatDialogModule,
  MatTreeModule,
  MatSidenavModule,
  MatInputModule,
  MatBottomSheetModule,
  MatListModule,
  MatSlideToggleModule,
  MatSnackBarModule,
  MatChipsModule,
  DragDropModule,
  MatExpansionModule
];

@NgModule({
  imports: [...MatModules],
  exports: [...MatModules],
  providers: [
    { provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: { duration: MSG_DISPLAY_TIMEOUT } },
    { provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: { width: '95vw', height: '90vh' } },

  ]
})
export class MaterialModule { }
