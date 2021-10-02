import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MarkdownViewerComponent } from './markdown-viewer.component';
import { MarkdownConfig } from './markdown.config';
import { MarkdownViewerService } from './services/markdown.viewer.service';
import { Router } from '@angular/router';
import { SharedModule } from 'shared';
import { ViewerToolbarComponent } from './viewer-toolbar/viewer-toolbar.component';
import { MaterialModule } from 'material';
import { RouterModule } from '@angular/router';
import { MarkdownViewerContainerComponent } from './markdown-viewer-container.component';
import { SpinnerModule } from '@metaseed/spinner';
import { DocumentRef } from 'core';
import { ElementsModule } from './elements/elements.module';
import { TocService } from './services/toc.service';
import { Utilities } from '../../core/utils';
import { ViewerActiveElementService } from './services/active-element.service';
import { Store, State } from '@ngrx/store';

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
          provide: MarkdownViewerService,
          useFactory: configureMarkdownService,
          deps: [Router, DocumentRef, Utilities, State, Store, 'MarkdownConfig']
        }
      ]
    };
  }
}

export function configureMarkdownService(
  document: DocumentRef,
  utils: Utilities,
  state: State<any>,
  store: Store<any>,
  config: MarkdownConfig
) {
  return new MarkdownViewerService( document, utils, state, store, config);
}
