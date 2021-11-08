
export interface IDocEditor {
  replaceRange(newContent: string, startLine: number, startColumn: number,
    endLine: number, endColumn: number);
  selectRange(startLine: number, startColumn: number,
    endLine: number, endColumn: number)
  gotoLine(line: number);
}

