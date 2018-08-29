import { Subject } from 'rxjs';
import { Injectable, Inject } from '@angular/core';
import { MARKDOWN_SERVICE_TOKEN, IMarkdownService } from '../../model/markdown.model';

@Injectable()
export class MarkdownEditorService {
  private editor: CodeMirror.Doc & CodeMirror.Editor;

  constructor(@Inject(MARKDOWN_SERVICE_TOKEN) public markdownService: IMarkdownService) {
    this.editorLoaded$.subscribe(e => (this.editor = e as any));
  }

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

  public goToLine(lineNumber) {
    this.editor.setCursor(lineNumber);
    this.editor.execCommand('showInCenter');
  }
}
