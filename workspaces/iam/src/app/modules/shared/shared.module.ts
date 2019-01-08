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
import { StoreModule } from '@ngrx/store';
import { SharedState, reducers, moduleStateName } from './state';
import { EffectsModule } from '@ngrx/effects';
import { DocEffectsUtil } from './state/document/effects.util';
import { DatabaseModule } from 'database';
import { NetStorageModule } from '../net-storage/storage.module';
import { effects } from './state/effects';
import { CacheModule } from '../cache';
import { CacheFacade } from './cache-facade';

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
    StoreModule.forFeature<SharedState>(moduleStateName, reducers),
    EffectsModule.forFeature(effects)
  ],
  declarations: [ReadingPositionIndicatorComponent, BottomNavigationComponent, ScrollHideDirective],
  exports: [
    ScrollHideDirective,
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
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedModule,
      providers: [DocEffectsUtil, { provide: CACHE_FACADE_TOKEN, useClass: CacheFacade }]
    };
  }
}
