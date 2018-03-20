import { NgModule } from "@angular/core";
import { CommonModule as cm, CommonModule } from "@angular/common";
import { ReadingPositionIndicatorComponent } from "./reading-position-indicator/reading-position-indicator.component";
import { MaterialModule } from "material";
import { BottomNavigationComponent } from "./bottom-navigation/bottom-navigation.component";
import { RouterModule } from "@angular/router";
import { SplitPaneModule } from "./split-pane/ng2-split-pane";
import { DialogService } from "./services/dialog/dialog.service";
import { FormsModule } from "@angular/forms";

@NgModule({
  imports: [cm, MaterialModule, RouterModule, SplitPaneModule],
  declarations: [ReadingPositionIndicatorComponent, BottomNavigationComponent],
  exports: [
    ReadingPositionIndicatorComponent,
    BottomNavigationComponent,
    SplitPaneModule,
    /* re-exporting */
    CommonModule,
    FormsModule
  ],
  providers: [/*should have no provides in shared module*/ DialogService]
})
export class MsCommonModule {}
