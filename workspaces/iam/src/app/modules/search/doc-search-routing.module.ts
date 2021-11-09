import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { SearchPageComponent } from './doc-search.component';

const meRoutes: Routes = [
  {
    path: '',
    component: SearchPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(meRoutes)],
  exports: [RouterModule]
})
export class SearchRoutingModule {}
