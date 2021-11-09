import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { ISearchItem } from 'core';
import { SubPageComponent } from './subpage.component';

@Component({
  selector: 'subpage-id-search',
  templateUrl: './subpage-id-search.component.html'
})

export class SubPageIdSearchComponent {
  constructor(private dialog: MatDialogRef<SubPageComponent,ISearchItem>) { }

  onClick(e) {
    this.dialog.close(e);
  }
}
