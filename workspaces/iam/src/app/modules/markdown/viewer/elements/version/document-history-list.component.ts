import { Component, Inject } from '@angular/core';
import { MAT_BOTTOM_SHEET_DATA } from '@angular/material/bottom-sheet';
import { NavigationExtras, Router } from '@angular/router';
import { DocumentStatus } from 'app/modules/core/model/doc-model/doc-status';
import { Content } from 'app/modules/net-storage/github';
import { Commit } from 'app/modules/net-storage/github/model/commit';
import { DocumentStore } from 'app/modules/shared/store/document.store';
import { DocContent } from 'core';
import { DOC_HISTORY_VERSION_ID } from 'shared';
import { DocumentHistoryService } from './document-history.service';

@Component({
  selector: 'document-history-list',
  template: `
  <mat-slide-toggle (change)="showAllOrFiltered($event)">all</mat-slide-toggle>
<mat-nav-list>
  <a mat-list-item (click)="openLink(item)" *ngFor="let item of docHistory">
    <span mat-line>{{item.commit.message}}</span>
    <div mat-line
    style="display: flex;
     justify-content: space-between;
     color: slategray;
     font-style: italic;
     font-size: smaller;">
      <span>{{item.commit.committer.date}}</span>
      <span style="font-size: smaller"> {{item.commit.author.name}} <{{item.commit.author.email}}></span>
    </div>
  </a>
</mat-nav-list>`,
  providers: [DocumentHistoryService]
})

export class DocumentHistoryListComponent {
  public docHistory
  private docHistory_all: Commit[];
  private docHistory_filtered;
  public selectedCommit: Commit;

  constructor(
    @Inject(MAT_BOTTOM_SHEET_DATA) private data: { id: string, format: string },
    private service: DocumentHistoryService,
    private docStore: DocumentStore,
    private router: Router) {
    const { id, format } = this.data;
    service.getHistory(id, format).subscribe(v => {
      this.docHistory_all = v;
      this.docHistory = this.docHistory_filtered = v.filter(v => {
        const msg = v.commit.message;
        return /, change:.*/.test(msg);
      });
    });
  }

  public showAllOrFiltered(e) {
    if (e.checked) {
      this.docHistory = this.docHistory_all;
    } else {
      this.docHistory = this.docHistory_filtered;
    }
  }

  openLink(commit: Commit) {
    this.selectedCommit = commit;
    const sha = commit.sha;
    const { id, format } = this.data;
    this.service.getHistoryVersion(id, format, sha).subscribe(
      (content: Content) => {
        const docContent = new DocContent(DOC_HISTORY_VERSION_ID, content.content, sha);
        this.docStore.docContent.upsert(docContent);

        const docMeta = { ...this.docStore.docMeta.currentEntity$.state };
        docMeta.id = DOC_HISTORY_VERSION_ID;
        this.docStore.docMeta.upsert(docMeta);

        const docStatus: DocumentStatus = {id:DOC_HISTORY_VERSION_ID, isEditable: false}
        this.docStore.docStatus.upsert(docStatus);

        const navigationExtras: NavigationExtras = {
          queryParams: {
            id: DOC_HISTORY_VERSION_ID,
            f: format || 'md'
          }
        };
        this.router.navigate(['/doc'], navigationExtras);
      }
    )
  }
}
