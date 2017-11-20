
import { MatButtonModule, MatCheckboxModule, MatIconModule } from '@angular/material';
import { NgModule } from '@angular/core';


@NgModule({
    imports: [MatIconModule, MatButtonModule, MatCheckboxModule],
    exports: [MatIconModule, MatButtonModule, MatCheckboxModule]
})
export class MaterialModule { }