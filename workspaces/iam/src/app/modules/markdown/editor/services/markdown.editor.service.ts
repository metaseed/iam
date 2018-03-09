/// <reference path="../../../../../../../../node_modules/monaco-editor/monaco.d.ts" />
import { Subject } from "rxjs/Subject";

export class MarkdownEditorService {
  public editorLoaded$ = new Subject();
  public contentChanged$ = new Subject<[string, CodeMirror.Editor]>();
  public docLoaded$ = new Subject<CodeMirror.Editor>();
  public onTouched$ = new Subject();

  public _editorRefresh$ = new Subject();
  refresh() {
    this._editorRefresh$.next();
  }
}
