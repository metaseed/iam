import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MarkdownViewerComponent } from './markdown-viewer.component';
import { MarkdownConfig } from './markdown.config';
import { MarkdownViewerService } from './services/markdown.viewer.service';
import { SharedModule } from 'shared';
import { ViewerToolbarComponent } from './viewer-toolbar/viewer-toolbar.component';
import { MaterialModule } from 'material';
import { RouterModule } from '@angular/router';
import { MarkdownViewerContainerComponent } from './markdown-viewer-container.component';
import { SpinnerModule } from '@metaseed/spinner';
import { ElementsModule } from './elements/elements.module';
import { TocService } from './services/toc.service';
import { ViewerActiveElementService } from './services/active-element.service';

@NgModule({
  imports: [
    CommonModule,
    SpinnerModule,
    SharedModule,
    MaterialModule,
    RouterModule,
    ElementsModule
  ],
  declarations: [MarkdownViewerComponent, ViewerToolbarComponent, MarkdownViewerContainerComponent],
  exports: [MarkdownViewerComponent, ViewerToolbarComponent, MarkdownViewerContainerComponent],
  providers: [TocService, ViewerActiveElementService]
})
export class MarkdownViewerModule {
  static forFeature(config?: MarkdownConfig): ModuleWithProviders<MarkdownViewerModule> {
    return {
      ngModule: MarkdownViewerModule,
      providers: [
        {
          provide: 'MarkdownConfig',
          useValue: config
        },
        {
          provide: MarkdownViewerService
        }
      ]
    };
  }
}


