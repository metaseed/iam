import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HotkeyModule } from '@metaseed/angular-hotkey';
import { CommandService } from './services/command.service';
import { UpdateService } from './services/update.service';
import { CopierService } from 'packages/copier.service';
import { DialogService } from './services/dialog/dialog.service';
import { ConfigService } from './config/config.service';
@NgModule({
  imports: [CommonModule, HotkeyModule],
  declarations: [],
  providers: [
    ConfigService,
    CommandService,
    UpdateService,
    CopierService,
    DialogService,
  ]
})
export class CoreModule {}
