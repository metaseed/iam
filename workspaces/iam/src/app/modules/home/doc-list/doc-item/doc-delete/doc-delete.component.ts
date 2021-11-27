import { Component, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'doc-delete',
  templateUrl: './doc-delete.component.html',
  styleUrls: ['./doc-delete.component.scss']
})
export class DocDeleteComponent {
  showWaiting = false;
  @Output() cancel = new EventEmitter();
  @Output() delete = new EventEmitter();

  @Input() isDone = false;

  onDelete = () => {
    this.showWaiting = true;
    this.delete.emit();
  };
}
