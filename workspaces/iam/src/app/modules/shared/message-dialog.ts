import { Component, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";

@Component({
  template: `
  <div style="z-index:1800; height:100%">
    <h1 mat-dialog-title *ngIf="this.data.title">{{this.data.title}}</h1>
    <div mat-dialog-content style="white-space: pre-wrap">
        {{this.data.message}}
    </div>
    <div mat-dialog-actions style="display: flex; justify-content:flex-end">
      <button mat-button [mat-dialog-close]="this.data.additionalAction" *ngIf="this.data.additionalAction">{{this.data.additionalAction}}</button>
      <button mat-button [mat-dialog-close]="this.data.defaultAction" cdkFocusInitial>{{this.data.defaultAction}}</button>
    </div>
</div>
  `
})
export class MessageDialog {
  constructor(public dialogRef: MatDialogRef<MessageDialog>,  @Inject(MAT_DIALOG_DATA) public data: DialogData) {}
}
export interface DialogData {
  title?: string;
  message: string;
  defaultAction: string;
  additionalAction?: string;
}
