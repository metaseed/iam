import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HotkeyModule } from 'angular-hotkey-module';
import { CommandService } from './command.service';

@NgModule({
  imports: [
    CommonModule,
    HotkeyModule
  ],
  declarations: [],
  providers: [
    CommandService
  ]
})
export class CoreModule { }
