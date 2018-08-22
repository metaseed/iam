import { Component, Input, Output, ViewChild, EventEmitter, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
// import 'codemirror/addon/dialog/dialog.css'

import * as CodeMirror from 'codemirror';
// import 'codemirror/addon/scroll/simplescrollbars';
import 'codemirror/addon/display/fullscreen';
import 'codemirror/mode/gfm/gfm'; // github flavored markdown
import 'codemirror/addon/dialog/dialog';
import 'codemirror/mode/javascript/javascript';
import 'codemirror/addon/search/searchcursor';
import 'codemirror/addon/search/search';
// import 'codemirror/addon/scroll/annotatescrollbar';
import 'codemirror/addon/search/matchesonscrollbar';
import 'codemirror/addon/search/jump-to-line';
import './codemirror-plugins/closebrackets';
import 'codemirror/addon/fold/xml-fold';
import 'codemirror/addon/edit/closetag';
import 'codemirror/addon/edit/matchbrackets';
import 'codemirror/addon/edit/matchtags';

import { MarkdownEditorService } from '../services/markdown.editor.service';
import { Store } from '@ngrx/store';
import * as markdown from '../../state';
import { KeyMap } from '../editor-toolbar/keymap';
import { Subject } from 'rxjs';
import { Utilities } from 'core';
import { takeUntil, map, switchMap } from 'rxjs/operators';
/**
 * Usage : <codemirror [(ngModel)]="markdown" [config]="{...}"></codemirror>
 */
@Component({
  selector: 'codemirror',
  styleUrls: ['./codemirror.component.scss'],

  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CodemirrorComponent),
      multi: true
    }
  ],
  template: `
    <textarea #host></textarea>
    `
})
export class CodemirrorComponent implements ControlValueAccessor {
  //    var map = {"Alt-Space": function(cm){...}}
  //    editor.addKeyMap(map);
  @Input()
  config;
  @Output()
  change = new EventEmitter();
  @Output()
  focus = new EventEmitter();
  @Output()
  blur = new EventEmitter();

  @ViewChild('host')
  host;

  @Output()
  instance = null;

  _value = '';
  private showLineNumber;

  /**
   * Constructor
   */
  constructor(private service: MarkdownEditorService, private utils: Utilities) {
    this.utils.isScreenWide$
      .pipe(takeUntil(this.destroy$))
      .subscribe(wide => (this.showLineNumber = wide));
  }
  ngOnInit() {
    this.config = this.config || {
      mode: {
        name: 'gfm',
        highlightFormatting: true
      },
      lineNumbers: this.showLineNumber,
      // scrollbarStyle: 'simple',
      lineWrapping: true,
      // autoCloseBrackets: {
      //   pairs: '()[]{}\'\'""',
      //   triples: '`',
      //   explode: '[]{}',
      //   override: true
      // },
      autoCloseBrackets: true,
      autoCloseTags: true,
      matchBrackets: true,
      matchTags: { bothTags: true },
      extraKeys: {
        F11: function(cm) {
          cm.setOption('fullScreen', !cm.getOption('fullScreen'));
        },
        Esc: function(cm) {
          if (cm.getOption('fullScreen')) cm.setOption('fullScreen', false);
        }
        // "Ctrl-F": "findPersistent"
      }
    };
    this.codemirrorInit(this.config);
  }

  get value() {
    return this._value;
  }

  @Input()
  set value(v) {
    if (v !== this._value) {
      this._value = v;
      this.onChange(v);
    }
  }

  ngAfterViewInit() {
    this.service.editorLoaded$.next(this.instance);
    this.service.markdownService.viewer$
      .pipe(switchMap(v => v.activeElement$))
      .subscribe(element => {
        if (!element) return;
        const lines = JSON.parse(element.getAttribute('data-source-lines'));
        this.instance.scrollIntoView({ line: lines[0], ch: 0 });
      });
  }
  destroy$ = new Subject();

  ngOnDestroy() {
    this.destroy$.next();
  }

  /**
   * Initialize codemirror
   */
  codemirrorInit(config) {
    this.instance = CodeMirror.fromTextArea(this.host.nativeElement, config);
    this.instance.setValue(this._value);

    this.instance.on('change', () => {
      this.updateValue(this.instance.getValue());
    });
    this.instance.on('cursorActivity', doc => {
      const cur = doc.getCursor();
      const coords = this.instance.cursorCoords(cur);
      const ele = document.elementFromPoint(coords.left, coords.top + 5 /*add offset to select*/);
      const curDiv: HTMLElement = doc.display.cursorDiv;
      if (ele && ele.className.includes('cm-em')) {
        if (!curDiv.classList.contains('cursor-italic')) {
          curDiv.classList.add('cursor-italic');
        }
      } else {
        curDiv.classList.remove('cursor-italic');
      }
    });

    this.instance.on('focus', () => {
      this.focus.emit();
    });

    this.instance.on('blur', () => {
      this.blur.emit();
    });
  }

  refresh() {
    this.instance.refresh();
  }

  /**
   * Value update process
   */
  updateValue(value) {
    this.value = value;
    this.onTouched();
    this.service.contentChanged$.next(value);
    this.change.emit(value);
  }

  /**
   * Implements ControlValueAccessor
   */
  writeValue(value) {
    if (value !== undefined && this.instance) {
      this._value = value || '';
      this.instance.setValue(this._value);
      if (value) this.service.docLoaded$.next(this.instance);
    }
  }
  onChange(_) {}
  onTouched() {}
  registerOnChange(fn) {
    this.onChange = fn;
  }

  registerOnTouched(fn) {
    this.onTouched = fn;
  }
}
