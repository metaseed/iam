
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
    MdcMenuModule
} from '@angular-mdc/web';

@NgModule({
    imports: [
        MdcFabModule,
        MdcMenuModule,
        MdcIconModule,
        MdcButtonModule,
        MdcCardModule
    ],
    exports: [
        MdcFabModule,
        MdcMenuModule,
        MdcIconModule,
        MdcButtonModule,
        MdcCardModule
    ]
})
export class MaterialModule { }