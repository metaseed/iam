import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { MatInput } from '@angular/material/input';

@Component({
  selector: 'iam-doc-search-bar',
  templateUrl: './doc-search-bar.component.html',
  styleUrls: ['./doc-search-bar.component.scss']
})
export class DocSearchBarComponent {
  @Output() search = new EventEmitter<string>();

  onSearch(e) {
    this.search.emit(e.trim());
  }
}
