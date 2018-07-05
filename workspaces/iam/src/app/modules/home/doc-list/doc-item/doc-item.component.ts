import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { Document } from 'core';
import { Store } from '@ngrx/store';
import { DocumentEffectsDelete } from '../../state';

@Component({
  selector: 'doc-item',
  templateUrl: './doc-item.component.html',
  styleUrls: ['./doc-item.component.scss']
})
export class DocItemComponent implements OnInit {
  showDelete: boolean;
  @Input() doc: Document;
  @Input() isDeleteDone:boolean;

  @Output() delete = new EventEmitter<Document>();
  @Output() show = new EventEmitter<Document>();

  onDelete = doc => this.delete.next(doc);

  onShow = doc => this.show.next(doc);

  constructor(private router: Router, private store: Store<any>) {}

  ngOnInit() {}
}
