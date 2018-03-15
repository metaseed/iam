import { NgModule } from "@angular/core";

import {
  // MatButtonModule,
  // MatCheckboxModule,
  // MatIconModule,
  // MatCardModule,
  MatDialogModule
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

export const MatModules = [
  // MatIconModule,
  // MatButtonModule,
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
  exports: [...MatModules, ...MODULES]
})
export class MaterialModule {}
