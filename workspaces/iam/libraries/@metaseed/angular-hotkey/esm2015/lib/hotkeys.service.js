/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { HotkeyOptions } from './hotkey.options';
import { Subject } from 'rxjs';
import { Inject, Injectable } from '@angular/core';
import { Hotkey } from './hotkey.model';
import 'mousetrap';
export class HotkeysService {
    /**
     * @param {?} options
     */
    constructor(options) {
        this.options = options;
        this.hotkeys = [];
        this.pausedHotkeys = [];
        this.cheatSheetToggle = new Subject();
        this._preventIn = ['INPUT', 'SELECT', 'TEXTAREA'];
        Mousetrap.prototype.stopCallback = (event, element, combo, callback) => {
            // if the element has the class "mousetrap" then no need to stop
            if ((' ' + element.className + ' ').indexOf(' mousetrap ') > -1) {
                return false;
            }
            return element.contentEditable && element.contentEditable === 'true';
        };
        this.mousetrap = new (/** @type {?} */ (Mousetrap))();
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
    add(hotkey, specificEvent) {
        if (Array.isArray(hotkey)) {
            let /** @type {?} */ temp = [];
            for (let /** @type {?} */ key of hotkey) {
                temp.push(/** @type {?} */ (this.add(key, specificEvent)));
            }
            return temp;
        }
        this.remove(hotkey);
        this.hotkeys.push(/** @type {?} */ (hotkey));
        this.mousetrap.bind((/** @type {?} */ (hotkey)).combo, (event, combo) => {
            let /** @type {?} */ shouldExecute = true;
            // if the callback is executed directly `hotkey.get('w').callback()`
            // there will be no event, so just execute the callback.
            if (event) {
                let /** @type {?} */ target = /** @type {?} */ ((event.target || event.srcElement)); // srcElement is IE only
                let /** @type {?} */ nodeName = target.nodeName.toUpperCase();
                // check if the input has a mousetrap class, and skip checking preventIn if so
                if ((' ' + target.className + ' ').indexOf(' mousetrap ') > -1) {
                    shouldExecute = true;
                }
                else if (this._preventIn.indexOf(nodeName) > -1 &&
                    (/** @type {?} */ (hotkey)).allowIn.map(allow => allow.toUpperCase()).indexOf(nodeName) === -1) {
                    // don't execute callback if the event was fired from inside an element listed in preventIn but not in allowIn
                    shouldExecute = false;
                }
            }
            if (shouldExecute) {
                return (/** @type {?} */ (hotkey)).callback.apply(this, [event, combo]);
            }
        }, specificEvent);
        return hotkey;
    }
    /**
     * @param {?=} hotkey
     * @return {?}
     */
    remove(hotkey) {
        let /** @type {?} */ temp = [];
        if (!hotkey) {
            for (let /** @type {?} */ key of this.hotkeys) {
                temp.push(/** @type {?} */ (this.remove(key)));
            }
            return temp;
        }
        if (Array.isArray(hotkey)) {
            for (let /** @type {?} */ key of hotkey) {
                temp.push(/** @type {?} */ (this.remove(key)));
            }
            return temp;
        }
        let /** @type {?} */ index = this.findHotkey(/** @type {?} */ (hotkey));
        if (index > -1) {
            this.hotkeys.splice(index, 1);
            this.mousetrap.unbind((/** @type {?} */ (hotkey)).combo);
            return hotkey;
        }
        return null;
    }
    /**
     * @param {?=} combo
     * @return {?}
     */
    get(combo) {
        if (!combo) {
            return this.hotkeys;
        }
        if (Array.isArray(combo)) {
            let /** @type {?} */ temp = [];
            for (let /** @type {?} */ key of combo) {
                temp.push(/** @type {?} */ (this.get(key)));
            }
            return temp;
        }
        for (let /** @type {?} */ i = 0; i < this.hotkeys.length; i++) {
            if (this.hotkeys[i].combo.indexOf(/** @type {?} */ (combo)) > -1) {
                return this.hotkeys[i];
            }
        }
        return null;
    }
    /**
     * @param {?=} hotkey
     * @return {?}
     */
    pause(hotkey) {
        if (!hotkey) {
            return this.pause(this.hotkeys);
        }
        if (Array.isArray(hotkey)) {
            let /** @type {?} */ temp = [];
            for (let /** @type {?} */ key of hotkey) {
                temp.push(/** @type {?} */ (this.pause(key)));
            }
            return temp;
        }
        this.remove(hotkey);
        this.pausedHotkeys.push(/** @type {?} */ (hotkey));
        return hotkey;
    }
    /**
     * @param {?=} hotkey
     * @return {?}
     */
    unpause(hotkey) {
        if (!hotkey) {
            return this.unpause(this.pausedHotkeys);
        }
        if (Array.isArray(hotkey)) {
            let /** @type {?} */ temp = [];
            for (let /** @type {?} */ key of hotkey) {
                temp.push(/** @type {?} */ (this.unpause(key)));
            }
            return temp;
        }
        let /** @type {?} */ index = this.pausedHotkeys.indexOf(/** @type {?} */ (hotkey));
        if (index > -1) {
            this.add(hotkey);
            return this.pausedHotkeys.splice(index, 1);
        }
        return null;
    }
    /**
     * @return {?}
     */
    reset() {
        this.mousetrap.reset();
    }
    /**
     * @param {?} hotkey
     * @return {?}
     */
    findHotkey(hotkey) {
        return this.hotkeys.indexOf(hotkey);
    }
}
HotkeysService.decorators = [
    { type: Injectable },
];
/** @nocollapse */
HotkeysService.ctorParameters = () => [
    { type: undefined, decorators: [{ type: Inject, args: [HotkeyOptions,] },] },
];
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
