/// <reference path="../../../../../../node_modules/monaco-editor/monaco.d.ts" />
import { Component, OnInit, ViewChild, Inject, HostListener, ElementRef } from '@angular/core';
// import { AceEditorDirective } from './editor/markdown-editor.directive';
import { MarkdownViewerComponent } from './viewer/markdown-viewer.component';
import { HttpClient } from '@angular/common/http';
import { MonacoEditorComponent } from './editor/monaco-editor/monaco-editor.component';
import { APP_BASE_HREF } from '@angular/common';
import { timeout } from 'rxjs/operator/timeout';
import { setTimeout } from 'timers';
import { DocService } from '../../docs/index';
import { MarkdownEditorService } from './editor/index';
@Component({
  selector: 'ms-markdown',
  templateUrl: './markdown.component.html',
  styleUrls: ['./markdown.component.scss']
})
export class MarkdownComponent implements OnInit {
  private _text: string;
  private _doc: any;
  isFullScreen: boolean;
  fixEditButton = false;
  isEditMode = false;
  constructor(private _docService: DocService, private _el: ElementRef, private _editorService: MarkdownEditorService, private _http: HttpClient, @Inject(APP_BASE_HREF) private baseHref) {

  }
  ngOnInit() {
  }

  @HostListener('window:scroll', ['$event'])

  onScroll(event) {
    var viewportOffset = this._el.nativeElement.getBoundingClientRect();
    // these are relative to the viewport, i.e. the window
    this.fixEditButton = viewportOffset.top <= 0;

  }
  ngAfterViewInit() {
    this._docService.onShowDoc((doc) => {
      if (doc === null) {
        this._text = '';
        return;
      }
      this._text = atob(doc.content.content);
      this._doc = doc;
    });
    this._editorService.contentChanged$.subscribe(([content, editor]) => {
      let me = this;
      setTimeout(() => { //should be after viewer rendered its contents
        me.editorDiv.nativeElement.style.height = me.viewerDiv.nativeElement.clientHeight + 'px';
        me.editor.editor.layout();
        me.editor.editor.focus();
      }, 0)
    });
  }
  editorOptions: monaco.editor.IEditorConstructionOptions = {/* theme: 'vs-dark', */ language: 'markdown', wordWrapColumn: 120, wordWrap: 'bounded' };

  showDemo() {
    this._http.get(`${this.baseHref.slice(1)}/assets/markdown.md`, { responseType: 'text' }).subscribe(a => {
      this._text = a;
    });
  }
  public get markdown(): string {
    return this._text;
  }
  public set markdown(text) {
    this._text = text;
    this._doc && (this._doc.body = text);
  }
  showPreviewPanel = true;

  @ViewChild(MonacoEditorComponent) editor: MonacoEditorComponent;
  @ViewChild(MarkdownViewerComponent) viewer: MarkdownViewerComponent;
  @ViewChild('viewerDiv') viewerDiv;
  @ViewChild('editorDiv') editorDiv;

}
