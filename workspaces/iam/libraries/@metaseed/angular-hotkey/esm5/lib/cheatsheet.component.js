/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Component, Input } from "@angular/core";
import { HotkeysService } from "./hotkeys.service";
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
export { CheatSheetComponent };
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
function CheatSheetComponent_tsickle_Closure_declarations() {
    /** @type {!Array<{type: !Function, args: (undefined|!Array<?>)}>} */
    CheatSheetComponent.decorators;
    /**
     * @nocollapse
     * @type {function(): !Array<(null|{type: ?, decorators: (undefined|!Array<{type: !Function, args: (undefined|!Array<?>)}>)})>}
     */
    CheatSheetComponent.ctorParameters;
    /** @type {!Object<string,!Array<{type: !Function, args: (undefined|!Array<?>)}>>} */
    CheatSheetComponent.propDecorators;
    /** @type {?} */
    CheatSheetComponent.prototype.helpVisible;
    /** @type {?} */
    CheatSheetComponent.prototype.title;
    /** @type {?} */
    CheatSheetComponent.prototype.subscription;
    /** @type {?} */
    CheatSheetComponent.prototype.hotkeys;
    /** @type {?} */
    CheatSheetComponent.prototype.hotkeysService;
}
//# sourceMappingURL=cheatsheet.component.js.map
//# sourceMappingURL=M:/Workspace/i'm/workspaces/iam/libraries/@metaseed/angular-hotkey/esm2015/lib/cheatsheet.component.js.map
//# sourceMappingURL=cheatsheet.component.js.map
