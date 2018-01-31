import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MarkdownViewerComponent } from './markdown-viewer.component';
import { MarkdownConfig } from './markdown.config';
import { MarkdownViewerService } from './services/markdown.viewer.service';
import { Router } from '@angular/router';
import { MsCommonModule } from 'common';
import { ReaderToolbarComponent } from './reader-toolbar/reader-toolbar.component';
import { MaterialModule } from 'material';
import { RouterModule } from '@angular/router';
import { MarkdownViewerContainerComponent } from 'app/modules/markdown/viewer/markdown-viewer-container.component';

@NgModule({
    declarations: [
        MarkdownViewerComponent,
        ReaderToolbarComponent,
        MarkdownViewerContainerComponent
    ],
    imports: [CommonModule,
        MsCommonModule,
        MaterialModule,
        RouterModule
    ],
    exports: [
        MarkdownViewerComponent,
        ReaderToolbarComponent,
        MarkdownViewerContainerComponent
    ],
    providers: [
    ],
})
export class MarkdownViewerModule {
    static forChild(config?: MarkdownConfig): ModuleWithProviders {
        return {
            ngModule: MarkdownViewerModule,
            providers: [
                {
                    provide: 'MarkdownConfig',
                    useValue: config,
                },
                {
                    provide: MarkdownViewerService,
                    useFactory: configureMarkdownService,
                    deps: [Router, 'MarkdownConfig']
                }
            ]
        };
    }

}

export function configureMarkdownService(router: Router, config: MarkdownConfig) {
    const service = new MarkdownViewerService(router, config);
    return service;
}