/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { SpinnerComponent } from './spinner.component';
var PulseComponent = /** @class */ (function (_super) {
    tslib_1.__extends(PulseComponent, _super);
    function PulseComponent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    PulseComponent.decorators = [
        { type: Component, args: [{
                    selector: 'sk-pulse',
                    styles: ["\n    .pulse-spinner {\n      margin: 25px auto;\n      width: 40px;\n      height: 40px;\n      border-radius: 100%;\n      \n      -webkit-animation: sk-scaleout 1.0s infinite ease-in-out;\n      animation: sk-scaleout 1.0s infinite ease-in-out;\n    }\n    \n    @-webkit-keyframes sk-scaleout {\n      0% {\n        -webkit-transform: scale(0);\n      }\n      100% {\n        -webkit-transform: scale(1.0);\n        opacity: 0;\n      }\n    }\n    \n    @keyframes sk-scaleout {\n      0% {\n        -webkit-transform: scale(0);\n        transform: scale(0);\n      }\n      100% {\n        -webkit-transform: scale(1.0);\n        transform: scale(1.0);\n        opacity: 0;\n      }\n    }\n  "],
                    template: "\n    <div [hidden]=\"!visible\" class=\"pulse-spinner\" [style.backgroundColor]=\"color\"></div>\n  "
                },] },
    ];
    return PulseComponent;
}(SpinnerComponent));
export { PulseComponent };
function PulseComponent_tsickle_Closure_declarations() {
    /** @type {!Array<{type: !Function, args: (undefined|!Array<?>)}>} */
    PulseComponent.decorators;
    /**
     * @nocollapse
     * @type {function(): !Array<(null|{type: ?, decorators: (undefined|!Array<{type: !Function, args: (undefined|!Array<?>)}>)})>}
     */
    PulseComponent.ctorParameters;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHVsc2UuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQG1ldGFzZWVkL3NwaW5uZXIvIiwic291cmNlcyI6WyJsaWIvc3Bpbm5lci9wdWxzZS5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzFDLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLHFCQUFxQixDQUFDOztJQTBDbkIsMENBQWdCOzs7OztnQkF4Q25ELFNBQVMsU0FBQztvQkFDVCxRQUFRLEVBQUUsVUFBVTtvQkFDcEIsTUFBTSxFQUFFLENBQUMsOHJCQWdDUixDQUFDO29CQUNGLFFBQVEsRUFBRSx1R0FFVDtpQkFDRjs7eUJBekNEO0VBMkNvQyxnQkFBZ0I7U0FBdkMsY0FBYyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBTcGlubmVyQ29tcG9uZW50IH0gZnJvbSAnLi9zcGlubmVyLmNvbXBvbmVudCc7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICBzZWxlY3RvcjogJ3NrLXB1bHNlJyxcclxuICBzdHlsZXM6IFtgXHJcbiAgICAucHVsc2Utc3Bpbm5lciB7XHJcbiAgICAgIG1hcmdpbjogMjVweCBhdXRvO1xyXG4gICAgICB3aWR0aDogNDBweDtcclxuICAgICAgaGVpZ2h0OiA0MHB4O1xyXG4gICAgICBib3JkZXItcmFkaXVzOiAxMDAlO1xyXG4gICAgICBcclxuICAgICAgLXdlYmtpdC1hbmltYXRpb246IHNrLXNjYWxlb3V0IDEuMHMgaW5maW5pdGUgZWFzZS1pbi1vdXQ7XHJcbiAgICAgIGFuaW1hdGlvbjogc2stc2NhbGVvdXQgMS4wcyBpbmZpbml0ZSBlYXNlLWluLW91dDtcclxuICAgIH1cclxuICAgIFxyXG4gICAgQC13ZWJraXQta2V5ZnJhbWVzIHNrLXNjYWxlb3V0IHtcclxuICAgICAgMCUge1xyXG4gICAgICAgIC13ZWJraXQtdHJhbnNmb3JtOiBzY2FsZSgwKTtcclxuICAgICAgfVxyXG4gICAgICAxMDAlIHtcclxuICAgICAgICAtd2Via2l0LXRyYW5zZm9ybTogc2NhbGUoMS4wKTtcclxuICAgICAgICBvcGFjaXR5OiAwO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICBcclxuICAgIEBrZXlmcmFtZXMgc2stc2NhbGVvdXQge1xyXG4gICAgICAwJSB7XHJcbiAgICAgICAgLXdlYmtpdC10cmFuc2Zvcm06IHNjYWxlKDApO1xyXG4gICAgICAgIHRyYW5zZm9ybTogc2NhbGUoMCk7XHJcbiAgICAgIH1cclxuICAgICAgMTAwJSB7XHJcbiAgICAgICAgLXdlYmtpdC10cmFuc2Zvcm06IHNjYWxlKDEuMCk7XHJcbiAgICAgICAgdHJhbnNmb3JtOiBzY2FsZSgxLjApO1xyXG4gICAgICAgIG9wYWNpdHk6IDA7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICBgXSxcclxuICB0ZW1wbGF0ZTogYFxyXG4gICAgPGRpdiBbaGlkZGVuXT1cIiF2aXNpYmxlXCIgY2xhc3M9XCJwdWxzZS1zcGlubmVyXCIgW3N0eWxlLmJhY2tncm91bmRDb2xvcl09XCJjb2xvclwiPjwvZGl2PlxyXG4gIGBcclxufSlcclxuXHJcbmV4cG9ydCBjbGFzcyBQdWxzZUNvbXBvbmVudCBleHRlbmRzIFNwaW5uZXJDb21wb25lbnQge31cclxuIl19