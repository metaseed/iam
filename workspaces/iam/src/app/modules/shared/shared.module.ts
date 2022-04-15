import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReadingPositionIndicatorComponent } from './reading-position-indicator/reading-position-indicator.component';
import { MaterialModule } from 'material';
import { BottomNavigationComponent } from './bottom-navigation/bottom-navigation.component';
import { RouterModule } from '@angular/router';
import { SplitPaneModule } from './split-pane/ng2-split-pane';
import { FormsModule } from '@angular/forms';
import { CoreModule, CACHE_FACADE_TOKEN } from 'core';
import { DocEffectsUtil } from './store/document.effects.util';
import { DatabaseModule } from 'database';
import { NetStorageModule } from 'net-storage';
import { CacheModule } from '../cache';
import { CacheFacade } from './cache-facade';
import { DocumentsEffects, DOCUMENT_EFFECTS_TOKEN } from './store';
import { BundleShareModule } from './bundle-share/bundle-share.module';
import { MessageDialog } from './message-dialog';
import { DialogSpinnerComponent, DialogSpinnerDialogComponent } from './dialog-spinner.component';
import { DirectiveModule } from './directives';

@NgModule({
  imports: [
    CoreModule,
    NetStorageModule,
    DatabaseModule,
    CommonModule,
    MaterialModule,
    RouterModule,
    SplitPaneModule,
    CacheModule,
    BundleShareModule,
  ],
  declarations: [
    ReadingPositionIndicatorComponent,
    BottomNavigationComponent,
    DialogSpinnerDialogComponent,
    DialogSpinnerComponent,
    MessageDialog
    ],
  exports: [
    ReadingPositionIndicatorComponent,
    BottomNavigationComponent,
    DialogSpinnerComponent,
    SplitPaneModule,
    MessageDialog,
    /* re-exporting */
    CommonModule,
    FormsModule,
    DirectiveModule,
    CoreModule,
    BundleShareModule,
  ],
  providers: [
    /*should have no provides in shared module*/
  ]
})
export class SharedModule {
  static forRoot(): ModuleWithProviders<SharedModule> {
    return {
      ngModule: SharedModule,
      providers: [
        DocEffectsUtil,
        { provide: CACHE_FACADE_TOKEN, useClass: CacheFacade },
        { provide: DOCUMENT_EFFECTS_TOKEN, useClass: DocumentsEffects },
      ]
    };
  }
}
