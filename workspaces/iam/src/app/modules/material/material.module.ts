import { NgModule } from '@angular/core';

import {
  MAT_SNACK_BAR_DEFAULT_OPTIONS,
  MatAutocompleteModule,
  MatButtonModule,
  MatButtonToggleModule,
  MatCardModule,
  MatCheckboxModule,
  MatChipsModule,
  MatDatepickerModule,
  MatDialogModule,
  MatDividerModule,
  MatExpansionModule,
  MatGridListModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatNativeDateModule,
  MatPaginatorModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatRadioModule,
  MatRippleModule,
  MatSelectModule,
  MatSidenavModule,
  MatSliderModule,
  MatSlideToggleModule,
  MatSnackBarModule,
  MatSortModule,
  MatStepperModule,
  MatTableModule,
  MatTabsModule,
  MatToolbarModule,
  MatTooltipModule
} from '@angular/material';

export const MatModules = [
  MatIconModule,
  MatMenuModule,
  MatTabsModule,
  MatButtonModule,
  MatCheckboxModule,
  MatCardModule,
  MatSnackBarModule,
  MatProgressBarModule,
  MatToolbarModule,
  MatDialogModule,
  MatIconModule
];

@NgModule({
  imports: [...MatModules],
  exports: [...MatModules],
  providers: [{ provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: { duration: 8000 } }]
})
export class MaterialModule {}
