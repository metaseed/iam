import { NgModule } from '@angular/core';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list'
import { DocumentHistoryListComponent } from './document-history-list.component';

import { VersionComponent } from './version.component';

@NgModule({
  imports: [MatButtonModule, MatIconModule, MatBottomSheetModule, MatListModule],
  exports: [VersionComponent],
  entryComponents: [VersionComponent],
  declarations: [VersionComponent, DocumentHistoryListComponent],
  providers: [],
})
export class VersionModule {
  customElementComponent = VersionComponent;

}
