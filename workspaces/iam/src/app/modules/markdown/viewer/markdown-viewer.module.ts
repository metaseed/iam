import { NgModule, ModuleWithProviders } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MarkdownViewerComponent } from "./markdown-viewer.component";
import { MarkdownConfig } from "./markdown.config";
import { MarkdownViewerService } from "./services/markdown.viewer.service";
import { Router } from "@angular/router";
import { SharedModule } from "shared";
import { ReaderToolbarComponent } from "./reader-toolbar/reader-toolbar.component";
import { MaterialModule } from "material";
import { RouterModule } from "@angular/router";
import { MarkdownViewerContainerComponent } from "app/modules/markdown/viewer/markdown-viewer-container.component";
import { NgSpinKitModule } from "ng-spin-kit";
import { DocumentRef } from "core";
import { ObservableMedia } from "@angular/flex-layout";
import { TocComponent } from "./elements/toc/toc.component";
import { ElementsModule } from "./elements/elements.module";
import { TocService } from "./services/toc.service";

@NgModule({
  declarations: [
    MarkdownViewerComponent,
    ReaderToolbarComponent,
    MarkdownViewerContainerComponent
  ],
  imports: [
    CommonModule,
    NgSpinKitModule,
    SharedModule,
    MaterialModule,
    RouterModule,
    ElementsModule
  ],
  exports: [
    MarkdownViewerComponent,
    ReaderToolbarComponent,
    MarkdownViewerContainerComponent
  ],
  providers: [TocService]
})
export class MarkdownViewerModule {
  static forChild(config?: MarkdownConfig): ModuleWithProviders {
    return {
      ngModule: MarkdownViewerModule,
      providers: [
        {
          provide: "MarkdownConfig",
          useValue: config
        },
        {
          provide: MarkdownViewerService,
          useFactory: configureMarkdownService,
          deps: [Router, DocumentRef, ObservableMedia, "MarkdownConfig"]
        }
      ]
    };
  }
}

export function configureMarkdownService(
  router: Router,
  document: DocumentRef,
  media: ObservableMedia,
  config: MarkdownConfig
) {
  return new MarkdownViewerService(router, document, media, config);
}
