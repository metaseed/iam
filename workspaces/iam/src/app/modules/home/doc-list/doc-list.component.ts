import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  ViewChild,
  ElementRef
} from '@angular/core';
import { Document } from 'core';
import { MatDialog } from '@angular/material';
import { DeleteAlertDialog } from '../doc-list/dialog.component';
import { Store } from '@ngrx/store';
import { State, DocumentEffectsReadBulkDocMeta } from '../state';
import { PAN_ACTION_SCROLL_TRIGGER, PAN_ACTION_DELTY } from '../const';

@Component({
  selector: 'doc-list',
  templateUrl: './doc-list.component.html',
  styleUrls: ['./doc-list.component.scss']
})
export class DocListComponent implements OnInit {
  private docs;
  @ViewChild('touchDiv') touchDiv: ElementRef;

  @Output() onDelete = new EventEmitter<Document>();
  @Output() onShow = new EventEmitter<Document>();

  constructor(private dialog: MatDialog, private store: Store<State>) {}

  @Input()
  set documents(v) {
    this.docs = v;
  }
  get documents() {
    return this.docs;
  }

  ngOnInit() {
    this.panToRefresh();
  }

  trackByFunc = (i, doc) => doc.id;

  show(document: Document) {
    this.onShow.emit(document);
  }

  delete(document: Document) {
    const dialogRef = this.dialog.open(DeleteAlertDialog, {
      disableClose: true
    });
    dialogRef.afterClosed().subscribe(r => {
      if (r === 'Yes') this.onDelete.emit(document);
    });
  }

  private panToRefresh() {
    let startY: number;
    let refreshStarted;
    this.touchDiv.nativeElement.addEventListener(
      'touchstart',
      e => {
        startY = e.touches[0].pageY;
        refreshStarted = false;
      },
      { passive: true }
    );
    this.touchDiv.nativeElement.addEventListener(
      'touchmove',
      e => {
        const y = e.touches[0].pageY;
        const scrollTop =
          window.pageXOffset === undefined
            ? document.scrollingElement.scrollTop
            : window.pageYOffset;
        if (scrollTop === 0 && !refreshStarted && y > startY + PAN_ACTION_SCROLL_TRIGGER) {
          refreshStarted = true;
          this.store.dispatch(new DocumentEffectsReadBulkDocMeta({ isBelowRange: true }));
        }
        if (
          window.innerHeight + window.pageYOffset >= document.body.offsetHeight &&
          !refreshStarted &&
          startY - y > PAN_ACTION_DELTY
        ) {
          this.store.dispatch(new DocumentEffectsReadBulkDocMeta({ isBelowRange: true }));
          refreshStarted = true;
        }
      },
      { passive: true }
    );
  }
}
