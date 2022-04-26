import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnInit,
  OnDestroy,
  ElementRef,
} from "@angular/core";

import CodeMirror from "codemirror";
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
import { MarkdownEditorService } from "../../services/markdown-editor.service";
import { SubscriptionManager, Utilities } from "core";
import { Subject } from "rxjs";
/**
 * Usage : <ms-codemirror [(ngModel)]="markdown" [config]="{...}"></ms-codemirror>
 */
@Component({
  selector: "ms-codemirror",
  template: ` <textarea #host></textarea> `,
})
export class CodemirrorComponent extends SubscriptionManager
  implements OnInit, OnDestroy {
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

  afterInit = new Subject<CodeMirror.EditorFromTextArea>();

  private _host: HTMLTextAreaElement;
  get host() {
    if (!this._host)
      this._host = this.elementRef.nativeElement.getElementsByTagName('textarea')[0];
    return this._host;
  }

  codemirror: CodeMirror.EditorFromTextArea;

  private showLineNumber;

  constructor(
    private editorService: MarkdownEditorService,
    private utils: Utilities,
    private elementRef: ElementRef,
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
    this.codemirrorInit(this.config);
    this.afterInit.next(this.codemirror);

    this.editorService.docEditorLoaded$.next(this.codemirror);
  }

  get value() { return this.codemirror.getValue(); }

  codemirrorInit(config) {
    this.codemirror = CodeMirror.fromTextArea(this.host, config);

    this.codemirror.on("change", () => {
      if(this._contentSet) return;

      const value = this.value;
      this.change.emit(value);
      this.editorService.docContentModified$.next([value, this.codemirror]);
    });

    this.codemirror.on("cursorActivity", doc => this.changeCursorStyle(doc));

    this.codemirror.on("focus", () => {
      this.focus.emit();
    });

    this.codemirror.on("blur", () => {
      this.blur.emit();
    });
  }
  private _contentSet = false;

  writeValue(value) {
    if (this.codemirror) {
      this._contentSet = true;
      this.codemirror.setValue(value);
      this._contentSet = false;
      this.codemirror.clearHistory();
      this.editorService.docContentSet$.next(this.codemirror);
    }
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


}
