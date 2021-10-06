import { Directive, Input } from "@angular/core";
import { State, Store } from "@ngrx/store";
import { selectCurrentDocumentContentString, selectCurrentDocumentId, UpdateDocument } from "shared";

@Directive({
  exportAs: 'markdownRaw',
  selector: '[data-source-lines]'
})
export class DataSourceLinesDirective {

  public sourceLineStart: Number;
  public sourceLineEnd: Number;
  // eslint-disable-next-line @angular-eslint/no-input-rename
  @Input("data-source-lines")
  public set sourceLines(value) {
    const match = /\[\s*(\d+)\s*,\s*(\d+)\s*\]/.exec(value)
    this.sourceLineStart = +match[1];
    this.sourceLineEnd = +match[2];
  }

  constructor(private _store: Store, private _state: State<any>) {
  }

  get Source() {
    const content = selectCurrentDocumentContentString(this._state.value);
    const [start, end] = this.getRange(content);
    const source = content.substring(start, end);
    return source;
  }
  set Source(value) {
    const originalContent = selectCurrentDocumentContentString(this._state.value);
    const id = selectCurrentDocumentId(this._state.value);
    const [start, end] = this.getRange(originalContent);
    const content = splice(originalContent, start, end - start, value);
    this._store.dispatch(new UpdateDocument({ collectionDocument: { id, changes: { content } } }))
  }

  private getRange(content: string) {
    if (this.sourceLineStart >= this.sourceLineEnd) throw 'sourceLineStart should less than sourceLineEnd';
    let i = 0, lineIndex = 0, start, end; // [start, end)
    while (content[i++] === '/n') {
      lineIndex++;
      if (lineIndex === this.sourceLineStart) start = i;
      if (lineIndex === this.sourceLineEnd) {
        end = i - 1;// at '/n'
        break;
      }
    }
    if (start === undefined || end === undefined) throw 'content lenth is less than expected!'
    return [start, end];
  }
}

function splice(content, index, count, add) {
  if (index < 0) {
    index += this.length;
    if (index < 0)
      index = 0;
  }
  return content.slice(0, index) + (add || "") + content.slice(index + count);
}
