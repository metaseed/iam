import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Document } from "../models/document";
import { DocListService } from "../services/doc-list.service";

@Component({
  selector: 'document-list',
  templateUrl: './document-list.component.html',
  styleUrls: ['./document-list.component.css']
})
export class DocListComponent implements OnInit {

  @Input() documents: Document[];

  @Output() onDone: EventEmitter<Document> = new EventEmitter<Document>();

  @Output() onUndone: EventEmitter<Document> = new EventEmitter<Document>();

  constructor(private todoListService: DocListService) { }

  ngOnInit() {
    // this.todoListService.getAll().subscribe(
    //   (documents: Document[]) => {
    //     documents.forEach(document => this.documents.push(document));
    //   },
    //   (error: string) => alert(error));
  }

  markDone(document: Document) {
    this.onDone.emit(document);
  }
  markUndone(document: Document) {
    this.onUndone.emit(document);
  }

}
