import { Component, ViewChild, Inject, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import * as document from '../../state/actions/document';
import * as fromMarkdown from './../../state';
import { MatToolbar } from '@angular/material';
import { Subject } from 'rxjs';
@Component({
  selector: 'ms-viewer-toolbar',
  templateUrl: './viewer-toolbar.component.html',
  styleUrls: ['./viewer-toolbar.component.scss']
})
export class ViewerToolbarComponent implements OnInit, OnDestroy {
  @ViewChild('toolbar') toolbar: MatToolbar;
  private destroy$ = new Subject();
  constructor(
    private store: Store<fromMarkdown.State>  ) {}


  ngOnInit() {
  }

  ngOnDestroy() {
    this.destroy$.next();
  }

  onRefresh() {
    this.store.dispatch(new document.RefreshAction());
  }
  toEditMode() {
    this.store.dispatch(new document.EditMode());
  }
}
