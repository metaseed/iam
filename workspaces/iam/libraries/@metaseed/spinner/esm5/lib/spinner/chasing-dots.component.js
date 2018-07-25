/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { SpinnerComponent, SpinnerTemplate } from './spinner.component';
var ChasingDotsComponent = /** @class */ (function (_super) {
    tslib_1.__extends(ChasingDotsComponent, _super);
    function ChasingDotsComponent() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.baseClass = 'chasing-dots-spinner';
        _this.childClass = 'dot';
        _this.numItems = 2;
        return _this;
    }
    ChasingDotsComponent.decorators = [
        { type: Component, args: [{
                    selector: 'sk-chasing-dots',
                    styles: ["\n    .chasing-dots-spinner {\n      position: relative;\n      margin: 25px auto;\n      width: 40px;\n      height: 40px;\n      \n      -webkit-animation: sk-rotate 2.0s infinite linear;\n      animation: sk-rotate 2.0s infinite linear;\n    }\n    \n    .dot1,\n    .dot2 {\n      position: absolute;\n      top: 0;\n      display: inline-block;\n      width: 60%;\n      height: 60%;\n      border-radius: 100%;\n      \n      -webkit-animation: sk-bounce 2.0s infinite ease-in-out;\n      animation: sk-bounce 2.0s infinite ease-in-out;\n    }\n    \n    .dot2 {\n      top: auto;\n      bottom: 0;\n      -webkit-animation-delay: -1.0s;\n      animation-delay: -1.0s;\n    }\n    \n    @-webkit-keyframes sk-rotate {\n      100% {\n        -webkit-transform: rotate(360deg);\n      }\n    }\n    \n    @keyframes sk-rotate {\n      100% {\n        transform: rotate(360deg);\n        -webkit-transform: rotate(360deg);\n      }\n    }\n    \n    @-webkit-keyframes sk-bounce {\n      0%, 100% {\n        -webkit-transform: scale(0.0);\n      }\n      50% {\n        -webkit-transform: scale(1.0);\n      }\n    }\n    \n    @keyframes sk-bounce {\n      0%, 100% {\n        transform: scale(0.0);\n        -webkit-transform: scale(0.0);\n      }\n      50% {\n        transform: scale(1.0);\n        -webkit-transform: scale(1.0);\n      }\n    }\n  "],
                    template: SpinnerTemplate
                },] },
    ];
    return ChasingDotsComponent;
}(SpinnerComponent));
export { ChasingDotsComponent };
function ChasingDotsComponent_tsickle_Closure_declarations() {
    /** @type {!Array<{type: !Function, args: (undefined|!Array<?>)}>} */
    ChasingDotsComponent.decorators;
    /**
     * @nocollapse
     * @type {function(): !Array<(null|{type: ?, decorators: (undefined|!Array<{type: !Function, args: (undefined|!Array<?>)}>)})>}
     */
    ChasingDotsComponent.ctorParameters;
    /** @type {?} */
    ChasingDotsComponent.prototype.baseClass;
    /** @type {?} */
    ChasingDotsComponent.prototype.childClass;
    /** @type {?} */
    ChasingDotsComponent.prototype.numItems;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hhc2luZy1kb3RzLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BtZXRhc2VlZC9zcGlubmVyLyIsInNvdXJjZXMiOlsibGliL3NwaW5uZXIvY2hhc2luZy1kb3RzLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDMUMsT0FBTyxFQUFFLGdCQUFnQixFQUFFLGVBQWUsRUFBRSxNQUFNLHFCQUFxQixDQUFDOztJQXVFOUIsZ0RBQWdCOzs7MEJBQzdCLHNCQUFzQjsyQkFDckIsS0FBSzt5QkFDUCxDQUFDOzs7O2dCQXhFNUIsU0FBUyxTQUFDO29CQUNULFFBQVEsRUFBRSxpQkFBaUI7b0JBQzNCLE1BQU0sRUFBRSxDQUFDLCswQ0ErRFIsQ0FBQztvQkFDRixRQUFRLEVBQUUsZUFBZTtpQkFDMUI7OytCQXRFRDtFQXdFMEMsZ0JBQWdCO1NBQTdDLG9CQUFvQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBTcGlubmVyQ29tcG9uZW50LCBTcGlubmVyVGVtcGxhdGUgfSBmcm9tICcuL3NwaW5uZXIuY29tcG9uZW50JztcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gIHNlbGVjdG9yOiAnc2stY2hhc2luZy1kb3RzJyxcclxuICBzdHlsZXM6IFtgXHJcbiAgICAuY2hhc2luZy1kb3RzLXNwaW5uZXIge1xyXG4gICAgICBwb3NpdGlvbjogcmVsYXRpdmU7XHJcbiAgICAgIG1hcmdpbjogMjVweCBhdXRvO1xyXG4gICAgICB3aWR0aDogNDBweDtcclxuICAgICAgaGVpZ2h0OiA0MHB4O1xyXG4gICAgICBcclxuICAgICAgLXdlYmtpdC1hbmltYXRpb246IHNrLXJvdGF0ZSAyLjBzIGluZmluaXRlIGxpbmVhcjtcclxuICAgICAgYW5pbWF0aW9uOiBzay1yb3RhdGUgMi4wcyBpbmZpbml0ZSBsaW5lYXI7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIC5kb3QxLFxyXG4gICAgLmRvdDIge1xyXG4gICAgICBwb3NpdGlvbjogYWJzb2x1dGU7XHJcbiAgICAgIHRvcDogMDtcclxuICAgICAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xyXG4gICAgICB3aWR0aDogNjAlO1xyXG4gICAgICBoZWlnaHQ6IDYwJTtcclxuICAgICAgYm9yZGVyLXJhZGl1czogMTAwJTtcclxuICAgICAgXHJcbiAgICAgIC13ZWJraXQtYW5pbWF0aW9uOiBzay1ib3VuY2UgMi4wcyBpbmZpbml0ZSBlYXNlLWluLW91dDtcclxuICAgICAgYW5pbWF0aW9uOiBzay1ib3VuY2UgMi4wcyBpbmZpbml0ZSBlYXNlLWluLW91dDtcclxuICAgIH1cclxuICAgIFxyXG4gICAgLmRvdDIge1xyXG4gICAgICB0b3A6IGF1dG87XHJcbiAgICAgIGJvdHRvbTogMDtcclxuICAgICAgLXdlYmtpdC1hbmltYXRpb24tZGVsYXk6IC0xLjBzO1xyXG4gICAgICBhbmltYXRpb24tZGVsYXk6IC0xLjBzO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICBALXdlYmtpdC1rZXlmcmFtZXMgc2stcm90YXRlIHtcclxuICAgICAgMTAwJSB7XHJcbiAgICAgICAgLXdlYmtpdC10cmFuc2Zvcm06IHJvdGF0ZSgzNjBkZWcpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICBcclxuICAgIEBrZXlmcmFtZXMgc2stcm90YXRlIHtcclxuICAgICAgMTAwJSB7XHJcbiAgICAgICAgdHJhbnNmb3JtOiByb3RhdGUoMzYwZGVnKTtcclxuICAgICAgICAtd2Via2l0LXRyYW5zZm9ybTogcm90YXRlKDM2MGRlZyk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIFxyXG4gICAgQC13ZWJraXQta2V5ZnJhbWVzIHNrLWJvdW5jZSB7XHJcbiAgICAgIDAlLCAxMDAlIHtcclxuICAgICAgICAtd2Via2l0LXRyYW5zZm9ybTogc2NhbGUoMC4wKTtcclxuICAgICAgfVxyXG4gICAgICA1MCUge1xyXG4gICAgICAgIC13ZWJraXQtdHJhbnNmb3JtOiBzY2FsZSgxLjApO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICBcclxuICAgIEBrZXlmcmFtZXMgc2stYm91bmNlIHtcclxuICAgICAgMCUsIDEwMCUge1xyXG4gICAgICAgIHRyYW5zZm9ybTogc2NhbGUoMC4wKTtcclxuICAgICAgICAtd2Via2l0LXRyYW5zZm9ybTogc2NhbGUoMC4wKTtcclxuICAgICAgfVxyXG4gICAgICA1MCUge1xyXG4gICAgICAgIHRyYW5zZm9ybTogc2NhbGUoMS4wKTtcclxuICAgICAgICAtd2Via2l0LXRyYW5zZm9ybTogc2NhbGUoMS4wKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIGBdLFxyXG4gIHRlbXBsYXRlOiBTcGlubmVyVGVtcGxhdGVcclxufSlcclxuXHJcbmV4cG9ydCBjbGFzcyBDaGFzaW5nRG90c0NvbXBvbmVudCBleHRlbmRzIFNwaW5uZXJDb21wb25lbnQge1xyXG4gIHB1YmxpYyBiYXNlQ2xhc3M6IHN0cmluZyA9ICdjaGFzaW5nLWRvdHMtc3Bpbm5lcic7XHJcbiAgcHVibGljIGNoaWxkQ2xhc3M6IHN0cmluZyA9ICdkb3QnO1xyXG4gIHB1YmxpYyBudW1JdGVtczogbnVtYmVyID0gMjtcclxufVxyXG4iXX0=