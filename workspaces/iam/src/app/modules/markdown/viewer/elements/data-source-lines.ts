import { Directive, Input } from "@angular/core";
import { DocumentStore } from "app/modules/shared/store/document.store";
@Directive()
export class DataSourceLines {

  public sourceLineStart: Number;
  public sourceLineEnd: Number;
  // eslint-disable-next-line @angular-eslint/no-input-rename
  @Input("data-source-lines")
  public set sourceLines(value) {
    const match = /\[\s*(\d+)\s*,\s*(\d+)\s*\]/.exec(value)
    this.sourceLineStart = +match[1];
    this.sourceLineEnd = +match[2];
  }

  constructor(private _store: DocumentStore) {
  }

  get source() {
    const content = this._store.currentDocContentString$.state;
    const [start, end] = this.getRange(content);
    const source = content.substring(start, end);
    return source;
  }
  set source(value) {
    const originalContent = this._store.currentDocContentString$.state;
    const id = this._store.currentId_.state;
    const [start, end] = this.getRange(originalContent);
    const content = splice(originalContent, start, end - start, value);
    this._store.update({ id, changes: { content } });
  }

  private getRange(content: string) {
    if (this.sourceLineStart >= this.sourceLineEnd) throw 'DataSourceLines: sourceLineStart should less than sourceLineEnd';
    let lineIndex = 0, start, end; // [start, end)
    for (let i = 0; i < content.length; i++) {
      if (content[i] === '\n') {
        lineIndex++;
        if (lineIndex === this.sourceLineStart) start = i + 1;
        if (lineIndex === this.sourceLineEnd) {
          end = i;// at '\n'
          break;
        }
      }
    }
    if (start === undefined || end === undefined) throw 'DataSourceLines: content lenth is less than expected!'
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
