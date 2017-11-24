import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';

import { DocsComponent } from "./docs.component";
import { NewDocComponent } from "./new-doc/new-doc.component";
import { DocListComponent } from "./doc-list/doc-list.component";
import { DocService } from './services/doc.service';
import { MaterialModule } from '../modules/material/mat.module';
const todosRoutes: Routes = [
  {
    path: 'docs', component: DocsComponent
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MaterialModule,
    FlexLayoutModule
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
    DocService
  ]
})
export class DocsModule {
}
