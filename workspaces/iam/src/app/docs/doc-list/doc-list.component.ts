import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Document } from "../models/document";
import { DocService } from "../services/doc.service";

@Component({
  selector: 'doc-list',
  templateUrl: './doc-list.component.html',
  styleUrls: ['./doc-list.component.css']
})
export class DocListComponent implements OnInit {
  private docs;
  constructor() { }

  @Input() set documents(v) {
    this.docs = v;
  }
  get documents() {
    return this.docs;
  }
  @Output() onDelete = new EventEmitter<Document>();
  @Output() onShow = new EventEmitter<Document>();
  ngOnInit() {

  }

  show(document: Document) {
    this.onShow.emit(document);
  }

  delete(document: Document) {
    this.onDelete.emit(document);
  }

}
