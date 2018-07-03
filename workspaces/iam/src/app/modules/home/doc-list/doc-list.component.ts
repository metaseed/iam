import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Document } from 'core';
import { MatDialog } from '@angular/material';
import { DeleteAlertDialog } from '../doc-list/dialog.component';

@Component({
  selector: 'doc-list',
  templateUrl: './doc-list.component.html',
  styleUrls: ['./doc-list.component.scss']
})
export class DocListComponent implements OnInit {
  private docs;

  @Output() onDelete = new EventEmitter<Document>();
  @Output() onShow = new EventEmitter<Document>();

  constructor(private dialog: MatDialog) {}

  @Input()
  set documents(v) {
    this.docs = v;
  }
  get documents() {
    return this.docs;
  }

  ngOnInit() {}

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
}
