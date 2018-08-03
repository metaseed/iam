import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { Document, NET_COMMU_TIMEOUT, MSG_DISPLAY_TIMEOUT } from 'core';
import { Store } from '@ngrx/store';
import { MatSnackBar } from '@angular/material';
import {
  monitorActionStatus$,
  DocumentEffectsActionTypes,
  ActionStatus,
  ActionState
} from 'shared';
import { takeUntil, map } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'doc-item',
  templateUrl: './doc-item.component.html',
  styleUrls: ['./doc-item.component.scss']
})
export class DocItemComponent implements OnInit {
  showDelete: boolean;
  destroy$ = new Subject();
  @Input() doc: Document;

  @Output() delete = new EventEmitter<Document>();
  @Output() show = new EventEmitter<Document>();

  onDelete = doc => this.delete.next(doc);

  onShow = doc => this.show.next(doc);

  ngOnDestroy() {
    this.destroy$.next();
  }
  private defaultTimeoutHandler = (action: string, info?: string) => (start: ActionStatus) => {
    console.warn('action timeout:' + action + (info ? `--${info}` : ''));
    this.snackBar.open(action + 'time out.', 'ok', { duration: MSG_DISPLAY_TIMEOUT });
  };

  isDeleteDone$ = monitorActionStatus$(
    this.store,
    DocumentEffectsActionTypes.Delete,
    NET_COMMU_TIMEOUT,
    this.defaultTimeoutHandler(DocumentEffectsActionTypes.Delete),
    actionStatus => actionStatus.action.payload.id === this.doc.id
  ).pipe(
    takeUntil(this.destroy$),
    map(v => {
      if (v.action.payload.id === this.doc.id) {
        if (v.state === ActionState.Fail) {
          this.snackBar.open(`delete: ${this.doc.metaData.title} failed!`);
          return true;
        }
        return (
          // v.status === ActionStatus.Succession ||
          v.state === ActionState.Complete || v.state === ActionState.Timeout
        );
      }
      return false;
    })
  );
  constructor(private router: Router, private store: Store<any>, private snackBar: MatSnackBar) {}

  ngOnInit() {}
}
