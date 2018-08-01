import { NgModule } from '@angular/core';
import { WindowRef } from './dom/window-ref';
import { CommonModule } from '@angular/common';

import { HotkeyModule } from '@metaseed/angular-hotkey';
import { CommandService } from './services/command.service';
import { UpdateService } from './services/update.service';
import { Logger } from './services/logger.service';
import { CopierService } from 'packages/copier.service';
import { DialogService } from './services/dialog/dialog.service';
import { DocumentRef } from './dom/document-ref';
import { ScrollService } from './services/scroll/scroll.service';
import { ScrollSpyService } from './services/scroll/scroll-spy.service';
import { ConfigService } from './config/config.service';
import { Utilities } from './utils';
import { StoreCache, ActionStatusMoniter, CoreState, coreReducers } from './state';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { DocumentEffects } from './state/document/document.effects';
import { DocEffectsUtil } from './state/document/document.effects.util';
@NgModule({
  imports: [
    CommonModule,
    HotkeyModule,
    StoreModule.forFeature<CoreState>('core', coreReducers),
    EffectsModule.forFeature([DocumentEffects])
  ],
  declarations: [],
  providers: [
    DocEffectsUtil,
    ActionStatusMoniter,
    ConfigService,
    CommandService,
    WindowRef,
    DocumentRef,
    UpdateService,
    Logger,
    CopierService,
    DialogService,
    ScrollService,
    ScrollSpyService,
    StoreCache,
    Utilities
  ]
})
export class CoreModule {}
