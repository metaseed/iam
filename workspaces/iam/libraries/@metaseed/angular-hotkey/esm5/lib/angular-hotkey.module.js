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
var HotkeyModule = /** @class */ (function () {
    function HotkeyModule() {
    }
    /**
     * @param {?=} options
     * @return {?}
     */
    HotkeyModule.forRoot = function (options) {
        if (options === void 0) { options = {}; }
        return {
            ngModule: HotkeyModule,
            providers: [HotkeysService, { provide: HotkeyOptions, useValue: options }]
        };
    };
    return HotkeyModule;
}());
export { HotkeyModule };
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
//# sourceMappingURL=M:/Workspace/i'm/workspaces/iam/libraries/@metaseed/angular-hotkey/esm2015/lib/angular-hotkey.module.js.map
//# sourceMappingURL=angular-hotkey.module.js.map
