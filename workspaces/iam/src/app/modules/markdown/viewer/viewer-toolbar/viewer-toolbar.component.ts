import { Component, ViewChild, Inject, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import * as document from '../../state/actions/document';
import * as fromMarkdown from '../../state';
import { MatToolbar } from '@angular/material/toolbar';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'ms-viewer-toolbar',
  templateUrl: './viewer-toolbar.component.html',
  styleUrls: ['./viewer-toolbar.component.scss']
})
export class ViewerToolbarComponent {
  @ViewChild('toolbar') toolbar: MatToolbar;
  constructor(private router: Router, private store: Store<fromMarkdown.MarkdownState>) {}

  onRefresh(e) {
    this.store.dispatch(new document.RefreshAction());
  }

  back(e) {
    this.router.navigateByUrl('/home');
    // this.location.back();
  }

  toEditMode(e) {
    this.store.dispatch(new document.EditMode());
  }
}
