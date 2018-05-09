import * as tslib_1 from "tslib";
/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { HotkeyOptions } from './hotkey.options';
import { Subject } from 'rxjs';
import { Inject, Injectable } from '@angular/core';
import { Hotkey } from './hotkey.model';
import 'mousetrap';
var HotkeysService = /** @class */ (function () {
    /**
     * @param {?} options
     */
    function HotkeysService(options) {
        this.options = options;
        this.hotkeys = [];
        this.pausedHotkeys = [];
        this.cheatSheetToggle = new Subject();
        this._preventIn = ['INPUT', 'SELECT', 'TEXTAREA'];
        Mousetrap.prototype.stopCallback = function (event, element, combo, callback) {
            // if the element has the class "mousetrap" then no need to stop
            if ((' ' + element.className + ' ').indexOf(' mousetrap ') > -1) {
                return false;
            }
            return element.contentEditable && element.contentEditable === 'true';
        };
        this.mousetrap = new ((Mousetrap))();
        if (!this.options.disableCheatSheet) {
            this.add(new Hotkey(this.options.cheatSheetHotkey || '?', function (event) {
                this.cheatSheetToggle.next();
            }.bind(this), [], this.options.cheatSheetDescription || 'Show / hide this help menu'));
        }
        if (this.options.cheatSheetCloseEsc) {
            this.add(new Hotkey('esc', function (event) {
                this.cheatSheetToggle.next(false);
            }.bind(this), ['HOTKEYS-CHEATSHEET'], 'Hide this help menu'));
        }
    }
    /**
     * @param {?} hotkey
     * @param {?=} specificEvent
     * @return {?}
     */
    HotkeysService.prototype.add = function (hotkey, specificEvent) {
        var _this = this;
        if (Array.isArray(hotkey)) {
            var /** @type {?} */ temp = [];
            try {
                for (var hotkey_1 = tslib_1.__values(hotkey), hotkey_1_1 = hotkey_1.next(); !hotkey_1_1.done; hotkey_1_1 = hotkey_1.next()) {
                    var key = hotkey_1_1.value;
                    temp.push(/** @type {?} */ (this.add(key, specificEvent)));
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (hotkey_1_1 && !hotkey_1_1.done && (_a = hotkey_1.return)) _a.call(hotkey_1);
                }
                finally { if (e_1) throw e_1.error; }
            }
            return temp;
        }
        this.remove(hotkey);
        this.hotkeys.push(/** @type {?} */ (hotkey));
        this.mousetrap.bind(((hotkey)).combo, function (event, combo) {
            var /** @type {?} */ shouldExecute = true;
            // if the callback is executed directly `hotkey.get('w').callback()`
            // there will be no event, so just execute the callback.
            if (event) {
                var /** @type {?} */ target = ((event.target || event.srcElement)); // srcElement is IE only
                var /** @type {?} */ nodeName = target.nodeName.toUpperCase();
                // check if the input has a mousetrap class, and skip checking preventIn if so
                if ((' ' + target.className + ' ').indexOf(' mousetrap ') > -1) {
                    shouldExecute = true;
                }
                else if (_this._preventIn.indexOf(nodeName) > -1 &&
                    ((hotkey)).allowIn.map(function (allow) { return allow.toUpperCase(); }).indexOf(nodeName) === -1) {
                    // don't execute callback if the event was fired from inside an element listed in preventIn but not in allowIn
                    shouldExecute = false;
                }
            }
            if (shouldExecute) {
                return ((hotkey)).callback.apply(_this, [event, combo]);
            }
        }, specificEvent);
        return hotkey;
        var e_1, _a;
    };
    /**
     * @param {?=} hotkey
     * @return {?}
     */
    HotkeysService.prototype.remove = function (hotkey) {
        var /** @type {?} */ temp = [];
        if (!hotkey) {
            try {
                for (var _a = tslib_1.__values(this.hotkeys), _b = _a.next(); !_b.done; _b = _a.next()) {
                    var key = _b.value;
                    temp.push(/** @type {?} */ (this.remove(key)));
                }
            }
            catch (e_2_1) { e_2 = { error: e_2_1 }; }
            finally {
                try {
                    if (_b && !_b.done && (_c = _a.return)) _c.call(_a);
                }
                finally { if (e_2) throw e_2.error; }
            }
            return temp;
        }
        if (Array.isArray(hotkey)) {
            try {
                for (var hotkey_2 = tslib_1.__values(hotkey), hotkey_2_1 = hotkey_2.next(); !hotkey_2_1.done; hotkey_2_1 = hotkey_2.next()) {
                    var key = hotkey_2_1.value;
                    temp.push(/** @type {?} */ (this.remove(key)));
                }
            }
            catch (e_3_1) { e_3 = { error: e_3_1 }; }
            finally {
                try {
                    if (hotkey_2_1 && !hotkey_2_1.done && (_d = hotkey_2.return)) _d.call(hotkey_2);
                }
                finally { if (e_3) throw e_3.error; }
            }
            return temp;
        }
        var /** @type {?} */ index = this.findHotkey(/** @type {?} */ (hotkey));
        if (index > -1) {
            this.hotkeys.splice(index, 1);
            this.mousetrap.unbind(((hotkey)).combo);
            return hotkey;
        }
        return null;
        var e_2, _c, e_3, _d;
    };
    /**
     * @param {?=} combo
     * @return {?}
     */
    HotkeysService.prototype.get = function (combo) {
        if (!combo) {
            return this.hotkeys;
        }
        if (Array.isArray(combo)) {
            var /** @type {?} */ temp = [];
            try {
                for (var combo_1 = tslib_1.__values(combo), combo_1_1 = combo_1.next(); !combo_1_1.done; combo_1_1 = combo_1.next()) {
                    var key = combo_1_1.value;
                    temp.push(/** @type {?} */ (this.get(key)));
                }
            }
            catch (e_4_1) { e_4 = { error: e_4_1 }; }
            finally {
                try {
                    if (combo_1_1 && !combo_1_1.done && (_a = combo_1.return)) _a.call(combo_1);
                }
                finally { if (e_4) throw e_4.error; }
            }
            return temp;
        }
        for (var /** @type {?} */ i = 0; i < this.hotkeys.length; i++) {
            if (this.hotkeys[i].combo.indexOf(/** @type {?} */ (combo)) > -1) {
                return this.hotkeys[i];
            }
        }
        return null;
        var e_4, _a;
    };
    /**
     * @param {?=} hotkey
     * @return {?}
     */
    HotkeysService.prototype.pause = function (hotkey) {
        if (!hotkey) {
            return this.pause(this.hotkeys);
        }
        if (Array.isArray(hotkey)) {
            var /** @type {?} */ temp = [];
            try {
                for (var hotkey_3 = tslib_1.__values(hotkey), hotkey_3_1 = hotkey_3.next(); !hotkey_3_1.done; hotkey_3_1 = hotkey_3.next()) {
                    var key = hotkey_3_1.value;
                    temp.push(/** @type {?} */ (this.pause(key)));
                }
            }
            catch (e_5_1) { e_5 = { error: e_5_1 }; }
            finally {
                try {
                    if (hotkey_3_1 && !hotkey_3_1.done && (_a = hotkey_3.return)) _a.call(hotkey_3);
                }
                finally { if (e_5) throw e_5.error; }
            }
            return temp;
        }
        this.remove(hotkey);
        this.pausedHotkeys.push(/** @type {?} */ (hotkey));
        return hotkey;
        var e_5, _a;
    };
    /**
     * @param {?=} hotkey
     * @return {?}
     */
    HotkeysService.prototype.unpause = function (hotkey) {
        if (!hotkey) {
            return this.unpause(this.pausedHotkeys);
        }
        if (Array.isArray(hotkey)) {
            var /** @type {?} */ temp = [];
            try {
                for (var hotkey_4 = tslib_1.__values(hotkey), hotkey_4_1 = hotkey_4.next(); !hotkey_4_1.done; hotkey_4_1 = hotkey_4.next()) {
                    var key = hotkey_4_1.value;
                    temp.push(/** @type {?} */ (this.unpause(key)));
                }
            }
            catch (e_6_1) { e_6 = { error: e_6_1 }; }
            finally {
                try {
                    if (hotkey_4_1 && !hotkey_4_1.done && (_a = hotkey_4.return)) _a.call(hotkey_4);
                }
                finally { if (e_6) throw e_6.error; }
            }
            return temp;
        }
        var /** @type {?} */ index = this.pausedHotkeys.indexOf(/** @type {?} */ (hotkey));
        if (index > -1) {
            this.add(hotkey);
            return this.pausedHotkeys.splice(index, 1);
        }
        return null;
        var e_6, _a;
    };
    /**
     * @return {?}
     */
    HotkeysService.prototype.reset = function () {
        this.mousetrap.reset();
    };
    /**
     * @param {?} hotkey
     * @return {?}
     */
    HotkeysService.prototype.findHotkey = function (hotkey) {
        return this.hotkeys.indexOf(hotkey);
    };
    return HotkeysService;
}());
export { HotkeysService };
HotkeysService.decorators = [
    { type: Injectable },
];
/** @nocollapse */
HotkeysService.ctorParameters = function () { return [
    { type: undefined, decorators: [{ type: Inject, args: [HotkeyOptions,] },] },
]; };
function HotkeysService_tsickle_Closure_declarations() {
    /** @type {!Array<{type: !Function, args: (undefined|!Array<?>)}>} */
    HotkeysService.decorators;
    /**
     * @nocollapse
     * @type {function(): !Array<(null|{type: ?, decorators: (undefined|!Array<{type: !Function, args: (undefined|!Array<?>)}>)})>}
     */
    HotkeysService.ctorParameters;
    /** @type {?} */
    HotkeysService.prototype.hotkeys;
    /** @type {?} */
    HotkeysService.prototype.pausedHotkeys;
    /** @type {?} */
    HotkeysService.prototype.mousetrap;
    /** @type {?} */
    HotkeysService.prototype.cheatSheetToggle;
    /** @type {?} */
    HotkeysService.prototype._preventIn;
    /** @type {?} */
    HotkeysService.prototype.options;
}
//# sourceMappingURL=hotkeys.service.js.map
//# sourceMappingURL=M:/Workspace/i'm/workspaces/iam/libraries/@metaseed/angular-hotkey/esm2015/lib/hotkeys.service.js.map
//# sourceMappingURL=hotkeys.service.js.map
