import { NgModule } from "@angular/core";
import { CommonModule as cm } from "@angular/common";
import { ReadingPositionIndicatorComponent } from "./reading-position-indicator/reading-position-indicator.component";
import { MaterialModule } from "material";
import { BottomNavigationComponent } from "./bottom-navigation/bottom-navigation.component";
import { RouterModule } from "@angular/router";
import { SplitPaneModule } from "./split-pane/ng2-split-pane";
import { DialogService } from "./services/dialog/dialog.service";

@NgModule({
  imports: [cm, MaterialModule, RouterModule, SplitPaneModule],
  declarations: [ReadingPositionIndicatorComponent, BottomNavigationComponent],
  exports: [
    ReadingPositionIndicatorComponent,
    BottomNavigationComponent,
    SplitPaneModule
  ],
  providers: [DialogService]
})
export class MsCommonModule {}
