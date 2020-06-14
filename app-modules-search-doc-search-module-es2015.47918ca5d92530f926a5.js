(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["app-modules-search-doc-search-module"],{

/***/ "./src/app/modules/search/doc-search-bar/doc-search-bar.component.ts":
/*!***************************************************************************!*\
  !*** ./src/app/modules/search/doc-search-bar/doc-search-bar.component.ts ***!
  \***************************************************************************/
/*! exports provided: DocSearchBarComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DocSearchBarComponent", function() { return DocSearchBarComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var _angular_material_icon__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/material/icon */ "./node_modules/@angular/material/__ivy_ngcc__/fesm2015/icon.js");



let DocSearchBarComponent = /*@__PURE__*/ (() => {
    class DocSearchBarComponent {
        constructor() {
            this.search = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
        }
        ngOnInit() { }
        onSearch(e) {
            this.search.emit(e.trim());
        }
    }
    DocSearchBarComponent.ɵfac = function DocSearchBarComponent_Factory(t) { return new (t || DocSearchBarComponent)(); };
    DocSearchBarComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: DocSearchBarComponent, selectors: [["iam-doc-search-bar"]], outputs: { search: "search" }, decls: 4, vars: 0, consts: [[1, "doc-search"], [1, "search-icon"], ["matInput", "", "action-bar-flex", "", "type", "text", "placeholder", "Search...", 1, "input-lg", "search-input", 3, "keyup"]], template: function DocSearchBarComponent_Template(rf, ctx) {
            if (rf & 1) {
                _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 0);
                _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "mat-icon", 1);
                _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2, "search");
                _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
                _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "input", 2);
                _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("keyup", function DocSearchBarComponent_Template_input_keyup_3_listener($event) { return ctx.onSearch($event.target.value); });
                _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
                _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            }
        }, directives: [_angular_material_icon__WEBPACK_IMPORTED_MODULE_1__["MatIcon"]], styles: [".doc-search[_ngcontent-%COMP%] {\n  height: 4rem;\n  padding-left: 1rem;\n  font-size: 1.4rem;\n  display: flex;\n  flex: 1;\n  background: white;\n}\n\n.doc-search[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%] {\n  margin: auto;\n}\n\n.doc-search[_ngcontent-%COMP%]   input[_ngcontent-%COMP%] {\n  flex: 1;\n  font-family: RobotoRegular;\n  width: auto;\n  max-width: none;\n  display: inline-block;\n  border: 0;\n  padding: 0.25rem 0.5rem;\n  margin: 0;\n}"] });
    return DocSearchBarComponent;
})();


/***/ }),

/***/ "./src/app/modules/search/doc-search-item/doc-search-item.component.ts":
/*!*****************************************************************************!*\
  !*** ./src/app/modules/search/doc-search-item/doc-search-item.component.ts ***!
  \*****************************************************************************/
/*! exports provided: DocSearchItemComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DocSearchItemComponent", function() { return DocSearchItemComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/__ivy_ngcc__/fesm2015/router.js");
/* harmony import */ var _angular_material_card__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/material/card */ "./node_modules/@angular/material/__ivy_ngcc__/fesm2015/card.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/__ivy_ngcc__/fesm2015/common.js");





function DocSearchItemComponent_div_8_Template(rf, ctx) {
    if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](0, "div", 3);
    }
    if (rf & 2) {
        const textMatch_r1 = ctx.$implicit;
        const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("innerHTML", ctx_r0.getMatches(textMatch_r1), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵsanitizeHtml"]);
    }
}
let DocSearchItemComponent = /*@__PURE__*/ (() => {
    class DocSearchItemComponent {
        constructor(router) {
            this.router = router;
        }
        onClick(event) {
            const navigationExtras = {
                queryParams: {
                    id: this.item.id,
                    title: this.item.title,
                    f: 'md'
                }
            };
            this.router.navigate(['/doc'], navigationExtras);
        }
        getMatches(textMatche) {
            const fragment = textMatche.fragment;
            let r = '';
            let lastIndex = 0;
            textMatche.matches.forEach(match => {
                const pair = match.indices;
                r += fragment.substr(lastIndex, pair[0] - lastIndex);
                r += `<em>${match.text}</em>`;
                lastIndex = pair[1];
            });
            r += fragment.substr(lastIndex);
            return r;
        }
        ngOnInit() { }
    }
    DocSearchItemComponent.ɵfac = function DocSearchItemComponent_Factory(t) { return new (t || DocSearchItemComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_1__["Router"])); };
    DocSearchItemComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: DocSearchItemComponent, selectors: [["doc-search-item"]], inputs: { item: "item" }, decls: 9, vars: 3, consts: [[3, "click"], [2, "text-decoration", "none"], ["class", "fragment", 3, "innerHTML", 4, "ngFor", "ngForOf"], [1, "fragment", 3, "innerHTML"]], template: function DocSearchItemComponent_Template(rf, ctx) {
            if (rf & 1) {
                _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "mat-card");
                _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "mat-card-header", 0);
                _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function DocSearchItemComponent_Template_mat_card_header_click_1_listener($event) { return ctx.onClick($event); });
                _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "a", 1);
                _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "mat-card-title");
                _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](4);
                _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
                _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](5, "mat-card-subtitle");
                _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](6);
                _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
                _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
                _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
                _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](7, "mat-card-content");
                _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](8, DocSearchItemComponent_div_8_Template, 1, 1, "div", 2);
                _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
                _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            }
            if (rf & 2) {
                _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](4);
                _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](ctx.item.title);
                _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
                _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"](" ", ctx.item.score, "");
                _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
                _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngForOf", ctx.item.text_matches);
            }
        }, directives: [_angular_material_card__WEBPACK_IMPORTED_MODULE_2__["MatCard"], _angular_material_card__WEBPACK_IMPORTED_MODULE_2__["MatCardHeader"], _angular_material_card__WEBPACK_IMPORTED_MODULE_2__["MatCardTitle"], _angular_material_card__WEBPACK_IMPORTED_MODULE_2__["MatCardSubtitle"], _angular_material_card__WEBPACK_IMPORTED_MODULE_2__["MatCardContent"], _angular_common__WEBPACK_IMPORTED_MODULE_3__["NgForOf"]], styles: [".fragment[_ngcontent-%COMP%] {\n  white-space: pre-wrap;\n}\n\n.fragment[_ngcontent-%COMP%]     em {\n  background: yellow;\n}\n\n[_nghost-%COMP%] {\n  display: inline-block;\n  max-width: 1000px;\n  width: 100%;\n  display: flex;\n}\n\nmat-card[_ngcontent-%COMP%] {\n  width: 100%;\n  margin-top: 3px;\n}"] });
    return DocSearchItemComponent;
})();


/***/ }),

/***/ "./src/app/modules/search/doc-search-list/doc-search-list.component.ts":
/*!*****************************************************************************!*\
  !*** ./src/app/modules/search/doc-search-list/doc-search-list.component.ts ***!
  \*****************************************************************************/
/*! exports provided: DocSearchListComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DocSearchListComponent", function() { return DocSearchListComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var shared__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! shared */ "./src/app/modules/shared/index.ts");
/* harmony import */ var _doc_search_bar_doc_search_bar_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../doc-search-bar/doc-search-bar.component */ "./src/app/modules/search/doc-search-bar/doc-search-bar.component.ts");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm2015/operators/index.js");
/* harmony import */ var _ngrx_store__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ngrx/store */ "./node_modules/@ngrx/store/__ivy_ngcc__/fesm2015/store.js");
/* harmony import */ var _shared_scroll_hide_scroll_hide_directive__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../shared/scroll-hide/scroll-hide.directive */ "./src/app/modules/shared/scroll-hide/scroll-hide.directive.ts");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/__ivy_ngcc__/fesm2015/common.js");
/* harmony import */ var _doc_search_item_doc_search_item_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../doc-search-item/doc-search-item.component */ "./src/app/modules/search/doc-search-item/doc-search-item.component.ts");










function DocSearchListComponent_doc_search_item_3_Template(rf, ctx) {
    if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](0, "doc-search-item", 4);
    }
    if (rf & 2) {
        const searchItem_r2 = ctx.$implicit;
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("item", searchItem_r2);
    }
}
const _c0 = function (a0) { return { container: a0 }; };
const _c1 = function (a0) { return [a0]; };
let DocSearchListComponent = /*@__PURE__*/ (() => {
    class DocSearchListComponent {
        constructor(_store) {
            this._store = _store;
            this.searchResult$ = this._store.select(shared__WEBPACK_IMPORTED_MODULE_1__["selectSearchResultState"]);
            this.trackByFunc = (i, searchItem) => searchItem.id;
        }
        ngAfterViewInit() {
            this.docSearchComponent.search
                .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["debounceTime"])(300), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["distinctUntilChanged"])(), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["tap"])(keyword => {
                if (keyword.trim() === '') {
                    return;
                }
                this._store.dispatch(new shared__WEBPACK_IMPORTED_MODULE_1__["DocumentEffectsSearch"]({ query: keyword }));
            }))
                .subscribe();
        }
        onSearch(keyword) { }
    }
    DocSearchListComponent.ɵfac = function DocSearchListComponent_Factory(t) { return new (t || DocSearchListComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_ngrx_store__WEBPACK_IMPORTED_MODULE_4__["Store"])); };
    DocSearchListComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: DocSearchListComponent, selectors: [["doc-search-list"]], viewQuery: function DocSearchListComponent_Query(rf, ctx) {
            if (rf & 1) {
                _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵviewQuery"](_doc_search_bar_doc_search_bar_component__WEBPACK_IMPORTED_MODULE_2__["DocSearchBarComponent"], true);
            }
            if (rf & 2) {
                var _t;
                _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵloadQuery"]()) && (ctx.docSearchComponent = _t.first);
            }
        }, decls: 5, vars: 9, consts: [["clickToggleEnable", "false", 3, "scrollHide"], [1, "search-result"], ["search", ""], [3, "item", 4, "ngFor", "ngForOf", "ngForTrackBy"], [3, "item"]], template: function DocSearchListComponent_Template(rf, ctx) {
            if (rf & 1) {
                _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](0, "iam-doc-search-bar", 0);
                _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "div", 1, 2);
                _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](3, DocSearchListComponent_doc_search_item_3_Template, 1, 1, "doc-search-item", 3);
                _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipe"](4, "async");
                _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            }
            if (rf & 2) {
                const _r0 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵreference"](2);
                _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("scrollHide", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpureFunction1"](7, _c1, _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpureFunction1"](5, _c0, _r0)));
                _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](3);
                _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngForOf", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipeBind1"](4, 3, ctx.searchResult$))("ngForTrackBy", ctx.trackByFunc);
            }
        }, directives: [_doc_search_bar_doc_search_bar_component__WEBPACK_IMPORTED_MODULE_2__["DocSearchBarComponent"], _shared_scroll_hide_scroll_hide_directive__WEBPACK_IMPORTED_MODULE_5__["ScrollHideDirective"], _angular_common__WEBPACK_IMPORTED_MODULE_6__["NgForOf"], _doc_search_item_doc_search_item_component__WEBPACK_IMPORTED_MODULE_7__["DocSearchItemComponent"]], pipes: [_angular_common__WEBPACK_IMPORTED_MODULE_6__["AsyncPipe"]], styles: ["[_nghost-%COMP%] {\n  max-width: 400px;\n  width: 100%;\n}\n\n.search-result[_ngcontent-%COMP%] {\n  overflow: auto;\n  display: flex;\n  flex-flow: row wrap;\n  box-sizing: border-box;\n  justify-content: space-around;\n  height: calc(100vh - 50px);\n  margin-bottom: 50px;\n}"] });
    return DocSearchListComponent;
})();


/***/ }),

/***/ "./src/app/modules/search/doc-search.module.ts":
/*!*****************************************************!*\
  !*** ./src/app/modules/search/doc-search.module.ts ***!
  \*****************************************************/
/*! exports provided: DocSearchModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DocSearchModule", function() { return DocSearchModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var _doc_search_item_doc_search_item_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./doc-search-item/doc-search-item.component */ "./src/app/modules/search/doc-search-item/doc-search-item.component.ts");
/* harmony import */ var _doc_search_list_doc_search_list_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./doc-search-list/doc-search-list.component */ "./src/app/modules/search/doc-search-list/doc-search-list.component.ts");
/* harmony import */ var shared__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! shared */ "./src/app/modules/shared/index.ts");
/* harmony import */ var _cache_services_store_search_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../cache/services/store-search.service */ "./src/app/modules/cache/services/store-search.service.ts");
/* harmony import */ var _doc_search_bar_doc_search_bar_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./doc-search-bar/doc-search-bar.component */ "./src/app/modules/search/doc-search-bar/doc-search-bar.component.ts");
/* harmony import */ var _search_routing_module__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./search-routing.module */ "./src/app/modules/search/search-routing.module.ts");
/* harmony import */ var material__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! material */ "./src/app/modules/material/index.ts");









let DocSearchModule = /*@__PURE__*/ (() => {
    class DocSearchModule {
    }
    DocSearchModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineNgModule"]({ type: DocSearchModule });
    DocSearchModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjector"]({ factory: function DocSearchModule_Factory(t) { return new (t || DocSearchModule)(); }, providers: [_cache_services_store_search_service__WEBPACK_IMPORTED_MODULE_4__["StoreSearchService"]], imports: [[shared__WEBPACK_IMPORTED_MODULE_3__["SharedModule"], material__WEBPACK_IMPORTED_MODULE_7__["MaterialModule"], _search_routing_module__WEBPACK_IMPORTED_MODULE_6__["SearchRoutingModule"]]] });
    return DocSearchModule;
})();
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵsetNgModuleScope"](DocSearchModule, { declarations: [_doc_search_item_doc_search_item_component__WEBPACK_IMPORTED_MODULE_1__["DocSearchItemComponent"], _doc_search_list_doc_search_list_component__WEBPACK_IMPORTED_MODULE_2__["DocSearchListComponent"], _doc_search_bar_doc_search_bar_component__WEBPACK_IMPORTED_MODULE_5__["DocSearchBarComponent"]], imports: [shared__WEBPACK_IMPORTED_MODULE_3__["SharedModule"], material__WEBPACK_IMPORTED_MODULE_7__["MaterialModule"], _search_routing_module__WEBPACK_IMPORTED_MODULE_6__["SearchRoutingModule"]] }); })();


/***/ }),

/***/ "./src/app/modules/search/search-routing.module.ts":
/*!*********************************************************!*\
  !*** ./src/app/modules/search/search-routing.module.ts ***!
  \*********************************************************/
/*! exports provided: SearchRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SearchRoutingModule", function() { return SearchRoutingModule; });
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/__ivy_ngcc__/fesm2015/router.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var _doc_search_list_doc_search_list_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./doc-search-list/doc-search-list.component */ "./src/app/modules/search/doc-search-list/doc-search-list.component.ts");





const meRoutes = [
    {
        path: '',
        component: _doc_search_list_doc_search_list_component__WEBPACK_IMPORTED_MODULE_2__["DocSearchListComponent"]
    }
];
let SearchRoutingModule = /*@__PURE__*/ (() => {
    class SearchRoutingModule {
    }
    SearchRoutingModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineNgModule"]({ type: SearchRoutingModule });
    SearchRoutingModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjector"]({ factory: function SearchRoutingModule_Factory(t) { return new (t || SearchRoutingModule)(); }, imports: [[_angular_router__WEBPACK_IMPORTED_MODULE_0__["RouterModule"].forChild(meRoutes)],
            _angular_router__WEBPACK_IMPORTED_MODULE_0__["RouterModule"]] });
    return SearchRoutingModule;
})();
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵsetNgModuleScope"](SearchRoutingModule, { imports: [_angular_router__WEBPACK_IMPORTED_MODULE_0__["RouterModule"]], exports: [_angular_router__WEBPACK_IMPORTED_MODULE_0__["RouterModule"]] }); })();


/***/ })

}]);