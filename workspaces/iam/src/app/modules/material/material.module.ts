
// import { MatButtonModule, MatCheckboxModule, MatIconModule, MatCardModule } from '@angular/material';
import { NgModule } from '@angular/core';

// @NgModule({
//     imports: [MatIconModule, MatButtonModule, MatCheckboxModule, MatCardModule],
//     exports: [MatIconModule, MatButtonModule, MatCheckboxModule, MatCardModule]
// })
import {
    MdcCardModule,
    MdcIconModule,
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
    MdcLinearProgressModule
} from '@angular-mdc/web';

export const MODULES = [
    MdcLinearProgressModule,
    MdcFabModule,
    MdcMenuModule,
    MdcIconModule,
    MdcButtonModule,
    MdcCardModule,
    MdcSnackbarModule,
    MdcTabModule,
    MdcIconToggleModule,
    MdcThemeModule,
    MdcDialogModule,
    MdcToolbarModule
];

@NgModule({
    imports: MODULES,
    exports: MODULES
})
export class MaterialModule { }