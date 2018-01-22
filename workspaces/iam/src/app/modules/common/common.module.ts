import { NgModule } from '@angular/core';
import { CommonModule as cm } from '@angular/common';
import { ReadingPositionIndicatorComponent } from './reading-position-indicator/reading-position-indicator.component';
import { MaterialModule } from 'material';
import { BottomNavigationComponent } from './bottom-navigation/bottom-navigation.component';
import { RouterModule } from '@angular/router';

@NgModule({
    imports: [
        cm,
        MaterialModule,
        RouterModule
    ],
    declarations: [ReadingPositionIndicatorComponent, BottomNavigationComponent],
    exports: [ReadingPositionIndicatorComponent, BottomNavigationComponent]

})
export class MsCommonModule { }
