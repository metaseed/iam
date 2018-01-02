/// <reference path="../../../../../../node_modules/monaco-editor/monaco.d.ts" />
import { Component, OnInit, ViewChild, Inject, HostListener, ElementRef } from '@angular/core';
// import { AceEditorDirective } from './editor/markdown-editor.directive';
import { MarkdownViewerComponent } from './viewer/markdown-viewer.component';
import { HttpClient } from '@angular/common/http';
import { MonacoEditorComponent } from './editor/monaco-editor/monaco-editor.component';
import { APP_BASE_HREF } from '@angular/common';
import { timeout } from 'rxjs/operator/timeout';
import 'rxjs/add/operator/take';
import { setTimeout } from 'timers';
import { DocService } from 'docs';
import { MarkdownEditorService } from './editor/index';
import { ActivatedRoute } from '@angular/router';
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
  showPreviewPanel = true;
  docLoaded = false;
  @ViewChild(MonacoEditorComponent) editor: MonacoEditorComponent;
  @ViewChild(MarkdownViewerComponent) viewer: MarkdownViewerComponent;
  @ViewChild('viewerDiv') viewerDiv;
  @ViewChild('editorDiv') editorDiv;
  constructor(private _docService: DocService, private _el: ElementRef, private _editorService: MarkdownEditorService, private _http: HttpClient, @Inject(APP_BASE_HREF) private baseHref,
    private route: ActivatedRoute) {

  }
  ngOnInit() {
    this.route.queryParamMap.map(
      params => {
        let title = params.get('title');
        let id = params.get('id');
        return this._docService.showDoc(title, id);
      }
    ).take(1).subscribe();
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
      this.docLoaded = true;
    });
    this._editorService.contentChanged$.subscribe(([content, editor]) => {
      let me = this;
      function refresh() {//should be after viewer rendered its contents
        if (!me.editorDiv) { setTimeout(() => refresh(), 0); return };
        me.editorDiv.nativeElement.style.height = me.viewerDiv.nativeElement.clientHeight + 'px';
        me.editor.editor.layout();
        me.editor.editor.focus();
      }
      refresh();
    });
  }
  editorOptions: monaco.editor.IEditorConstructionOptions = {/* theme: 'vs-dark', */ language: 'markdown', wordWrapColumn: 120, wordWrap: 'bounded' };

  editModeChange() {
    this.isEditMode = !this.isEditMode;
    this.showPreviewPanel = !this.isEditMode;
  }
  showDemo() {
    this._http.get(`${this.baseHref}assets/markdown.md`, { responseType: 'text' }).subscribe(a => {
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

}
