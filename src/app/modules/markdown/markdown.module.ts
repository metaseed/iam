import { NgModule, ModuleWithProviders } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { MarkdownEditorComponent } from './components/markdown-editor.component';
import { MarkdownViewerComponent } from './components/markdown-viewer.component';
import { MarkdownConfig } from './markdown.config';

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
        // {
        //   provide: MarkdownItService,
        //   useFactory: configureMarkdownService,
        //   deps: ['MarkdownItConfig']
        // }
      ]
    };
  }
}

// export function configureMarkdownService(config: MarkdownItConfig) {
//   const service = new MarkdownItService(config);
//   return service;
// }
