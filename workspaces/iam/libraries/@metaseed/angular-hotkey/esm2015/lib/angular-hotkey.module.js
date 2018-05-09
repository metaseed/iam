/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { NgModule } from '@angular/core';
import { HotkeysDirective } from './hotkeys.directive';
import { CheatSheetComponent } from './cheatsheet.component';
import { CommonModule } from '@angular/common';
import { HotkeyOptions } from './hotkey.options';
import { HotkeysService } from './hotkeys.service';
export class HotkeyModule {
    /**
     * @param {?=} options
     * @return {?}
     */
    static forRoot(options = {}) {
        return {
            ngModule: HotkeyModule,
            providers: [HotkeysService, { provide: HotkeyOptions, useValue: options }]
        };
    }
}
HotkeyModule.decorators = [
    { type: NgModule, args: [{
                imports: [CommonModule],
                exports: [HotkeysDirective, CheatSheetComponent],
                declarations: [HotkeysDirective, CheatSheetComponent]
            },] },
];
function HotkeyModule_tsickle_Closure_declarations() {
    /** @type {!Array<{type: !Function, args: (undefined|!Array<?>)}>} */
    HotkeyModule.decorators;
    /**
     * @nocollapse
     * @type {function(): !Array<(null|{type: ?, decorators: (undefined|!Array<{type: !Function, args: (undefined|!Array<?>)}>)})>}
     */
    HotkeyModule.ctorParameters;
}
//# sourceMappingURL=angular-hotkey.module.js.map
