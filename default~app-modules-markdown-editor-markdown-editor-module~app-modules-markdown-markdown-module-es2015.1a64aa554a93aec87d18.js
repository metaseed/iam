(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["default~app-modules-markdown-editor-markdown-editor-module~app-modules-markdown-markdown-module"],{

/***/ "./src/app/modules/markdown/markdown.component.ts":
/*!********************************************************!*\
  !*** ./src/app/modules/markdown/markdown.component.ts ***!
  \********************************************************/
/*! exports provided: MarkdownComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MarkdownComponent", function() { return MarkdownComponent; });
/* harmony import */ var _state_actions_document__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./state/actions/document */ "./src/app/modules/markdown/state/actions/document.ts");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/__ivy_ngcc__/fesm2015/common.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm2015/operators/index.js");
/* harmony import */ var core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! core */ "./src/app/modules/core/index.ts");
/* harmony import */ var _ngrx_store__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ngrx/store */ "./node_modules/@ngrx/store/__ivy_ngcc__/fesm2015/store.js");
/* harmony import */ var _state__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./state */ "./src/app/modules/markdown/state/index.ts");
/* harmony import */ var _state_reducers_document__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./state/reducers/document */ "./src/app/modules/markdown/state/reducers/document.ts");
/* harmony import */ var _viewer_markdown_viewer_container_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./viewer/markdown-viewer-container.component */ "./src/app/modules/markdown/viewer/markdown-viewer-container.component.ts");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm2015/index.js");
/* harmony import */ var shared__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! shared */ "./src/app/modules/shared/index.ts");
/* harmony import */ var _model_markdown_model__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./model/markdown.model */ "./src/app/modules/markdown/model/markdown.model.ts");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/__ivy_ngcc__/fesm2015/http.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/__ivy_ngcc__/fesm2015/router.js");
/* harmony import */ var _core_utils__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ../core/utils */ "./src/app/modules/core/utils/index.ts");
/* harmony import */ var _shared_split_pane_vertical_split_pane_component__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ../shared/split-pane/vertical-split-pane.component */ "./src/app/modules/shared/split-pane/vertical-split-pane.component.ts");





















const _c0 = ["viewerDiv"];
const _c1 = ["editorDiv"];
let MarkdownComponent = /*@__PURE__*/ (() => {
    class MarkdownComponent {
        constructor(markdownService, _http, baseHref, changeDetecorRef, route, router, store, utils) {
            this.markdownService = markdownService;
            this._http = _http;
            this.baseHref = baseHref;
            this.changeDetecorRef = changeDetecorRef;
            this.route = route;
            this.router = router;
            this.store = store;
            this.utils = utils;
            this.fixEditButton = false;
            this.destroy$ = new rxjs__WEBPACK_IMPORTED_MODULE_9__["Subject"]();
            this.docMode$ = this.store.pipe(Object(_ngrx_store__WEBPACK_IMPORTED_MODULE_5__["select"])(_state__WEBPACK_IMPORTED_MODULE_6__["selectDocumentModeState"]), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["takeUntil"])(this.destroy$));
            this.showEdit$ = this.docMode$.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["map"])(mode => {
                return mode === _state_reducers_document__WEBPACK_IMPORTED_MODULE_7__["DocumentMode"].Edit;
            }));
            this.isScreenWide$ = this.utils.isScreenWide$;
            this.showView$ = Object(rxjs__WEBPACK_IMPORTED_MODULE_9__["merge"])(this.showEdit$.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["combineLatest"])(this.isScreenWide$), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["map"])(([isShowEdit, wide]) => {
                if (isShowEdit) {
                    if (!wide) {
                        this.store.dispatch(new _state_actions_document__WEBPACK_IMPORTED_MODULE_0__["HidePreview"]());
                        return false;
                    }
                }
                this.store.dispatch(new _state_actions_document__WEBPACK_IMPORTED_MODULE_0__["ShowPreview"]());
                return true;
            })), this.store.select(_state__WEBPACK_IMPORTED_MODULE_6__["selectDocumentShowPreviewState"]));
        }
        ngOnInit() {
            this.markdown$ = Object(rxjs__WEBPACK_IMPORTED_MODULE_9__["merge"])(this.store.select(shared__WEBPACK_IMPORTED_MODULE_10__["selectCurrentDocumentState"]).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["filter"])(d => d && !d.isUpdateMeta), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["map"])(d => {
                if (!d || !d.content)
                    return '';
                return d.content.content;
            })), this.markdownService.editorContentChanged$).pipe(Object(core__WEBPACK_IMPORTED_MODULE_4__["backoff"])(80, 1000));
        }
        ngOnDestroy() {
            this.store.dispatch(new shared__WEBPACK_IMPORTED_MODULE_10__["SetCurrentDocumentId"]({ id: undefined }));
            this.destroy$.next();
        }
        ngAfterViewChecked() {
            this.changeDetecorRef.detectChanges();
        }
        ngAfterViewInit() {
            this.route.queryParamMap
                .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["tap"])(params => {
                if (this.router.url.startsWith('/doc/new')) {
                    const format = params.get('f');
                    this.store.dispatch(new shared__WEBPACK_IMPORTED_MODULE_10__["DocumentEffectsCreate"]({ format }));
                    this.store.dispatch(new _state_actions_document__WEBPACK_IMPORTED_MODULE_0__["EditMode"]());
                }
                else {
                    const title = params.get('title');
                    const num = +params.get('id');
                    const format = params.get('f');
                    this.store.dispatch(new shared__WEBPACK_IMPORTED_MODULE_10__["DocumentEffectsRead"]({ id: num, title, format }));
                }
            }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["take"])(1))
                .subscribe();
            // setTimeout(_ => (this.viewerDiv.nativeElement as HTMLElement).focus(), 1000);
        }
        showDemo() {
            this._http
                .get(`${this.baseHref}assets/markdown.md`, { responseType: 'text' })
                .subscribe(() => { });
        }
    }
    MarkdownComponent.ɵfac = function MarkdownComponent_Factory(t) { return new (t || MarkdownComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_model_markdown_model__WEBPACK_IMPORTED_MODULE_11__["MARKDOWN_SERVICE_TOKEN"]), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_angular_common_http__WEBPACK_IMPORTED_MODULE_12__["HttpClient"]), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_angular_common__WEBPACK_IMPORTED_MODULE_2__["APP_BASE_HREF"]), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_1__["ChangeDetectorRef"]), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_13__["ActivatedRoute"]), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_13__["Router"]), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_ngrx_store__WEBPACK_IMPORTED_MODULE_5__["Store"]), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_core_utils__WEBPACK_IMPORTED_MODULE_14__["Utilities"])); };
    MarkdownComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineComponent"]({ type: MarkdownComponent, selectors: [["ms-markdown"]], viewQuery: function MarkdownComponent_Query(rf, ctx) {
            if (rf & 1) {
                _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵviewQuery"](_viewer_markdown_viewer_container_component__WEBPACK_IMPORTED_MODULE_8__["MarkdownViewerContainerComponent"], true);
                _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵviewQuery"](_c0, true);
                _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵviewQuery"](_c1, true);
            }
            if (rf & 2) {
                var _t;
                _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵloadQuery"]()) && (ctx.viewer = _t.first);
                _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵloadQuery"]()) && (ctx.viewerDiv = _t.first);
                _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵloadQuery"]()) && (ctx.editorDiv = _t.first);
            }
        }, decls: 10, vars: 9, consts: [[1, "markdown-container"], ["primary-component-minsize", "100", "secondary-component-minsize", "100", "local-storage-key", "iam-md-split-pane", "primary-component-initialratio", "0.5", 3, "primary-component-toggled-off", "secondary-component-toggled-off"], [1, "split-pane-content-primary"], ["editorDiv", ""], [1, "split-pane-content-secondary"], ["viewerDiv", ""], [3, "markdown$"]], template: function MarkdownComponent_Template(rf, ctx) {
            if (rf & 1) {
                _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div", 0);
                _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](1, "vertical-split-pane", 1);
                _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpipe"](2, "async");
                _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpipe"](3, "async");
                _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](4, "div", 2, 3);
                _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](6, "router-outlet");
                _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
                _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](7, "div", 4, 5);
                _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](9, "markdown-viewer-container", 6);
                _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
                _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
                _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
            }
            if (rf & 2) {
                _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵclassProp"]("fullscreen", ctx.isFullScreen);
                _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
                _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("primary-component-toggled-off", !_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpipeBind1"](2, 5, ctx.showEdit$))("secondary-component-toggled-off", !_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpipeBind1"](3, 7, ctx.showView$));
                _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](8);
                _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("markdown$", ctx.markdown$);
            }
        }, directives: [_shared_split_pane_vertical_split_pane_component__WEBPACK_IMPORTED_MODULE_15__["VerticalSplitPaneComponent"], _angular_router__WEBPACK_IMPORTED_MODULE_13__["RouterOutlet"], _viewer_markdown_viewer_container_component__WEBPACK_IMPORTED_MODULE_8__["MarkdownViewerContainerComponent"]], pipes: [_angular_common__WEBPACK_IMPORTED_MODULE_2__["AsyncPipe"]], styles: [".markdown-container[_ngcontent-%COMP%]   .md-footer[_ngcontent-%COMP%] {\n  padding: 2px;\n  background-color: #f0f0f0;\n  border-top: 1px solid rgba(0, 0, 0, 0.1);\n}\n\n.markdown-container.fullscreen[_ngcontent-%COMP%] {\n  margin: 0;\n  position: fixed;\n  border: 0;\n  top: 0px;\n  left: 0;\n  width: 100%;\n  height: 100%;\n  z-index: 99999999;\n}\n\n.split-pane-content-secondary[_ngcontent-%COMP%] {\n  height: 100%;\n}\n\n.markdown-container.fullscreen[_ngcontent-%COMP%]   .md-editor-panel[_ngcontent-%COMP%] {\n  height: calc(100vh - 40px) !important;\n}\n\n.markdown-container.fullscreen[_ngcontent-%COMP%]   .md-view-panel[_ngcontent-%COMP%] {\n  height: calc(100vh - 40px) !important;\n}\n\n.markdown-container[_ngcontent-%COMP%]   .tool-bar[_ngcontent-%COMP%]   .btn-group[_ngcontent-%COMP%]    > .btn[_ngcontent-%COMP%]:first-child::before {\n  content: \" \";\n  background-color: darkgray;\n  width: 1px;\n  height: 24px;\n  left: -9px;\n  top: 2px;\n  position: absolute;\n}\n\n.markdown-container[_ngcontent-%COMP%] {\n  height: 100vh;\n  overflow: hidden;\n}\n\n.markdown-container[_ngcontent-%COMP%]   .tool-bar[_ngcontent-%COMP%]   .btn-group.hide-split[_ngcontent-%COMP%]    > .btn[_ngcontent-%COMP%]:first-child::before {\n  display: none;\n}\n\n.markdown-container[_ngcontent-%COMP%]   .tool-bar[_ngcontent-%COMP%]   .btn[_ngcontent-%COMP%] {\n  margin-bottom: 0;\n}\n\n.markdown-container[_ngcontent-%COMP%]   .editor-container[_ngcontent-%COMP%] {\n  display: flex;\n}\n\n.markdown-container[_ngcontent-%COMP%]   .editor-container[_ngcontent-%COMP%]    > div[_ngcontent-%COMP%] {\n  flex: 1 1 0;\n  width: 0;\n  min-height: 200px;\n}"] });
    return MarkdownComponent;
})();


/***/ }),

/***/ "./src/app/modules/markdown/model/markdown.model.ts":
/*!**********************************************************!*\
  !*** ./src/app/modules/markdown/model/markdown.model.ts ***!
  \**********************************************************/
/*! exports provided: MARKDOWN_SERVICE_TOKEN */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MARKDOWN_SERVICE_TOKEN", function() { return MARKDOWN_SERVICE_TOKEN; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");

const MARKDOWN_SERVICE_TOKEN = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["InjectionToken"]('MARKDOWN_SERVICE_TOKEN');


/***/ }),

/***/ "./src/app/modules/markdown/state/actions/document.ts":
/*!************************************************************!*\
  !*** ./src/app/modules/markdown/state/actions/document.ts ***!
  \************************************************************/
/*! exports provided: DocumentActionTypes, EditMode, ViewMode, ShowPreview, HidePreview, RefreshAction, EditItAction */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DocumentActionTypes", function() { return DocumentActionTypes; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EditMode", function() { return EditMode; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ViewMode", function() { return ViewMode; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ShowPreview", function() { return ShowPreview; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HidePreview", function() { return HidePreview; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RefreshAction", function() { return RefreshAction; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EditItAction", function() { return EditItAction; });
var DocumentActionTypes = /*@__PURE__*/ (function (DocumentActionTypes) {
    DocumentActionTypes["EditMode"] = "[Document] edit mode";
    DocumentActionTypes["ViewMode"] = "[Document] view mode";
    DocumentActionTypes["ShowPreview"] = "[Document] show preview";
    DocumentActionTypes["Refresh"] = "[Document] Refresh";
    DocumentActionTypes["HidePreview"] = "[Document] hide preview";
    DocumentActionTypes["EditIt"] = "[Document] edit it";
    return DocumentActionTypes;
})({});
class EditMode {
    constructor() {
        this.type = DocumentActionTypes.EditMode;
    }
}
class ViewMode {
    constructor() {
        this.type = DocumentActionTypes.ViewMode;
    }
}
class ShowPreview {
    constructor() {
        this.type = DocumentActionTypes.ShowPreview;
    }
}
class HidePreview {
    constructor() {
        this.type = DocumentActionTypes.HidePreview;
    }
}
class RefreshAction {
    constructor() {
        this.type = DocumentActionTypes.Refresh;
    }
}
class EditItAction {
    constructor(payload) {
        this.payload = payload;
        this.type = DocumentActionTypes.EditIt;
    }
}


/***/ }),

/***/ "./src/app/modules/markdown/state/actions/edit.ts":
/*!********************************************************!*\
  !*** ./src/app/modules/markdown/state/actions/edit.ts ***!
  \********************************************************/
/*! exports provided: EditActionTypes, Save, LockScrollWithView */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EditActionTypes", function() { return EditActionTypes; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Save", function() { return Save; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LockScrollWithView", function() { return LockScrollWithView; });
var EditActionTypes = /*@__PURE__*/ (function (EditActionTypes) {
    EditActionTypes["Save"] = "[Edit] Save";
    // ScrollDown = '[Edit] Scroll Down',
    EditActionTypes["LockScrollWithView"] = "[Edit] Lock Scroll With View";
    EditActionTypes["EditorLoaded"] = "[Edit] Editor Loaded";
    EditActionTypes["EditorUnloaded"] = "[Edit] Editor Unloaded";
    return EditActionTypes;
})({});
// export class ContentChanged implements Action {
//   readonly type = EditActionTypes.ContentChanged;
//   constructor(public payload: { content: string }) {}
// }
class Save {
    constructor(payload) {
        this.payload = payload;
        this.type = EditActionTypes.Save;
    }
}
class LockScrollWithView {
    constructor(payload) {
        this.payload = payload;
        this.type = EditActionTypes.LockScrollWithView;
    }
}
// | ScrollDown;


/***/ }),

/***/ "./src/app/modules/markdown/state/actions/index.ts":
/*!*********************************************************!*\
  !*** ./src/app/modules/markdown/state/actions/index.ts ***!
  \*********************************************************/
/*! exports provided: DocumentActionTypes, EditMode, ViewMode, ShowPreview, HidePreview, RefreshAction, EditItAction, ViewActionTypes, ViewScrollAction, EditActionTypes, Save, LockScrollWithView */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _document__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./document */ "./src/app/modules/markdown/state/actions/document.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "DocumentActionTypes", function() { return _document__WEBPACK_IMPORTED_MODULE_0__["DocumentActionTypes"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "EditMode", function() { return _document__WEBPACK_IMPORTED_MODULE_0__["EditMode"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ViewMode", function() { return _document__WEBPACK_IMPORTED_MODULE_0__["ViewMode"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ShowPreview", function() { return _document__WEBPACK_IMPORTED_MODULE_0__["ShowPreview"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "HidePreview", function() { return _document__WEBPACK_IMPORTED_MODULE_0__["HidePreview"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "RefreshAction", function() { return _document__WEBPACK_IMPORTED_MODULE_0__["RefreshAction"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "EditItAction", function() { return _document__WEBPACK_IMPORTED_MODULE_0__["EditItAction"]; });

/* harmony import */ var _view__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./view */ "./src/app/modules/markdown/state/actions/view.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ViewActionTypes", function() { return _view__WEBPACK_IMPORTED_MODULE_1__["ViewActionTypes"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ViewScrollAction", function() { return _view__WEBPACK_IMPORTED_MODULE_1__["ViewScrollAction"]; });

/* harmony import */ var _edit__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./edit */ "./src/app/modules/markdown/state/actions/edit.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "EditActionTypes", function() { return _edit__WEBPACK_IMPORTED_MODULE_2__["EditActionTypes"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Save", function() { return _edit__WEBPACK_IMPORTED_MODULE_2__["Save"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "LockScrollWithView", function() { return _edit__WEBPACK_IMPORTED_MODULE_2__["LockScrollWithView"]; });






/***/ }),

/***/ "./src/app/modules/markdown/state/actions/view.ts":
/*!********************************************************!*\
  !*** ./src/app/modules/markdown/state/actions/view.ts ***!
  \********************************************************/
/*! exports provided: ViewActionTypes, ViewScrollAction */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ViewActionTypes", function() { return ViewActionTypes; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ViewScrollAction", function() { return ViewScrollAction; });
var ViewActionTypes = /*@__PURE__*/ (function (ViewActionTypes) {
    ViewActionTypes["Scroll"] = "[View] Scroll";
    return ViewActionTypes;
})({});
class ViewScrollAction {
    constructor(payload) {
        this.payload = payload;
        this.type = ViewActionTypes.Scroll;
    }
}


/***/ }),

/***/ "./src/app/modules/markdown/state/index.ts":
/*!*************************************************!*\
  !*** ./src/app/modules/markdown/state/index.ts ***!
  \*************************************************/
/*! exports provided: selectMarkdownState, selectDocumentState, selectDocumentModeState, selectDocumentShowPreviewState, selectDocumentEditItState, selectEditState, selectEditSaveState, selectEditLockScrollWithViewState, selectViewState, selectViewScrollState, DocumentActionTypes, EditMode, ViewMode, ShowPreview, HidePreview, RefreshAction, EditItAction, ViewActionTypes, ViewScrollAction, EditActionTypes, Save, LockScrollWithView, moduleStateName, markdownReducers */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _selectors__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./selectors */ "./src/app/modules/markdown/state/selectors.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "selectMarkdownState", function() { return _selectors__WEBPACK_IMPORTED_MODULE_0__["selectMarkdownState"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "selectDocumentState", function() { return _selectors__WEBPACK_IMPORTED_MODULE_0__["selectDocumentState"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "selectDocumentModeState", function() { return _selectors__WEBPACK_IMPORTED_MODULE_0__["selectDocumentModeState"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "selectDocumentShowPreviewState", function() { return _selectors__WEBPACK_IMPORTED_MODULE_0__["selectDocumentShowPreviewState"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "selectDocumentEditItState", function() { return _selectors__WEBPACK_IMPORTED_MODULE_0__["selectDocumentEditItState"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "selectEditState", function() { return _selectors__WEBPACK_IMPORTED_MODULE_0__["selectEditState"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "selectEditSaveState", function() { return _selectors__WEBPACK_IMPORTED_MODULE_0__["selectEditSaveState"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "selectEditLockScrollWithViewState", function() { return _selectors__WEBPACK_IMPORTED_MODULE_0__["selectEditLockScrollWithViewState"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "selectViewState", function() { return _selectors__WEBPACK_IMPORTED_MODULE_0__["selectViewState"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "selectViewScrollState", function() { return _selectors__WEBPACK_IMPORTED_MODULE_0__["selectViewScrollState"]; });

/* harmony import */ var _actions__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./actions */ "./src/app/modules/markdown/state/actions/index.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "DocumentActionTypes", function() { return _actions__WEBPACK_IMPORTED_MODULE_1__["DocumentActionTypes"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "EditMode", function() { return _actions__WEBPACK_IMPORTED_MODULE_1__["EditMode"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ViewMode", function() { return _actions__WEBPACK_IMPORTED_MODULE_1__["ViewMode"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ShowPreview", function() { return _actions__WEBPACK_IMPORTED_MODULE_1__["ShowPreview"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "HidePreview", function() { return _actions__WEBPACK_IMPORTED_MODULE_1__["HidePreview"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "RefreshAction", function() { return _actions__WEBPACK_IMPORTED_MODULE_1__["RefreshAction"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "EditItAction", function() { return _actions__WEBPACK_IMPORTED_MODULE_1__["EditItAction"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ViewActionTypes", function() { return _actions__WEBPACK_IMPORTED_MODULE_1__["ViewActionTypes"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ViewScrollAction", function() { return _actions__WEBPACK_IMPORTED_MODULE_1__["ViewScrollAction"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "EditActionTypes", function() { return _actions__WEBPACK_IMPORTED_MODULE_1__["EditActionTypes"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Save", function() { return _actions__WEBPACK_IMPORTED_MODULE_1__["Save"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "LockScrollWithView", function() { return _actions__WEBPACK_IMPORTED_MODULE_1__["LockScrollWithView"]; });

/* harmony import */ var _state_reducers__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./state-reducers */ "./src/app/modules/markdown/state/state-reducers.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "moduleStateName", function() { return _state_reducers__WEBPACK_IMPORTED_MODULE_2__["moduleStateName"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "markdownReducers", function() { return _state_reducers__WEBPACK_IMPORTED_MODULE_2__["markdownReducers"]; });






/***/ }),

/***/ "./src/app/modules/markdown/state/reducers/document.ts":
/*!*************************************************************!*\
  !*** ./src/app/modules/markdown/state/reducers/document.ts ***!
  \*************************************************************/
/*! exports provided: DocumentMode, reducer, getMode, getShowPreview, getEditIt */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DocumentMode", function() { return DocumentMode; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "reducer", function() { return reducer; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getMode", function() { return getMode; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getShowPreview", function() { return getShowPreview; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getEditIt", function() { return getEditIt; });
/* harmony import */ var _actions_document__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../actions/document */ "./src/app/modules/markdown/state/actions/document.ts");

var DocumentMode = /*@__PURE__*/ (function (DocumentMode) {
    DocumentMode[DocumentMode["View"] = 0] = "View";
    DocumentMode[DocumentMode["Edit"] = 1] = "Edit";
    return DocumentMode;
})({});
const initialState = {
    mode: DocumentMode.View,
    showPreview: null
};
function reducer(state = initialState, action) {
    switch (action.type) {
        case _actions_document__WEBPACK_IMPORTED_MODULE_0__["DocumentActionTypes"].EditMode: {
            document.iamMarkdownIsPureViewMode = false;
            return Object.assign(Object.assign({}, state), { mode: DocumentMode.Edit });
        }
        case _actions_document__WEBPACK_IMPORTED_MODULE_0__["DocumentActionTypes"].ViewMode: {
            document.iamMarkdownIsPureViewMode = true;
            return Object.assign(Object.assign({}, state), { mode: DocumentMode.View });
        }
        case _actions_document__WEBPACK_IMPORTED_MODULE_0__["DocumentActionTypes"].ShowPreview: {
            return Object.assign(Object.assign({}, state), { showPreview: true });
        }
        case _actions_document__WEBPACK_IMPORTED_MODULE_0__["DocumentActionTypes"].HidePreview: {
            return Object.assign(Object.assign({}, state), { showPreview: false });
        }
        case _actions_document__WEBPACK_IMPORTED_MODULE_0__["DocumentActionTypes"].EditIt: {
            return Object.assign(Object.assign({}, state), { editIt: action.payload });
        }
        default:
            return state;
    }
}
const getMode = (state) => state.mode;
const getShowPreview = (state) => state.showPreview;
const getEditIt = (state) => state.editIt;


/***/ }),

/***/ "./src/app/modules/markdown/state/reducers/edit.ts":
/*!*********************************************************!*\
  !*** ./src/app/modules/markdown/state/reducers/edit.ts ***!
  \*********************************************************/
/*! exports provided: initialState, reducer, getSave */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "initialState", function() { return initialState; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "reducer", function() { return reducer; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getSave", function() { return getSave; });
/* harmony import */ var _actions_edit__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../actions/edit */ "./src/app/modules/markdown/state/actions/edit.ts");

const initialState = {
    save: '',
    lockScrollWithView: false,
    editor: undefined,
    content: undefined
};
function reducer(state = initialState, action) {
    switch (action.type) {
        case _actions_edit__WEBPACK_IMPORTED_MODULE_0__["EditActionTypes"].Save: {
            return Object.assign(Object.assign({}, state), { save: action.payload });
        }
        case _actions_edit__WEBPACK_IMPORTED_MODULE_0__["EditActionTypes"].LockScrollWithView: {
            return Object.assign(Object.assign({}, state), { lockScrollWithView: action.payload });
        }
        // case EditActionTypes.ContentChanged: {
        //   return {...state,...action.payload};
        // }
        default:
            return state;
    }
}
const getSave = (state) => state.save;
// export const getScrollDown = (state: State) => state.scrollDown;
// export const getEditor = (state: State) => state.editor;
// export const getSavedContent = (state: State) => state.content;


/***/ }),

/***/ "./src/app/modules/markdown/state/reducers/view.ts":
/*!*********************************************************!*\
  !*** ./src/app/modules/markdown/state/reducers/view.ts ***!
  \*********************************************************/
/*! exports provided: reducer, getViewScroll */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "reducer", function() { return reducer; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getViewScroll", function() { return getViewScroll; });
/* harmony import */ var _actions_view__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../actions/view */ "./src/app/modules/markdown/state/actions/view.ts");

const initialState = {
    isScrollDown: null
};
function reducer(state = initialState, action) {
    switch (action.type) {
        case _actions_view__WEBPACK_IMPORTED_MODULE_0__["ViewActionTypes"].Scroll: {
            return Object.assign(Object.assign({}, state), { isScrollDown: action.payload.isScrollDown });
        }
        default:
            return state;
    }
}
const getViewScroll = (state) => state.isScrollDown;


/***/ }),

/***/ "./src/app/modules/markdown/state/selectors.ts":
/*!*****************************************************!*\
  !*** ./src/app/modules/markdown/state/selectors.ts ***!
  \*****************************************************/
/*! exports provided: selectMarkdownState, selectDocumentState, selectDocumentModeState, selectDocumentShowPreviewState, selectDocumentEditItState, selectEditState, selectEditSaveState, selectEditLockScrollWithViewState, selectViewState, selectViewScrollState */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "selectMarkdownState", function() { return selectMarkdownState; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "selectDocumentState", function() { return selectDocumentState; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "selectDocumentModeState", function() { return selectDocumentModeState; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "selectDocumentShowPreviewState", function() { return selectDocumentShowPreviewState; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "selectDocumentEditItState", function() { return selectDocumentEditItState; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "selectEditState", function() { return selectEditState; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "selectEditSaveState", function() { return selectEditSaveState; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "selectEditLockScrollWithViewState", function() { return selectEditLockScrollWithViewState; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "selectViewState", function() { return selectViewState; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "selectViewScrollState", function() { return selectViewScrollState; });
/* harmony import */ var _ngrx_store__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @ngrx/store */ "./node_modules/@ngrx/store/__ivy_ngcc__/fesm2015/store.js");
/* harmony import */ var _state_reducers__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./state-reducers */ "./src/app/modules/markdown/state/state-reducers.ts");
/* harmony import */ var _reducers_document__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./reducers/document */ "./src/app/modules/markdown/state/reducers/document.ts");
/* harmony import */ var _reducers_edit__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./reducers/edit */ "./src/app/modules/markdown/state/reducers/edit.ts");
/* harmony import */ var _reducers_view__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./reducers/view */ "./src/app/modules/markdown/state/reducers/view.ts");





// document
const selectMarkdownState = Object(_ngrx_store__WEBPACK_IMPORTED_MODULE_0__["createFeatureSelector"])(_state_reducers__WEBPACK_IMPORTED_MODULE_1__["moduleStateName"]);
const selectDocumentState = Object(_ngrx_store__WEBPACK_IMPORTED_MODULE_0__["createSelector"])(selectMarkdownState, state => state.document);
const selectDocumentModeState = Object(_ngrx_store__WEBPACK_IMPORTED_MODULE_0__["createSelector"])(selectDocumentState, _reducers_document__WEBPACK_IMPORTED_MODULE_2__["getMode"]);
const selectDocumentShowPreviewState = Object(_ngrx_store__WEBPACK_IMPORTED_MODULE_0__["createSelector"])(selectDocumentState, _reducers_document__WEBPACK_IMPORTED_MODULE_2__["getShowPreview"]);
const selectDocumentEditItState = Object(_ngrx_store__WEBPACK_IMPORTED_MODULE_0__["createSelector"])(selectDocumentState, _reducers_document__WEBPACK_IMPORTED_MODULE_2__["getEditIt"]);
// edit
const selectEditState = Object(_ngrx_store__WEBPACK_IMPORTED_MODULE_0__["createSelector"])(selectMarkdownState, state => state.edit);
const selectEditSaveState = Object(_ngrx_store__WEBPACK_IMPORTED_MODULE_0__["createSelector"])(selectEditState, _reducers_edit__WEBPACK_IMPORTED_MODULE_3__["getSave"]);
const selectEditLockScrollWithViewState = Object(_ngrx_store__WEBPACK_IMPORTED_MODULE_0__["createSelector"])(selectEditState, state => state.lockScrollWithView);
// export const selectEditorState = createSelector(selectEditState, fromEdit.getEditor);
// export const selectSavedContentState = createSelector(selectEditState, fromEdit.getSavedContent);
// view
const selectViewState = Object(_ngrx_store__WEBPACK_IMPORTED_MODULE_0__["createSelector"])(selectMarkdownState, state => state.view);
const selectViewScrollState = Object(_ngrx_store__WEBPACK_IMPORTED_MODULE_0__["createSelector"])(selectViewState, _reducers_view__WEBPACK_IMPORTED_MODULE_4__["getViewScroll"]);


/***/ }),

/***/ "./src/app/modules/markdown/state/state-reducers.ts":
/*!**********************************************************!*\
  !*** ./src/app/modules/markdown/state/state-reducers.ts ***!
  \**********************************************************/
/*! exports provided: moduleStateName, markdownReducers */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "moduleStateName", function() { return moduleStateName; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "markdownReducers", function() { return markdownReducers; });
/* harmony import */ var _reducers_view__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./reducers/view */ "./src/app/modules/markdown/state/reducers/view.ts");
/* harmony import */ var _reducers_document__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./reducers/document */ "./src/app/modules/markdown/state/reducers/document.ts");
/* harmony import */ var _reducers_edit__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./reducers/edit */ "./src/app/modules/markdown/state/reducers/edit.ts");



const moduleStateName = 'markdown';
const markdownReducers = {
    document: _reducers_document__WEBPACK_IMPORTED_MODULE_1__["reducer"],
    edit: _reducers_edit__WEBPACK_IMPORTED_MODULE_2__["reducer"],
    view: _reducers_view__WEBPACK_IMPORTED_MODULE_0__["reducer"]
};


/***/ }),

/***/ "./src/app/modules/markdown/viewer/markdown-viewer-container.component.ts":
/*!********************************************************************************!*\
  !*** ./src/app/modules/markdown/viewer/markdown-viewer-container.component.ts ***!
  \********************************************************************************/
/*! exports provided: MarkdownViewerContainerComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MarkdownViewerContainerComponent", function() { return MarkdownViewerContainerComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! core */ "./src/app/modules/core/index.ts");
/* harmony import */ var _state__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../state */ "./src/app/modules/markdown/state/index.ts");
/* harmony import */ var _ngrx_store__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @ngrx/store */ "./node_modules/@ngrx/store/__ivy_ngcc__/fesm2015/store.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm2015/index.js");
/* harmony import */ var shared__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! shared */ "./src/app/modules/shared/index.ts");
/* harmony import */ var _state_reducers_document__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../state/reducers/document */ "./src/app/modules/markdown/state/reducers/document.ts");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm2015/operators/index.js");
/* harmony import */ var _model_markdown_model__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../model/markdown.model */ "./src/app/modules/markdown/model/markdown.model.ts");
/* harmony import */ var _angular_material_snack_bar__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/material/snack-bar */ "./node_modules/@angular/material/__ivy_ngcc__/fesm2015/snack-bar.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/__ivy_ngcc__/fesm2015/common.js");

















const _c0 = ["viewContainerDiv"];
function MarkdownViewerContainerComponent_ms_reading_position_indicator_2_Template(rf, ctx) {
    if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](0, "ms-reading-position-indicator", 7);
    }
    if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
        const _r1 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵreference"](8);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("element", _r1);
    }
}
const _c1 = function (a0) { return { container$: a0 }; };
const _c2 = function (a0) { return [a0]; };
let MarkdownViewerContainerComponent = /*@__PURE__*/ (() => {
    class MarkdownViewerContainerComponent {
        constructor(store, snackBar, markdownService, ngZone, _docRef, _location) {
            this.store = store;
            this.snackBar = snackBar;
            this.markdownService = markdownService;
            this.ngZone = ngZone;
            this._docRef = _docRef;
            this._location = _location;
            this.destroy$ = new rxjs__WEBPACK_IMPORTED_MODULE_4__["Subject"]();
            this.DocumentMode = _state_reducers_document__WEBPACK_IMPORTED_MODULE_6__["DocumentMode"];
            this.docMode$ = this.store.pipe(Object(_ngrx_store__WEBPACK_IMPORTED_MODULE_3__["select"])(_state__WEBPACK_IMPORTED_MODULE_2__["selectDocumentModeState"]));
            this.editWithView$ = this.store.pipe(Object(_ngrx_store__WEBPACK_IMPORTED_MODULE_3__["select"])(_state__WEBPACK_IMPORTED_MODULE_2__["selectDocumentShowPreviewState"]));
            this.defaultTimeoutHandler = err => this.snackBar.open(err.message, 'ok', { duration: core__WEBPACK_IMPORTED_MODULE_1__["MSG_DISPLAY_TIMEOUT"] });
            this.isScrollDown$ = this.store
                .select(_state__WEBPACK_IMPORTED_MODULE_2__["selectViewState"])
                .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_7__["takeUntil"])(this.destroy$))
                .subscribe(viewState => {
                // default value is null
                const v = viewState.isScrollDown;
                if (v === null || !this.viewerContainerDiv)
                    return;
                if (v) {
                    this.viewerContainerDiv.nativeElement.scrollTop += 50;
                }
                else {
                    this.viewerContainerDiv.nativeElement.scrollTop -= 50;
                }
            });
            this.isLoadDone$ = Object(rxjs__WEBPACK_IMPORTED_MODULE_4__["merge"])(Object(shared__WEBPACK_IMPORTED_MODULE_5__["monitorActionStatus$"])(this.store, shared__WEBPACK_IMPORTED_MODULE_5__["DocumentEffectsActionType"].ReadDocument, core__WEBPACK_IMPORTED_MODULE_1__["NET_COMMU_TIMEOUT"], this.defaultTimeoutHandler).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_7__["map"])(v => {
                return v.isNotStartStatus();
            })), Object(shared__WEBPACK_IMPORTED_MODULE_5__["actionStatusState$"])(this.store, shared__WEBPACK_IMPORTED_MODULE_5__["DocumentEffectsActionType"].Create).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_7__["map"])(v => v.isNotStartStatus()))).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_7__["takeUntil"])(this.destroy$), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_7__["observeOn"])(rxjs__WEBPACK_IMPORTED_MODULE_4__["asyncScheduler"]));
        }
        ngAfterViewInit() {
            const me = this;
            this.container = new core__WEBPACK_IMPORTED_MODULE_1__["ContainerRef"](this.viewerContainerDiv.nativeElement, undefined, undefined, this.ngZone);
            this.viewerContainerDiv.nativeElement.focus();
            this.scrollDown$ = this.container.scrollDown$;
            this.markdownService.viewer$.next(this.container);
            setTimeout(_ => this.scroll(), 500);
            let v_per_last = 0;
            this.isLockScrollWithView$ = this.store.pipe(Object(_ngrx_store__WEBPACK_IMPORTED_MODULE_3__["select"])(_state__WEBPACK_IMPORTED_MODULE_2__["selectEditLockScrollWithViewState"]));
            this.isLockScrollWithView$.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_7__["takeUntil"])(this.destroy$)).subscribe(isLock => {
                this.isLockScrollWithView = isLock;
            });
            this.markdownService.editor$
                .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_7__["takeUntil"])(this.destroy$), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_7__["switchMap"])(c => c.scrollDown$))
                .subscribe(value => {
                if (this.isLockScrollWithView && value.event) {
                    const edit_div = value.event.target;
                    const v_per = edit_div.scrollTop / (edit_div.scrollHeight - edit_div.clientHeight);
                    const delta_per = v_per - v_per_last;
                    v_per_last = v_per;
                    const view_div = me.viewerContainerDiv.nativeElement;
                    const delta_v_view = (view_div.scrollHeight - view_div.clientHeight) * delta_per;
                    me.viewerContainerDiv.nativeElement.scrollTop += delta_v_view;
                }
            });
            this.viewerContainerDiv.nativeElement.addEventListener('edit-it', (e) => {
                this.store.dispatch(new _state__WEBPACK_IMPORTED_MODULE_2__["EditItAction"](e.detail));
            });
        }
        scroll() {
            const hash = this.getCurrentHash();
            if (hash) {
                const element = this._docRef.document.getElementById(hash);
                if (!element)
                    return;
                element.scrollIntoView();
                this.viewerContainerDiv.nativeElement.scrollTop = element.offsetTop - 64;
            }
        }
        getCurrentHash() {
            return decodeURIComponent(this._location.hash.replace(/^#/, ''));
        }
        ngOnDestroy() {
            this.destroy$.next();
        }
    }
    MarkdownViewerContainerComponent.ɵfac = function MarkdownViewerContainerComponent_Factory(t) { return new (t || MarkdownViewerContainerComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_ngrx_store__WEBPACK_IMPORTED_MODULE_3__["Store"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_material_snack_bar__WEBPACK_IMPORTED_MODULE_9__["MatSnackBar"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_model_markdown_model__WEBPACK_IMPORTED_MODULE_8__["MARKDOWN_SERVICE_TOKEN"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgZone"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](core__WEBPACK_IMPORTED_MODULE_1__["DocumentRef"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_common__WEBPACK_IMPORTED_MODULE_10__["PlatformLocation"])); };
    MarkdownViewerContainerComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: MarkdownViewerContainerComponent, selectors: [["markdown-viewer-container"]], viewQuery: function MarkdownViewerContainerComponent_Query(rf, ctx) {
            if (rf & 1) {
                _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵviewQuery"](_c0, true);
            }
            if (rf & 2) {
                var _t;
                _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵloadQuery"]()) && (ctx.viewerContainerDiv = _t.first);
            }
        }, inputs: { markdown$: "markdown$", hideToolbar: "hideToolbar" }, decls: 11, vars: 17, consts: [[3, "scrollHide", "hide"], [3, "element", 4, "ngIf"], [3, "isRunning"], [2, "position", "relative", "height", "100%"], [1, "viewer-container"], ["viewContainerDiv", ""], [1, "markdown-viewer", 3, "model"], [3, "element"]], template: function MarkdownViewerContainerComponent_Template(rf, ctx) {
            if (rf & 1) {
                _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](0, "ms-viewer-toolbar", 0);
                _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipe"](1, "async");
                _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](2, MarkdownViewerContainerComponent_ms_reading_position_indicator_2_Template, 1, 1, "ms-reading-position-indicator", 1);
                _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipe"](3, "async");
                _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](4, "sk-three-bounce", 2);
                _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipe"](5, "async");
                _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](6, "div", 3);
                _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](7, "div", 4, 5);
                _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](9, "markdown-viewer", 6);
                _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipe"](10, "async");
                _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
                _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            }
            if (rf & 2) {
                var tmp_2_0 = null;
                const currVal_2 = (tmp_2_0 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipeBind1"](3, 7, ctx.scrollDown$)) == null ? null : tmp_2_0.isDown;
                _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("scrollHide", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpureFunction1"](15, _c2, _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpureFunction1"](13, _c1, ctx.markdownService.viewer$)))("hide", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipeBind1"](1, 5, ctx.docMode$) !== ctx.DocumentMode.View);
                _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
                _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", currVal_2);
                _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
                _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("isRunning", !_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipeBind1"](5, 9, ctx.isLoadDone$));
                _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](5);
                _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("model", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipeBind1"](10, 11, ctx.markdown$));
            }
        }, styles: [".viewer-container[_ngcontent-%COMP%] {\n  overflow-y: auto;\n  overflow-x: auto;\n  padding: 0px 3px 0px;\n  height: 100%;\n}\n\n@media all and (min-width: 960px) {\n  .viewer-container[_ngcontent-%COMP%] {\n    padding: 0px 16px 0px;\n  }\n}\n\n.markdown-viewer[_ngcontent-%COMP%] {\n  max-width: 1000px;\n  margin: auto;\n}\n\n.markdown-viewer[_ngcontent-%COMP%]:focus {\n  outline: none;\n}"] });
    return MarkdownViewerContainerComponent;
})();


/***/ })

}]);