import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { HomeComponent } from './home.component';
import { NewDocComponent } from './new-doc/new-doc.component';
import { DocListComponent } from './doc-list/doc-list.component';
import { DocService } from './services/doc.service';
import { MaterialModule } from '../../modules/material/material.module';
import { NgSpinKitModule } from 'ng-spin-kit';
import { DeleteAlertDialog } from './doc-list/dialog.component';
import { DocSearchComponent } from './doc-search/doc-search.component';
import { DocSearchService } from './services/doc-search.service';
import { StoreModule } from '@ngrx/store';
import * as fromState from './state';
import { EffectsModule } from '@ngrx/effects';
import { DocumentEffects } from './state/document.effects';
import { GithubStorageModule } from '../net-storage/github/github-storage.module';
import { DatabaseModule } from 'database';
import { EffectsMoniter } from './state';
import { DocEffectsUtil } from './state/document.effects.util';
import { ScrollingModule } from '@angular/cdk-experimental';
import { DocItemComponent } from './doc-list/doc-item/doc-item.component';
import { DocDeleteComponent } from './doc-list/doc-item/doc-delete/doc-delete.component';
import { SharedModule } from 'shared';

const routes: Routes = [
  {
    path: 'docs',
    component: HomeComponent
  }
];

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    ScrollingModule,
    MaterialModule,
    NgSpinKitModule,
    GithubStorageModule,
    DatabaseModule,
    StoreModule.forFeature<fromState.DocsState>('docs', fromState.reducers),
    EffectsModule.forFeature([DocumentEffects])
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
  providers: [DocService, DocSearchService, EffectsMoniter, DocEffectsUtil],
  entryComponents: [DeleteAlertDialog]
})
export class HomeModule {}
