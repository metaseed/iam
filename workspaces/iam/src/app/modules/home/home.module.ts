import { NgModule } from '@angular/core';
import { HomeComponent } from './home.component';
import { DocListComponent } from './doc-list/doc-list.component';
import { DocService } from './services/doc.service';
import { MaterialModule } from '../material/material.module';
import { SpinnerModule } from '@metaseed/spinner';
import { DeleteAlertDialogComponent } from './doc-list/deleteAlert-dialog.component';
import { DocItemComponent } from './doc-list/doc-item/doc-item.component';
import { DocDeleteComponent } from './doc-list/doc-item/doc-delete/doc-delete.component';
import { SharedModule } from 'shared';
import { ScrollingModule } from '@angular/cdk-experimental/scrolling';
import { HomeTopBarComponent } from './home-top-bar/home-top-bar.component';
import { DocTreeComponent } from './doc-tree/doc-tree.component';
import { TagsCloudModule } from './tags-cloud/tags-cloud.module';
@NgModule({
  imports: [SharedModule, ScrollingModule, MaterialModule, SpinnerModule,TagsCloudModule],
  declarations: [
    DeleteAlertDialogComponent,
    HomeComponent,
    DocListComponent,
    DocDeleteComponent,
    DocItemComponent,
    HomeTopBarComponent,
    DocTreeComponent
  ],
  exports: [HomeComponent],
  providers: [DocService],
  entryComponents: [DeleteAlertDialogComponent]
})
export class HomeModule {}
