/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { SpinnerComponent, SpinnerTemplate } from './spinner.component';
var WaveComponent = /** @class */ (function (_super) {
    tslib_1.__extends(WaveComponent, _super);
    function WaveComponent() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.baseClass = 'wave-spinner';
        _this.childClass = 'rect';
        _this.numItems = 5;
        return _this;
    }
    WaveComponent.decorators = [
        { type: Component, args: [{
                    selector: 'sk-wave',
                    styles: ["\n    .wave-spinner {\n      margin: 25px auto;\n      width: 42px;\n      height: 40px;\n    }\n    \n    .wave-spinner > div {\n      display: inline-block;\n      width: 5px;\n      margin-right: 4px;\n      height: 100%;\n      \n      -webkit-animation: sk-stretchdelay 1.2s infinite ease-in-out;\n      animation: sk-stretchdelay 1.2s infinite ease-in-out;\n    }\n    \n    .wave-spinner > div:last-child {\n      margin-right: 0;\n    }\n    \n    .wave-spinner .rect2 {\n      -webkit-animation-delay: -1.1s;\n      animation-delay: -1.1s;\n    }\n    \n    .wave-spinner .rect3 {\n      -webkit-animation-delay: -1.0s;\n      animation-delay: -1.0s;\n    }\n    \n    .wave-spinner .rect4 {\n      -webkit-animation-delay: -0.9s;\n      animation-delay: -0.9s;\n    }\n    \n    .wave-spinner .rect5 {\n      -webkit-animation-delay: -0.8s;\n      animation-delay: -0.8s;\n    }\n    \n    @-webkit-keyframes sk-stretchdelay {\n      0%, 40%, 100% {\n        -webkit-transform: scaleY(0.4);\n      }\n      20% {\n        -webkit-transform: scaleY(1.0);\n      }\n    }\n    \n    @keyframes sk-stretchdelay {\n      0%, 40%, 100% {\n        transform: scaleY(0.4);\n        -webkit-transform: scaleY(0.4);\n      }\n      20% {\n        transform: scaleY(1.0);\n        -webkit-transform: scaleY(1.0);\n      }\n    }\n  "],
                    template: SpinnerTemplate
                },] },
    ];
    return WaveComponent;
}(SpinnerComponent));
export { WaveComponent };
function WaveComponent_tsickle_Closure_declarations() {
    /** @type {!Array<{type: !Function, args: (undefined|!Array<?>)}>} */
    WaveComponent.decorators;
    /**
     * @nocollapse
     * @type {function(): !Array<(null|{type: ?, decorators: (undefined|!Array<{type: !Function, args: (undefined|!Array<?>)}>)})>}
     */
    WaveComponent.ctorParameters;
    /** @type {?} */
    WaveComponent.prototype.baseClass;
    /** @type {?} */
    WaveComponent.prototype.childClass;
    /** @type {?} */
    WaveComponent.prototype.numItems;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2F2ZS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AbWV0YXNlZWQvc3BpbmVyLyIsInNvdXJjZXMiOlsibGliL3NwaW5uZXIvd2F2ZS5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzFDLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxlQUFlLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQzs7SUFvRXJDLHlDQUFnQjs7OzBCQUN0QixjQUFjOzJCQUNiLE1BQU07eUJBQ1IsQ0FBQzs7OztnQkFyRTVCLFNBQVMsU0FBQztvQkFDVCxRQUFRLEVBQUUsU0FBUztvQkFDbkIsTUFBTSxFQUFFLENBQUMsc3pDQTREUixDQUFDO29CQUNGLFFBQVEsRUFBRSxlQUFlO2lCQUMxQjs7d0JBbkVEO0VBcUVtQyxnQkFBZ0I7U0FBdEMsYUFBYSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBTcGlubmVyQ29tcG9uZW50LCBTcGlubmVyVGVtcGxhdGUgfSBmcm9tICcuL3NwaW5uZXIuY29tcG9uZW50JztcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gIHNlbGVjdG9yOiAnc2std2F2ZScsXHJcbiAgc3R5bGVzOiBbYFxyXG4gICAgLndhdmUtc3Bpbm5lciB7XHJcbiAgICAgIG1hcmdpbjogMjVweCBhdXRvO1xyXG4gICAgICB3aWR0aDogNDJweDtcclxuICAgICAgaGVpZ2h0OiA0MHB4O1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICAud2F2ZS1zcGlubmVyID4gZGl2IHtcclxuICAgICAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xyXG4gICAgICB3aWR0aDogNXB4O1xyXG4gICAgICBtYXJnaW4tcmlnaHQ6IDRweDtcclxuICAgICAgaGVpZ2h0OiAxMDAlO1xyXG4gICAgICBcclxuICAgICAgLXdlYmtpdC1hbmltYXRpb246IHNrLXN0cmV0Y2hkZWxheSAxLjJzIGluZmluaXRlIGVhc2UtaW4tb3V0O1xyXG4gICAgICBhbmltYXRpb246IHNrLXN0cmV0Y2hkZWxheSAxLjJzIGluZmluaXRlIGVhc2UtaW4tb3V0O1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICAud2F2ZS1zcGlubmVyID4gZGl2Omxhc3QtY2hpbGQge1xyXG4gICAgICBtYXJnaW4tcmlnaHQ6IDA7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIC53YXZlLXNwaW5uZXIgLnJlY3QyIHtcclxuICAgICAgLXdlYmtpdC1hbmltYXRpb24tZGVsYXk6IC0xLjFzO1xyXG4gICAgICBhbmltYXRpb24tZGVsYXk6IC0xLjFzO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICAud2F2ZS1zcGlubmVyIC5yZWN0MyB7XHJcbiAgICAgIC13ZWJraXQtYW5pbWF0aW9uLWRlbGF5OiAtMS4wcztcclxuICAgICAgYW5pbWF0aW9uLWRlbGF5OiAtMS4wcztcclxuICAgIH1cclxuICAgIFxyXG4gICAgLndhdmUtc3Bpbm5lciAucmVjdDQge1xyXG4gICAgICAtd2Via2l0LWFuaW1hdGlvbi1kZWxheTogLTAuOXM7XHJcbiAgICAgIGFuaW1hdGlvbi1kZWxheTogLTAuOXM7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIC53YXZlLXNwaW5uZXIgLnJlY3Q1IHtcclxuICAgICAgLXdlYmtpdC1hbmltYXRpb24tZGVsYXk6IC0wLjhzO1xyXG4gICAgICBhbmltYXRpb24tZGVsYXk6IC0wLjhzO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICBALXdlYmtpdC1rZXlmcmFtZXMgc2stc3RyZXRjaGRlbGF5IHtcclxuICAgICAgMCUsIDQwJSwgMTAwJSB7XHJcbiAgICAgICAgLXdlYmtpdC10cmFuc2Zvcm06IHNjYWxlWSgwLjQpO1xyXG4gICAgICB9XHJcbiAgICAgIDIwJSB7XHJcbiAgICAgICAgLXdlYmtpdC10cmFuc2Zvcm06IHNjYWxlWSgxLjApO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICBcclxuICAgIEBrZXlmcmFtZXMgc2stc3RyZXRjaGRlbGF5IHtcclxuICAgICAgMCUsIDQwJSwgMTAwJSB7XHJcbiAgICAgICAgdHJhbnNmb3JtOiBzY2FsZVkoMC40KTtcclxuICAgICAgICAtd2Via2l0LXRyYW5zZm9ybTogc2NhbGVZKDAuNCk7XHJcbiAgICAgIH1cclxuICAgICAgMjAlIHtcclxuICAgICAgICB0cmFuc2Zvcm06IHNjYWxlWSgxLjApO1xyXG4gICAgICAgIC13ZWJraXQtdHJhbnNmb3JtOiBzY2FsZVkoMS4wKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIGBdLFxyXG4gIHRlbXBsYXRlOiBTcGlubmVyVGVtcGxhdGVcclxufSlcclxuXHJcbmV4cG9ydCBjbGFzcyBXYXZlQ29tcG9uZW50IGV4dGVuZHMgU3Bpbm5lckNvbXBvbmVudCB7XHJcbiAgcHVibGljIGJhc2VDbGFzczogc3RyaW5nID0gJ3dhdmUtc3Bpbm5lcic7XHJcbiAgcHVibGljIGNoaWxkQ2xhc3M6IHN0cmluZyA9ICdyZWN0JztcclxuICBwdWJsaWMgbnVtSXRlbXM6IG51bWJlciA9IDU7XHJcbn1cclxuIl19