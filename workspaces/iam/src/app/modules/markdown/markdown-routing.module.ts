import { Route, Routes, RouterModule } from "@angular/router";
import { MarkdownComponent } from "./markdown.component";
import { NgModule } from "@angular/core";
import { CanDeactivateGuard } from "./editor/services/can-deactive-guard.service";

const documentRoutes: Routes = [
  {
    path: "new",
    component: MarkdownComponent,
    canDeactivate: [CanDeactivateGuard]
  },
  {
    path: "",
    component: MarkdownComponent,
    canDeactivate: [CanDeactivateGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(documentRoutes)],
  exports: [RouterModule]
})
export class MarkdownRoutingModule {}
