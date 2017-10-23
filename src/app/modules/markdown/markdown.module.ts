import { NgModule, ModuleWithProviders } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { MarkdownEditorComponent } from './components/markdown-editor.component';
import { MarkdownViewerComponent } from './components/markdown-viewer.component';
import { MarkdownConfig } from './markdown.config';
import { MarkdownViewService } from './services/markdown.view.service';

@NgModule({
  imports: [
    FormsModule
  ],
  declarations: [
    MarkdownEditorComponent,
    MarkdownViewerComponent
  ],
  exports: [
    MarkdownEditorComponent,
    MarkdownViewerComponent
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
