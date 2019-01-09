import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'iam-doc-search-bar',
  templateUrl: './doc-search-bar.component.html',
  styleUrls: ['./doc-search-bar.component.scss']
})
export class DocSearchBarComponent implements OnInit {
  @Output() search = new EventEmitter<string>();
  constructor() {}

  ngOnInit() {}

  onSearch(e) {
    this.search.emit(e.trim());
  }
}
