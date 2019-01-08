import { Component, OnInit, Input } from '@angular/core';
import { ISearchItem, ITextMatche } from 'core';

@Component({
  selector: 'doc-search-item',
  templateUrl: './doc-search-item.component.html',
  styleUrls: ['./doc-search-item.component.scss']
})
export class DocSearchItemComponent implements OnInit {
  @Input()
  item: ISearchItem;
  constructor() {}

  getMatches(textMatches: ITextMatche) {
    let r = textMatches;

    return r;
  }
  ngOnInit() {}
}
