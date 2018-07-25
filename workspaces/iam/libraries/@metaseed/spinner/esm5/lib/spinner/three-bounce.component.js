/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { SpinnerComponent, SpinnerTemplate } from './spinner.component';
var ThreeBounceComponent = /** @class */ (function (_super) {
    tslib_1.__extends(ThreeBounceComponent, _super);
    function ThreeBounceComponent() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.baseClass = 'three-bounce-spinner';
        _this.childClass = 'bounce';
        _this.numItems = 3;
        return _this;
    }
    ThreeBounceComponent.decorators = [
        { type: Component, args: [{
                    selector: 'sk-three-bounce',
                    styles: ["\n    .three-bounce-spinner {\n      margin: 25px auto;\n      width: 70px;\n    }\n    \n    .three-bounce-spinner > div {\n      display: inline-block;\n      width: 18px;\n      height: 18px;\n      \n      border-radius: 100%;\n      -webkit-animation: sk-bouncedelay 1.4s infinite ease-in-out both;\n      animation: sk-bouncedelay 1.4s infinite ease-in-out both;\n    }\n    \n    .three-bounce-spinner .bounce1 {\n      -webkit-animation-delay: -0.32s;\n      animation-delay: -0.32s;\n    }\n    \n    .three-bounce-spinner .bounce2 {\n      -webkit-animation-delay: -0.16s;\n      animation-delay: -0.16s;\n    }\n    \n    @-webkit-keyframes sk-bouncedelay {\n      0%, 80%, 100% {\n        -webkit-transform: scale(0);\n      }\n      40% {\n        -webkit-transform: scale(1.0);\n      }\n    }\n    \n    @keyframes sk-bouncedelay {\n      0%, 80%, 100% {\n        -webkit-transform: scale(0);\n        transform: scale(0);\n      }\n      40% {\n        -webkit-transform: scale(1.0);\n        transform: scale(1.0);\n      }\n    }\n  "],
                    template: SpinnerTemplate
                },] },
    ];
    return ThreeBounceComponent;
}(SpinnerComponent));
export { ThreeBounceComponent };
function ThreeBounceComponent_tsickle_Closure_declarations() {
    /** @type {!Array<{type: !Function, args: (undefined|!Array<?>)}>} */
    ThreeBounceComponent.decorators;
    /**
     * @nocollapse
     * @type {function(): !Array<(null|{type: ?, decorators: (undefined|!Array<{type: !Function, args: (undefined|!Array<?>)}>)})>}
     */
    ThreeBounceComponent.ctorParameters;
    /** @type {?} */
    ThreeBounceComponent.prototype.baseClass;
    /** @type {?} */
    ThreeBounceComponent.prototype.childClass;
    /** @type {?} */
    ThreeBounceComponent.prototype.numItems;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGhyZWUtYm91bmNlLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BtZXRhc2VlZC9zcGlubmVyLyIsInNvdXJjZXMiOlsibGliL3NwaW5uZXIvdGhyZWUtYm91bmNlLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDMUMsT0FBTyxFQUFFLGdCQUFnQixFQUFFLGVBQWUsRUFBRSxNQUFNLHFCQUFxQixDQUFDOztJQXFEOUIsZ0RBQWdCOzs7MEJBQzdCLHNCQUFzQjsyQkFDckIsUUFBUTt5QkFDVixDQUFDOzs7O2dCQXRENUIsU0FBUyxTQUFDO29CQUNULFFBQVEsRUFBRSxpQkFBaUI7b0JBQzNCLE1BQU0sRUFBRSxDQUFDLDZoQ0E2Q1IsQ0FBQztvQkFDRixRQUFRLEVBQUUsZUFBZTtpQkFDMUI7OytCQXBERDtFQXNEMEMsZ0JBQWdCO1NBQTdDLG9CQUFvQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBTcGlubmVyQ29tcG9uZW50LCBTcGlubmVyVGVtcGxhdGUgfSBmcm9tICcuL3NwaW5uZXIuY29tcG9uZW50JztcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gIHNlbGVjdG9yOiAnc2stdGhyZWUtYm91bmNlJyxcclxuICBzdHlsZXM6IFtgXHJcbiAgICAudGhyZWUtYm91bmNlLXNwaW5uZXIge1xyXG4gICAgICBtYXJnaW46IDI1cHggYXV0bztcclxuICAgICAgd2lkdGg6IDcwcHg7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIC50aHJlZS1ib3VuY2Utc3Bpbm5lciA+IGRpdiB7XHJcbiAgICAgIGRpc3BsYXk6IGlubGluZS1ibG9jaztcclxuICAgICAgd2lkdGg6IDE4cHg7XHJcbiAgICAgIGhlaWdodDogMThweDtcclxuICAgICAgXHJcbiAgICAgIGJvcmRlci1yYWRpdXM6IDEwMCU7XHJcbiAgICAgIC13ZWJraXQtYW5pbWF0aW9uOiBzay1ib3VuY2VkZWxheSAxLjRzIGluZmluaXRlIGVhc2UtaW4tb3V0IGJvdGg7XHJcbiAgICAgIGFuaW1hdGlvbjogc2stYm91bmNlZGVsYXkgMS40cyBpbmZpbml0ZSBlYXNlLWluLW91dCBib3RoO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICAudGhyZWUtYm91bmNlLXNwaW5uZXIgLmJvdW5jZTEge1xyXG4gICAgICAtd2Via2l0LWFuaW1hdGlvbi1kZWxheTogLTAuMzJzO1xyXG4gICAgICBhbmltYXRpb24tZGVsYXk6IC0wLjMycztcclxuICAgIH1cclxuICAgIFxyXG4gICAgLnRocmVlLWJvdW5jZS1zcGlubmVyIC5ib3VuY2UyIHtcclxuICAgICAgLXdlYmtpdC1hbmltYXRpb24tZGVsYXk6IC0wLjE2cztcclxuICAgICAgYW5pbWF0aW9uLWRlbGF5OiAtMC4xNnM7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIEAtd2Via2l0LWtleWZyYW1lcyBzay1ib3VuY2VkZWxheSB7XHJcbiAgICAgIDAlLCA4MCUsIDEwMCUge1xyXG4gICAgICAgIC13ZWJraXQtdHJhbnNmb3JtOiBzY2FsZSgwKTtcclxuICAgICAgfVxyXG4gICAgICA0MCUge1xyXG4gICAgICAgIC13ZWJraXQtdHJhbnNmb3JtOiBzY2FsZSgxLjApO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICBcclxuICAgIEBrZXlmcmFtZXMgc2stYm91bmNlZGVsYXkge1xyXG4gICAgICAwJSwgODAlLCAxMDAlIHtcclxuICAgICAgICAtd2Via2l0LXRyYW5zZm9ybTogc2NhbGUoMCk7XHJcbiAgICAgICAgdHJhbnNmb3JtOiBzY2FsZSgwKTtcclxuICAgICAgfVxyXG4gICAgICA0MCUge1xyXG4gICAgICAgIC13ZWJraXQtdHJhbnNmb3JtOiBzY2FsZSgxLjApO1xyXG4gICAgICAgIHRyYW5zZm9ybTogc2NhbGUoMS4wKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIGBdLFxyXG4gIHRlbXBsYXRlOiBTcGlubmVyVGVtcGxhdGVcclxufSlcclxuXHJcbmV4cG9ydCBjbGFzcyBUaHJlZUJvdW5jZUNvbXBvbmVudCBleHRlbmRzIFNwaW5uZXJDb21wb25lbnQge1xyXG4gIHB1YmxpYyBiYXNlQ2xhc3M6IHN0cmluZyA9ICd0aHJlZS1ib3VuY2Utc3Bpbm5lcic7XHJcbiAgcHVibGljIGNoaWxkQ2xhc3M6IHN0cmluZyA9ICdib3VuY2UnO1xyXG4gIHB1YmxpYyBudW1JdGVtczogbnVtYmVyID0gMztcclxufVxyXG4iXX0=