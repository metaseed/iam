import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { MatModules } from 'material';
import { DocumentHistoryListComponent } from './document-history-list.component';

import { VersionComponent } from './version.component';

@NgModule({
  imports: [CommonModule, MatModules],
  exports: [VersionComponent],
  entryComponents: [VersionComponent],
  declarations: [VersionComponent, DocumentHistoryListComponent],
  providers: [],
})
export class VersionModule {
  customElementComponent = VersionComponent;
}
