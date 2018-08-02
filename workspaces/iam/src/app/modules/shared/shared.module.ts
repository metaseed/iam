import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule as cm, CommonModule } from '@angular/common';
import { ReadingPositionIndicatorComponent } from './reading-position-indicator/reading-position-indicator.component';
import { MaterialModule } from 'material';
import { BottomNavigationComponent } from './bottom-navigation/bottom-navigation.component';
import { RouterModule } from '@angular/router';
import { SplitPaneModule } from './split-pane/ng2-split-pane';
import { FormsModule } from '@angular/forms';
import { ScrollHideDirective } from './scroll-hide/scroll-hide.directive';
import { CoreModule } from 'core';
import { StoreModule } from '@ngrx/store';
import { SharedState, coreReducers, StoreCache, ActionStatusMoniter } from './state';
import { EffectsModule } from '@ngrx/effects';
import { DocumentEffects } from './state/document/document.effects';
import { DocEffectsUtil } from './state/document/document.effects.util';
import { DatabaseModule } from 'database';
import { StorageModule } from '../net-storage/storage.module';

@NgModule({
  imports: [
    StorageModule,
    DatabaseModule,
    cm,
    MaterialModule,
    RouterModule,
    SplitPaneModule,
    StoreModule.forFeature<SharedState>('shared', coreReducers),
    EffectsModule.forFeature([DocumentEffects])
  ],
  declarations: [ReadingPositionIndicatorComponent, BottomNavigationComponent, ScrollHideDirective],
  exports: [
    ScrollHideDirective,
    ReadingPositionIndicatorComponent,
    BottomNavigationComponent,
    SplitPaneModule,
    /* re-exporting */
    CommonModule,
    CoreModule,
    FormsModule
  ],
  providers: [
    /*should have no provides in shared module*/
  ]
})
export class SharedModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedModule,
      providers: [DocEffectsUtil, ActionStatusMoniter, StoreCache]
    };
  }
}
