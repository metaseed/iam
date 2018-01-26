import { Component, OnInit, Input, Output } from '@angular/core';
import { MarkdownEditorService } from './index';
import { setTimeout } from 'timers';
import { ViewChild } from '@angular/core';
import { MonacoEditorComponent } from './monaco-editor/monaco-editor.component';
import { EventEmitter } from '@angular/core';

@Component({
    selector: 'ms-markdown-editor',
    template: `
    <codemirror [(ngModel)]="markdown" [config]="options"></codemirror>
    <sk-cube-grid [isRunning]="!editorLoaded"></sk-cube-grid>
               `,
    styles: ['']
})
export class MarkdownEditorComponent implements OnInit {
    @Input()
    editorLoaded = false;

    @Output()
    markdownChange = new EventEmitter();

    _markdown: string;
    @Input()
    get markdown(): string {
        return this._markdown;
    }

    set markdown(value) {
        this._markdown = value;
        this.markdownChange.emit(value);
    }
    options = {
        mode: 'gfm',
        lineNumbers: true,
        scrollbarStyle: 'simple',
        lineWrapping: true,
        extraKeys: {
            "F11": function (cm) {
                cm.setOption("fullScreen", !cm.getOption("fullScreen"));
            },
            "Esc": function (cm) {
                if (cm.getOption("fullScreen")) cm.setOption("fullScreen", false);
            }
        }
    };

    @ViewChild(MonacoEditorComponent)
    editor: MonacoEditorComponent;

    constructor(private _service: MarkdownEditorService) {
        _service.editorLoaded$.subscribe(() => {
            setTimeout(() => this.editorLoaded = true, 0);
        });
    }


    ngOnInit() { }
}