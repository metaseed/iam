import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { Document, NET_COMMU_TIMEOUT, MSG_DISPLAY_TIMEOUT } from 'core';
import { Store } from '@ngrx/store';
import { MatSnackBar } from '@angular/material/snack-bar';
import { monitorActionStatus$, DocumentEffectsActionType, ActionStatus, ActionState } from 'shared';
import { map } from 'rxjs/operators';

@Component({
  selector: 'doc-item',
  templateUrl: './doc-item.component.html',
  styleUrls: ['./doc-item.component.scss']
})
export class DocItemComponent {
  showDelete = false;
  @Input()
  doc: Document;

  @Output()
  delete = new EventEmitter<Document>();

  @Output()
  show = new EventEmitter<Document>();

  constructor(private router: Router, private store: Store<any>, private snackBar: MatSnackBar) { }

  private defaultTimeoutHandler = (action: string, info?: string) => (start: ActionStatus) => {
    console.warn('action timeout:' + action + (info ? `--${info}` : ''));
    this.snackBar.open(action + 'time out.', 'ok', { duration: MSG_DISPLAY_TIMEOUT });
  };

  isDeleteDone$ = monitorActionStatus$(
    this.store,
    DocumentEffectsActionType.Delete,
    NET_COMMU_TIMEOUT,
    this.defaultTimeoutHandler(DocumentEffectsActionType.Delete),
    actionStatus => actionStatus.action.payload.id === this.doc.id
  ).pipe(
    map(v => {
      if (v.action.payload.id === this.doc.id) {
        if (v.state === ActionState.Fail) {
          this.snackBar.open(`delete: ${this.doc.metaData.title} failed!`);
          return true;
        }
        return v.state === ActionState.Complete || v.state === ActionState.Timeout;
      }
      return false;
    })
  );

}
