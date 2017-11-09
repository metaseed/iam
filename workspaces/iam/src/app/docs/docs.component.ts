import { Component, Input } from '@angular/core';
import { Document } from "./models/document";
import { DocService } from "./services/doc.service";

@Component({
  selector: 'docs',
  templateUrl: './docs.component.html',
  styleUrls: ['./docs.component.css'],
})
export class DocsComponent {

  public docList;

  constructor(private _todoListService: DocService) { }

  ngOnInit() {

  }

  addNewElement(element: string) {
    let todo = { id: this.docList.length + 1, text: element, done: false };
    // this._todoListService.store(todo)
    //   .subscribe(t => this.todoList.push(t), alert);
  }

  markDone(todo: Document) {
    // todo.done = true;
    this.mark(todo);
  }

  markUndone(todo: Document) {
    //todo.done = false;
    this.mark(todo);
  }

  private mark(todo: Document) {
    // this._todoListService.update(todo)
    //   .subscribe(console.log, alert);
  }

}
