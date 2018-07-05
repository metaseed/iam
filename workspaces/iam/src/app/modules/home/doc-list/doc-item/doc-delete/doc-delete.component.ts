import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'doc-delete',
  templateUrl: './doc-delete.component.html',
  styleUrls: ['./doc-delete.component.scss']
})
export class DocDeleteComponent implements OnInit {
  showWaiting = false;
  @Output() cancel = new EventEmitter();
  @Output() delete = new EventEmitter();

  @Input() isDone = false;

  constructor() {}

  ngOnInit() {}

  onDelete = () => {
    this.showWaiting = true;
    this.delete.emit();
  };
  onCancel = () => this.cancel.emit();
}
