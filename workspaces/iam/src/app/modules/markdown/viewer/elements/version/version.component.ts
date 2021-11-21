import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { DocumentHistoryListComponent } from './document-history-list.component';

@Component({
  selector: 'i-version',
  encapsulation: ViewEncapsulation.None,
  template: `
  <div class="meta-version-date">
    <a *ngIf="version" class="meta-version" aria-label="show document history versions" (click)="onShowVersions()">
      <span >&nbsp;v{{version}}</span>
      <mat-icon style="font-size: small;">open_in_new</mat-icon>
    </a>
    <span *ngIf="createDate" class="meta-date">{{createDate}}</span>
    <span *ngIf="updateDate" class="meta-date"> - {{updateDate}}</span>
    <span *ngIf="id" class="meta-id">&nbsp; (id:{{id}})</span>
  </div>
  `,
})
export class VersionComponent implements OnInit {
  constructor(private bottomSheet: MatBottomSheet) { }

  @Input()
  version = '';
  @Input()
   createDate ='';
  @Input()
  updateDate = '';
  @Input()
  id = ''

  ngOnInit() { }

  onShowVersions() {
    const historyList = this.bottomSheet.open(DocumentHistoryListComponent);
    historyList.afterDismissed().subscribe(o => {
      // historyList.instance.
    })
  }
}
