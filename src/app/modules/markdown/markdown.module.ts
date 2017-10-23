import { NgModule, ModuleWithProviders } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { MarkdownEditorComponent } from './components/editor/markdown-editor.component';
import { MarkdownViewerComponent } from './components/viewer/markdown-viewer.component';
import { MarkdownConfig } from './markdown.config';
import { MarkdownViewService } from './services/markdown.view.service';
import { MarkdownComponent } from './components/markdown.component';

@NgModule({
  imports: [
    FormsModule
  ],
  declarations: [
    MarkdownEditorComponent,
    MarkdownViewerComponent,
    MarkdownComponent
  ],
  exports: [
    MarkdownEditorComponent,
    MarkdownViewerComponent,
    MarkdownComponent
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
