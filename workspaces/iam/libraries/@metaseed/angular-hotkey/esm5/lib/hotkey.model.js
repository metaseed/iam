/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * @record
 */
export function ExtendedKeyboardEvent() { }
function ExtendedKeyboardEvent_tsickle_Closure_declarations() {
    /** @type {?} */
    ExtendedKeyboardEvent.prototype.returnValue;
}
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
export { Hotkey };
function Hotkey_tsickle_Closure_declarations() {
    /** @type {?} */
    Hotkey.prototype._formatted;
    /** @type {?} */
    Hotkey.prototype.combo;
    /** @type {?} */
    Hotkey.prototype.callback;
    /** @type {?} */
    Hotkey.prototype.allowIn;
    /** @type {?} */
    Hotkey.prototype.description;
    /** @type {?} */
    Hotkey.prototype.action;
    /** @type {?} */
    Hotkey.prototype.persistent;
}
//# sourceMappingURL=hotkey.model.js.map
//# sourceMappingURL=M:/Workspace/i'm/workspaces/iam/libraries/@metaseed/angular-hotkey/esm2015/lib/hotkey.model.js.map
//# sourceMappingURL=hotkey.model.js.map
