
import { Component, OnInit, AfterViewInit, Input, Renderer } from '@angular/core';
import { MarkdownComponent } from '../../markdown.component';
import { DomSanitizer } from '@angular/platform-browser';

import { Subscription } from 'rxjs/Subscription';
import { DocService } from 'docs';
import { MarkdownEditorService } from '../../editor/index';
import { CommandService, Command, DocumentRef } from '../../../core/index';
import { Store, select } from '@ngrx/store';
import { State } from '../../reducers';
import * as doc from '../../actions/document';
import * as edit from '../../actions/edit';
import { OnDestroy } from '@angular/core';
import { ObservableMedia } from '@angular/flex-layout';
import * as fromMarkdown from '../../reducers';
@Component({
  selector: 'editor-toolbar',
  templateUrl: './markdown.editor-toolbar.component.html',
  styleUrls: ['./markdown.editor-toolbar.component.scss']
})
export class EditorToolbarComponent implements OnInit, AfterViewInit {


  isFullScreen: boolean;
  editor: any;

  documentMode$ = this.store.pipe(select(fromMarkdown.selectDocumentModeState));

  constructor(
    private media: ObservableMedia,
    public markdown: MarkdownComponent,
    private _editorService: MarkdownEditorService,
    private _docService: DocService,
    private _renderer: Renderer,
    private _commandService: CommandService,
    private _docRef: DocumentRef,
    private _domSanitizer: DomSanitizer,
    private store: Store<State>) {
    this._editorService.editorLoaded$.subscribe((editor: monaco.editor.IStandaloneCodeEditor) => {
      this.editor = editor;
    });
  }

  save = () => {
    const content = this.editor.getValue();
    this.store.dispatch(new edit.Save(content));
    this._docService.save(content);
  }


  togglePreview() {
    this.markdown.showPreviewPanel = !this.markdown.showPreviewPanel;
    this.editorResize();
  }

  ngOnInit() {

  }

  ngAfterViewInit() {

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
  editorResize(timeOut: number = 100) {
    setTimeout(() => {
      this._editorService.refresh();

    }, timeOut);
  }

}
