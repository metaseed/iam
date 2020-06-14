function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["toc-toc-module"], {
  /***/
  "./src/app/modules/markdown/viewer/elements/toc/toc.module.ts":
  /*!********************************************************************!*\
    !*** ./src/app/modules/markdown/viewer/elements/toc/toc.module.ts ***!
    \********************************************************************/

  /*! exports provided: TocModule */

  /***/
  function srcAppModulesMarkdownViewerElementsTocTocModuleTs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "TocModule", function () {
      return TocModule;
    });
    /* harmony import */


    var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
    /*! @angular/core */
    "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
    /* harmony import */


    var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
    /*! @angular/common */
    "./node_modules/@angular/common/__ivy_ngcc__/fesm2015/common.js");
    /* harmony import */


    var _toc_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
    /*! ./toc.component */
    "./src/app/modules/markdown/viewer/elements/toc/toc.component.ts");
    /* harmony import */


    var _angular_material_icon__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
    /*! @angular/material/icon */
    "./node_modules/@angular/material/__ivy_ngcc__/fesm2015/icon.js");
    /* harmony import */


    var _angular_material_button__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
    /*! @angular/material/button */
    "./node_modules/@angular/material/__ivy_ngcc__/fesm2015/button.js");
    /* harmony import */


    var _angular_material_snack_bar__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(
    /*! @angular/material/snack-bar */
    "./node_modules/@angular/material/__ivy_ngcc__/fesm2015/snack-bar.js");

    var TocModule = /*@__PURE__*/function () {
      var TocModule = function TocModule() {
        _classCallCheck(this, TocModule);

        this.customElementComponent = _toc_component__WEBPACK_IMPORTED_MODULE_2__["TocComponent"];
      };

      TocModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineNgModule"]({
        type: TocModule
      });
      TocModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjector"]({
        factory: function TocModule_Factory(t) {
          return new (t || TocModule)();
        },
        imports: [[_angular_common__WEBPACK_IMPORTED_MODULE_1__["CommonModule"], _angular_material_snack_bar__WEBPACK_IMPORTED_MODULE_5__["MatSnackBarModule"], _angular_material_icon__WEBPACK_IMPORTED_MODULE_3__["MatIconModule"], _angular_material_button__WEBPACK_IMPORTED_MODULE_4__["MatButtonModule"]]]
      });
      return TocModule;
    }();

    (function () {
      (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵsetNgModuleScope"](TocModule, {
        declarations: [_toc_component__WEBPACK_IMPORTED_MODULE_2__["TocComponent"]],
        imports: [_angular_common__WEBPACK_IMPORTED_MODULE_1__["CommonModule"], _angular_material_snack_bar__WEBPACK_IMPORTED_MODULE_5__["MatSnackBarModule"], _angular_material_icon__WEBPACK_IMPORTED_MODULE_3__["MatIconModule"], _angular_material_button__WEBPACK_IMPORTED_MODULE_4__["MatButtonModule"]],
        exports: [_toc_component__WEBPACK_IMPORTED_MODULE_2__["TocComponent"]]
      });
    })();
    /***/

  }
}]);