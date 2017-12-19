import { NgModule } from '@angular/core';
import { WindowRef } from './window-ref';
import { CommonModule } from '@angular/common';

import { HotkeyModule } from 'angular-hotkey-module';
import { CommandService } from './command.service';
import { UpdateService } from './update.service';
import { ConfigService } from './index';

@NgModule({
  imports: [
    CommonModule,
    HotkeyModule
  ],
  declarations: [],
  providers: [
    CommandService,
    WindowRef,
    ConfigService,
    UpdateService
  ]
})
export class CoreModule { }
