import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { MAT_BOTTOM_SHEET_DATA } from '@angular/material/bottom-sheet';
import { NavigationExtras, Router } from '@angular/router';
import { Content } from 'app/modules/net-storage/github';
import { Commit } from 'app/modules/net-storage/github/model/commit';
import { DocumentStore } from 'app/modules/shared/store/document.store';
import { DocContent } from 'core';
import { DOC_HISTORY_VERSION_ID } from 'shared';
import { DocumentHistoryService } from './document-history.service';

@Component({
  selector: 'document-history-list',
  template: `
<mat-nav-list>
  <a mat-list-item (click)="openLink(item)" *ngFor="let item of docHistory$| async">
    <span mat-line>{{item.commit.message}}</span>
    <span mat-line>{{item.commit.committer.date}} &nbsp;&nbsp; {{item.commit.author.name}} &nbsp; <{{item.commit.author.email}}></span>
  </a>
</mat-nav-list>`,
  providers: [DocumentHistoryService]
})

export class DocumentHistoryListComponent {
  public docHistory$
  public selectedCommit: Commit;

  constructor(
    @Inject(MAT_BOTTOM_SHEET_DATA) private data: { id: string, format: string },
    private service: DocumentHistoryService,
    private docStore: DocumentStore,
    private router: Router) {
      const {id, format} = this.data;
      this.docHistory$ = service.getHistory(id,format);
  }


  openLink(commit: Commit) {
    this.selectedCommit = commit;
    const sha = commit.sha;
    const {id, format} = this.data;
    this.service.getHistoryVersion(id, format, sha).subscribe(
      (content: Content) => {
        const docContent = new DocContent(DOC_HISTORY_VERSION_ID, content.content, sha);
        this.docStore.docContent.upsert(docContent);
        const docMeta = {...this.docStore.docMeta.currentEntity$.state};
        docMeta.id = DOC_HISTORY_VERSION_ID;
        this.docStore.docMeta.upsert(docMeta);

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
