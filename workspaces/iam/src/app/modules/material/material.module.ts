import { NgModule } from "@angular/core";

import {
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
} from "@angular/material";
import {
  MdcCardModule,
  MdcIconModule,
  MdcRippleModule,
  MdcFabModule,
  MdcButtonModule,
  MdcMenuModule,
  MdcSnackbarModule,
  MdcIconToggleModule,
  MdcIconToggle,
  MdcTabModule,
  MdcThemeModule,
  MdcToolbarModule,
  MdcDialogModule,
  MdcLinearProgressModule,
  MdcListModule
} from "@angular-mdc/web";
import { CdkTableModule } from "@angular/cdk/table";

export const MatModules = [
  // MatIconModule,
  MatButtonModule,
  // MatCheckboxModule,
  // MatCardModule,
  MatDialogModule
];

export const MODULES = [
  MdcLinearProgressModule,
  MdcFabModule,
  MdcMenuModule,
  MdcIconModule,
  MdcRippleModule,
  MdcButtonModule,
  MdcCardModule,
  MdcSnackbarModule,
  MdcTabModule,
  MdcIconToggleModule,
  MdcThemeModule,
  MdcDialogModule,
  MdcToolbarModule,
  MdcListModule
];

@NgModule({
  imports: [...MatModules, ...MODULES],
  exports: [CdkTableModule, , ...MatModules, ...MODULES]
})
export class MaterialModule {}
