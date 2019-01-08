import { Route, Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { DocSearchListComponent } from './doc-search-list/doc-search-list.component';

const meRoutes: Routes = [
  {
    path: '',
    component: DocSearchListComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(meRoutes)],
  exports: [RouterModule]
})
export class SearchRoutingModule {}
