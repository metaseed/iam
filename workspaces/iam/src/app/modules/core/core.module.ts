import { NgModule } from '@angular/core';
import { WindowRef } from './dom/window-ref';
import { CommonModule } from '@angular/common';

import { HotkeyModule } from '@metaseed/angular-hotkey';
import { CommandService } from './services/command.service';
import { UpdateService } from './services/update.service';
import { CopierService } from 'packages/copier.service';
import { DialogService } from './services/dialog/dialog.service';
import { DocumentRef } from './dom/document-ref';
import { ScrollService } from './services/scroll/scroll.service';
import { ScrollSpyService } from './services/scroll/scroll-spy.service';
import { ConfigService } from './config/config.service';
import { Utilities } from './utils';
@NgModule({
  imports: [CommonModule, HotkeyModule],
  declarations: [],
  providers: [
    ConfigService,
    CommandService,
    WindowRef,
    DocumentRef,
    UpdateService,
    CopierService,
    DialogService,
    ScrollService,
    ScrollSpyService,
    Utilities
  ]
})
export class CoreModule {}
