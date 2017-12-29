import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MarkdownViewerComponent } from './markdown-viewer.component';
import { MarkdownConfig } from './markdown.config';
import { MarkdownViewerService } from './services/markdown.viewer.service';
import { Router } from '@angular/router';

@NgModule({
    declarations: [
        MarkdownViewerComponent
    ],
    imports: [CommonModule],
    exports: [
        MarkdownViewerComponent
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