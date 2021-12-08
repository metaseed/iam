import { Subject } from 'rxjs';
import { Injectable, Inject } from '@angular/core';
import { MARKDOWN_STORE_TOKEN, IMarkdownStore } from '../../model/markdown.model';
import * as CodeMirror from 'codemirror';
import { ICodeMirrorEditor } from '../model';
import { IDocEditor } from 'app/modules/doc-viewer-editor/model/DocEditor';
import { DocEditorService } from 'app/modules/shared/doc-editor.service';

@Injectable()
export class MarkdownEditorService implements IDocEditor {
  private editor: ICodeMirrorEditor;

  constructor(@Inject(MARKDOWN_STORE_TOKEN) public markdownService: IMarkdownStore, docEditorService: DocEditorService)  {
    docEditorService.currentEditor = this;
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
  public docContentModified$ = new Subject<[string, ICodeMirrorEditor]>();
  // when doc editor(codemirror) loaded in browser
  public docEditorLoaded$ = new Subject<ICodeMirrorEditor>();

  public gotoLine(lineNumber) {
    this.editor.focus();
    this.editor.setCursor(lineNumber);
    this.editor.execCommand('showInCenter');
  }

  public selectRange(startLine: number, startColumn: number,
    endLine: number, endColumn: number) {
    this.editor.focus();
    this.editor.setSelection({ line: startLine, ch: startColumn }, { line: endLine, ch: endColumn });
    this.editor.execCommand('showInCenter');
  }

  public replaceRange(newContent: string, startLine: number, startColumn: number,
    endLine: number, endColumn: number) {
    this.editor.replaceRange(newContent,
      { line: startLine, ch: startColumn },
      { line: endLine, ch: endColumn })
  }
}
