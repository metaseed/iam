import { NgModule } from "@angular/core";
import { WindowRef } from "./window-ref";
import { CommonModule } from "@angular/common";

import { HotkeyModule } from "angular-hotkey-module";
import { CommandService } from "./command.service";
import { UpdateService } from "./update.service";
import { ConfigService, DocumentRef } from "./index";
import { Logger } from "./logger.service";
import { CopierService } from "app/modules/core/copier.service";
import { DialogService } from "./services/dialog/dialog.service";

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
    DialogService
  ]
})
export class CoreModule {}
