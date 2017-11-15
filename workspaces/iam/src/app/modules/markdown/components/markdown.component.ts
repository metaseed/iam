import { Component, OnInit, ViewChild, Inject } from '@angular/core';
// import { AceEditorDirective } from './editor/markdown-editor.directive';
import { MarkdownViewerComponent } from './viewer/markdown-viewer.component';
import { DocService } from '../../../docs/index';
import { HttpClient } from '@angular/common/http';
import { MonacoEditorComponent } from './editor/monaco-editor/monaco-editor.component';
import { APP_BASE_HREF } from '@angular/common';

@Component({
  selector: 'ms-markdown',
  templateUrl: './markdown.component.html',
  styleUrls: ['./markdown.component.scss']
})
export class MarkdownComponent implements OnInit {
  private _text: string;
  private _doc: any;
  title: string;
  isFullScreen: boolean;
  constructor(private _docService: DocService, private _http: HttpClient, @Inject(APP_BASE_HREF) private baseHref) {
    this._docService.onShowDoc(doc => {
      if (doc === null) {
        this._text = '';
        this.title = '';
        return;
      }

      this._text = doc.body;
      this.title = doc.title;
      this._doc = doc;
    });
  }

  editorOptions = {/* theme: 'vs-dark', */ language: 'markdown' };

  showDemo() {
    this._http.get(`${this.baseHref.slice(1)}\assets/markdown.md`, { responseType: 'text' }).subscribe(a => {
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
  aceOptions: any = { maxLines: 100000, printMargin: false };
  showPreviewPanel = true;

  @ViewChild(MonacoEditorComponent) editor: MonacoEditorComponent;
  @ViewChild(MarkdownViewerComponent) viewer: MarkdownComponent;
  ngOnInit() {
  }
  onAceChange(text) {
    console.log('new text', text);
  }
}
