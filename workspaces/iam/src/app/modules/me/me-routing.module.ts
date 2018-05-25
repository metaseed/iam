import { Route, Routes, RouterModule } from "@angular/router";
import { NgModule } from "@angular/core";
import { MeComponent } from "./me/me.component";

const meRoutes: Routes = [
  {
    path: "",
    component: MeComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(meRoutes)],
  exports: [RouterModule]
})
export class MeRoutingModule {}
