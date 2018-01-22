import { Component, OnInit } from '@angular/core';
import { DocumentRef } from 'core';
import { Store } from '@ngrx/store';
import * as fromDocument from '../../reducers/document';
import * as document from '../../actions/document';
import {
  trigger,
  state,
  style,
  animate,
  transition
} from '@angular/animations';

@Component({
  selector: 'ms-reader-toolbar',
  templateUrl: './reader-toolbar.component.html',
  styleUrls: ['./reader-toolbar.component.scss'],
  animations: [
    trigger('show', [
      state('true', style({ height: '*' })),
      transition('* => void', [
        style({ height: '*' }),
        animate(250, style({ height: 0 }))
      ])
    ])
  ]

})
export class ReaderToolbarComponent implements OnInit {

  constructor(public docRef: DocumentRef, private store: Store<fromDocument.State>) { }

  isScrollDown = false;
  ngOnInit() {
    this.docRef.isScrollDown$.subscribe((e) => { this.isScrollDown = e; /*console.log(e)*/ });
  }

  toEditMode(event) {
    this.store.dispatch(new document.EditMode());
  }
}
