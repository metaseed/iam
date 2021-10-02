import {
  Component,
  Input,
  Output,
  ViewChild,
  EventEmitter,
  forwardRef,
  OnInit,
  AfterViewInit,
  OnDestroy,
  ElementRef,
} from "@angular/core";
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from "@angular/forms";

import * as CodeMirror from "codemirror";
import "codemirror/addon/display/fullscreen";
import "codemirror/mode/gfm/gfm"; // github flavored markdown
import "codemirror/addon/dialog/dialog";
import "codemirror/mode/javascript/javascript";
import "codemirror/addon/search/searchcursor";
import "codemirror/addon/search/search";
// import 'codemirror/addon/scroll/annotatescrollbar';
import "codemirror/addon/search/matchesonscrollbar";
import "codemirror/addon/search/jump-to-line";
// import 'codemirror/addon/fold/xml-fold';
// import 'codemirror/addon/edit/closetag';
import "codemirror/addon/edit/matchbrackets";
// import 'codemirror/addon/edit/closebrackets';
import "../codemirror-addon/closebrackets";
import "codemirror/addon/fold/foldcode";
import "codemirror/addon/fold/brace-fold";
import "codemirror/addon/edit/matchtags";
import "codemirror/addon/comment/comment";
import { MarkdownEditorService } from "../../services/markdown.editor.service";
import { Subject } from "rxjs";
import { SubscriptionManager, Utilities } from "core";
import { takeUntil } from "rxjs/operators";
/**
 * Usage : <ms-codemirror [(ngModel)]="markdown" [config]="{...}"></ms-codemirror>
 */
@Component({
  selector: "ms-codemirror",
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CodemirrorComponent),
      multi: true,
    },
  ],
  template: ` <textarea #host></textarea> `,
})
export class CodemirrorComponent extends SubscriptionManager
  implements ControlValueAccessor, OnInit, AfterViewInit, OnDestroy {
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

  @ViewChild("host")
  host: ElementRef;

  codemirror: CodeMirror.EditorFromTextArea;

  _value = "";
  private showLineNumber;

  constructor(
    private editorService: MarkdownEditorService,
    private utils: Utilities
  ) {
    super();
    super.addSub(
      this.utils.isWideScreen$
        .subscribe(wide => this.showLineNumber = wide)
    );
  }

  ngOnInit() {
    this.config = this.config || {
      mode: {
        name: "gfm",
        highlightFormatting: true,
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
        F11: function (cm) {
          cm.setOption("fullScreen", !cm.getOption("fullScreen"));
        },
        Esc: function (cm) {
          if (cm.getOption("fullScreen")) cm.setOption("fullScreen", false);
        },
        // "Ctrl-F": "findPersistent"
      },
    };
  }

  get value() { return this._value; }

  ngAfterViewInit() {
    this.codemirrorInit(this.config);

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

  codemirrorInit(config) {
    this.codemirror = CodeMirror.fromTextArea(this.host.nativeElement, config);
    this.codemirror.setValue(this._value);

    this.codemirror.on("change", () => {
      const value = this.codemirror.getValue();
      if (value !== this._value) {
        this._value = value;
        this._onChange(value);
        this.change.emit(value);
        this.editorService.docContentModified$.next(value);
      }
    });

    this.codemirror.on("cursorActivity", doc => this.changeCursorStyle(doc));

    this.codemirror.on("focus", () => {
      this.focus.emit();
    });

    this.codemirror.on("blur", () => {
      this._onTouched();
      this.blur.emit();
    });
  }

  private changeCursorStyle(doc) {
    const cur = doc.getCursor();
    const coords = this.codemirror.cursorCoords(cur);
    const ele = document.elementFromPoint(
      coords.left,
      coords.top + 5 /*add offset to select*/
    );
    const curDiv: HTMLElement = doc.display.cursorDiv;
    if (ele && ele.className.includes("cm-em")) {
      if (!curDiv.classList.contains("cursor-italic")) {
        curDiv.classList.add("cursor-italic");
      }
    } else {
      curDiv.classList.remove("cursor-italic");
    }
  }

  refresh() {
    this.codemirror.refresh();
  }

  private _onChange(_) { }
  private _onTouched() { }

  /**
   * Implements ControlValueAccessor
   */
  writeValue(value) {
    if (this.codemirror) {
      this._value = value || "";
      this.codemirror.setValue(this._value);
      if (value) this.editorService.docContentSet$.next(this.codemirror);
    }
  }

  registerOnChange(fn) {
    this._onChange = fn;
  }

  registerOnTouched(fn) {
    this._onTouched = fn;
  }

  setDisabledState(isDisabled: boolean) {
    (<HTMLTextAreaElement>(this.host.nativeElement)).disabled = true;
  }
}
