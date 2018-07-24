import { Component, ViewChild, Inject, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import * as document from '../../state/actions/document';
import * as fromMarkdown from '../../state';
import { MatToolbar } from '@angular/material';
import { Subject } from 'rxjs';
@Component({
  selector: 'ms-viewer-toolbar',
  templateUrl: './viewer-toolbar.component.html',
  styleUrls: ['./viewer-toolbar.component.scss']
})
export class ViewerToolbarComponent {
  @ViewChild('toolbar') toolbar: MatToolbar;
  constructor(private store: Store<fromMarkdown.State>) {}

  onRefresh(e) {
    this.store.dispatch(new document.RefreshAction());
  }
  toEditMode(e) {
    this.store.dispatch(new document.EditMode());
  }
}
