(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["default~app-modules-markdown-markdown-module~toc-toc-module"],{

/***/ "./src/app/modules/markdown/viewer/elements/toc/toc.component.ts":
/*!***********************************************************************!*\
  !*** ./src/app/modules/markdown/viewer/elements/toc/toc.component.ts ***!
  \***********************************************************************/
/*! exports provided: TocComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TocComponent", function() { return TocComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm2015/operators/index.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm2015/index.js");
/* harmony import */ var _angular_cdk_layout__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/cdk/layout */ "./node_modules/@angular/cdk/__ivy_ngcc__/fesm2015/layout.js");
/* harmony import */ var core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! core */ "./src/app/modules/core/index.ts");
/* harmony import */ var _services_toc_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../services/toc.service */ "./src/app/modules/markdown/viewer/services/toc.service.ts");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/__ivy_ngcc__/fesm2015/common.js");
/* harmony import */ var _angular_material_icon__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/material/icon */ "./node_modules/@angular/material/__ivy_ngcc__/fesm2015/icon.js");


 // rxjs 6







const _c0 = ["tocItem"];
function TocComponent_div_0_div_1_div_1_Template(rf, ctx) {
    if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 10);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1, "Contents");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    }
}
function TocComponent_div_0_div_1_button_2_Template(rf, ctx) {
    if (rf & 1) {
        const _r8 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "button", 11);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function TocComponent_div_0_div_1_button_2_Template_button_click_0_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r8); const ctx_r7 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](3); return ctx_r7.toggle(false); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1, " Contents ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](2, "mat-icon", 12);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    }
    if (rf & 2) {
        const ctx_r4 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵattribute"]("aria-pressed", !ctx_r4.isCollapsed);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵclassProp"]("collapsed", ctx_r4.isCollapsed);
    }
}
function TocComponent_div_0_div_1_ng_container_4_li_1_Template(rf, ctx) {
    if (rf & 1) {
        const _r15 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "li", 14, 15);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "div", 16);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function TocComponent_div_0_div_1_ng_container_4_li_1_Template_div_click_2_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r15); const toc_r9 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]().$implicit; const ctx_r13 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](3); return ctx_r13.navigate(toc_r9.href); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](3, "a", 17);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    }
    if (rf & 2) {
        const ctx_r16 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
        const toc_r9 = ctx_r16.$implicit;
        const i_r10 = ctx_r16.index;
        const ctx_r11 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵclassMap"](toc_r9.level);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵclassProp"]("secondary", ctx_r11.type === "EmbeddedExpandable" && i_r10 >= ctx_r11.primaryMax)("active", i_r10 === ctx_r11.activeIndex);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpropertyInterpolate"]("title", toc_r9.title);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("href", toc_r9.href, _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵsanitizeUrl"])("innerHTML", toc_r9.content, _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵsanitizeHtml"]);
    }
}
function TocComponent_div_0_div_1_ng_container_4_Template(rf, ctx) {
    if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerStart"](0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](1, TocComponent_div_0_div_1_ng_container_4_li_1_Template, 4, 10, "li", 13);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerEnd"]();
    }
    if (rf & 2) {
        const toc_r9 = ctx.$implicit;
        const ctx_r5 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx_r5.type === "Floating" || toc_r9.level !== "h1");
    }
}
function TocComponent_div_0_div_1_button_5_Template(rf, ctx) {
    if (rf & 1) {
        const _r18 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "button", 18);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function TocComponent_div_0_div_1_button_5_Template_button_click_0_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r18); const ctx_r17 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](3); return ctx_r17.toggle(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    }
    if (rf & 2) {
        const ctx_r6 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵclassProp"]("collapsed", ctx_r6.isCollapsed);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵattribute"]("aria-pressed", !ctx_r6.isCollapsed);
    }
}
function TocComponent_div_0_div_1_Template(rf, ctx) {
    if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](1, TocComponent_div_0_div_1_div_1_Template, 2, 0, "div", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](2, TocComponent_div_0_div_1_button_2_Template, 3, 3, "button", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "ul", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](4, TocComponent_div_0_div_1_ng_container_4_Template, 2, 1, "ng-container", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](5, TocComponent_div_0_div_1_button_5_Template, 1, 3, "button", 9);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    }
    if (rf & 2) {
        const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵclassProp"]("collapsed", ctx_r2.isCollapsed);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx_r2.type === "EmbeddedSimple");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx_r2.type === "EmbeddedExpandable");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵclassProp"]("embedded", ctx_r2.type !== "Floating");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngForOf", ctx_r2.tocList);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx_r2.type === "EmbeddedExpandable");
    }
}
function TocComponent_div_0_Template(rf, ctx) {
    if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](1, TocComponent_div_0_div_1_Template, 6, 8, "div", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    }
    if (rf & 2) {
        const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx_r0.type !== "None");
    }
}
function TocComponent_button_1_Template(rf, ctx) {
    if (rf & 1) {
        const _r20 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "button", 19);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function TocComponent_button_1_Template_button_click_0_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r20); const ctx_r19 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](); return ctx_r19.toggleToc(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1, " TOC\n");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    }
}
let TocComponent = /*@__PURE__*/ (() => {
    class TocComponent {
        constructor(bm, scrollService, tocService, elementRef, location) {
            this.bm = bm;
            this.scrollService = scrollService;
            this.tocService = tocService;
            this.elementRef = elementRef;
            this.location = location;
            this.activeIndex = null;
            this.type = 'None';
            this.show = true;
            this.isCollapsed = true;
            this.isEmbedded = false;
            this.onDestroy = new rxjs__WEBPACK_IMPORTED_MODULE_2__["Subject"]();
            this.primaryMax = 4;
            bm.observe([_angular_cdk_layout__WEBPACK_IMPORTED_MODULE_3__["Breakpoints"].Small, _angular_cdk_layout__WEBPACK_IMPORTED_MODULE_3__["Breakpoints"].XSmall]).subscribe((state) => {
                if (state.matches) {
                    this.show = false;
                    this.isSmallScreen = true;
                }
                else {
                    this.show = true;
                    this.isSmallScreen = false;
                }
            });
            this.isEmbedded = elementRef.nativeElement.className.indexOf('embedded') !== -1;
        }
        static prepareTitleAndToc(targetElem, docId, tocService, titleService) {
            const titleEl = targetElem.querySelector('h1');
            const needsToc = !!titleEl && !/no-?toc/i.test(titleEl.className);
            const embeddedToc = targetElem.querySelector('i-toc.embedded');
            if (needsToc && !embeddedToc) {
                // Add an embedded ToC if it's needed and there isn't one in the content already.
                titleEl.insertAdjacentHTML('afterend', '<i-toc></i-toc>');
            }
            else if (!needsToc && embeddedToc) {
                // Remove the embedded Toc if it's there and not needed.
                embeddedToc.remove();
            }
            return () => {
                tocService.reset();
                let title = '';
                // Only create ToC for docs with an `<h1>` heading.
                // If you don't want a ToC, add "no-toc" class to `<h1>`.
                if (titleEl) {
                    title = typeof titleEl.innerText === 'string' ? titleEl.innerText : titleEl.textContent;
                    if (needsToc) {
                        tocService.genToc(targetElem, docId);
                    }
                }
                // titleService.setTitle(title ? `Angular - ${title}` : "Angular");
            };
        }
        ngOnInit() {
            this.tocService.tocList
                .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["takeUntil"])(this.onDestroy), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["subscribeOn"])(rxjs__WEBPACK_IMPORTED_MODULE_2__["asapScheduler"]))
                .subscribe(tocList => {
                const itemCount = count(tocList, item => item.level !== 'h1');
                this.type =
                    itemCount > 0
                        ? this.isEmbedded
                            ? itemCount > this.primaryMax
                                ? 'EmbeddedExpandable'
                                : 'EmbeddedSimple'
                            : 'Floating'
                        : 'None';
                this.tocList = tocList;
            });
        }
        ngAfterViewInit() {
            if (!this.isEmbedded) {
                // We use the `asap` scheduler because updates to `activeItemIndex` are triggered by DOM changes,
                // which, in turn, are caused by the rendering that happened due to a ChangeDetection.
                // Without asap, we would be updating the model while still in a ChangeDetection handler, which is disallowed by Angular.
                Object(rxjs__WEBPACK_IMPORTED_MODULE_2__["combineLatest"])(this.tocService.activeItemIndex.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["subscribeOn"])(rxjs__WEBPACK_IMPORTED_MODULE_2__["asapScheduler"])), this.items.changes.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["startWith"])(this.items)))
                    .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["takeUntil"])(this.onDestroy))
                    .subscribe(([index, items]) => {
                    this.activeIndex = index;
                    if (index === null || index >= items.length) {
                        return;
                    }
                    const e = items.toArray()[index].nativeElement;
                    const p = e.offsetParent;
                    if (!p)
                        return;
                    const eRect = e.getBoundingClientRect();
                    const pRect = p.getBoundingClientRect();
                    const isInViewport = eRect.top >= pRect.top && eRect.bottom <= pRect.bottom;
                    if (!isInViewport) {
                        p.scrollTop += eRect.top - pRect.top - p.clientHeight / 2;
                    }
                });
            }
        }
        ngOnDestroy() {
            this.onDestroy.next();
        }
        toggle(canScroll = true) {
            this.isCollapsed = !this.isCollapsed;
            if (canScroll && this.isCollapsed) {
                this.toTop();
            }
        }
        onClick(event) {
            if (!this.elementRef.nativeElement.contains(event.target)) {
                this.show = false;
            }
        }
        navigate(addr) {
            if (this.isSmallScreen)
                this.show = false;
        }
        toTop() {
            this.scrollService.scrollToTop();
        }
        toggleToc() {
            this.show = !this.show;
        }
    }
    TocComponent.ɵfac = function TocComponent_Factory(t) { return new (t || TocComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_cdk_layout__WEBPACK_IMPORTED_MODULE_3__["BreakpointObserver"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](core__WEBPACK_IMPORTED_MODULE_4__["ScrollService"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_services_toc_service__WEBPACK_IMPORTED_MODULE_5__["TocService"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_0__["ElementRef"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_common__WEBPACK_IMPORTED_MODULE_6__["Location"])); };
    TocComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: TocComponent, selectors: [["i-toc"]], viewQuery: function TocComponent_Query(rf, ctx) {
            if (rf & 1) {
                _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵviewQuery"](_c0, true);
            }
            if (rf & 2) {
                var _t;
                _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵloadQuery"]()) && (ctx.items = _t);
            }
        }, hostBindings: function TocComponent_HostBindings(rf, ctx) {
            if (rf & 1) {
                _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function TocComponent_click_HostBindingHandler($event) { return ctx.onClick($event); }, false, _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵresolveDocument"]);
            }
        }, decls: 2, vars: 2, consts: [["class", "toc-container no-print", 4, "ngIf"], ["style", "color:#ffffffcc;background-color: #c1c1c1aa;cursor:pointer;z-index:100;position:fixed;right:6px;bottom:30px;", 3, "click", 4, "ngIf"], [1, "toc-container", "no-print"], ["class", "toc-inner no-print", 3, "collapsed", 4, "ngIf"], [1, "toc-inner", "no-print"], ["class", "toc-heading embedded", 4, "ngIf"], ["type", "button", "class", "toc-heading embedded secondary", "title", "Expand/collapse contents", "aria-label", "Expand/collapse contents", 3, "click", 4, "ngIf"], [1, "toc-list"], [4, "ngFor", "ngForOf"], ["type", "button", "class", "toc-more-items embedded material-icons", "title", "Expand/collapse contents", "aria-label", "Expand/collapse contents", 3, "collapsed", "click", 4, "ngIf"], [1, "toc-heading", "embedded"], ["type", "button", "title", "Expand/collapse contents", "aria-label", "Expand/collapse contents", 1, "toc-heading", "embedded", "secondary", 3, "click"], ["svgIcon", "keyboard_arrow_right", 1, "rotating-icon"], [3, "title", "class", "secondary", "active", 4, "ngIf"], [3, "title"], ["tocItem", ""], [2, "display", "inline-block", 3, "click"], [3, "href", "innerHTML"], ["type", "button", "title", "Expand/collapse contents", "aria-label", "Expand/collapse contents", 1, "toc-more-items", "embedded", "material-icons", 3, "click"], [2, "color", "#ffffffcc", "background-color", "#c1c1c1aa", "cursor", "pointer", "z-index", "100", "position", "fixed", "right", "6px", "bottom", "30px", 3, "click"]], template: function TocComponent_Template(rf, ctx) {
            if (rf & 1) {
                _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](0, TocComponent_div_0_Template, 2, 1, "div", 0);
                _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](1, TocComponent_button_1_Template, 2, 0, "button", 1);
            }
            if (rf & 2) {
                _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx.show);
                _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
                _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx.tocService.isScrollUp);
            }
        }, directives: [_angular_common__WEBPACK_IMPORTED_MODULE_6__["NgIf"], _angular_common__WEBPACK_IMPORTED_MODULE_6__["NgForOf"], _angular_material_icon__WEBPACK_IMPORTED_MODULE_7__["MatIcon"]], encapsulation: 2 });
    return TocComponent;
})();
function count(array, fn) {
    return array.reduce((count, item) => (fn(item) ? count + 1 : count), 0);
}


/***/ }),

/***/ "./src/app/modules/markdown/viewer/services/toc.service.ts":
/*!*****************************************************************!*\
  !*** ./src/app/modules/markdown/viewer/services/toc.service.ts ***!
  \*****************************************************************/
/*! exports provided: TocService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TocService", function() { return TocService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm2015/index.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/__ivy_ngcc__/fesm2015/common.js");
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/platform-browser */ "./node_modules/@angular/platform-browser/__ivy_ngcc__/fesm2015/platform-browser.js");
/* harmony import */ var core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! core */ "./src/app/modules/core/index.ts");






let TocService = /*@__PURE__*/ (() => {
    class TocService {
        constructor(document, domSanitizer, scrollSpyService) {
            this.document = document;
            this.domSanitizer = domSanitizer;
            this.scrollSpyService = scrollSpyService;
            this.tocList = new rxjs__WEBPACK_IMPORTED_MODULE_1__["ReplaySubject"](1);
            this.activeItemIndex = new rxjs__WEBPACK_IMPORTED_MODULE_1__["ReplaySubject"](1);
            this.activeElement$ = new rxjs__WEBPACK_IMPORTED_MODULE_1__["ReplaySubject"](1);
            this.scrollSpyToken = null;
            this.isScrollUp = false;
        }
        genToc(docElement, docId = '') {
            this.resetScrollSpyInfo();
            if (!docElement) {
                this.tocList.next([]);
                return;
            }
            const headings = this.findTocHeadings(docElement);
            const idMap = new Map();
            const tocList = headings.map(heading => ({
                content: this.extractHeadingSafeHtml(heading),
                href: `${docId}#${this.getId(heading, idMap)}`,
                level: heading.tagName.toLowerCase(),
                title: (heading.textContent || '').trim()
            }));
            this.tocList.next(tocList);
            this.scrollSpyToken = this.scrollSpyService.spyOn(headings, docElement, 60);
            this.scrollSpyToken.activeScrollElement$.subscribe(item => {
                this.activeItemIndex.next(item && item.index);
                this.activeElement$.next(item && item.element);
            });
            this.scrollSpyToken.isScrollDown$.subscribe(i => {
                this.isScrollUp = !i.isDown;
            });
        }
        reset() {
            this.resetScrollSpyInfo();
            this.tocList.next([]);
        }
        // This bad boy exists only to strip off the anchor link attached to a heading
        extractHeadingSafeHtml(heading) {
            const div = this.document.createElement('div');
            div.innerHTML = heading.innerHTML;
            const anchorLinks = div.querySelectorAll('a');
            for (let i = 0; i < anchorLinks.length; i++) {
                const anchorLink = anchorLinks[i];
                if (!anchorLink.classList.contains('deep-link') &&
                    !anchorLink.classList.contains('edit-it')) {
                    // this is an anchor that contains actual content that we want to keep
                    // move the contents of the anchor into its parent
                    const parent = anchorLink.parentNode;
                    while (anchorLink.childNodes.length) {
                        parent.insertBefore(anchorLink.childNodes[0], anchorLink);
                    }
                }
                // now remove the anchor
                anchorLink.remove();
            }
            // security: the document element which provides this heading content
            // is always authored by the documentation team and is considered to be safe
            return this.domSanitizer.bypassSecurityTrustHtml(div.innerHTML.trim());
        }
        findTocHeadings(docElement) {
            const headings = docElement.querySelectorAll('h1,h2,h3');
            const skipNoTocHeadings = (heading) => !/(?:no-toc|notoc)/i.test(heading.className);
            return Array.prototype.filter.call(headings, skipNoTocHeadings);
        }
        resetScrollSpyInfo() {
            if (this.scrollSpyToken) {
                this.scrollSpyToken.unspy();
                this.scrollSpyToken = null;
            }
            this.activeItemIndex.next(null);
            this.activeElement$.next(null);
        }
        // Extract the id from the heading; create one if necessary
        // Is it possible for a heading to lack an id?
        getId(h, idMap) {
            let id = h.id;
            if (id) {
                addToMap(id);
            }
            else {
                id = (h.textContent || '')
                    .trim()
                    .toLowerCase()
                    .replace(/\W+/g, '-');
                id = addToMap(id);
                h.id = id;
            }
            return id;
            // Map guards against duplicate id creation.
            function addToMap(key) {
                const oldCount = idMap.get(key) || 0;
                const count = oldCount + 1;
                idMap.set(key, count);
                return count === 1 ? key : `${key}-${count}`;
            }
        }
    }
    TocService.ɵfac = function TocService_Factory(t) { return new (t || TocService)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵinject"](_angular_common__WEBPACK_IMPORTED_MODULE_2__["DOCUMENT"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵinject"](_angular_platform_browser__WEBPACK_IMPORTED_MODULE_3__["DomSanitizer"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵinject"](core__WEBPACK_IMPORTED_MODULE_4__["ScrollSpyService"])); };
    TocService.ɵprov = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjectable"]({ token: TocService, factory: TocService.ɵfac });
    return TocService;
})();


/***/ })

}]);