/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { SpinnerComponent, SpinnerTemplate } from './spinner.component';
var WanderingCubesComponent = /** @class */ (function (_super) {
    tslib_1.__extends(WanderingCubesComponent, _super);
    function WanderingCubesComponent() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.baseClass = 'wandering-cubes-spinner';
        _this.childClass = 'cube';
        _this.numItems = 2;
        return _this;
    }
    WanderingCubesComponent.decorators = [
        { type: Component, args: [{
                    selector: 'sk-wandering-cubes',
                    styles: ["\n    .wandering-cubes-spinner {\n      position: relative;\n      margin: 25px auto;\n      width: 40px;\n      height: 40px;\n    }\n    \n    .cube1,\n    .cube2 {\n      position: absolute;\n      top: 0;\n      left: 0;\n      width: 15px;\n      height: 15px;\n      \n      -webkit-animation: sk-cubemove 1.8s infinite ease-in-out;\n      animation: sk-cubemove 1.8s infinite ease-in-out;\n    }\n    \n    .cube2 {\n      -webkit-animation-delay: -0.9s;\n      animation-delay: -0.9s;\n    }\n    \n    @-webkit-keyframes sk-cubemove {\n      25% {\n        -webkit-transform: translateX(42px) rotate(-90deg) scale(0.5);\n      }\n      50% {\n        -webkit-transform: translateX(42px) translateY(42px) rotate(-180deg);\n      }\n      75% {\n        -webkit-transform: translateX(0px) translateY(42px) rotate(-270deg) scale(0.5);\n      }\n      100% {\n        -webkit-transform: rotate(-360deg);\n      }\n    }\n    \n    @keyframes sk-cubemove {\n      25% {\n        transform: translateX(42px) rotate(-90deg) scale(0.5);\n        -webkit-transform: translateX(42px) rotate(-90deg) scale(0.5);\n      }\n      50% {\n        transform: translateX(42px) translateY(42px) rotate(-179deg);\n        -webkit-transform: translateX(42px) translateY(42px) rotate(-179deg);\n      }\n      50.1% {\n        transform: translateX(42px) translateY(42px) rotate(-180deg);\n        -webkit-transform: translateX(42px) translateY(42px) rotate(-180deg);\n      }\n      75% {\n        transform: translateX(0px) translateY(42px) rotate(-270deg) scale(0.5);\n        -webkit-transform: translateX(0px) translateY(42px) rotate(-270deg) scale(0.5);\n      }\n      100% {\n        transform: rotate(-360deg);\n        -webkit-transform: rotate(-360deg);\n      }\n    }\n  "],
                    template: SpinnerTemplate
                },] },
    ];
    return WanderingCubesComponent;
}(SpinnerComponent));
export { WanderingCubesComponent };
function WanderingCubesComponent_tsickle_Closure_declarations() {
    /** @type {!Array<{type: !Function, args: (undefined|!Array<?>)}>} */
    WanderingCubesComponent.decorators;
    /**
     * @nocollapse
     * @type {function(): !Array<(null|{type: ?, decorators: (undefined|!Array<{type: !Function, args: (undefined|!Array<?>)}>)})>}
     */
    WanderingCubesComponent.ctorParameters;
    /** @type {?} */
    WanderingCubesComponent.prototype.baseClass;
    /** @type {?} */
    WanderingCubesComponent.prototype.childClass;
    /** @type {?} */
    WanderingCubesComponent.prototype.numItems;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2FuZGVyaW5nLWN1YmVzLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BtZXRhc2VlZC9zcGlubmVyLyIsInNvdXJjZXMiOlsibGliL3NwaW5uZXIvd2FuZGVyaW5nLWN1YmVzLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDMUMsT0FBTyxFQUFFLGdCQUFnQixFQUFFLGVBQWUsRUFBRSxNQUFNLHFCQUFxQixDQUFDOztJQXNFM0IsbURBQWdCOzs7MEJBQ2hDLHlCQUF5QjsyQkFDeEIsTUFBTTt5QkFDUixDQUFDOzs7O2dCQXZFNUIsU0FBUyxTQUFDO29CQUNULFFBQVEsRUFBRSxvQkFBb0I7b0JBQzlCLE1BQU0sRUFBRSxDQUFDLDh1REE4RFIsQ0FBQztvQkFDRixRQUFRLEVBQUUsZUFBZTtpQkFDMUI7O2tDQXJFRDtFQXVFNkMsZ0JBQWdCO1NBQWhELHVCQUF1QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBTcGlubmVyQ29tcG9uZW50LCBTcGlubmVyVGVtcGxhdGUgfSBmcm9tICcuL3NwaW5uZXIuY29tcG9uZW50JztcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gIHNlbGVjdG9yOiAnc2std2FuZGVyaW5nLWN1YmVzJyxcclxuICBzdHlsZXM6IFtgXHJcbiAgICAud2FuZGVyaW5nLWN1YmVzLXNwaW5uZXIge1xyXG4gICAgICBwb3NpdGlvbjogcmVsYXRpdmU7XHJcbiAgICAgIG1hcmdpbjogMjVweCBhdXRvO1xyXG4gICAgICB3aWR0aDogNDBweDtcclxuICAgICAgaGVpZ2h0OiA0MHB4O1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICAuY3ViZTEsXHJcbiAgICAuY3ViZTIge1xyXG4gICAgICBwb3NpdGlvbjogYWJzb2x1dGU7XHJcbiAgICAgIHRvcDogMDtcclxuICAgICAgbGVmdDogMDtcclxuICAgICAgd2lkdGg6IDE1cHg7XHJcbiAgICAgIGhlaWdodDogMTVweDtcclxuICAgICAgXHJcbiAgICAgIC13ZWJraXQtYW5pbWF0aW9uOiBzay1jdWJlbW92ZSAxLjhzIGluZmluaXRlIGVhc2UtaW4tb3V0O1xyXG4gICAgICBhbmltYXRpb246IHNrLWN1YmVtb3ZlIDEuOHMgaW5maW5pdGUgZWFzZS1pbi1vdXQ7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIC5jdWJlMiB7XHJcbiAgICAgIC13ZWJraXQtYW5pbWF0aW9uLWRlbGF5OiAtMC45cztcclxuICAgICAgYW5pbWF0aW9uLWRlbGF5OiAtMC45cztcclxuICAgIH1cclxuICAgIFxyXG4gICAgQC13ZWJraXQta2V5ZnJhbWVzIHNrLWN1YmVtb3ZlIHtcclxuICAgICAgMjUlIHtcclxuICAgICAgICAtd2Via2l0LXRyYW5zZm9ybTogdHJhbnNsYXRlWCg0MnB4KSByb3RhdGUoLTkwZGVnKSBzY2FsZSgwLjUpO1xyXG4gICAgICB9XHJcbiAgICAgIDUwJSB7XHJcbiAgICAgICAgLXdlYmtpdC10cmFuc2Zvcm06IHRyYW5zbGF0ZVgoNDJweCkgdHJhbnNsYXRlWSg0MnB4KSByb3RhdGUoLTE4MGRlZyk7XHJcbiAgICAgIH1cclxuICAgICAgNzUlIHtcclxuICAgICAgICAtd2Via2l0LXRyYW5zZm9ybTogdHJhbnNsYXRlWCgwcHgpIHRyYW5zbGF0ZVkoNDJweCkgcm90YXRlKC0yNzBkZWcpIHNjYWxlKDAuNSk7XHJcbiAgICAgIH1cclxuICAgICAgMTAwJSB7XHJcbiAgICAgICAgLXdlYmtpdC10cmFuc2Zvcm06IHJvdGF0ZSgtMzYwZGVnKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgXHJcbiAgICBAa2V5ZnJhbWVzIHNrLWN1YmVtb3ZlIHtcclxuICAgICAgMjUlIHtcclxuICAgICAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVgoNDJweCkgcm90YXRlKC05MGRlZykgc2NhbGUoMC41KTtcclxuICAgICAgICAtd2Via2l0LXRyYW5zZm9ybTogdHJhbnNsYXRlWCg0MnB4KSByb3RhdGUoLTkwZGVnKSBzY2FsZSgwLjUpO1xyXG4gICAgICB9XHJcbiAgICAgIDUwJSB7XHJcbiAgICAgICAgdHJhbnNmb3JtOiB0cmFuc2xhdGVYKDQycHgpIHRyYW5zbGF0ZVkoNDJweCkgcm90YXRlKC0xNzlkZWcpO1xyXG4gICAgICAgIC13ZWJraXQtdHJhbnNmb3JtOiB0cmFuc2xhdGVYKDQycHgpIHRyYW5zbGF0ZVkoNDJweCkgcm90YXRlKC0xNzlkZWcpO1xyXG4gICAgICB9XHJcbiAgICAgIDUwLjElIHtcclxuICAgICAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVgoNDJweCkgdHJhbnNsYXRlWSg0MnB4KSByb3RhdGUoLTE4MGRlZyk7XHJcbiAgICAgICAgLXdlYmtpdC10cmFuc2Zvcm06IHRyYW5zbGF0ZVgoNDJweCkgdHJhbnNsYXRlWSg0MnB4KSByb3RhdGUoLTE4MGRlZyk7XHJcbiAgICAgIH1cclxuICAgICAgNzUlIHtcclxuICAgICAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVgoMHB4KSB0cmFuc2xhdGVZKDQycHgpIHJvdGF0ZSgtMjcwZGVnKSBzY2FsZSgwLjUpO1xyXG4gICAgICAgIC13ZWJraXQtdHJhbnNmb3JtOiB0cmFuc2xhdGVYKDBweCkgdHJhbnNsYXRlWSg0MnB4KSByb3RhdGUoLTI3MGRlZykgc2NhbGUoMC41KTtcclxuICAgICAgfVxyXG4gICAgICAxMDAlIHtcclxuICAgICAgICB0cmFuc2Zvcm06IHJvdGF0ZSgtMzYwZGVnKTtcclxuICAgICAgICAtd2Via2l0LXRyYW5zZm9ybTogcm90YXRlKC0zNjBkZWcpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgYF0sXHJcbiAgdGVtcGxhdGU6IFNwaW5uZXJUZW1wbGF0ZVxyXG59KVxyXG5cclxuZXhwb3J0IGNsYXNzIFdhbmRlcmluZ0N1YmVzQ29tcG9uZW50IGV4dGVuZHMgU3Bpbm5lckNvbXBvbmVudCB7XHJcbiAgcHVibGljIGJhc2VDbGFzczogc3RyaW5nID0gJ3dhbmRlcmluZy1jdWJlcy1zcGlubmVyJztcclxuICBwdWJsaWMgY2hpbGRDbGFzczogc3RyaW5nID0gJ2N1YmUnO1xyXG4gIHB1YmxpYyBudW1JdGVtczogbnVtYmVyID0gMjtcclxufVxyXG4iXX0=