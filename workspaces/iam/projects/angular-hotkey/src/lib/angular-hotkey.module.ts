import { NgModule, ModuleWithProviders } from '@angular/core';
import { HotkeysDirective } from './hotkeys.directive';
import { CheatSheetComponent } from './cheatsheet.component';
import { CommonModule } from '@angular/common';
import { IHotkeyOptions, HotkeyOptions } from './hotkey.options';
import { HotkeysService } from './hotkeys.service';

@NgModule({
  imports: [CommonModule],
  exports: [HotkeysDirective, CheatSheetComponent],
  declarations: [HotkeysDirective, CheatSheetComponent]
})
export class HotkeyModule {
  static forRoot(options: IHotkeyOptions = {}): ModuleWithProviders<HotkeyModule> {
    return {
      ngModule: HotkeyModule,
      providers: [HotkeysService, { provide: HotkeyOptions, useValue: options }]
    };
  }
}
