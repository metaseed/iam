import { NgModule } from '@angular/core';
import { CommonModule as cm } from '@angular/common';
import { ReadingPositionIndicatorComponent } from './reading-position-indicator/reading-position-indicator.component';
import { MaterialModule } from 'material';

@NgModule({
    imports: [
        cm,
        MaterialModule
    ],
    declarations: [ReadingPositionIndicatorComponent],
    exports: [ReadingPositionIndicatorComponent]

})
export class MsCommonModule { }
