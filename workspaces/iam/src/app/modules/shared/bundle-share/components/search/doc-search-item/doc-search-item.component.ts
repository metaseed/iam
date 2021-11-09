import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ISearchItem, ITextMatch } from 'core';

@Component({
  selector: 'doc-search-item',
  templateUrl: './doc-search-item.component.html',
  styleUrls: ['./doc-search-item.component.scss']
})
export class DocSearchItemComponent {
  @Input()
  item: ISearchItem;

  @Output()
  onClick = new EventEmitter();

  getMatches(textMatch: ITextMatch) {
    const fragment = textMatch.fragment;
    let r = '';
    let lastIndex = 0;
    textMatch.matches.forEach(match => {
      const pair = match.indices;
      r += fragment.substr(lastIndex, pair[0] - lastIndex);
      r += `<em>${match.text}</em>`;
      lastIndex = pair[1];
    });
    r += fragment.substr(lastIndex);
    return r;
  }
}
