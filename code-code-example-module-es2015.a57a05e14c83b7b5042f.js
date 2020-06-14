(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["code-code-example-module"],{

/***/ "./src/app/modules/markdown/viewer/elements/code/code-example.component.ts":
/*!*********************************************************************************!*\
  !*** ./src/app/modules/markdown/viewer/elements/code/code-example.component.ts ***!
  \*********************************************************************************/
/*! exports provided: CodeExampleComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CodeExampleComponent", function() { return CodeExampleComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var _code_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./code.component */ "./src/app/modules/markdown/viewer/elements/code/code.component.ts");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/__ivy_ngcc__/fesm2015/common.js");
/* tslint:disable component-selector */





const _c0 = ["content"];
function CodeExampleComponent_header_3_Template(rf, ctx) {
    if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "header");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    }
    if (rf & 2) {
        const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](ctx_r1.title);
    }
}
const _c1 = ["*"];
/**
 * An embeddable code block that displays nicely formatted code.
 * Example usage:
 *
 ```
 <i-code language="ts" linenums="2" class="special" title="Do Stuff">
 // a code block
 console.log('do stuff');
 </i-code>
  ```
 */
let CodeExampleComponent = /*@__PURE__*/ (() => {
    class CodeExampleComponent {
        constructor() {
            this._path = "";
            this.isAvoid = false;
        }
        set title(title) {
            this._title = title;
            this.classes = {
                "headed-code": !!this.title,
                "simple-code": !this.title
            };
        }
        get title() {
            return this._title;
        }
        set path(path) {
            this._path = path;
            this.isAvoid = this.path.indexOf(".avoid.") !== -1;
        }
        get path() {
            return this._path;
        }
        set hidecopy(hidecopy) {
            // Coerce the boolean value.
            this._hidecopy = hidecopy != null && `${hidecopy}` !== "false";
        }
        get hidecopy() {
            return this._hidecopy;
        }
        set hyphenatedHideCopy(hidecopy) {
            this.hidecopy = hidecopy;
        }
        set capitalizedHideCopy(hidecopy) {
            this.hidecopy = hidecopy;
        }
        ngAfterViewInit() {
            this.icode.code = this.content.nativeElement.innerHTML;
        }
    }
    CodeExampleComponent.ɵfac = function CodeExampleComponent_Factory(t) { return new (t || CodeExampleComponent)(); };
    CodeExampleComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: CodeExampleComponent, selectors: [["i-code"]], viewQuery: function CodeExampleComponent_Query(rf, ctx) {
            if (rf & 1) {
                _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵviewQuery"](_c0, true);
                _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵviewQuery"](_code_component__WEBPACK_IMPORTED_MODULE_1__["CodeComponent"], true);
            }
            if (rf & 2) {
                var _t;
                _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵloadQuery"]()) && (ctx.content = _t.first);
                _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵloadQuery"]()) && (ctx.icode = _t.first);
            }
        }, hostVars: 2, hostBindings: function CodeExampleComponent_HostBindings(rf, ctx) {
            if (rf & 2) {
                _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵclassProp"]("avoidFile", ctx.isAvoid);
            }
        }, inputs: { language: "language", linenums: "linenums", region: "region", title: "title", path: "path", hidecopy: "hidecopy", hyphenatedHideCopy: ["hide-copy", "hyphenatedHideCopy"], capitalizedHideCopy: ["hideCopy", "capitalizedHideCopy"] }, ngContentSelectors: _c1, decls: 5, vars: 8, consts: [[2, "display", "none"], ["content", ""], [4, "ngIf"], [3, "ngClass", "language", "linenums", "path", "region", "hideCopy", "title"]], template: function CodeExampleComponent_Template(rf, ctx) {
            if (rf & 1) {
                _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵprojectionDef"]();
                _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 0, 1);
                _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵprojection"](2);
                _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
                _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](3, CodeExampleComponent_header_3_Template, 2, 1, "header", 2);
                _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](4, "iam-code", 3);
            }
            if (rf & 2) {
                _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](3);
                _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx.title);
                _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
                _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngClass", ctx.classes)("language", ctx.language)("linenums", ctx.linenums)("path", ctx.path)("region", ctx.region)("hideCopy", ctx.hidecopy)("title", ctx.title);
            }
        }, directives: [_angular_common__WEBPACK_IMPORTED_MODULE_2__["NgIf"], _code_component__WEBPACK_IMPORTED_MODULE_1__["CodeComponent"], _angular_common__WEBPACK_IMPORTED_MODULE_2__["NgClass"]], encapsulation: 2 });
    return CodeExampleComponent;
})();


/***/ }),

/***/ "./src/app/modules/markdown/viewer/elements/code/code-example.module.ts":
/*!******************************************************************************!*\
  !*** ./src/app/modules/markdown/viewer/elements/code/code-example.module.ts ***!
  \******************************************************************************/
/*! exports provided: CodeExampleModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CodeExampleModule", function() { return CodeExampleModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/__ivy_ngcc__/fesm2015/common.js");
/* harmony import */ var _code_example_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./code-example.component */ "./src/app/modules/markdown/viewer/elements/code/code-example.component.ts");
/* harmony import */ var _code_module__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./code.module */ "./src/app/modules/markdown/viewer/elements/code/code.module.ts");





let CodeExampleModule = /*@__PURE__*/ (() => {
    class CodeExampleModule {
        constructor() {
            this.customElementComponent = _code_example_component__WEBPACK_IMPORTED_MODULE_2__["CodeExampleComponent"];
        }
    }
    CodeExampleModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineNgModule"]({ type: CodeExampleModule });
    CodeExampleModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjector"]({ factory: function CodeExampleModule_Factory(t) { return new (t || CodeExampleModule)(); }, imports: [[_angular_common__WEBPACK_IMPORTED_MODULE_1__["CommonModule"], _code_module__WEBPACK_IMPORTED_MODULE_3__["CodeModule"]]] });
    return CodeExampleModule;
})();
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵsetNgModuleScope"](CodeExampleModule, { declarations: [_code_example_component__WEBPACK_IMPORTED_MODULE_2__["CodeExampleComponent"]], imports: [_angular_common__WEBPACK_IMPORTED_MODULE_1__["CommonModule"], _code_module__WEBPACK_IMPORTED_MODULE_3__["CodeModule"]], exports: [_code_example_component__WEBPACK_IMPORTED_MODULE_2__["CodeExampleComponent"]] }); })();


/***/ }),

/***/ "./src/app/modules/markdown/viewer/elements/code/code.component.ts":
/*!*************************************************************************!*\
  !*** ./src/app/modules/markdown/viewer/elements/code/code.component.ts ***!
  \*************************************************************************/
/*! exports provided: CodeComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CodeComponent", function() { return CodeComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm2015/operators/index.js");
/* harmony import */ var _angular_material_snack_bar__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/material/snack-bar */ "./node_modules/@angular/material/__ivy_ngcc__/fesm2015/snack-bar.js");
/* harmony import */ var _pretty_printer_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./pretty-printer.service */ "./src/app/modules/markdown/viewer/elements/code/pretty-printer.service.ts");
/* harmony import */ var packages_copier_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! packages/copier.service */ "./packages/copier.service.ts");
/* harmony import */ var core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! core */ "./src/app/modules/core/index.ts");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/__ivy_ngcc__/fesm2015/common.js");








const _c0 = ["codeContainer"];
function CodeComponent_button_2_Template(rf, ctx) {
    if (rf & 1) {
        const _r3 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "button", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function CodeComponent_button_2_Template_button_click_0_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r3); const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](); return ctx_r2.doCopy(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1, "\n        ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "span", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](3, "content_copy");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](4, "\n      ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    }
    if (rf & 2) {
        const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵattribute"]("aria-label", ctx_r0.ariaLabel);
    }
}
/**
 * If linenums is not set, this is the default maximum number of lines that
 * an example can display without line numbers.
 */
const DEFAULT_LINE_NUMS_COUNT = 10;
/**
 * Formatted Code Block
 *
 * Pretty renders a code block, used in the docs and API reference by the code-example and
 * code-tabs embedded components.
 * It includes a "copy" button that will send the content to the clipboard when clicked
 *
 * Example usage:
 *
 * ```
  <iam-code
    [language]="ts"
    [linenums]="true"
    [path]="router/src/app/app.module.ts"
    [region]="animations-module">
  </iam-code>
 * ```
 *
 *
 * Renders code provided through the `updateCode` method.
 */
let CodeComponent = /*@__PURE__*/ (() => {
    class CodeComponent {
        constructor(snackbar, pretty, copier, logger) {
            this.snackbar = snackbar;
            this.pretty = pretty;
            this.copier = copier;
            this.logger = logger;
            this.ariaLabel = '';
            this.codeFormatted = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
        }
        /** Code that should be formatted with current inputs and displayed in the view. */
        set code(code) {
            this._code = code;
            if (!this._code || !this._code.trim()) {
                this.showMissingCodeMessage();
            }
            else {
                this.formatDisplayedCode();
            }
        }
        get code() {
            return this._code;
        }
        /** Optional title to be displayed above the code. */
        set title(title) {
            this._title = title;
            this.ariaLabel = this.title ? `Copy code snippet from ${this.title}` : '';
        }
        get title() {
            return this._title;
        }
        ngOnChanges() {
            // If some inputs have changed and there is code displayed, update the view with the latest
            // formatted code.
            if (this.code) {
                this.formatDisplayedCode();
            }
        }
        formatDisplayedCode() {
            const leftAlignedCode = leftAlign(this.code);
            this.setCodeHtml(leftAlignedCode); // start with unformatted code
            this.codeText = this.getCodeText(); // store the unformatted code as text (for copying)
            this.pretty
                .formatCode(leftAlignedCode, this.language, this.getLinenums(leftAlignedCode))
                .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["tap"])(() => this.codeFormatted.emit()))
                .subscribe(c => this.setCodeHtml(c), err => {
                /* ignore failure to format */
            });
        }
        /** Sets the message showing that the code could not be found. */
        showMissingCodeMessage() {
            const src = this.path ? this.path + (this.region ? '#' + this.region : '') : '';
            const srcMsg = src ? ` for\n${src}` : '.';
            this.setCodeHtml(`<p class="code-missing">The code sample is missing${srcMsg}</p>`);
        }
        /** Sets the innerHTML of the code container to the provided code string. */
        setCodeHtml(formattedCode) {
            // **Security:** Code example content is provided by docs authors and as such its considered to
            // be safe for innerHTML purposes.
            this.codeContainer.nativeElement.innerHTML = formattedCode;
        }
        /** Gets the textContent of the displayed code element. */
        getCodeText() {
            // `prettify` may remove newlines, e.g. when `linenums` are on. Retrieve the content of the
            // container as text, before prettifying it.
            // We take the textContent because we don't want it to be HTML encoded.
            return this.codeContainer.nativeElement.textContent;
        }
        /** Copies the code snippet to the user's clipboard. */
        doCopy() {
            const code = this.codeText;
            const successfullyCopied = this.copier.copyText(code);
            if (successfullyCopied) {
                this.logger.log('Copied code to clipboard:', code);
                this.snackbar.open('Code Copied', '', { duration: 800 });
            }
            else {
                this.logger.error(new Error(`ERROR copying code to clipboard: "${code}"`));
                this.snackbar.open('Copy failed. Please try again!', '', {
                    duration: 800
                });
            }
        }
        /** Gets the calculated value of linenums (boolean/number). */
        getLinenums(code) {
            const linenums = typeof this.linenums === 'boolean'
                ? this.linenums
                : this.linenums === 'true'
                    ? true
                    : this.linenums === 'false'
                        ? false
                        : typeof this.linenums === 'string'
                            ? parseInt(this.linenums, 10)
                            : this.linenums;
            // if no linenums, enable line numbers if more than one line
            return linenums == null || isNaN(linenums)
                ? (code.match(/\n/g) || []).length > DEFAULT_LINE_NUMS_COUNT
                : linenums;
        }
    }
    CodeComponent.ɵfac = function CodeComponent_Factory(t) { return new (t || CodeComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_material_snack_bar__WEBPACK_IMPORTED_MODULE_2__["MatSnackBar"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_pretty_printer_service__WEBPACK_IMPORTED_MODULE_3__["PrettyPrinter"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](packages_copier_service__WEBPACK_IMPORTED_MODULE_4__["CopierService"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](core__WEBPACK_IMPORTED_MODULE_5__["Logger"])); };
    CodeComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: CodeComponent, selectors: [["iam-code"]], viewQuery: function CodeComponent_Query(rf, ctx) {
            if (rf & 1) {
                _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵviewQuery"](_c0, true);
            }
            if (rf & 2) {
                var _t;
                _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵloadQuery"]()) && (ctx.codeContainer = _t.first);
            }
        }, inputs: { hideCopy: "hideCopy", language: "language", linenums: "linenums", path: "path", region: "region", title: "title" }, outputs: { codeFormatted: "codeFormatted" }, features: [_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵNgOnChangesFeature"]], decls: 7, vars: 4, consts: [["class", "material-icons copy-button no-print", "title", "Copy code snippet", 3, "click", 4, "ngIf"], [1, "animated", "fadeIn"], ["codeContainer", ""], ["title", "Copy code snippet", 1, "material-icons", "copy-button", "no-print", 3, "click"], ["aria-hidden", "true"]], template: function CodeComponent_Template(rf, ctx) {
            if (rf & 1) {
                _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "pre");
                _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1, "      ");
                _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](2, CodeComponent_button_2_Template, 5, 1, "button", 0);
                _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](3, "\n      ");
                _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](4, "code", 1, 2);
                _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](6, "\n    ");
                _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            }
            if (rf & 2) {
                _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵclassMapInterpolate1"]("prettyprint lang-", ctx.language, "");
                _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
                _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", !ctx.hideCopy);
            }
        }, directives: [_angular_common__WEBPACK_IMPORTED_MODULE_6__["NgIf"]], encapsulation: 2 });
    return CodeComponent;
})();
function leftAlign(text) {
    let indent = Number.MAX_VALUE;
    const lines = text.split('\n');
    lines.forEach(line => {
        const lineIndent = line.search(/\S/);
        if (lineIndent !== -1) {
            indent = Math.min(lineIndent, indent);
        }
    });
    return lines
        .map(line => line.substr(indent))
        .join('\n')
        .trim();
}


/***/ }),

/***/ "./src/app/modules/markdown/viewer/elements/code/code.module.ts":
/*!**********************************************************************!*\
  !*** ./src/app/modules/markdown/viewer/elements/code/code.module.ts ***!
  \**********************************************************************/
/*! exports provided: CodeModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CodeModule", function() { return CodeModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/__ivy_ngcc__/fesm2015/common.js");
/* harmony import */ var _code_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./code.component */ "./src/app/modules/markdown/viewer/elements/code/code.component.ts");
/* harmony import */ var _angular_material_snack_bar__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/material/snack-bar */ "./node_modules/@angular/material/__ivy_ngcc__/fesm2015/snack-bar.js");
/* harmony import */ var _pretty_printer_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./pretty-printer.service */ "./src/app/modules/markdown/viewer/elements/code/pretty-printer.service.ts");
/* harmony import */ var packages_copier_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! packages/copier.service */ "./packages/copier.service.ts");







let CodeModule = /*@__PURE__*/ (() => {
    class CodeModule {
    }
    CodeModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineNgModule"]({ type: CodeModule });
    CodeModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjector"]({ factory: function CodeModule_Factory(t) { return new (t || CodeModule)(); }, providers: [_pretty_printer_service__WEBPACK_IMPORTED_MODULE_4__["PrettyPrinter"], packages_copier_service__WEBPACK_IMPORTED_MODULE_5__["CopierService"]], imports: [[_angular_common__WEBPACK_IMPORTED_MODULE_1__["CommonModule"], _angular_material_snack_bar__WEBPACK_IMPORTED_MODULE_3__["MatSnackBarModule"]]] });
    return CodeModule;
})();
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵsetNgModuleScope"](CodeModule, { declarations: [_code_component__WEBPACK_IMPORTED_MODULE_2__["CodeComponent"]], imports: [_angular_common__WEBPACK_IMPORTED_MODULE_1__["CommonModule"], _angular_material_snack_bar__WEBPACK_IMPORTED_MODULE_3__["MatSnackBarModule"]], exports: [_code_component__WEBPACK_IMPORTED_MODULE_2__["CodeComponent"]] }); })();


/***/ }),

/***/ "./src/app/modules/markdown/viewer/elements/code/pretty-printer.service.ts":
/*!*********************************************************************************!*\
  !*** ./src/app/modules/markdown/viewer/elements/code/pretty-printer.service.ts ***!
  \*********************************************************************************/
/*! exports provided: PrettyPrinter */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PrettyPrinter", function() { return PrettyPrinter; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm2015/index.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm2015/operators/index.js");
/* harmony import */ var core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! core */ "./src/app/modules/core/index.ts");





/**
 * Wrapper around the prettify.js library
 */
let PrettyPrinter = /*@__PURE__*/ (() => {
    class PrettyPrinter {
        constructor(logger) {
            this.logger = logger;
            this.prettyPrintOne = Object(rxjs__WEBPACK_IMPORTED_MODULE_1__["from"])(this.getPrettyPrintOne()).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["share"])());
        }
        getPrettyPrintOne() {
            const ppo = window['prettyPrintOne'];
            return ppo
                ? Promise.resolve(ppo)
                : // prettify.js is not in window global; load it with webpack loader
                    __webpack_require__.e(/*! import() | assets-js-prettify-js */ "assets-js-prettify-js").then(__webpack_require__.t.bind(null, /*! assets/js/prettify.js */ "./src/assets/js/prettify.js", 7)).then(() => window['prettyPrintOne'], err => {
                        const msg = `Cannot get prettify.js from server: ${err.message}`;
                        this.logger.error(new Error(msg));
                        // return a pretty print fn that always fails.
                        return () => {
                            throw new Error(msg);
                        };
                    });
        }
        /**
         * Format code snippet as HTML
         * @param {string} code - the code snippet to format; should already be HTML encoded
         * @param {string} [language] - The language of the code to render (could be javascript, html, typescript, etc)
         * @param {string|number} [linenums] - Whether to display line numbers:
         *  - false: don't display
         *  - true: do display
         *  - number: do display but start at the given number
         * @returns Observable<string> - Observable of formatted code
         */
        formatCode(code, language, linenums) {
            return this.prettyPrintOne.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["map"])(ppo => {
                try {
                    return ppo(code, language, linenums);
                }
                catch (err) {
                    const msg = `Could not format code that begins '${code.substr(0, 50)}...'.`;
                    console.error(msg, err);
                    throw new Error(msg);
                }
            }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["first"])() // complete immediately
            );
        }
    }
    PrettyPrinter.ɵfac = function PrettyPrinter_Factory(t) { return new (t || PrettyPrinter)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵinject"](core__WEBPACK_IMPORTED_MODULE_3__["Logger"])); };
    PrettyPrinter.ɵprov = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjectable"]({ token: PrettyPrinter, factory: PrettyPrinter.ɵfac });
    return PrettyPrinter;
})();


/***/ })

}]);