import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Document } from "../models/document";
import { DocService } from "../services/doc.service";
import { MdcDialog } from '@angular-mdc/web';
import { DeleteAlertDialog } from 'app/modules/docs/doc-list/dialog.component';

@Component({
  selector: 'doc-list',
  templateUrl: './doc-list.component.html',
  styleUrls: ['./doc-list.component.scss']
})
export class DocListComponent implements OnInit {
  private docs;

  @Output() onDelete = new EventEmitter<Document>();
  @Output() onShow = new EventEmitter<Document>();

  constructor(private dialog: MdcDialog) { }

  @Input() set documents(v) {
    this.docs = v;
  }
  get documents() {
    return this.docs;
  }

  ngOnInit() {

  }

  show(document: Document) {
    this.onShow.emit(document);
  }

  delete(document: Document) {
    const dialogRef = this.dialog.open(DeleteAlertDialog, { escapeToClose: true, clickOutsideToClose: true })
    dialogRef.componentInstance.myDialog._accept.subscribe(() => {

      this.onDelete.emit(document);
    })
  }

}
