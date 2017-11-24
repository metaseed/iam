
import { MatButtonModule, MatCheckboxModule, MatIconModule, MatCardModule } from '@angular/material';
import { NgModule } from '@angular/core';


@NgModule({
    imports: [MatIconModule, MatButtonModule, MatCheckboxModule, MatCardModule],
    exports: [MatIconModule, MatButtonModule, MatCheckboxModule, MatCardModule]
})
export class MaterialModule { }