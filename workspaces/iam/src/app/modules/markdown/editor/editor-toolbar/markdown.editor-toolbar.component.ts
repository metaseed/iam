import {
  Component,
  OnInit,
  AfterViewInit,
  Input,
  Renderer,
  ViewChild
} from "@angular/core";
import { MarkdownComponent } from "../../markdown.component";
import { DomSanitizer } from "@angular/platform-browser";

import { Subscription } from "rxjs/Subscription";
import { DocService } from "docs";
import { MarkdownEditorService } from "../../editor/index";
import { CommandService, Command, DocumentRef } from "../../../core/index";
import * as fromMarkdown from "./../../reducers";
import { DocumentMode } from "./../../reducers/document";
import { Store, select, State } from "@ngrx/store";
import * as doc from "../../actions/document";
import * as edit from "../../actions/edit";
import { OnDestroy } from "@angular/core";
import { ObservableMedia } from "@angular/flex-layout";
import * as reducers from "../../reducers";
import * as CodeMirror from "codemirror";
import { KeyMapSelectionDialog } from "./dialog.component";
import { MdcDialog, MdcToolbar } from "@angular-mdc/web";
import {
  trigger,
  state,
  style,
  animate,
  transition
} from "@angular/animations";
import { DocSaveCoordinateService } from "../services/doc-save-coordinate-service";
@Component({
  selector: "editor-toolbar",
  templateUrl: "./markdown.editor-toolbar.component.html",
  styleUrls: ["./markdown.editor-toolbar.component.scss"],
  animations: [
    trigger("show", [
      state("true", style({ opacity: 1, transform: "translateY(0)" })),
      transition("void => true", [
        style({
          opacity: 0,
          transform: "translateY(-100%)"
        }),
        animate("0.2s ease-in")
      ]),
      transition("true => void", [
        animate(
          "0.2s ease-out",
          style({
            opacity: 0,
            transform: "translateY(-100%)"
          })
        )
      ])
    ])
  ]
})
export class EditorToolbarComponent implements OnInit, AfterViewInit {
  isFullScreen: boolean;
  editor: any;
  @ViewChild("toolbar") toolbar: MdcToolbar;

  docMode$ = this.store.pipe(select(fromMarkdown.selectDocumentModeState));
  documentMode$ = this.store.pipe(select(reducers.selectDocumentModeState));
  isScrollDown = null;
  isPositionFixed: boolean;
  isScrollDown$;
  isScrollDown_view$;
  isEditMode = false;
  gtsmBreakpoint = false;
  mediaChangeSubscription: Subscription;
  ngOnInit() {
    const scrollHandler = value => {
      this.isScrollDown = value.isDown;
      if (this.toolbar)
        this.isPositionFixed =
          value.scroll.target.scrollTop >
          this.toolbar.elementRef.nativeElement.offsetHeight;
    };
    this.isScrollDown$ = this.store.pipe(
      select(reducers.selectEditScrollDownState)
    );
    this.isScrollDown$.subscribe(scrollHandler);
    this.isScrollDown_view$ = this.store.pipe(
      select(reducers.selectViewScrollDownState)
    );
    this.isScrollDown_view$.subscribe(scrollHandler);
    this.docMode$.subscribe(mode => {
      switch (mode) {
        case DocumentMode.Edit: {
          this.isEditMode = true;
          break;
        }
        case DocumentMode.View: {
          this.isEditMode = false;
          break;
        }
      }
    });
  }
  constructor(
    private dialog: MdcDialog,
    private media: ObservableMedia,
    public markdown: MarkdownComponent,
    private _editorService: MarkdownEditorService,
    public docService: DocService,
    private _renderer: Renderer,
    private _commandService: CommandService,
    private _docRef: DocumentRef,
    private _domSanitizer: DomSanitizer,
    private store: Store<reducers.State>,
    private state: State<reducers.State>,
    public docSaver: DocSaveCoordinateService
  ) {
    this._editorService.editorLoaded$.subscribe(
      (editor: monaco.editor.IStandaloneCodeEditor) => {
        this.editor = editor;
      }
    );
    this.mediaChangeSubscription = media.subscribe(change => {
      if (!["xs", "sm"].includes(change.mqAlias)) {
        this.gtsmBreakpoint = false;
      } else {
        this.gtsmBreakpoint = true;
      }
    });
    (<any>CodeMirror).commands.save = this.save;
    let cmds = (<any>CodeMirror).commands;
    cmds.scrollLineUp = function(cm) {
      var info = cm.getScrollInfo();
      if (!cm.somethingSelected()) {
        var visibleBottomLine = cm.lineAtHeight(
          info.top + info.clientHeight,
          "local"
        );
        if (cm.getCursor().line >= visibleBottomLine)
          cm.execCommand("goLineUp");
      }
      cm.scrollTo(null, info.top - cm.defaultTextHeight());
    };
    cmds.scrollLineDown = function(cm) {
      var info = cm.getScrollInfo();
      if (!cm.somethingSelected()) {
        var visibleTopLine = cm.lineAtHeight(info.top, "local") + 1;
        if (cm.getCursor().line <= visibleTopLine) cm.execCommand("goLineDown");
      }
      cm.scrollTo(null, info.top + cm.defaultTextHeight());
    };
  }

  ngDestroy() {
    this.mediaChangeSubscription.unsubscribe();
  }
  save = () => {
    const content = this.editor.getValue();
    this.store.dispatch(new edit.Save(content));
    this.docService.save(content);
  };

  undo = () => {
    if (!this.editor) return;
    this.editor.undo();
  };
  redo = () => {
    if (!this.editor) return;
    this.editor.redo();
  };

  togglePreview() {
    this.markdown.showPreviewPanel = !this.markdown.showPreviewPanel;
    this.editorResize();
    const markdownState: fromMarkdown.MarkdownState = this.state.getValue()
      .markdown;
    if (markdownState.document.showPreview) {
      this.store.dispatch(new doc.HidePreview());
    } else {
      this.store.dispatch(new doc.ShowPreview());
    }
  }

  ngAfterViewInit() {
    //   this.isScrollDown = true;
    //   setTimeout(() => {
    //     this.isScrollDown = false;
    //   }, 0);
  }
  toViewMode = event => {
    this.isScrollDown = null;
    this.store.dispatch(new doc.ViewMode());
  };

  new = () => {
    this.docService.newDoc();
  };

  previewPanelClick(event: Event) {
    event.preventDefault();
    event.stopPropagation();
  }

  fullScreen() {
    this.isFullScreen = !this.isFullScreen;
    this._renderer.setElementStyle(
      document.body,
      "overflowY",
      this.isFullScreen ? "hidden" : "auto"
    );
    this.editorResize();
  }

  private lockScrollWithView = false;
  more(event: { index: number; item: HTMLElement }) {
    if (event.item.id === "0") {
      this.lockScrollWithView = !this.lockScrollWithView;
      this.store.dispatch(new edit.LockScrollWithView(this.lockScrollWithView));
    } else if (event.item.id === "1") {
      const dialogRef = this.dialog.open(KeyMapSelectionDialog, {
        escapeToClose: true,
        clickOutsideToClose: true
      });
      dialogRef.componentInstance.myDialog._accept.subscribe(() => {});
    }
  }
  editorResize(timeOut: number = 100) {
    setTimeout(() => {
      this._editorService.refresh();
    }, timeOut);
  }
}
