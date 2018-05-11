import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CodeComponent } from './code.component';
import { MatSnackBarModule } from '@angular/material';
import { PrettyPrinter } from './pretty-printer.service';
import { CopierService } from 'packages/copier.service';
@NgModule({
  imports: [CommonModule, MatSnackBarModule],
  declarations: [CodeComponent],
  entryComponents: [CodeComponent],
  exports: [CodeComponent],
  providers: [PrettyPrinter, CopierService]
})
export class CodeModule {}
