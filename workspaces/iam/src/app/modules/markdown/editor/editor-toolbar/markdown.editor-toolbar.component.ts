
import { Component, OnInit, AfterViewInit, Input, Renderer, ViewChild } from '@angular/core';
import { MarkdownComponent } from '../../markdown.component';
import { DomSanitizer } from '@angular/platform-browser';

import { Subscription } from 'rxjs/Subscription';
import { DocService } from 'docs';
import { MarkdownEditorService } from '../../editor/index';
import { CommandService, Command, DocumentRef } from '../../../core/index';
import * as fromMarkdown from './../../reducers';
import { DocumentMode } from './../../reducers/document';
import { Store, select } from '@ngrx/store';
import * as doc from '../../actions/document';
import * as edit from '../../actions/edit';
import { OnDestroy } from '@angular/core';
import { ObservableMedia } from '@angular/flex-layout';
import * as reducers from '../../reducers';
import * as CodeMirror from 'codemirror';
import { KeyMapSelectionDialog } from './dialog.component';
import { MdcDialog } from '@angular-mdc/web';
@Component({
  selector: 'editor-toolbar',
  templateUrl: './markdown.editor-toolbar.component.html',
  styleUrls: ['./markdown.editor-toolbar.component.scss']
})
export class EditorToolbarComponent implements OnInit, AfterViewInit {
  isFullScreen: boolean;
  editor: any;

  docMode$ = this.store.pipe(select(fromMarkdown.selectDocumentModeState));
  documentMode$ = this.store.pipe(select(reducers.selectDocumentModeState));
  isScrollDown: boolean;
  isFixed = false;
  isScrollDown$;
  isScrollDown_edit$;
  isEditMode = false;
  gtsmBreakpoint = false;
  mediaChangeSubscription: Subscription;
  ngOnInit() {
    this.isScrollDown$ = this.store.pipe(select(reducers.selectEditScrollDownState));
    this.isScrollDown$.subscribe(value => {
      this.isScrollDown = value.isDown;
    })
    this.isScrollDown_edit$ = this.store.pipe(select(reducers.selectViewScrollDownState));
    this.isScrollDown_edit$.subscribe(value => {
      this.isScrollDown = value.isDown;
    })
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
    private _docService: DocService,
    private _renderer: Renderer,
    private _commandService: CommandService,
    private _docRef: DocumentRef,
    private _domSanitizer: DomSanitizer,
    private store: Store<reducers.State>) {
    this._editorService.editorLoaded$.subscribe((editor: monaco.editor.IStandaloneCodeEditor) => {
      this.editor = editor;
    });
    this.mediaChangeSubscription = media.subscribe(change => {
      if (!['xs', 'sm'].includes(change.mqAlias)) {
        this.gtsmBreakpoint = false;
      } else {
        this.gtsmBreakpoint = true;
      }
    });
    (<any>CodeMirror).commands.save = this.save;
    let cmds = (<any>CodeMirror).commands;
    cmds.scrollLineUp = function (cm) {
      var info = cm.getScrollInfo();
      if (!cm.somethingSelected()) {
        var visibleBottomLine = cm.lineAtHeight(info.top + info.clientHeight, "local");
        if (cm.getCursor().line >= visibleBottomLine)
          cm.execCommand("goLineUp");
      }
      cm.scrollTo(null, info.top - cm.defaultTextHeight());
    };
    cmds.scrollLineDown = function (cm) {
      var info = cm.getScrollInfo();
      if (!cm.somethingSelected()) {
        var visibleTopLine = cm.lineAtHeight(info.top, "local") + 1;
        if (cm.getCursor().line <= visibleTopLine)
          cm.execCommand("goLineDown");
      }
      cm.scrollTo(null, info.top + cm.defaultTextHeight());
    };

  }

  ngDestroy() {
    this.mediaChangeSubscription.unsubscribe();
  }
  @ViewChild('toolbar')
  toolbar;
  save = () => {
    const content = this.editor.getValue();
    this.store.dispatch(new edit.Save(content));
    this._docService.save(content);
  }

  undo = () => {
    if (!this.editor) return;
    this.editor.undo();
  }
  redo = () => {
    if (!this.editor) return;
    this.editor.redo();
  }

  togglePreview() {
    this.markdown.showPreviewPanel = !this.markdown.showPreviewPanel;
    this.editorResize();
  }

  ngAfterViewInit() {
    this.isScrollDown = true;
    setTimeout(() => {
      this.isScrollDown = false;
    }, 0);
  }
  toViewMode = (event) => {
    this.store.dispatch(new doc.ViewMode());
  }


  new = () => {
    this._docService.newDoc();
  }


  previewPanelClick(event: Event) {
    event.preventDefault();
    event.stopPropagation();
  }

  fullScreen() {
    this.isFullScreen = !this.isFullScreen;
    this._renderer.setElementStyle(document.body, 'overflowY', this.isFullScreen ? 'hidden' : 'auto');
    this.editorResize();
  }

  private lockScrollWithView = false;
  more(event: { index: number, item: HTMLElement }) {
    if (event.item.id === '0') {
      this.lockScrollWithView = !this.lockScrollWithView;
      this.store.dispatch(new edit.LockScrollWithView(this.lockScrollWithView));
    } else if (event.item.id === '1') {
      const dialogRef = this.dialog.open(KeyMapSelectionDialog, { escapeToClose: true, clickOutsideToClose: true })
      dialogRef.componentInstance.myDialog._accept.subscribe(() => {

      })
    }
  }
  editorResize(timeOut: number = 100) {
    setTimeout(() => {
      this._editorService.refresh();

    }, timeOut);
  }

}
