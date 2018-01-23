import { Component, OnInit, Input } from '@angular/core';
import { MarkdownEditorService } from './index';
import { setTimeout } from 'timers';
import { ViewChild } from '@angular/core';
import { MonacoEditorComponent } from './monaco-editor/monaco-editor.component';

@Component({
    selector: 'ms-markdown-editor',
    template: `
    <editor-toolbar></editor-toolbar>
    <monaco-editor *loadMonacoEditor [options]="editorOptions " [(ngModel)]="markdown "></monaco-editor>
    <sk-cube-grid [isRunning]="!editorLoaded"></sk-cube-grid>
               `,
    styles: ['']
})
export class MarkdownEditorComponent implements OnInit {
    @Input()
    editorLoaded = false;
    @Input()
    markdown: string;
    @Input()
    options: any;
    @ViewChild(MonacoEditorComponent)
    editor: MonacoEditorComponent;

    constructor(private _service: MarkdownEditorService) {
        _service.editorLoaded$.subscribe(() => {
            setTimeout(() => this.editorLoaded = true, 0);
        });
    }


    ngOnInit() { }
}