import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'ms-markdown-editor',
    template: '<monaco-editor *loadMonacoEditor [options]="editorOptions " [(ngModel)]="markdown "></monaco-editor>',
    styles: ['']
})
export class MarkdownEditorComponent implements OnInit {
    markdown: string;
    editorOptions: any;
    constructor() { }


    ngOnInit() { }
}