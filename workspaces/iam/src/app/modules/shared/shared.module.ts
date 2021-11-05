import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReadingPositionIndicatorComponent } from './reading-position-indicator/reading-position-indicator.component';
import { MaterialModule } from 'material';
import { BottomNavigationComponent } from './bottom-navigation/bottom-navigation.component';
import { RouterModule } from '@angular/router';
import { SplitPaneModule } from './split-pane/ng2-split-pane';
import { FormsModule } from '@angular/forms';
import { ScrollHideDirective } from './scroll-hide/scroll-hide.directive';
import { CoreModule, CACHE_FACADE_TOKEN } from 'core';
import { DocEffectsUtil } from './store/document.effects.util';
import { DatabaseModule } from 'database';
import { NetStorageModule } from 'net-storage';
import { CacheModule } from '../cache';
import { CacheFacade } from './cache-facade';
import { MatInputAutofocusDirective } from './directives/matinput-autofocus.directive';
import { DocumentsEffects, DocumentStateFacade, DOCUMENT_EFFECTS_TOKEN } from './store';

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
  ],
  declarations: [ReadingPositionIndicatorComponent, BottomNavigationComponent, ScrollHideDirective, MatInputAutofocusDirective],
  exports: [
    ScrollHideDirective,
    MatInputAutofocusDirective,
    ReadingPositionIndicatorComponent,
    BottomNavigationComponent,
    SplitPaneModule,
    /* re-exporting */
    CommonModule,
    FormsModule,
    CoreModule
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
        {provide: DOCUMENT_EFFECTS_TOKEN, useClass: DocumentsEffects},
        DocumentStateFacade
      ]
    };
  }
}
