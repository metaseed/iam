import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'new-doc',
  templateUrl: './new-doc.component.html',
  styleUrls: ['./new-doc.component.css']
})
export class NewDocComponent implements OnInit {

  @Output() onNewElement: EventEmitter<string> = new EventEmitter<string>();

  element: string;

  constructor() { }

  ngOnInit() {
    this.element = '';
  }

  addDoc() {
    this.onNewElement.emit(this.element);
    this.element = '';
  }

}
