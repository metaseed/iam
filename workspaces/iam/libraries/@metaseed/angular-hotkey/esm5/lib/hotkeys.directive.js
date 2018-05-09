import * as tslib_1 from "tslib";
/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Directive, Input, ElementRef } from '@angular/core';
import { Hotkey } from './hotkey.model';
import { HotkeysService } from './hotkeys.service';
import 'mousetrap';
var HotkeysDirective = /** @class */ (function () {
    /**
     * @param {?} _hotkeysService
     * @param {?} _elementRef
     */
    function HotkeysDirective(_hotkeysService, _elementRef) {
        this._hotkeysService = _hotkeysService;
        this._elementRef = _elementRef;
        this.hotkeysList = [];
        this.oldHotkeys = [];
        this.mousetrap = new Mousetrap(this._elementRef.nativeElement); // Bind hotkeys to the current element (and any children)
    }
    /**
     * @return {?}
     */
    HotkeysDirective.prototype.ngOnInit = function () {
        try {
            for (var _a = tslib_1.__values(this.hotkeys), _b = _a.next(); !_b.done; _b = _a.next()) {
                var hotkey = _b.value;
                var /** @type {?} */ combo = Object.keys(hotkey)[0];
                var /** @type {?} */ hotkeyObj = new Hotkey(combo, hotkey[combo]);
                var /** @type {?} */ oldHotkey = (this._hotkeysService.get(combo));
                if (oldHotkey !== null) {
                    // We let the user overwrite callbacks temporarily if you specify it in HTML
                    this.oldHotkeys.push(oldHotkey);
                    this._hotkeysService.remove(oldHotkey);
                }
                this.hotkeysList.push(hotkeyObj);
                this.mousetrap.bind(hotkeyObj.combo, hotkeyObj.callback);
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_b && !_b.done && (_c = _a.return)) _c.call(_a);
            }
            finally { if (e_1) throw e_1.error; }
        }
        var e_1, _c;
    };
    /**
     * @return {?}
     */
    HotkeysDirective.prototype.ngOnDestroy = function () {
        try {
            for (var _a = tslib_1.__values(this.hotkeysList), _b = _a.next(); !_b.done; _b = _a.next()) {
                var hotkey = _b.value;
                this.mousetrap.unbind(hotkey.combo);
            }
        }
        catch (e_2_1) { e_2 = { error: e_2_1 }; }
        finally {
            try {
                if (_b && !_b.done && (_c = _a.return)) _c.call(_a);
            }
            finally { if (e_2) throw e_2.error; }
        }
        this._hotkeysService.add(this.oldHotkeys);
        var e_2, _c;
    };
    return HotkeysDirective;
}());
export { HotkeysDirective };
HotkeysDirective.decorators = [
    { type: Directive, args: [{
                selector: '[hotkeys]',
                providers: [HotkeysService]
            },] },
];
/** @nocollapse */
HotkeysDirective.ctorParameters = function () { return [
    { type: HotkeysService, },
    { type: ElementRef, },
]; };
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
//# sourceMappingURL=M:/Workspace/i'm/workspaces/iam/libraries/@metaseed/angular-hotkey/esm2015/lib/hotkeys.directive.js.map
//# sourceMappingURL=hotkeys.directive.js.map
