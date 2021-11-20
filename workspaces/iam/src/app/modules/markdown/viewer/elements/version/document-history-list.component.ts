import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'document-history-list',
  template: `
<mat-nav-list>
  <a href="https://keep.google.com/" mat-list-item (click)="openLink($event)">
    <span mat-line>Google Keep</span>
    <span mat-line>Add to a note</span>
  </a>
</mat-nav-list>`
})

export class DocumentHistoryListComponent implements OnInit {
  constructor() { }

  ngOnInit() { }

  openLink(event) {

  }
}
