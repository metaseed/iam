import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { TocComponent } from "./toc.component";
import { MatSnackBarModule } from "@angular/material";
import { TocService } from "../../services/toc.service";

@NgModule({
  imports: [CommonModule, MatSnackBarModule],
  declarations: [TocComponent],
  entryComponents: [TocComponent],
  exports: [TocComponent]
})
export class TocModule {}
