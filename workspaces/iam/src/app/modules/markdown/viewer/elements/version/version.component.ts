import { Component, Input, OnInit } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { DocumentHistoryListComponent } from './document-history-list.component';

@Component({
  selector: 'i-version',
  template: `
  <span class="meta-version">&nbsp; v{{version}} </span>
  <button mat-icon-button disabled aria-label="show document history versions" (click)="onShowVersions()">
        <mat-icon>open_in_new</mat-icon>
  </button>
  `
})
export class VersionComponent implements OnInit {
  constructor(private bottomSheet: MatBottomSheet) { }

  @Input()
  version = '';

  ngOnInit() { }

  onShowVersions() {
    const historyList = this.bottomSheet.open(DocumentHistoryListComponent);
    historyList.afterDismissed().subscribe(o => {
      // historyList.instance.
    })
  }
}
