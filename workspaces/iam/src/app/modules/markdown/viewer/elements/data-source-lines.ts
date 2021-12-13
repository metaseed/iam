import { Directive, Input } from "@angular/core";
import { DocEditorService } from "app/modules/shared/doc-editor.service";
import { DocumentStore } from "app/modules/shared/store/document.store";
import { Logger } from "core";

@Directive()
export class DataSourceLines {

  public sourceLineStart: number;
  public sourceLineEnd: number;
  protected logger = Logger(`${this.constructor.name}`)
  // eslint-disable-next-line @angular-eslint/no-input-rename
  @Input("data-source-lines")
  public set sourceLines(value) {
    const match = /\[\s*(\d+)\s*,\s*(\d+)\s*\]/.exec(value)
    if (match) {
      this.sourceLineStart = +match[1];
      this.sourceLineEnd = +match[2];
    } else {
      this.logger.debug(`sourceLines: ${value}`);
    }
  }

  constructor(private _store: DocumentStore, private docEditor: DocEditorService) {
  }

  get source() {
    const content = this._store.currentDocContentString$.state;
    const [start, end] = this.getRange(content);
    const source = content.substring(start, end);
    return source;
  }
  set source(value) {
    if (this.docEditor.currentEditor) {
      this.docEditor.currentEditor.replaceRange(value + '\n', this.sourceLineStart, 0, this.sourceLineEnd, 0)
      return;
    }

    const originalContent = this._store.currentDocContent$.state;
    const originalContentString = originalContent.content;
    const id = this._store.currentId_.state;
    const [start, end] = this.getRange(originalContentString);
    const content = splice(originalContentString, start, end - start, value);
    this._store.docContent.update({ id, changes: { content } });
    // to workaround the editor load new content and clear dirty flags.
    setTimeout(() => this._store.upsertDocStatus({ isEditorDirty: true }), id);
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
