import { Component, Input, Output, ViewChild, EventEmitter, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';

import * as CodeMirror from 'codemirror';
import 'codemirror/addon/display/fullscreen';
import 'codemirror/mode/gfm/gfm'; // github flavored markdown
import 'codemirror/addon/dialog/dialog';
import 'codemirror/mode/javascript/javascript';
import 'codemirror/addon/search/searchcursor';
import 'codemirror/addon/search/search';
// import 'codemirror/addon/scroll/annotatescrollbar';
import 'codemirror/addon/search/matchesonscrollbar';
import 'codemirror/addon/search/jump-to-line';
// import 'codemirror/addon/fold/xml-fold';
// import 'codemirror/addon/edit/closetag';
import 'codemirror/addon/edit/matchbrackets';
// import 'codemirror/addon/edit/closebrackets';
import './codemirror-plugins/closebrackets';
import 'codemirror/addon/fold/foldcode';
import 'codemirror/addon/fold/brace-fold';
import 'codemirror/addon/edit/matchtags';
import 'codemirror/addon/comment/comment';
import { MarkdownEditorService } from '../services/markdown.editor.service';
import { Subject } from 'rxjs';
import { Utilities } from 'core';
import { takeUntil } from 'rxjs/operators';
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
  codemirror = null;

  _value = '';
  private showLineNumber;

  /**
   * Constructor
   */
  constructor(private editorService: MarkdownEditorService, private utils: Utilities) {
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
      // styleActiveLine: true,
      // styleActiveSelected: true,
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
    this.editorService.docEditorLoaded$.next(this.codemirror);
    // this.service.markdownService.viewer$
    //   .pipe(switchMap(v => v.activeElement$))
    //   .subscribe(element => {
    //     if (!element) return;
    //     const lines = JSON.parse(element.getAttribute('data-source-lines'));
    //     try {
    //       this.instance.scrollIntoView({ line: lines[0] + 1, ch: 0 });
    //     } catch (e) {
    //       console.log(e);
    //     }
    //   });
  }
  destroy$ = new Subject();

  ngOnDestroy() {
    this.destroy$.next();
  }

  /**
   * Initialize codemirror
   */
  codemirrorInit(config) {
    this.codemirror = CodeMirror.fromTextArea(this.host.nativeElement, config);
    this.codemirror.setValue(this._value);

    this.codemirror.on('change', () => {
      this.updateValue(this.codemirror.getValue());
    });
    this.codemirror.on('cursorActivity', doc => {
      const cur = doc.getCursor();
      const coords = this.codemirror.cursorCoords(cur);
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

    this.codemirror.on('focus', () => {
      this.focus.emit();
    });

    this.codemirror.on('blur', () => {
      this.blur.emit();
    });
  }

  refresh() {
    this.codemirror.refresh();
  }

  /**
   * Value update process
   */
  updateValue(value) {
    this.value = value;
    this.onTouched();
    this.editorService.docContentModified$.next(value);
    this.change.emit(value);
  }

  /**
   * Implements ControlValueAccessor
   */
  writeValue(value) {
    if (value !== undefined && this.codemirror) {
      this._value = value || '';
      this.codemirror.setValue(this._value);
      if (value) this.editorService.docContentSet$.next(this.codemirror);
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
