import { Component, OnInit, ViewChild } from '@angular/core';
import { AceEditorDirective } from './editor/markdown-editor.directive';
import { MarkdownViewerComponent } from './viewer/markdown-viewer.component';
import { DocService } from '../../../docs/index';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'ms-markdown',
  templateUrl: './markdown.component.html',
  styleUrls: ['./markdown.component.scss']
})
export class MarkdownComponent implements OnInit {
  private _text: string;
  private _doc: any;
  title: string;

  constructor(private _docService: DocService, private _http: HttpClient) {
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

  showDemo() {
    this._http.get('/assets/markdown.md').subscribe();
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

  @ViewChild(AceEditorDirective) editor: AceEditorDirective;
  @ViewChild(MarkdownViewerComponent) viewer: MarkdownComponent;
  ngOnInit() {
  }
  onAceChange(text) {
    console.log('new text', text);
  }
}
