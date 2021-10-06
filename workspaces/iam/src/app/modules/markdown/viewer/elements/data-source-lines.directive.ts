import { Directive, Input } from "@angular/core";

@Directive({
  exportAs: 'markdownRaw',
  selector: '[data-source-lines]'
})
export class DataSourceLinesDirective {

  public sourceLineStart:Number;
  public sourceLineEnd: Number;
  // eslint-disable-next-line @angular-eslint/no-input-rename
  @Input("data-source-lines")
  public set sourceLines(value) {
    const match = /\[\s*(\d+)\s*,\s*(\d+)\s*\]/.exec(value)
    this.sourceLineStart = +match[1];
    this.sourceLineEnd = +match[2];
  }

}
