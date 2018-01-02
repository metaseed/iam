import { Component, OnInit } from '@angular/core';
import { MarkdownEditorService } from './index';

@Component({
    selector: 'ms-markdown-editor',
    template: `
    <monaco-editor *loadMonacoEditor [options]="editorOptions " [(ngModel)]="markdown "></monaco-editor>
    <sk-cube-grid [isRunning]="!editorLoaded"></sk-cube-grid>
               `,
    styles: ['']
})
export class MarkdownEditorComponent implements OnInit {
    editorLoaded = false;
    markdown: string;
    editorOptions: any;
    constructor(private _service: MarkdownEditorService) {
        _service.editorLoaded$.subscribe(() => {
            this.editorLoaded = true;
        });
    }


    ngOnInit() { }
}