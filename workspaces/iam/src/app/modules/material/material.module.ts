
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
    MdcDialogModule
} from '@angular-mdc/web';

@NgModule({
    imports: [
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
    ],
    exports: [
        MdcFabModule,
        MdcMenuModule,
        MdcIconModule,
        MdcButtonModule,
        MdcCardModule,
        MdcSnackbarModule,
        MdcTabModule,
        MdcIconToggle,
        MdcThemeModule,
        MdcDialogModule,
        MdcToolbarModule
    ]
})
export class MaterialModule { }