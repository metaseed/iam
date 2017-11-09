import { Component, OnInit, ViewChild } from '@angular/core';
import { AceEditorDirective } from './editor/markdown-editor.directive';
import { MarkdownViewerComponent } from './viewer/markdown-viewer.component';
import { DocService } from '../../../docs/index';

@Component({
  selector: 'ms-markdown',
  templateUrl: './markdown.component.html',
  styleUrls: ['./markdown.component.scss']
})
export class MarkdownComponent implements OnInit {
  private _text: string;
  private _doc: any;
  title: string;
  public get markdown(): string {
    return this._text;
  }
  public set markdown(text) {
    this._text = text;
    this._doc && (this._doc.body = text);
  }
  aceOptions: any = { maxLines: 100000, printMargin: false };
  constructor(private _docService: DocService) {
    this._docService.onShowDoc(doc => {
      this._text = doc.body;
      this.title = doc.title;
      this._doc = doc;
    });
  }

  showPreviewPanel = true;

  @ViewChild(AceEditorDirective) editor: AceEditorDirective;
  @ViewChild(MarkdownViewerComponent) viewer: MarkdownComponent;
  ngOnInit() {
  }
  onAceChange(text) {
    console.log('new text', text);
  }
}
