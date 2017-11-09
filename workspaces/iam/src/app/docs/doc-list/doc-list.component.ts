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
  @Input() set documents(v) {
    this.docs = v;
  }
  get documents() {
    return this.docs;
  }

  @Output() onDone: EventEmitter<Document> = new EventEmitter<Document>();

  @Output() onUndone: EventEmitter<Document> = new EventEmitter<Document>();

  constructor(private _docService: DocService) { }

  ngOnInit() {
    this._docService.getAll().subscribe(
      (docs: Document[]) => {
        this.docs = docs;
        console.log(docs);
      },
      (error) => console.log(error));
    // this.todoListService.getAll().subscribe(
    //   (documents: Document[]) => {
    //     documents.forEach(document => this.documents.push(document));
    //   },
    //   (error: string) => alert(error));
  }

  markDone(document: Document) {
    this.onDone.emit(document);
    this._docService.docShow$.next(document);
  }
  markUndone(document: Document) {
    this.onUndone.emit(document);
  }

}
