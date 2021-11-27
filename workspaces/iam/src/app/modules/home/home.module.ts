import { NgModule } from '@angular/core';
import { HomeComponent } from './home.component';
import { DocService } from './services/doc.service';
import { MaterialModule } from '../material/material.module';
import { SpinnerModule } from '@metaseed/spinner';
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
    HomeComponent,
    DocListContainerComponent,
    HomeTopBarComponent,
    DocTreeComponent
  ],
  exports: [HomeComponent],
  providers: [DocService],
})
export class HomeModule {}
