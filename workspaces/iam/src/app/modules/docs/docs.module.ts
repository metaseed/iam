import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule, Routes } from "@angular/router";
import { FormsModule } from "@angular/forms";
import { FlexLayoutModule } from "@angular/flex-layout";

import { DocsComponent } from "./docs.component";
import { NewDocComponent } from "./new-doc/new-doc.component";
import { DocListComponent } from "./doc-list/doc-list.component";
import { DocService } from "./services/doc.service";
import { MaterialModule } from "../../modules/material/material.module";
import { NgSpinKitModule } from "ng-spin-kit";
import { DeleteAlertDialog } from "app/modules/docs/doc-list/dialog.component";
import { DocSearchComponent } from './doc-search/doc-search.component';
const todosRoutes: Routes = [
  {
    path: "docs",
    component: DocsComponent
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MaterialModule,
    FlexLayoutModule,
    NgSpinKitModule
    //RouterModule.forChild(todosRoutes),
  ],
  declarations: [
    DeleteAlertDialog,
    NewDocComponent,
    DocsComponent,
    DocListComponent,
    DocSearchComponent
  ],
  exports: [DocsComponent],
  providers: [DocService],
  entryComponents: [DeleteAlertDialog]
})
export class DocsModule {}
