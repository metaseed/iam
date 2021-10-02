import { Subject } from 'rxjs';
import { Injectable, Inject } from '@angular/core';
import { MARKDOWN_SERVICE_TOKEN, IMarkdownService } from '../../model/markdown.model';
import * as CodeMirror from 'codemirror';

export type ICodeMirrorEditor = CodeMirror.Editor;

@Injectable()
export class MarkdownEditorService {
  private editor: ICodeMirrorEditor;

  constructor(@Inject(MARKDOWN_SERVICE_TOKEN) public markdownService: IMarkdownService) {
    this.docEditorLoaded$.subscribe(e => this.editor = e);
  }

  public commands: CodeMirror.CommandActions & {
    save: () => void,
    scrollLineUp: (cm: ICodeMirrorEditor) => void,
    scrollLineDown: (cm: ICodeMirrorEditor) => void,
  } = <any>CodeMirror.commands;
  // when doc content changes set via [model] change
  public docContentSet$ = new Subject<ICodeMirrorEditor>();
  // when doc content changes set via editor box
  public docContentModified$ = new Subject<string>();
  // when doc editor(codemirror) loaded in browser
  public docEditorLoaded$ = new Subject<ICodeMirrorEditor>();

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
