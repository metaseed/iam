import { Subject } from 'rxjs';
import { Injectable, Inject } from '@angular/core';
import { MARKDOWN_SERVICE_TOKEN, IMarkdownService } from '../../model/markdown.model';

@Injectable()
export class MarkdownEditorService {
  private editor: CodeMirror.Doc & CodeMirror.Editor;

  constructor(@Inject(MARKDOWN_SERVICE_TOKEN) public markdownService: IMarkdownService) {
    this.docEditorLoaded$.subscribe(e => (this.editor = e as any));
  }

  // when doc content changes set via [model] change
  public docContentSet$ = new Subject<CodeMirror.Editor>();
  // when doc content changes set via editor box
  public docContentModified$ = new Subject<string>();
  // when doc editor(codemirror) loaded in browser
  public docEditorLoaded$ = new Subject<CodeMirror.Editor>();

  public goToLine(lineNumber) {
    this.editor.focus();
    this.editor.setCursor(lineNumber);
    this.editor.execCommand('showInCenter');
  }

  public selectLine(line) {
    this.editor.focus();
    this.editor.setSelection({ line: line, ch: 0 }, { line: line + 1, ch: 0 });
    this.editor.execCommand('showInCenter');
  }
}
