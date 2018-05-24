import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';

import { DocsComponent } from './docs.component';
import { NewDocComponent } from './new-doc/new-doc.component';
import { DocItemComponent } from './doc-list-item/doc-list-item.component';
import { DocService } from './services/doc.service';
import { MaterialModule } from '../../modules/material/material.module';
import { NgSpinKitModule } from 'ng-spin-kit';
import { DeleteAlertDialog } from 'app/modules/docs/doc-list-item/dialog.component';
import { DocSearchComponent } from './doc-search/doc-search.component';
import { DocSearchService } from './services/doc-search.service';
import { StoreModule } from '@ngrx/store';
import * as fromState from './state';
import { EffectsModule } from '@ngrx/effects';
import { DocumentEffects } from './state/document.effects';
import { DocDeleteComponent } from './doc-list-item/doc-delete/doc-delete.component';
const routes: Routes = [
  {
    path: 'docs',
    component: DocsComponent
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MaterialModule,
    FlexLayoutModule,
    NgSpinKitModule,
    StoreModule.forFeature<fromState.DocsState>('docs', fromState.reducers ),
    EffectsModule.forFeature([DocumentEffects])
    //RouterModule.forChild(routes),
  ],
  declarations: [
    DeleteAlertDialog,
    NewDocComponent,
    DocsComponent,
    DocItemComponent,
    DocSearchComponent,
    DocDeleteComponent
  ],
  exports: [DocsComponent],
  providers: [DocService, DocSearchService],
  entryComponents: [DeleteAlertDialog]
})
export class DocsModule {}
