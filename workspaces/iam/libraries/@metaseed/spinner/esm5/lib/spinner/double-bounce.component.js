/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { SpinnerComponent, SpinnerTemplate } from './spinner.component';
var DoubleBounceComponent = /** @class */ (function (_super) {
    tslib_1.__extends(DoubleBounceComponent, _super);
    function DoubleBounceComponent() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.baseClass = 'double-bounce-spinner';
        _this.childClass = 'double-bounce';
        _this.numItems = 2;
        return _this;
    }
    DoubleBounceComponent.decorators = [
        { type: Component, args: [{
                    selector: 'sk-double-bounce',
                    styles: ["\n    .double-bounce-spinner {\n      position: relative;\n      margin: 25px auto;\n      width: 40px;\n      height: 40px;\n    }\n    \n    .double-bounce1,\n    .double-bounce2 {\n      position: absolute;\n      top: 0;\n      left: 0;\n      width: 100%;\n      height: 100%;\n      border-radius: 50%;\n      opacity: 0.6;\n      \n      -webkit-animation: sk-bounce 2.0s infinite ease-in-out;\n      animation: sk-bounce 2.0s infinite ease-in-out;\n    }\n    \n    .double-bounce2 {\n      -webkit-animation-delay: -1.0s;\n      animation-delay: -1.0s;\n    }\n    \n    @-webkit-keyframes sk-bounce {\n      0%, 100% {\n        -webkit-transform: scale(0.0);\n      }\n      50% {\n        -webkit-transform: scale(1.0);\n      }\n    }\n    \n    @keyframes sk-bounce {\n      0%, 100% {\n        transform: scale(0.0);\n        -webkit-transform: scale(0.0);\n      }\n      50% {\n        transform: scale(1.0);\n        -webkit-transform: scale(1.0);\n      }\n    }\n  "],
                    template: SpinnerTemplate
                },] },
    ];
    return DoubleBounceComponent;
}(SpinnerComponent));
export { DoubleBounceComponent };
function DoubleBounceComponent_tsickle_Closure_declarations() {
    /** @type {!Array<{type: !Function, args: (undefined|!Array<?>)}>} */
    DoubleBounceComponent.decorators;
    /**
     * @nocollapse
     * @type {function(): !Array<(null|{type: ?, decorators: (undefined|!Array<{type: !Function, args: (undefined|!Array<?>)}>)})>}
     */
    DoubleBounceComponent.ctorParameters;
    /** @type {?} */
    DoubleBounceComponent.prototype.baseClass;
    /** @type {?} */
    DoubleBounceComponent.prototype.childClass;
    /** @type {?} */
    DoubleBounceComponent.prototype.numItems;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZG91YmxlLWJvdW5jZS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AbWV0YXNlZWQvc3Bpbm5lci8iLCJzb3VyY2VzIjpbImxpYi9zcGlubmVyL2RvdWJsZS1ib3VuY2UuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMxQyxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsZUFBZSxFQUFFLE1BQU0scUJBQXFCLENBQUM7O0lBc0Q3QixpREFBZ0I7OzswQkFDOUIsdUJBQXVCOzJCQUN0QixlQUFlO3lCQUNqQixDQUFDOzs7O2dCQXZENUIsU0FBUyxTQUFDO29CQUNULFFBQVEsRUFBRSxrQkFBa0I7b0JBQzVCLE1BQU0sRUFBRSxDQUFDLDA5QkE4Q1IsQ0FBQztvQkFDRixRQUFRLEVBQUUsZUFBZTtpQkFDMUI7O2dDQXJERDtFQXVEMkMsZ0JBQWdCO1NBQTlDLHFCQUFxQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBTcGlubmVyQ29tcG9uZW50LCBTcGlubmVyVGVtcGxhdGUgfSBmcm9tICcuL3NwaW5uZXIuY29tcG9uZW50JztcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gIHNlbGVjdG9yOiAnc2stZG91YmxlLWJvdW5jZScsXHJcbiAgc3R5bGVzOiBbYFxyXG4gICAgLmRvdWJsZS1ib3VuY2Utc3Bpbm5lciB7XHJcbiAgICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcclxuICAgICAgbWFyZ2luOiAyNXB4IGF1dG87XHJcbiAgICAgIHdpZHRoOiA0MHB4O1xyXG4gICAgICBoZWlnaHQ6IDQwcHg7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIC5kb3VibGUtYm91bmNlMSxcclxuICAgIC5kb3VibGUtYm91bmNlMiB7XHJcbiAgICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcclxuICAgICAgdG9wOiAwO1xyXG4gICAgICBsZWZ0OiAwO1xyXG4gICAgICB3aWR0aDogMTAwJTtcclxuICAgICAgaGVpZ2h0OiAxMDAlO1xyXG4gICAgICBib3JkZXItcmFkaXVzOiA1MCU7XHJcbiAgICAgIG9wYWNpdHk6IDAuNjtcclxuICAgICAgXHJcbiAgICAgIC13ZWJraXQtYW5pbWF0aW9uOiBzay1ib3VuY2UgMi4wcyBpbmZpbml0ZSBlYXNlLWluLW91dDtcclxuICAgICAgYW5pbWF0aW9uOiBzay1ib3VuY2UgMi4wcyBpbmZpbml0ZSBlYXNlLWluLW91dDtcclxuICAgIH1cclxuICAgIFxyXG4gICAgLmRvdWJsZS1ib3VuY2UyIHtcclxuICAgICAgLXdlYmtpdC1hbmltYXRpb24tZGVsYXk6IC0xLjBzO1xyXG4gICAgICBhbmltYXRpb24tZGVsYXk6IC0xLjBzO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICBALXdlYmtpdC1rZXlmcmFtZXMgc2stYm91bmNlIHtcclxuICAgICAgMCUsIDEwMCUge1xyXG4gICAgICAgIC13ZWJraXQtdHJhbnNmb3JtOiBzY2FsZSgwLjApO1xyXG4gICAgICB9XHJcbiAgICAgIDUwJSB7XHJcbiAgICAgICAgLXdlYmtpdC10cmFuc2Zvcm06IHNjYWxlKDEuMCk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIFxyXG4gICAgQGtleWZyYW1lcyBzay1ib3VuY2Uge1xyXG4gICAgICAwJSwgMTAwJSB7XHJcbiAgICAgICAgdHJhbnNmb3JtOiBzY2FsZSgwLjApO1xyXG4gICAgICAgIC13ZWJraXQtdHJhbnNmb3JtOiBzY2FsZSgwLjApO1xyXG4gICAgICB9XHJcbiAgICAgIDUwJSB7XHJcbiAgICAgICAgdHJhbnNmb3JtOiBzY2FsZSgxLjApO1xyXG4gICAgICAgIC13ZWJraXQtdHJhbnNmb3JtOiBzY2FsZSgxLjApO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgYF0sXHJcbiAgdGVtcGxhdGU6IFNwaW5uZXJUZW1wbGF0ZVxyXG59KVxyXG5cclxuZXhwb3J0IGNsYXNzIERvdWJsZUJvdW5jZUNvbXBvbmVudCBleHRlbmRzIFNwaW5uZXJDb21wb25lbnQge1xyXG4gIHB1YmxpYyBiYXNlQ2xhc3M6IHN0cmluZyA9ICdkb3VibGUtYm91bmNlLXNwaW5uZXInO1xyXG4gIHB1YmxpYyBjaGlsZENsYXNzOiBzdHJpbmcgPSAnZG91YmxlLWJvdW5jZSc7XHJcbiAgcHVibGljIG51bUl0ZW1zOiBudW1iZXIgPSAyO1xyXG59XHJcbiJdfQ==