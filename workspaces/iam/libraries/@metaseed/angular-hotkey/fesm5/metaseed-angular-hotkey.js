import { InjectionToken, Inject, Injectable, Component, Input, Directive, ElementRef, NgModule } from '@angular/core';
import { __values } from 'tslib';
import { Subject } from 'rxjs';
import 'mousetrap';
import { CommonModule } from '@angular/common';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var /** @type {?} */ HotkeyOptions = new InjectionToken('HotkeyOptions');

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var Hotkey = /** @class */ (function () {
    /**
     * Creates a new Hotkey for Mousetrap binding
     *
     * @param {?} combo       mousetrap key binding
     * @param {?} callback    method to call when key is pressed
     * @param {?=} allowIn     an array of tag names to allow this combo in ('INPUT', 'SELECT', and/or 'TEXTAREA')
     * @param {?=} description description for the help menu
     * @param {?=} action      the type of event to listen for (for mousetrap)
     * @param {?=} persistent  if true, the binding is preserved upon route changes
     */
    function Hotkey(combo, callback, allowIn, description, action, persistent) {
        this.combo = combo;
        this.callback = callback;
        this.allowIn = allowIn;
        this.description = description;
        this.action = action;
        this.persistent = persistent;
        this.combo = Array.isArray(combo) ? combo : [/** @type {?} */ (combo)];
        this.allowIn = allowIn || [];
        this.description = description || "";
    }
    /**
     * @param {?} combo
     * @return {?}
     */
    Hotkey.symbolize = function (combo) {
        var /** @type {?} */ map = {
            command: "\u2318",
            // ⌘
            shift: "\u21E7",
            // ⇧
            left: "\u2190",
            // ←
            right: "\u2192",
            // →
            up: "\u2191",
            // ↑
            down: "\u2193",
            // ↓
            return: "\u23CE",
            // ⏎
            backspace: "\u232B" // ⌫
        };
        var /** @type {?} */ comboSplit = combo.split("+");
        for (var /** @type {?} */ i = 0; i < comboSplit.length; i++) {
            // try to resolve command / ctrl based on OS:
            if (comboSplit[i] === "mod") {
                if (window.navigator && window.navigator.platform.indexOf("Mac") >= 0) {
                    comboSplit[i] = "command";
                }
                else {
                    comboSplit[i] = "ctrl";
                }
            }
            comboSplit[i] = map[comboSplit[i]] || comboSplit[i];
        }
        return comboSplit.join(" + ");
    };
    Object.defineProperty(Hotkey.prototype, "formatted", {
        /**
         * @return {?}
         */
        get: function () {
            if (!this._formatted) {
                var /** @type {?} */ combo = this.combo[0];
                var /** @type {?} */ sequence = combo.split(/[\s]/);
                for (var /** @type {?} */ i = 0; i < sequence.length; i++) {
                    sequence[i] = Hotkey.symbolize(sequence[i]);
                }
                this._formatted = sequence;
            }
            return this._formatted;
        },
        enumerable: true,
        configurable: true
    });
    return Hotkey;
}());

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
                for (var hotkey_1 = __values(hotkey), hotkey_1_1 = hotkey_1.next(); !hotkey_1_1.done; hotkey_1_1 = hotkey_1.next()) {
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
                for (var _a = __values(this.hotkeys), _b = _a.next(); !_b.done; _b = _a.next()) {
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
                for (var hotkey_2 = __values(hotkey), hotkey_2_1 = hotkey_2.next(); !hotkey_2_1.done; hotkey_2_1 = hotkey_2.next()) {
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
                for (var combo_1 = __values(combo), combo_1_1 = combo_1.next(); !combo_1_1.done; combo_1_1 = combo_1.next()) {
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
                for (var hotkey_3 = __values(hotkey), hotkey_3_1 = hotkey_3.next(); !hotkey_3_1.done; hotkey_3_1 = hotkey_3.next()) {
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
                for (var hotkey_4 = __values(hotkey), hotkey_4_1 = hotkey_4.next(); !hotkey_4_1.done; hotkey_4_1 = hotkey_4.next()) {
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
HotkeysService.decorators = [
    { type: Injectable },
];
/** @nocollapse */
HotkeysService.ctorParameters = function () { return [
    { type: undefined, decorators: [{ type: Inject, args: [HotkeyOptions,] },] },
]; };

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var CheatSheetComponent = /** @class */ (function () {
    /**
     * @param {?} hotkeysService
     */
    function CheatSheetComponent(hotkeysService) {
        this.hotkeysService = hotkeysService;
        this.helpVisible = false;
        this.title = "Keyboard Shortcuts:";
    }
    /**
     * @return {?}
     */
    CheatSheetComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.subscription = this.hotkeysService.cheatSheetToggle.subscribe(function (isOpen) {
            if (isOpen !== false) {
                _this.hotkeys = _this.hotkeysService.hotkeys.filter(function (hotkey) { return hotkey.description; });
            }
            if (isOpen === false) {
                _this.helpVisible = false;
            }
            else {
                _this.toggleCheatSheet();
            }
        });
    };
    /**
     * @return {?}
     */
    CheatSheetComponent.prototype.ngOnDestroy = function () {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    };
    /**
     * @return {?}
     */
    CheatSheetComponent.prototype.toggleCheatSheet = function () {
        this.helpVisible = !this.helpVisible;
    };
    return CheatSheetComponent;
}());
CheatSheetComponent.decorators = [
    { type: Component, args: [{
                selector: "hotkeys-cheatsheet",
                styles: [
                    "\n.cfp-hotkeys-container {\n  display: table !important;\n  position: fixed;\n  width: 100%;\n  height: 100%;\n  top: 0;\n  left: 0;\n  color: #333;\n  font-size: 1em;\n  background-color: rgba(255,255,255,0.9);\n}\n\n.cfp-hotkeys-container.fade {\n  z-index: -1024;\n  visibility: hidden;\n  opacity: 0;\n  -webkit-transition: opacity 0.15s linear;\n  -moz-transition: opacity 0.15s linear;\n  -o-transition: opacity 0.15s linear;\n  transition: opacity 0.15s linear;\n}\n\n.cfp-hotkeys-container.fade.in {\n  z-index: 10002;\n  visibility: visible;\n  opacity: 1;\n}\n\n.cfp-hotkeys-title {\n  font-weight: bold;\n  text-align: center;\n  font-size: 1.2em;\n}\n\n.cfp-hotkeys {\n  width: 100%;\n  height: 100%;\n  display: table-cell;\n  vertical-align: middle;\n}\n\n.cfp-hotkeys table {\n  margin: auto;\n  color: #333;\n}\n\n.cfp-content {\n  display: table-cell;\n  vertical-align: middle;\n}\n\n.cfp-hotkeys-keys {\n  padding: 5px;\n  text-align: right;\n}\n\n.cfp-hotkeys-key {\n  display: inline-block;\n  color: #fff;\n  background-color: #333;\n  border: 1px solid #333;\n  border-radius: 5px;\n  text-align: center;\n  margin-right: 5px;\n  box-shadow: inset 0 1px 0 #666, 0 1px 0 #bbb;\n  padding: 5px 9px;\n  font-size: 1em;\n}\n\n.cfp-hotkeys-text {\n  padding-left: 10px;\n  font-size: 1em;\n}\n\n.cfp-hotkeys-close {\n  position: fixed;\n  top: 20px;\n  right: 20px;\n  font-size: 2em;\n  font-weight: bold;\n  padding: 5px 10px;\n  border: 1px solid #ddd;\n  border-radius: 5px;\n  min-height: 45px;\n  min-width: 45px;\n  text-align: center;\n}\n\n.cfp-hotkeys-close:hover {\n  background-color: #fff;\n  cursor: pointer;\n}\n\n@media all and (max-width: 500px) {\n  .cfp-hotkeys {\n    font-size: 0.8em;\n  }\n}\n\n@media all and (min-width: 750px) {\n  .cfp-hotkeys {\n    font-size: 1.2em;\n  }\n}  "
                ],
                template: "<div class=\"cfp-hotkeys-container fade\" [ngClass]=\"{'in': helpVisible}\" style=\"display:none\"><div class=\"cfp-hotkeys\">\n  <h4 class=\"cfp-hotkeys-title\">{{ title }}</h4>\n  <table><tbody>\n    <tr *ngFor=\"let hotkey of hotkeys\">\n      <td class=\"cfp-hotkeys-keys\">\n        <span *ngFor=\"let key of hotkey.formatted\" class=\"cfp-hotkeys-key\">{{ key }}</span>\n      </td>\n      <td class=\"cfp-hotkeys-text\">{{ hotkey.description }}</td>\n    </tr>\n  </tbody></table>\n  <div class=\"cfp-hotkeys-close\" (click)=\"toggleCheatSheet()\">&#215;</div>\n</div></div>"
            },] },
];
/** @nocollapse */
CheatSheetComponent.ctorParameters = function () { return [
    { type: HotkeysService, },
]; };
CheatSheetComponent.propDecorators = {
    "title": [{ type: Input },],
};

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
            for (var _a = __values(this.hotkeys), _b = _a.next(); !_b.done; _b = _a.next()) {
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
            for (var _a = __values(this.hotkeysList), _b = _a.next(); !_b.done; _b = _a.next()) {
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
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
HotkeyModule.decorators = [
    { type: NgModule, args: [{
                imports: [CommonModule],
                exports: [HotkeysDirective, CheatSheetComponent],
                declarations: [HotkeysDirective, CheatSheetComponent]
            },] },
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */

export { CheatSheetComponent, Hotkey, HotkeyOptions, HotkeysService, HotkeysDirective, HotkeyModule };
//# sourceMappingURL=metaseed-angular-hotkey.js.map
