import { Subject } from 'rxjs';

export class MarkdownEditorService {
  public contentChanged$ = new Subject<string>();
  public docLoaded$ = new Subject<CodeMirror.Editor>();
  public onTouched$ = new Subject();
  // should not in store. this is a complex object,
  // and after in store, it's should be freezed, if then do modification, exception occures because of storeFreeze
  public editorLoaded$ = new Subject<CodeMirror.Editor>();
  public _editorRefresh$ = new Subject();
  refresh() {
    this._editorRefresh$.next();
  }
}
