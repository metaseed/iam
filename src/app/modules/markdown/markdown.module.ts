import { NgModule, ModuleWithProviders } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { HttpModule } from '@angular/http';
import { MarkdownViewerComponent } from './components/viewer/markdown-viewer.component';
import { MarkdownConfig } from './markdown.config';
import { MarkdownViewService } from './services/markdown.view.service';
import { MarkdownComponent } from './components/markdown.component';
import { AceEditorDirective } from './components/editor/markdown-editor.directive';
import { CommonModule } from '@angular/common';
import { EditorToolbarComponent } from './components/editor-toolbar/markdown.editor-toolbar.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HttpModule
  ],
  declarations: [
    MarkdownViewerComponent,
    MarkdownComponent,
    AceEditorDirective,
    EditorToolbarComponent
  ],
  exports: [
    MarkdownViewerComponent,
    MarkdownComponent,
    AceEditorDirective
  ],
})
export class MarkdownModule {
  static forRoot(config?: MarkdownConfig): ModuleWithProviders {
    return {
      ngModule: MarkdownModule,
      providers: [
        {
          provide: 'MarkdownConfig',
          useValue: config,
        },
        {
          provide: MarkdownViewService,
          useFactory: configureMarkdownService,
          deps: ['MarkdownConfig']
        }
      ]
    };
  }
}

export function configureMarkdownService(config: MarkdownConfig) {
  const service = new MarkdownViewService(config);
  return service;
}
