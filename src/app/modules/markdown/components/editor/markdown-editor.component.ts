import { Component, Input, Output, EventEmitter } from '@angular/core';
import ace from 'ace'
@Component({
  selector: 'markdown-editor',
  templateUrl: 'markdown-editor.component.html'
})
export class MarkdownEditorComponent {

  @Input() model: string;
  @Output() modelChange: EventEmitter<string> = new EventEmitter<string>();

  onPaste(e: any) {
    let match, regex;
    const results: string[] = [];
    let content = e.clipboardData.getData('text/plain');

    regex = /(youtu\.be\/|youtube(-nocookie)?.com\/(v\/|e\/|.*u\/\w+\/|embed\/|.*v=))([\w-]{11})/g;
    while ((match = regex.exec(content)) !== null) {
      // This is necessary to avoid infinite loops with zero-width matches
      if (match.index === regex.lastIndex) {
        regex.lastIndex++;
      }
      results.push(`@[youtube](${match[4]})`);
    }
    // If we already processed this, don't let it be processed by the link generator
    if (results.length) {
      content = '';
    }

    regex = /(^|\s)((https?:\/\/)?[\w-]+(\.[a-z-]+)+\.?(:\d+)?(\/\S*)?)/gim;
    while ((match = regex.exec(content)) !== null) {
      // This is necessary to avoid infinite loops with zero-width matches
      if (match.index === regex.lastIndex) {
        regex.lastIndex++;
      }
      results.push(`[${match[0]}](${match[0]})`);
    }

    if (results.length) {
      if (this.model && this.model !== '') {
        this.model += `\n` + results.join(`\n\n`);
      } else {
        this.model = results.join(`\n\n`);
      }
      this.modelChange.next(this.model);

      e.stopPropagation();
      e.preventDefault();
    }
  }
}
