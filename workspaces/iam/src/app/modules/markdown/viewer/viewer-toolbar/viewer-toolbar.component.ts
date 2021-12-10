import { Component, ViewChild, Inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatToolbar } from '@angular/material/toolbar';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { DialogData, DocumentsEffects, DOCUMENT_EFFECTS_TOKEN, MessageDialog } from 'shared';
import { DocumentMode, IMarkdownStore, MARKDOWN_STORE_TOKEN } from '../../model/markdown.model';
import { MarkdownEffects } from '../../store/markdown.effects';

@Component({
  selector: 'ms-viewer-toolbar',
  templateUrl: './viewer-toolbar.component.html',
  styleUrls: ['./viewer-toolbar.component.scss']
})
export class ViewerToolbarComponent {
  @ViewChild('toolbar') toolbar: MatToolbar;
  constructor(private router: Router,
    private dialog: MatDialog,
    @Inject(MARKDOWN_STORE_TOKEN) private markdownStore: IMarkdownStore,
    @Inject(DOCUMENT_EFFECTS_TOKEN) private documentEffects: DocumentsEffects,
    private markdownEffects: MarkdownEffects
  ) { }

  onRefresh(e) {
    this.markdownEffects.refresh_.next(null);
  }

  onDelete(e) {
    const dialogData: DialogData = {
      title: 'Delete?', message: `Are you want to delete this document?`, defaultAction: 'Ok', additionalAction: 'Cancel'
    }

    this.dialog
      .open(MessageDialog, { width: '40rem', height: '18rem', data: dialogData })
      .afterClosed()
      .pipe(
        map(value => {
          if (value === 'Ok') {
            this.documentEffects.deleteDocument_.next({});
            this.back();
          }
        })
      ).subscribe();
  }

  back(e?) {
    this.router.navigateByUrl('/home');
    // this.location.back();
  }

  toEditMode(e) {
    this.markdownStore.documentMode_.next(DocumentMode.Edit);

  }
}
