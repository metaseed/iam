import { NgModule } from '@angular/core';
import { HomeComponent } from './home.component';
import { DocListComponent } from './doc-list/doc-list.component';
import { DocService } from './services/doc.service';
import { MaterialModule } from '../material/material.module';
import { SpinnerModule } from '@metaseed/spinner';
import { DeleteAlertDialog } from './doc-list/dialog.component';
import { DocItemComponent } from './doc-list/doc-item/doc-item.component';
import { DocDeleteComponent } from './doc-list/doc-item/doc-delete/doc-delete.component';
import { SharedModule } from 'shared';
import { ScrollingModule } from '@angular/cdk-experimental/scrolling';
import { HomeTopBarComponent } from './home-top-bar/home-top-bar.component';

@NgModule({
  imports: [SharedModule, ScrollingModule, MaterialModule, SpinnerModule],
  declarations: [
    DeleteAlertDialog,
    HomeComponent,
    DocListComponent,
    DocDeleteComponent,
    DocItemComponent,
    HomeTopBarComponent
  ],
  exports: [HomeComponent],
  providers: [DocService],
  entryComponents: [DeleteAlertDialog]
})
export class HomeModule {}
