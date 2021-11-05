import { Component, ViewChild, Inject } from '@angular/core';
import { MatToolbar } from '@angular/material/toolbar';
import { Router } from '@angular/router';
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
    @Inject(MARKDOWN_STORE_TOKEN) private markdownStore: IMarkdownStore,
    private markdownEffects: MarkdownEffects
    ) {}

  onRefresh(e) {
    this.markdownEffects.refresh_.next(null);
  }

  back(e) {
    this.router.navigateByUrl('/home');
    // this.location.back();
  }

  toEditMode(e) {
    this.markdownStore.documentMode_.next(DocumentMode.Edit);

  }
}
