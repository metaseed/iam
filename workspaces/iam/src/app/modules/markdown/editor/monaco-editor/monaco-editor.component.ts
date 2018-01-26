/// <reference path="../../../../../../../../node_modules/monaco-editor/monaco.d.ts" />
import { Component, OnInit, Input, ElementRef, EventEmitter, ViewChild, Output, AfterViewInit, NgZone, forwardRef } from '@angular/core';
import { Subscription } from 'rxjs';
import { fromEvent } from 'rxjs/observable/fromEvent';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { MarkdownEditorService } from '../index';
/* usage:
    <monaco-editor *loadMonacoEditor [options]="editorOptions " [(ngModel)]="markdown" sytle="margin-bottom0:20px"></monaco-editor>
      
    editorOptions: monaco.editor.IEditorConstructionOptions = { language: 'markdown', wordWrapColumn: 120, wordWrap: 'bounded' };
* //* theme: 'vs-dark', */
@Component({
  selector: 'monaco-editor',
  templateUrl: './monaco-editor.component.html',
  styleUrls: ['./monaco-editor.component.css'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => MonacoEditorComponent),
    multi: true
  }]
})
export class MonacoEditorComponent implements AfterViewInit, ControlValueAccessor {

  _value: '';
  _options = {
    value: [
      '"use strict";',
      '',
      "class Chuck {",
      "    greet() {",
      "        return Facts.next();",
      "    }",
      "}"
    ].join('\n'),
    language: "javascript"
  };
  propagateChange = (_: any) => { };
  onTouched = () => { };
  private _windowResizeSubscription: Subscription;
  @ViewChild('editorContainer') _editorContainer: ElementRef;
  @Output() onInit = new EventEmitter<any>();
  editor: any;
  constructor(private _service: MarkdownEditorService, private zone: NgZone) {

  }

  registerOnChange(fn: any): void {
    this.propagateChange = fn;
  }

  @Input('options')
  set options(options) {
    this._options = options;
    if (this.editor) {
      this.editor.dispose();
      this.initMonaco(options);
    }
  }
  get options() {
    return this._options;
  }

  writeValue(value: any): void {
    this._value = value;
    // Fix for value change while dispose in process.
    setTimeout(() => {
      if (this.editor && value) {
        this.editor.setValue(value);
        this.editor.layout();
      }
    });

  }
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
  ngAfterViewInit() {
    this.initMonaco(this._options);
  }

  private initMonaco(options) {
    const me = this;
    // monaco.languages.typescript.javascriptDefaults.setDiagnosticsOptions({
    //   noSemanticValidation: true,
    //   noSyntaxValidation: false
    // });

    // // compiler options
    // monaco.languages.typescript.javascriptDefaults.setCompilerOptions({
    //   target: monaco.languages.typescript.ScriptTarget.ES2016,
    //   allowNonTsExtensions: true
    // });

    // // extra libraries
    // monaco.languages.typescript.javascriptDefaults.addExtraLib([
    //   'declare class Facts {',
    //   '    /**',
    //   '     * Returns the next fact',
    //   '     */',
    //   '    static next():string',
    //   '}',
    // ].join('\n'), 'filename/facts.d.ts');

    this.editor = monaco.editor.create(this._editorContainer.nativeElement, this.options);
    if (this._value) {
      this.editor.setValue(this._value);
    }

    this._service._editorRefresh$.subscribe(() => {
      me.editor.layout();
      me.editor.focus();
    });
    this.editor.onDidChangeModelContent((e: any) => {
      let value = this.editor.getValue();
      this.propagateChange(value);
      // value is not propagated to parent when executing outside zone.
      this.zone.run(() => this._value = value);
      this._service.contentChanged$.next([value, this.editor]);
    });
    // refresh layout on resize event.
    if (this._windowResizeSubscription) {
      this._windowResizeSubscription.unsubscribe();
    }
    this._windowResizeSubscription = fromEvent(window, 'resize').subscribe(() => {
      this.editor.layout();
    });
    this.onInit.emit(this.editor);

    this._service.editorLoaded$.next(this.editor);
  }
  ngOnDestroy() {
    if (this._windowResizeSubscription) {
      this._windowResizeSubscription.unsubscribe();
    }
    if (this.editor) {
      this.editor.dispose();
      this.editor = undefined;
    }
  }
}
