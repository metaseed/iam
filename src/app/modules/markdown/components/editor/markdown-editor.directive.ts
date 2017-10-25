import { Directive, EventEmitter, Output, ElementRef, Input, OnInit } from '@angular/core';
import * as ace from 'brace';
import 'brace/theme/twilight';
import 'brace/mode/markdown';
// import ace from 'ace-builds';
// declare var ace: any;
@Directive({
    selector: '[ace-editor]'
})
export class AceEditorDirective implements OnInit {
    @Output() textChanged = new EventEmitter();
    @Output() textChange = new EventEmitter();
    _options: any = {};
    _readOnly = false;
    _theme = 'twilight';
    _mode: any = 'markdown';
    _autoUpdateContent = true;
    _durationBeforeCallback = 0;
    _text = '';
    editor: any;
    oldText: any;
    timeoutSaving: any;

    constructor(elementRef: ElementRef) {
        const el = elementRef.nativeElement;
        this.editor = ace['edit'](el);
        this.editor.$blockScrolling = Infinity;
    }

    ngOnInit() {
        this.init();
        this.initEvents();
    }

    init() {
        this.editor.getSession().setUseWrapMode(true);
        this.editor.setOptions(this._options || {});
        //this.editor.setTheme(`ace/theme/${this._theme}`);
        this.setMode(this._mode);
        this.editor.setReadOnly(this._readOnly);
    }

    initEvents() {
        this.editor.on('change', () => this.updateText());
        this.editor.on('paste', () => this.updateText());
    }

    updateText() {
        const newVal = this.editor.getValue(), that = this;
        if (newVal === this.oldText) {
            return;
        }
        if (!this._durationBeforeCallback) {
            this._text = newVal;
            this.textChange.emit(newVal);
            this.textChanged.emit(newVal);
        } else {
            if (this.timeoutSaving != null) {
                clearTimeout(this.timeoutSaving);
            }

            this.timeoutSaving = setTimeout(function () {
                that._text = newVal;
                that.textChange.emit(newVal);
                that.textChanged.emit(newVal);
                that.timeoutSaving = null;
            }, this._durationBeforeCallback);
        }
        this.oldText = newVal;
    }

    @Input() set options(options: any) {
        this._options = options;
        this.editor.setOptions(options || {});
    }

    @Input() set readOnly(readOnly: any) {
        this._readOnly = readOnly;
        this.editor.setReadOnly(readOnly);
    }

    @Input() set theme(theme: any) {
        this._theme = theme;
        this.editor.setTheme(`ace/theme/${theme}`);
    }

    @Input() set mode(mode: any) {
        this.setMode(mode);
    }

    setMode(mode: any) {
        this._mode = mode;
        if (typeof this._mode === 'object') {
            this.editor.getSession().setMode(this._mode);
        } else {
            this.editor.getSession().setMode(`ace/mode/${this._mode}`);
        }
    }

    @Input()
    get text() {
        return this._text;
    }

    set text(text: string) {
        this.setText(text);
    }

    setText(text: any) {
        if (this._text !== text) {
            if (text === null || text === undefined) {
                text = '';
            }

            if (this._autoUpdateContent === true) {
                this._text = text;
                this.editor.setValue(text);
                this.editor.clearSelection();
            }
        }
    }

    @Input() set autoUpdateContent(status: any) {
        this._autoUpdateContent = status;
    }

    @Input() set durationBeforeCallback(num: number) {
        this.setDurationBeforeCallback(num);
    }

    setDurationBeforeCallback(num: number) {
        this._durationBeforeCallback = num;
    }

    get aceEditor() {
        return this.editor;
    }
}
