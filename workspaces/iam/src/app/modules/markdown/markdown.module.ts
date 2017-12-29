import { NgModule, ModuleWithProviders } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { MarkdownComponent } from './markdown.component';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material/material.module';
import { MarkdownEditorModule } from './editor/markdown-editor.module';
import { MarkdownViewerModule } from './viewer/index';
import { MarkdownConfig } from './viewer/markdown.config';
import { DocumentRoutingModule } from './markdown-routing.module';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MaterialModule,
    HttpModule,
    MarkdownEditorModule,
    MarkdownViewerModule,
    DocumentRoutingModule
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
  static forRoot(config?: MarkdownConfig) {
    return {
      ngModule: MarkdownModule,
      providers: MarkdownViewerModule.forRoot(config).providers
    }
  }
}
