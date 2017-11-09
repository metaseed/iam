import { Component, Input } from '@angular/core';
import { Document } from "./models/document";
import { DocService } from "./services/doc.service";
import { DocsModel } from './models/docs.model';

@Component({
  selector: 'docs',
  templateUrl: './docs.component.html',
  styleUrls: ['./docs.component.css'],
})
export class DocsComponent {

  public model: DocsModel;

  constructor(private _docService: DocService) { }

  ngOnInit() {
    this._docService.getAll().subscribe(
      (docs: Document[]) => {
        this.model = new DocsModel(docs);
      },
      (error) => {
        console.log(error);
      });
  }

  addNewElement(element: string) {
    // let todo = { id: this.model.length + 1, text: element, done: false };
    // this._todoListService.store(todo)
    //   .subscribe(t => this.todoList.push(t), alert);
  }

  showDoc(doc: Document) {
    this._docService.showDoc(doc);
  }

  deleteDoc(doc: Document) {
    this._docService.deleteDoc(doc);
  }

}
