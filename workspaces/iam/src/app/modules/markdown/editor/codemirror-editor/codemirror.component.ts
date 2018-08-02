import {
  Component,
  Input,
  Output,
  ViewChild,
  EventEmitter,
  ViewEncapsulation,
  forwardRef,
  Inject
} from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
// import 'codemirror/addon/dialog/dialog.css'

import * as CodeMirror from 'codemirror';
// import 'codemirror/addon/scroll/simplescrollbars';
import 'codemirror/addon/display/fullscreen';
import 'codemirror/mode/gfm/gfm';
import 'codemirror/addon/dialog/dialog';
import 'codemirror/mode/javascript/javascript';
import 'codemirror/addon/search/searchcursor';
import 'codemirror/addon/search/search';
// import 'codemirror/addon/scroll/annotatescrollbar';
import 'codemirror/addon/search/matchesonscrollbar';
import 'codemirror/addon/search/jump-to-line';

import { MarkdownEditorService } from '../services/markdown.editor.service';
import { Store } from '@ngrx/store';
import * as markdown from '../../state';
import * as fromEdit from '../../state/actions/edit';
import { KeyMap } from '../editor-toolbar/keymap';
import { Subject } from 'rxjs';
import { ContainerRef, ScrollEvent, IContainer } from 'core';
import { IMarkdownService, MARKDOWN_SERVICE_TOKEN } from '../../model/markdown.model';
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
  @Input() config;
  @Output() change = new EventEmitter();
  @Output() focus = new EventEmitter();
  @Output() blur = new EventEmitter();

  @ViewChild('host') host;

  @Output() instance = null;

  _value = '';
  private showLineNumber;

  /**
   * Constructor
   */
  constructor(
    private service: MarkdownEditorService,
    @Inject(MARKDOWN_SERVICE_TOKEN) private markdownService: IMarkdownService,
    private store: Store<markdown.MarkdownState>,
    private utils: Utilities
  ) {
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

    this.instance.on('focus', () => {
      this.focus.emit();
    });

    this.instance.on('blur', () => {
      this.blur.emit();
    });
    new KeyMap(this.instance);
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
    this.service.contentChanged$.next([value, this.instance]);
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
