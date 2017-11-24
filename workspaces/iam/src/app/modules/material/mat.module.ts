
// import { MatButtonModule, MatCheckboxModule, MatIconModule, MatCardModule } from '@angular/material';
import { NgModule } from '@angular/core';
import { MdcCardModule, MdcIconModule } from '@angular-mdc/web';

// @NgModule({
//     imports: [MatIconModule, MatButtonModule, MatCheckboxModule, MatCardModule],
//     exports: [MatIconModule, MatButtonModule, MatCheckboxModule, MatCardModule]
// })
import {
    MdcCoreModule, // required
    MdcFabModule,
    MdcButtonModule,
    MdcMenuModule
} from '@angular-mdc/web';

@NgModule({
    imports: [
        MdcCoreModule, // required
        MdcFabModule,
        MdcMenuModule,
        MdcIconModule,
        MdcButtonModule,
        MdcCardModule
    ],
    exports: [
        MdcCoreModule, // required
        MdcFabModule,
        MdcMenuModule,
        MdcIconModule,
        MdcButtonModule,
        MdcCardModule
    ]
})
export class MaterialModule { }