/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { SpinnerComponent } from './spinner.component';
var WordPressComponent = /** @class */ (function (_super) {
    tslib_1.__extends(WordPressComponent, _super);
    function WordPressComponent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    WordPressComponent.decorators = [
        { type: Component, args: [{
                    selector: 'sk-word-press',
                    styles: ["\n    .word-press-spinner {\n      position: relative;\n      margin: 25px auto;\n      width: 30px;\n      height: 30px;\n      border-radius: 30px;\n      \n      -webkit-animation: inner-circle 1s linear infinite;\n      animation: inner-circle 1s linear infinite;\n    }\n    \n    .inner-circle {\n      position: absolute;\n      top: 5px;\n      left: 5px;\n      display: block;\n      width: 8px;\n      height: 8px;\n      border-radius: 8px;\n      background: #fff;\n    }\n    \n    @-webkit-keyframes inner-circle {\n      0% {\n        -webkit-transform: rotate(0);\n      }\n      100% {\n        -webkit-transform: rotate(360deg);\n      }\n    }\n    \n    @keyframes inner-circle {\n      0% {\n        transform: rotate(0);\n        -webkit-transform: rotate(0);\n      }\n      100% {\n        transform: rotate(360deg);\n        -webkit-transform: rotate(360deg);\n      }\n    }\n  "],
                    template: "\n    <div [hidden]=\"!visible\" class=\"word-press-spinner\" [style.backgroundColor]=\"color\">\n      <span class=\"inner-circle\"></span>\n    </div>\n  "
                },] },
    ];
    return WordPressComponent;
}(SpinnerComponent));
export { WordPressComponent };
function WordPressComponent_tsickle_Closure_declarations() {
    /** @type {!Array<{type: !Function, args: (undefined|!Array<?>)}>} */
    WordPressComponent.decorators;
    /**
     * @nocollapse
     * @type {function(): !Array<(null|{type: ?, decorators: (undefined|!Array<{type: !Function, args: (undefined|!Array<?>)}>)})>}
     */
    WordPressComponent.ctorParameters;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid29yZC1wcmVzcy5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AbWV0YXNlZWQvc3Bpbm5lci8iLCJzb3VyY2VzIjpbImxpYi9zcGlubmVyL3dvcmQtcHJlc3MuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMxQyxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQzs7SUFzRGYsOENBQWdCOzs7OztnQkFwRHZELFNBQVMsU0FBQztvQkFDVCxRQUFRLEVBQUUsZUFBZTtvQkFDekIsTUFBTSxFQUFFLENBQUMsMjRCQTBDUixDQUFDO29CQUNGLFFBQVEsRUFBRSw4SkFJVDtpQkFDRjs7NkJBckREO0VBdUR3QyxnQkFBZ0I7U0FBM0Msa0JBQWtCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IFNwaW5uZXJDb21wb25lbnQgfSBmcm9tICcuL3NwaW5uZXIuY29tcG9uZW50JztcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gIHNlbGVjdG9yOiAnc2std29yZC1wcmVzcycsXHJcbiAgc3R5bGVzOiBbYFxyXG4gICAgLndvcmQtcHJlc3Mtc3Bpbm5lciB7XHJcbiAgICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcclxuICAgICAgbWFyZ2luOiAyNXB4IGF1dG87XHJcbiAgICAgIHdpZHRoOiAzMHB4O1xyXG4gICAgICBoZWlnaHQ6IDMwcHg7XHJcbiAgICAgIGJvcmRlci1yYWRpdXM6IDMwcHg7XHJcbiAgICAgIFxyXG4gICAgICAtd2Via2l0LWFuaW1hdGlvbjogaW5uZXItY2lyY2xlIDFzIGxpbmVhciBpbmZpbml0ZTtcclxuICAgICAgYW5pbWF0aW9uOiBpbm5lci1jaXJjbGUgMXMgbGluZWFyIGluZmluaXRlO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICAuaW5uZXItY2lyY2xlIHtcclxuICAgICAgcG9zaXRpb246IGFic29sdXRlO1xyXG4gICAgICB0b3A6IDVweDtcclxuICAgICAgbGVmdDogNXB4O1xyXG4gICAgICBkaXNwbGF5OiBibG9jaztcclxuICAgICAgd2lkdGg6IDhweDtcclxuICAgICAgaGVpZ2h0OiA4cHg7XHJcbiAgICAgIGJvcmRlci1yYWRpdXM6IDhweDtcclxuICAgICAgYmFja2dyb3VuZDogI2ZmZjtcclxuICAgIH1cclxuICAgIFxyXG4gICAgQC13ZWJraXQta2V5ZnJhbWVzIGlubmVyLWNpcmNsZSB7XHJcbiAgICAgIDAlIHtcclxuICAgICAgICAtd2Via2l0LXRyYW5zZm9ybTogcm90YXRlKDApO1xyXG4gICAgICB9XHJcbiAgICAgIDEwMCUge1xyXG4gICAgICAgIC13ZWJraXQtdHJhbnNmb3JtOiByb3RhdGUoMzYwZGVnKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgXHJcbiAgICBAa2V5ZnJhbWVzIGlubmVyLWNpcmNsZSB7XHJcbiAgICAgIDAlIHtcclxuICAgICAgICB0cmFuc2Zvcm06IHJvdGF0ZSgwKTtcclxuICAgICAgICAtd2Via2l0LXRyYW5zZm9ybTogcm90YXRlKDApO1xyXG4gICAgICB9XHJcbiAgICAgIDEwMCUge1xyXG4gICAgICAgIHRyYW5zZm9ybTogcm90YXRlKDM2MGRlZyk7XHJcbiAgICAgICAgLXdlYmtpdC10cmFuc2Zvcm06IHJvdGF0ZSgzNjBkZWcpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgYF0sXHJcbiAgdGVtcGxhdGU6IGBcclxuICAgIDxkaXYgW2hpZGRlbl09XCIhdmlzaWJsZVwiIGNsYXNzPVwid29yZC1wcmVzcy1zcGlubmVyXCIgW3N0eWxlLmJhY2tncm91bmRDb2xvcl09XCJjb2xvclwiPlxyXG4gICAgICA8c3BhbiBjbGFzcz1cImlubmVyLWNpcmNsZVwiPjwvc3Bhbj5cclxuICAgIDwvZGl2PlxyXG4gIGBcclxufSlcclxuXHJcbmV4cG9ydCBjbGFzcyBXb3JkUHJlc3NDb21wb25lbnQgZXh0ZW5kcyBTcGlubmVyQ29tcG9uZW50IHt9XHJcbiJdfQ==