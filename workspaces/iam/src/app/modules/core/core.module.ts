import { NgModule } from "@angular/core";
import { WindowRef } from "./window-ref";
import { CommonModule } from "@angular/common";

import { HotkeyModule } from "@metaseed/angular-hotkey";
import { CommandService } from "./services/command.service";
import { UpdateService } from "./services/update.service";
import { ConfigService } from "./services/config.service";
import { Logger } from "./services/logger.service";
import { CopierService } from "./services/copier.service";
import { DialogService } from "./services/dialog/dialog.service";
import { DocumentRef } from "./document-ref";
import { ScrollService } from "./services/scroll/scroll.service";
import { ScrollSpyService } from "./services/scroll/scroll-spy.service";
@NgModule({
  imports: [CommonModule, HotkeyModule],
  declarations: [],
  providers: [
    ConfigService,
    CommandService,
    WindowRef,
    DocumentRef,
    UpdateService,
    Logger,
    CopierService,
    DialogService,
    ScrollService,
    ScrollSpyService
  ]
})
export class CoreModule {}
