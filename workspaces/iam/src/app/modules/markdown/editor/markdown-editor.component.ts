import { Component, OnInit, Input, Output, ViewChild } from '@angular/core';
import { MarkdownEditorService } from './index';
import { setTimeout } from 'timers';
import { MonacoEditorComponent } from './monaco-editor/monaco-editor.component';
import { EventEmitter } from '@angular/core';
import { Scrollable } from 'core';
import * as markdown from '../reducers';
import * as fromEdit from '../actions/edit';
import { CodemirrorComponent } from './codemirror-editor/codemirror.component';
import * as fromMarkdown from './../reducers';
import { DocumentMode } from './../reducers/document';
import { Store, select } from '@ngrx/store';
@Component({
    selector: 'ms-markdown-editor',
    template: `


    <codemirror [(ngModel)]="markdown" [config]="options"></codemirror>
    <sk-cube-grid [isRunning]="!editorLoaded"></sk-cube-grid>
    `,
    styles: []
})
export class MarkdownEditorComponent implements OnInit {
    @Input()
    editorLoaded = false;

    @Output()
    markdownChange = new EventEmitter();

    @ViewChild(CodemirrorComponent)
    codeMirrorComponent;

    _markdown: string;
    @Input()
    get markdown(): string {
        return this._markdown;
    }

    docMode$ = this.store.pipe(select(fromMarkdown.selectDocumentModeState));

    set markdown(value) {
        this._markdown = value;
        this.markdownChange.emit(value);
    }
    options = {
        mode: {
            name: 'gfm',
            highlightFormatting: true
        },
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

    constructor(private _service: MarkdownEditorService, private store: Store<markdown.State>) {
        _service.editorLoaded$.subscribe(() => {

            setTimeout(() => this.editorLoaded = true, 0);
        });

        this.docMode$.subscribe(mode => {
            switch (mode) {
                case DocumentMode.Edit: {
                    setTimeout(() => this.codeMirrorComponent.refresh(), 0);

                    break;
                }

            }
        }
        )
    }

    ngOnInit() { }
}