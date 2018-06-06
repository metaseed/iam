import { Subject } from 'rxjs';

export class MarkdownEditorService {
  public contentChanged$ = new Subject<[string, CodeMirror.Editor]>();
  public docLoaded$ = new Subject<CodeMirror.Editor>();
  public onTouched$ = new Subject();

  public _editorRefresh$ = new Subject();
  refresh() {
    this._editorRefresh$.next();
  }
}
