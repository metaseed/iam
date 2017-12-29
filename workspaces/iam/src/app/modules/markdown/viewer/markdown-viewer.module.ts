import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MarkdownViewerComponent } from './markdown-viewer.component';
import { MarkdownConfig } from './markdown.config';
import { MarkdownViewerService } from './services/markdown.viewer.service';

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
                    deps: ['MarkdownConfig']
                }
            ]
        };
    }

}

export function configureMarkdownService(config: MarkdownConfig) {
    const service = new MarkdownViewerService(config);
    return service;
}