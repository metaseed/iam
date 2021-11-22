import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CodeComponent } from './code.component';
import { PrettyPrinter } from './pretty-printer.service';
import { CopierService } from 'packages/copier.service';
import { MaterialModule } from 'material';
@NgModule({
  imports: [CommonModule, MaterialModule],
  declarations: [CodeComponent],
  entryComponents: [CodeComponent],
  exports: [CodeComponent],
  providers: [PrettyPrinter, CopierService]
})
export class CodeModule {}
