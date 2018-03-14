import { NgModule } from "@angular/core";
import { CommonModule as cm } from "@angular/common";
import { ReadingPositionIndicatorComponent } from "./reading-position-indicator/reading-position-indicator.component";
import { MaterialModule } from "material";
import { BottomNavigationComponent } from "./bottom-navigation/bottom-navigation.component";
import { RouterModule } from "@angular/router";
import { SplitPaneModule } from "./split-pane/ng2-split-pane";
import { DialogService } from "./services/dialog/dialog.service";
import { SimpleDialog } from "./services/dialog/simple-dialog";

@NgModule({
  imports: [cm, MaterialModule, RouterModule, SplitPaneModule],
  declarations: [
    ReadingPositionIndicatorComponent,
    BottomNavigationComponent,
    SimpleDialog
  ],
  exports: [
    ReadingPositionIndicatorComponent,
    BottomNavigationComponent,
    SplitPaneModule
  ],
  entryComponents: [SimpleDialog],
  providers: [DialogService]
})
export class MsCommonModule {}
