import {
  Component,
  Input,
  Output,
  ViewChild,
  EventEmitter,
  ViewEncapsulation,
  forwardRef
} from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
// import 'codemirror/addon/dialog/dialog.css'

import * as CodeMirror from 'codemirror';
// import 'codemirror/addon/scroll/simplescrollbars';
import 'codemirror/addon/display/fullscreen';
import 'codemirror/mode/gfm/gfm';
import 'codemirror/addon/dialog/dialog';
import 'codemirror/mode/javascript/javascript';
import 'codemirror/addon/search/searchcursor';
import 'codemirror/addon/search/search';
import 'codemirror/addon/scroll/annotatescrollbar';
import 'codemirror/addon/search/matchesonscrollbar';
import 'codemirror/addon/search/jump-to-line';

import { MarkdownEditorService } from '../services/markdown.editor.service';
import { Scrollable } from 'core';
import { Store } from '@ngrx/store';
import * as markdown from '../../state';
import * as fromEdit from '../../state/actions/edit';
import { KeyMap } from '../editor-toolbar/keymap';
import { Subject } from 'rxjs';
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
    <ms-codemirror-toolbar></ms-codemirror-toolbar>
    <div #scroll>
    <textarea #host></textarea>
    </div>
    `
})
export class CodemirrorComponent {
  //    var map = {"Alt-Space": function(cm){...}}
  //    editor.addKeyMap(map);
  @Input() config;
  @Output() change = new EventEmitter();
  @Output() focus = new EventEmitter();
  @Output() blur = new EventEmitter();

  @ViewChild('host') host;

  @Output() instance = null;

  _value = '';

  /**
   * Constructor
   */
  constructor(private service: MarkdownEditorService, private store: Store<markdown.State>) {}

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

  @ViewChild('scroll') scroll;

  ngAfterViewInit() {
    this.config = this.config || {
      mode: {
        name: 'gfm',
        highlightFormatting: true
      },
      lineNumbers: true,
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
    this.service.editorLoaded$.next(this.instance);
    new Scrollable(this.scroll.nativeElement.children[1].lastChild).isScrollDown$.subscribe(e => {
      this.store.dispatch(new fromEdit.ScrollDown(e));
      // console.log(e)
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
