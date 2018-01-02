import { Component, Input } from '@angular/core';
import { Document } from "./models/document";
import { DocService } from "./services/doc.service";
import { DocsModel } from './models/docs.model';
import { Router } from '@angular/router';
import { NavigationExtras } from '@angular/router/src/router';
import { NgSpinKitModule } from 'ng-spin-kit'

@Component({
  selector: 'docs',
  templateUrl: './docs.component.html',
  styleUrls: ['./docs.component.css'],
})
export class DocsComponent {
  constructor(public docService: DocService, private router: Router) { }

  ngOnInit() {
    this.docService.getAll();
  }

  addNewElement(element: string) {
    this.docService.newDoc();
    // let todo = { id: this.model.length + 1, text: element, done: false };
    // this._todoListService.store(todo)
    //   .subscribe(t => this.todoList.push(t), alert);
  }

  showDoc(doc: Document) {
    let navigationExtras: NavigationExtras = {
      queryParams: {
        id: doc.number,
        title: doc.metaData.title
      }
    }
    this.router.navigate(['/doc'], navigationExtras);
    // this._docService.showDoc(doc);
  }

  deleteDoc(doc: Document) {
    doc.state = 'closed';
    this.docService.deleteDoc(doc);
  }

}
