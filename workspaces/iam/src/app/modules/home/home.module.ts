import { NgModule } from '@angular/core';
import { HomeComponent } from './home.component';
import { DocService } from './services/doc.service';
import { MaterialModule } from '../material/material.module';
import { SpinnerModule } from '@metaseed/spinner';
import { DeleteAlertDialogComponent } from './doc-list/deleteAlert-dialog.component';
import { DocDeleteComponent } from './doc-list/doc-item/doc-delete/doc-delete.component';
import { SharedModule } from 'shared';
import { ScrollingModule } from '@angular/cdk-experimental/scrolling';
import { HomeTopBarComponent } from './home-top-bar/home-top-bar.component';
import { DocTreeComponent } from './doc-tree/doc-tree.component';
import { TagsCloudModule } from './tags-cloud/tags-cloud.module';
import { DocListContainerComponent } from './doc-list-container/doc-list-container.component';
import { DocListModule } from './doc-list/doc-list-module';
@NgModule({
  imports: [SharedModule, ScrollingModule, MaterialModule, SpinnerModule,TagsCloudModule, DocListModule],
  declarations: [
    DeleteAlertDialogComponent,
    HomeComponent,
    DocListContainerComponent,
    DocDeleteComponent,
    HomeTopBarComponent,
    DocTreeComponent
  ],
  exports: [HomeComponent],
  providers: [DocService],
  entryComponents: [DeleteAlertDialogComponent]
})
export class HomeModule {}
