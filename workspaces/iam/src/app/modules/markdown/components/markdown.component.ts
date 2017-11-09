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
  public markdown: string;
  aceOptions: any = { maxLines: 100000, printMargin: false };
  constructor(private _docService: DocService) {
    this._docService.docShow$.subscribe(doc => this.markdown = doc.body);
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
