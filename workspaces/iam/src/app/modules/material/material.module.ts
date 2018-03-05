
// import { MatButtonModule, MatCheckboxModule, MatIconModule, MatCardModule } from '@angular/material';
import { NgModule } from '@angular/core';

// @NgModule({
//     imports: [MatIconModule, MatButtonModule, MatCheckboxModule, MatCardModule],
//     exports: [MatIconModule, MatButtonModule, MatCheckboxModule, MatCardModule]
// })
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
} from '@angular-mdc/web';

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
    imports: MODULES,
    exports: MODULES
})
export class MaterialModule { }