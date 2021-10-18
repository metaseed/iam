import { Component, ViewChild, Inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { MatToolbar } from '@angular/material/toolbar';
import { Router } from '@angular/router';
import { DocumentMode, IMarkdownStore, MARKDOWN_STORE_TOKEN } from '../../model/markdown.model';

@Component({
  selector: 'ms-viewer-toolbar',
  templateUrl: './viewer-toolbar.component.html',
  styleUrls: ['./viewer-toolbar.component.scss']
})
export class ViewerToolbarComponent {
  @ViewChild('toolbar') toolbar: MatToolbar;
  constructor(private router: Router, private store: Store<any>,
    @Inject(MARKDOWN_STORE_TOKEN) private markdownStore: IMarkdownStore
    ) {}

  onRefresh(e) {
    this.markdownStore.refresh_.next(null);
  }

  back(e) {
    this.router.navigateByUrl('/home');
    // this.location.back();
  }

  toEditMode(e) {
    this.markdownStore.documentMode_.next(DocumentMode.Edit);

  }
}
