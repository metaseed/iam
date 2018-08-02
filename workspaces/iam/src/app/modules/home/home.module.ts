import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { HomeComponent } from './home.component';
import { NewDocComponent } from './new-doc/new-doc.component';
import { DocListComponent } from './doc-list/doc-list.component';
import { DocService } from './services/doc.service';
import { MaterialModule } from '../material/material.module';
import { SpinnerModule } from '@metaseed/spinner';
import { DeleteAlertDialog } from './doc-list/dialog.component';
import { DocSearchComponent } from './doc-search/doc-search.component';
import { DocSearchService } from './services/doc-search.service';
import { GithubStorageModule } from '../net-storage/github/github-storage.module';
import { DatabaseModule } from 'database';
import { DocItemComponent } from './doc-list/doc-item/doc-item.component';
import { DocDeleteComponent } from './doc-list/doc-item/doc-delete/doc-delete.component';
import { SharedModule } from 'shared';
import { ScrollingModule } from '@angular/cdk-experimental/scrolling';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    ScrollingModule,
    MaterialModule,
    SpinnerModule
  ],
  declarations: [
    DeleteAlertDialog,
    NewDocComponent,
    HomeComponent,
    DocListComponent,
    DocSearchComponent,
    DocDeleteComponent,
    DocItemComponent
  ],
  exports: [HomeComponent],
  providers: [DocService, DocSearchService],
  entryComponents: [DeleteAlertDialog]
})
export class HomeModule {}
