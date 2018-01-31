import { NgModule, ModuleWithProviders } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { MarkdownComponent } from './markdown.component';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material/material.module';
import { MarkdownEditorModule } from './editor/markdown-editor.module';
import { MarkdownViewerModule } from './viewer/index';
import { MarkdownConfig } from './viewer/markdown.config';
import { MarkdownRoutingModule } from './markdown-routing.module';
import { NgSpinKitModule } from 'ng-spin-kit';
import { StoreModule } from '@ngrx/store';
import * as fromReducers from './reducers';
import { MarkdownEditorComponent } from './editor/markdown-editor.component';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MaterialModule,
    HttpModule,
    NgSpinKitModule,
    MarkdownRoutingModule,
    StoreModule.forFeature('markdown', fromReducers.reducers),
    MarkdownEditorModule,
    MarkdownViewerModule.forChild(),

  ],
  declarations: [
    MarkdownComponent
  ],
  providers: [
  ],
  exports: [
    MarkdownEditorModule,
    MarkdownViewerModule,
    MarkdownComponent
  ],
})
export class MarkdownModule {
  static forChild(config?: MarkdownConfig) {
    return {
      ngModule: MarkdownModule,
      providers: MarkdownViewerModule.forChild(config).providers
    }
  }
}
