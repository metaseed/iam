import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { DocsComponent } from "./docs.component";
import { NewDocComponent } from "./new-doc/new-doc.component";
import { DocListComponent } from "./doc-list/doc-list.component";
import { DocListService } from './services/doc-list.service';

const todosRoutes: Routes = [
  {
    path: 'docs', component: DocsComponent
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    //RouterModule.forChild(todosRoutes),
  ],
  declarations: [
    NewDocComponent,
    DocsComponent,
    DocListComponent,
  ],
  exports: [
    DocsComponent
  ],
  providers: [
    DocListService
  ]
})
export class DocsModule {
}
