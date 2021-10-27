import { Component, Input, Output, EventEmitter, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { Document, MSG_DISPLAY_TIMEOUT } from 'core';
import { Store } from '@ngrx/store';
import { MatSnackBar } from '@angular/material/snack-bar';
import { map } from 'rxjs/operators';
import { DocumentsEffects, DOCUMENT_EFFECTS_TOKEN } from 'app/modules/shared/store';
import { OperationStep } from 'packages/rx-store/src/effect';

@Component({
  selector: 'doc-item',
  templateUrl: './doc-item.component.html',
  styleUrls: ['./doc-item.component.scss']
})
export class DocItemComponent {
  showDelete = false;
  @Input()
  doc: Document;

  @Output()
  delete = new EventEmitter<Document>();

  @Output()
  show = new EventEmitter<Document>();

  constructor(private router: Router, private store: Store<any>, private snackBar: MatSnackBar,
    @Inject(DOCUMENT_EFFECTS_TOKEN) private documentEffects: DocumentsEffects,
    ) { }

  isDeleteDone$ = this.documentEffects.deleteDocument_.operationStatus$.pipe(
    map(status=> {
      if (status.trigger.id === this.doc.id) {
        if (status.step === OperationStep.Fail) {
          this.snackBar.open(`delete: ${this.doc.metaData.title} failed!`);
          return true;
        }

        if(status.step === OperationStep.Timeout) {
          const info = `delete document (id:${this.doc.id})  timeout`;
          console.warn(info);
          this.snackBar.open(info, 'ok', { duration: MSG_DISPLAY_TIMEOUT });
        }
        return status.step === OperationStep.Success|| status.step === OperationStep.Timeout;
      }
      return false;
    })
  );

}
