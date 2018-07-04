import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  ViewChild,
  ElementRef
} from '@angular/core';
import { Document, WindowRef } from 'core';
import { MatDialog } from '@angular/material';
import { DeleteAlertDialog } from '../doc-list/dialog.component';
import { Store } from '@ngrx/store';
import { State, DocumentEffectsReadBulkDocMeta } from '../state';
import { PAN_TO_REFRESH_MARGIN, PAN_TO_GET_MORE_MARGIN } from '../const';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'doc-list',
  templateUrl: './doc-list.component.html',
  styleUrls: ['./doc-list.component.scss']
})
export class DocListComponent implements OnInit {
  private docs;
  private destroy$ = new Subject();

  @ViewChild('touchDiv') touchDiv: ElementRef;
  @Output() onDelete = new EventEmitter<Document>();
  @Output() onShow = new EventEmitter<Document>();

  constructor(
    private dialog: MatDialog,
    private store: Store<State>,
    private windowRef: WindowRef
  ) {}

  @Input()
  set documents(v) {
    this.docs = v;
  }
  get documents() {
    return this.docs;
  }

  ngOnInit() {
    this.windowRef.scrollDown$.pipe(takeUntil(this.destroy$)).subscribe(
      e=>{
        const margin = this.windowRef.maxScrollTop - e.scrollTop;
        if(e.isDown && margin >=0 && margin < PAN_TO_GET_MORE_MARGIN){
          this.getMore();
        }
      }
    )
    this.panToRefresh();
  }

  ngOnDestroy() {
  this.destroy$.next();
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

  private refresh() {
    this.store.dispatch(new DocumentEffectsReadBulkDocMeta({ isBelowRange: true }));
  }

  private getMore() {
    this.store.dispatch(new DocumentEffectsReadBulkDocMeta({ isBelowRange: true }));
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
          this.windowRef.window.pageXOffset === undefined
            ? document.scrollingElement.scrollTop
            : this.windowRef.window.pageYOffset;
        if (scrollTop === 0 && !refreshStarted && y > startY + PAN_TO_REFRESH_MARGIN) {
          refreshStarted = true;
          this.refresh();
        }
        if (
          this.windowRef.window.innerHeight + this.windowRef.window.pageYOffset >= document.body.offsetHeight &&
          !refreshStarted &&
          startY - y > PAN_TO_GET_MORE_MARGIN
        ) {
          this.getMore();
          refreshStarted = true;
        }
      },
      { passive: true }
    );
  }
}
