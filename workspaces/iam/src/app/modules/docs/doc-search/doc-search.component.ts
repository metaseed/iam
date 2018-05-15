import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'iam-doc-search',
  templateUrl: './doc-search.component.html',
  styleUrls: ['./doc-search.component.scss']
})
export class DocSearchComponent implements OnInit {
  @Output() Search = new EventEmitter();
  constructor() {}

  ngOnInit() {}

  onSearch(e) {
    this.Search.emit(e);
  }
}
