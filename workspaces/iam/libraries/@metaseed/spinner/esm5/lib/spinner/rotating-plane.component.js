/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { SpinnerComponent } from './spinner.component';
var RotatingPlaneComponent = /** @class */ (function (_super) {
    tslib_1.__extends(RotatingPlaneComponent, _super);
    function RotatingPlaneComponent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    RotatingPlaneComponent.decorators = [
        { type: Component, args: [{
                    selector: 'sk-rotating-plane',
                    styles: ["\n    .rotating-plane-spinner {\n      margin: 25px auto;\n      width: 40px;\n      height: 40px;\n      \n      -webkit-animation: sk-rotateplane 1.2s infinite ease-in-out;\n      animation: sk-rotateplane 1.2s infinite ease-in-out;\n    }\n    \n    @-webkit-keyframes sk-rotateplane {\n      0% {\n        -webkit-transform: perspective(120px)\n      }\n      50% {\n        -webkit-transform: perspective(120px) rotateY(180deg)\n      }\n      100% {\n        -webkit-transform: perspective(120px) rotateY(180deg) rotateX(180deg)\n      }\n    }\n    \n    @keyframes sk-rotateplane {\n      0% {\n        transform: perspective(120px) rotateX(0deg) rotateY(0deg);\n        -webkit-transform: perspective(120px) rotateX(0deg) rotateY(0deg)\n      }\n      50% {\n        transform: perspective(120px) rotateX(-180.1deg) rotateY(0deg);\n        -webkit-transform: perspective(120px) rotateX(-180.1deg) rotateY(0deg)\n      }\n      100% {\n        transform: perspective(120px) rotateX(-180deg) rotateY(-179.9deg);\n        -webkit-transform: perspective(120px) rotateX(-180deg) rotateY(-179.9deg);\n      }\n    }\n  "],
                    template: "\n    <div [hidden]=\"!visible\" class=\"rotating-plane-spinner\" [style.backgroundColor]=\"color\"></div>\n  "
                },] },
    ];
    return RotatingPlaneComponent;
}(SpinnerComponent));
export { RotatingPlaneComponent };
function RotatingPlaneComponent_tsickle_Closure_declarations() {
    /** @type {!Array<{type: !Function, args: (undefined|!Array<?>)}>} */
    RotatingPlaneComponent.decorators;
    /**
     * @nocollapse
     * @type {function(): !Array<(null|{type: ?, decorators: (undefined|!Array<{type: !Function, args: (undefined|!Array<?>)}>)})>}
     */
    RotatingPlaneComponent.ctorParameters;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm90YXRpbmctcGxhbmUuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQG1ldGFzZWVkL3NwaW5uZXIvIiwic291cmNlcyI6WyJsaWIvc3Bpbm5lci9yb3RhdGluZy1wbGFuZS5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzFDLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLHFCQUFxQixDQUFDOztJQThDWCxrREFBZ0I7Ozs7O2dCQTVDM0QsU0FBUyxTQUFDO29CQUNULFFBQVEsRUFBRSxtQkFBbUI7b0JBQzdCLE1BQU0sRUFBRSxDQUFDLG9tQ0FvQ1IsQ0FBQztvQkFDRixRQUFRLEVBQUUsZ0hBRVQ7aUJBQ0Y7O2lDQTdDRDtFQStDNEMsZ0JBQWdCO1NBQS9DLHNCQUFzQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBTcGlubmVyQ29tcG9uZW50IH0gZnJvbSAnLi9zcGlubmVyLmNvbXBvbmVudCc7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICBzZWxlY3RvcjogJ3NrLXJvdGF0aW5nLXBsYW5lJyxcclxuICBzdHlsZXM6IFtgXHJcbiAgICAucm90YXRpbmctcGxhbmUtc3Bpbm5lciB7XHJcbiAgICAgIG1hcmdpbjogMjVweCBhdXRvO1xyXG4gICAgICB3aWR0aDogNDBweDtcclxuICAgICAgaGVpZ2h0OiA0MHB4O1xyXG4gICAgICBcclxuICAgICAgLXdlYmtpdC1hbmltYXRpb246IHNrLXJvdGF0ZXBsYW5lIDEuMnMgaW5maW5pdGUgZWFzZS1pbi1vdXQ7XHJcbiAgICAgIGFuaW1hdGlvbjogc2stcm90YXRlcGxhbmUgMS4ycyBpbmZpbml0ZSBlYXNlLWluLW91dDtcclxuICAgIH1cclxuICAgIFxyXG4gICAgQC13ZWJraXQta2V5ZnJhbWVzIHNrLXJvdGF0ZXBsYW5lIHtcclxuICAgICAgMCUge1xyXG4gICAgICAgIC13ZWJraXQtdHJhbnNmb3JtOiBwZXJzcGVjdGl2ZSgxMjBweClcclxuICAgICAgfVxyXG4gICAgICA1MCUge1xyXG4gICAgICAgIC13ZWJraXQtdHJhbnNmb3JtOiBwZXJzcGVjdGl2ZSgxMjBweCkgcm90YXRlWSgxODBkZWcpXHJcbiAgICAgIH1cclxuICAgICAgMTAwJSB7XHJcbiAgICAgICAgLXdlYmtpdC10cmFuc2Zvcm06IHBlcnNwZWN0aXZlKDEyMHB4KSByb3RhdGVZKDE4MGRlZykgcm90YXRlWCgxODBkZWcpXHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIFxyXG4gICAgQGtleWZyYW1lcyBzay1yb3RhdGVwbGFuZSB7XHJcbiAgICAgIDAlIHtcclxuICAgICAgICB0cmFuc2Zvcm06IHBlcnNwZWN0aXZlKDEyMHB4KSByb3RhdGVYKDBkZWcpIHJvdGF0ZVkoMGRlZyk7XHJcbiAgICAgICAgLXdlYmtpdC10cmFuc2Zvcm06IHBlcnNwZWN0aXZlKDEyMHB4KSByb3RhdGVYKDBkZWcpIHJvdGF0ZVkoMGRlZylcclxuICAgICAgfVxyXG4gICAgICA1MCUge1xyXG4gICAgICAgIHRyYW5zZm9ybTogcGVyc3BlY3RpdmUoMTIwcHgpIHJvdGF0ZVgoLTE4MC4xZGVnKSByb3RhdGVZKDBkZWcpO1xyXG4gICAgICAgIC13ZWJraXQtdHJhbnNmb3JtOiBwZXJzcGVjdGl2ZSgxMjBweCkgcm90YXRlWCgtMTgwLjFkZWcpIHJvdGF0ZVkoMGRlZylcclxuICAgICAgfVxyXG4gICAgICAxMDAlIHtcclxuICAgICAgICB0cmFuc2Zvcm06IHBlcnNwZWN0aXZlKDEyMHB4KSByb3RhdGVYKC0xODBkZWcpIHJvdGF0ZVkoLTE3OS45ZGVnKTtcclxuICAgICAgICAtd2Via2l0LXRyYW5zZm9ybTogcGVyc3BlY3RpdmUoMTIwcHgpIHJvdGF0ZVgoLTE4MGRlZykgcm90YXRlWSgtMTc5LjlkZWcpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgYF0sXHJcbiAgdGVtcGxhdGU6IGBcclxuICAgIDxkaXYgW2hpZGRlbl09XCIhdmlzaWJsZVwiIGNsYXNzPVwicm90YXRpbmctcGxhbmUtc3Bpbm5lclwiIFtzdHlsZS5iYWNrZ3JvdW5kQ29sb3JdPVwiY29sb3JcIj48L2Rpdj5cclxuICBgXHJcbn0pXHJcblxyXG5leHBvcnQgY2xhc3MgUm90YXRpbmdQbGFuZUNvbXBvbmVudCBleHRlbmRzIFNwaW5uZXJDb21wb25lbnQge31cclxuIl19