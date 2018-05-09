import { InjectionToken, Inject, Injectable, Component, Input, Directive, ElementRef, NgModule } from '@angular/core';
import { Subject } from 'rxjs';
import 'mousetrap';
import { CommonModule } from '@angular/common';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
const /** @type {?} */ HotkeyOptions = new InjectionToken('HotkeyOptions');

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class Hotkey {
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
    constructor(combo, callback, allowIn, description, action, persistent) {
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
    static symbolize(combo) {
        let /** @type {?} */ map = {
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
        let /** @type {?} */ comboSplit = combo.split("+");
        for (let /** @type {?} */ i = 0; i < comboSplit.length; i++) {
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
    }
    /**
     * @return {?}
     */
    get formatted() {
        if (!this._formatted) {
            let /** @type {?} */ combo = this.combo[0];
            let /** @type {?} */ sequence = combo.split(/[\s]/);
            for (let /** @type {?} */ i = 0; i < sequence.length; i++) {
                sequence[i] = Hotkey.symbolize(sequence[i]);
            }
            this._formatted = sequence;
        }
        return this._formatted;
    }
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class HotkeysService {
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class CheatSheetComponent {
    /**
     * @param {?} hotkeysService
     */
    constructor(hotkeysService) {
        this.hotkeysService = hotkeysService;
        this.helpVisible = false;
        this.title = "Keyboard Shortcuts:";
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.subscription = this.hotkeysService.cheatSheetToggle.subscribe(isOpen => {
            if (isOpen !== false) {
                this.hotkeys = this.hotkeysService.hotkeys.filter(hotkey => hotkey.description);
            }
            if (isOpen === false) {
                this.helpVisible = false;
            }
            else {
                this.toggleCheatSheet();
            }
        });
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }
    /**
     * @return {?}
     */
    toggleCheatSheet() {
        this.helpVisible = !this.helpVisible;
    }
}
CheatSheetComponent.decorators = [
    { type: Component, args: [{
                selector: "hotkeys-cheatsheet",
                styles: [
                    `
.cfp-hotkeys-container {
  display: table !important;
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  color: #333;
  font-size: 1em;
  background-color: rgba(255,255,255,0.9);
}

.cfp-hotkeys-container.fade {
  z-index: -1024;
  visibility: hidden;
  opacity: 0;
  -webkit-transition: opacity 0.15s linear;
  -moz-transition: opacity 0.15s linear;
  -o-transition: opacity 0.15s linear;
  transition: opacity 0.15s linear;
}

.cfp-hotkeys-container.fade.in {
  z-index: 10002;
  visibility: visible;
  opacity: 1;
}

.cfp-hotkeys-title {
  font-weight: bold;
  text-align: center;
  font-size: 1.2em;
}

.cfp-hotkeys {
  width: 100%;
  height: 100%;
  display: table-cell;
  vertical-align: middle;
}

.cfp-hotkeys table {
  margin: auto;
  color: #333;
}

.cfp-content {
  display: table-cell;
  vertical-align: middle;
}

.cfp-hotkeys-keys {
  padding: 5px;
  text-align: right;
}

.cfp-hotkeys-key {
  display: inline-block;
  color: #fff;
  background-color: #333;
  border: 1px solid #333;
  border-radius: 5px;
  text-align: center;
  margin-right: 5px;
  box-shadow: inset 0 1px 0 #666, 0 1px 0 #bbb;
  padding: 5px 9px;
  font-size: 1em;
}

.cfp-hotkeys-text {
  padding-left: 10px;
  font-size: 1em;
}

.cfp-hotkeys-close {
  position: fixed;
  top: 20px;
  right: 20px;
  font-size: 2em;
  font-weight: bold;
  padding: 5px 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  min-height: 45px;
  min-width: 45px;
  text-align: center;
}

.cfp-hotkeys-close:hover {
  background-color: #fff;
  cursor: pointer;
}

@media all and (max-width: 500px) {
  .cfp-hotkeys {
    font-size: 0.8em;
  }
}

@media all and (min-width: 750px) {
  .cfp-hotkeys {
    font-size: 1.2em;
  }
}  `
                ],
                template: `<div class="cfp-hotkeys-container fade" [ngClass]="{'in': helpVisible}" style="display:none"><div class="cfp-hotkeys">
  <h4 class="cfp-hotkeys-title">{{ title }}</h4>
  <table><tbody>
    <tr *ngFor="let hotkey of hotkeys">
      <td class="cfp-hotkeys-keys">
        <span *ngFor="let key of hotkey.formatted" class="cfp-hotkeys-key">{{ key }}</span>
      </td>
      <td class="cfp-hotkeys-text">{{ hotkey.description }}</td>
    </tr>
  </tbody></table>
  <div class="cfp-hotkeys-close" (click)="toggleCheatSheet()">&#215;</div>
</div></div>`
            },] },
];
/** @nocollapse */
CheatSheetComponent.ctorParameters = () => [
    { type: HotkeysService, },
];
CheatSheetComponent.propDecorators = {
    "title": [{ type: Input },],
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class HotkeysDirective {
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class HotkeyModule {
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
