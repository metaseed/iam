/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Directive, Input, ElementRef } from '@angular/core';
import { Hotkey } from './hotkey.model';
import { HotkeysService } from './hotkeys.service';
import 'mousetrap';
export class HotkeysDirective {
    /**
     * @param {?} _hotkeysService
     * @param {?} _elementRef
     */
    constructor(_hotkeysService, _elementRef) {
        this._hotkeysService = _hotkeysService;
        this._elementRef = _elementRef;
        this.hotkeysList = [];
        this.oldHotkeys = [];
        this.mousetrap = new Mousetrap(this._elementRef.nativeElement); // Bind hotkeys to the current element (and any children)
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        for (let /** @type {?} */ hotkey of this.hotkeys) {
            let /** @type {?} */ combo = Object.keys(hotkey)[0];
            let /** @type {?} */ hotkeyObj = new Hotkey(combo, hotkey[combo]);
            let /** @type {?} */ oldHotkey = /** @type {?} */ (this._hotkeysService.get(combo));
            if (oldHotkey !== null) {
                // We let the user overwrite callbacks temporarily if you specify it in HTML
                this.oldHotkeys.push(oldHotkey);
                this._hotkeysService.remove(oldHotkey);
            }
            this.hotkeysList.push(hotkeyObj);
            this.mousetrap.bind(hotkeyObj.combo, hotkeyObj.callback);
        }
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        for (let /** @type {?} */ hotkey of this.hotkeysList) {
            this.mousetrap.unbind(hotkey.combo);
        }
        this._hotkeysService.add(this.oldHotkeys);
    }
}
HotkeysDirective.decorators = [
    { type: Directive, args: [{
                selector: '[hotkeys]',
                providers: [HotkeysService]
            },] },
];
/** @nocollapse */
HotkeysDirective.ctorParameters = () => [
    { type: HotkeysService, },
    { type: ElementRef, },
];
HotkeysDirective.propDecorators = {
    "hotkeys": [{ type: Input },],
};
function HotkeysDirective_tsickle_Closure_declarations() {
    /** @type {!Array<{type: !Function, args: (undefined|!Array<?>)}>} */
    HotkeysDirective.decorators;
    /**
     * @nocollapse
     * @type {function(): !Array<(null|{type: ?, decorators: (undefined|!Array<{type: !Function, args: (undefined|!Array<?>)}>)})>}
     */
    HotkeysDirective.ctorParameters;
    /** @type {!Object<string,!Array<{type: !Function, args: (undefined|!Array<?>)}>>} */
    HotkeysDirective.propDecorators;
    /** @type {?} */
    HotkeysDirective.prototype.hotkeys;
    /** @type {?} */
    HotkeysDirective.prototype.mousetrap;
    /** @type {?} */
    HotkeysDirective.prototype.hotkeysList;
    /** @type {?} */
    HotkeysDirective.prototype.oldHotkeys;
    /** @type {?} */
    HotkeysDirective.prototype._hotkeysService;
    /** @type {?} */
    HotkeysDirective.prototype._elementRef;
}
//# sourceMappingURL=hotkeys.directive.js.map
