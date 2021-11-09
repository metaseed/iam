import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { DocSearchListComponent } from '../shared/bundle-share/components/search/doc-search-list/doc-search-list.component';

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
