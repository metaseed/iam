import { Component, Input } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import * as MarkdownIt from 'markdown-it';
// const markdown = require('markdown-it');
const markdownVideoPlugin = require('markdown-it-video');


/**
 * MarkdownViewerComponent
 *
 * @export
 * @class MarkdownViewerComponent
 */
@Component({
  // tslint:disable-next-line:component-selector
  selector: 'markdown-viewer',
  templateUrl: 'markdown-viewer.component.html'
})
export class MarkdownViewerComponent {

  @Input()
  set model(value: string) {
    if (value) {
      this.parsedModel = this.sanitized.bypassSecurityTrustHtml(this.markdownParser.render(value));
    } else {
      this.parsedModel = '';
    }
  }
  parsedModel: any;
  markdownParser: any;

  constructor(private sanitized: DomSanitizer) {
    this.markdownParser = new MarkdownIt({ linkify: true }); // new markdown({ linkify: true });
    this.markdownParser.use(markdownVideoPlugin, {
      youtube: { width: 640, height: 390 }
    });
  }
}
