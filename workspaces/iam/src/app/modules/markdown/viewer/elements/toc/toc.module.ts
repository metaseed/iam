import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { TocComponent } from "./toc.component";
import { MatSnackBarModule, MatIconModule } from "@angular/material";
import { TocService } from "../../services/toc.service";
import { WithCustomElementComponent } from "../element-registry";
import { Type } from "@angular/core";

@NgModule({
  imports: [CommonModule, MatSnackBarModule, MatIconModule],
  declarations: [TocComponent],
  entryComponents: [TocComponent],
  exports: [TocComponent]
})
export class TocModule implements WithCustomElementComponent {
  customElementComponent: Type<any> = TocComponent;
}
