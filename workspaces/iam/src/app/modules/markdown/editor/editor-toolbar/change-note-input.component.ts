import { Component } from '@angular/core';
import { MatBottomSheetRef } from '@angular/material/bottom-sheet';


@Component({
  selector: 'change-note-input',
  styles:[
    `.input-form{
      width: 100%;
      max-width: 80rem;
      display: flex;
      align-items: center;
      flex-direction: column;
    }
    .input-field{
      width: 100%;
    }
    `
  ],
  template: `
<div class="input-form">
  <mat-form-field class="input-field" appearance="fill">
    <mat-label>document change note</mat-label>
    <input matInput placeholder="showed document history" [(ngModel)]="changeNote" (keyup.Enter)="onOk($event)">
  </mat-form-field>
  <button mat-flat-button color="primary" (click)="onOk($event)">OK</button>
</div>
  `
})
export class ChangeNoteInputComponent {
  public changeNote = ''

  constructor(private _bottomSheetRef: MatBottomSheetRef<ChangeNoteInputComponent>) { }

  onOk(event): void {
    this._bottomSheetRef.dismiss();
    event.preventDefault();
  }
}
