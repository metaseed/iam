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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGhyZWUtYm91bmNlLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BtZXRhc2VlZC9zcGluZXIvIiwic291cmNlcyI6WyJsaWIvc3Bpbm5lci90aHJlZS1ib3VuY2UuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMxQyxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsZUFBZSxFQUFFLE1BQU0scUJBQXFCLENBQUM7O0lBcUQ5QixnREFBZ0I7OzswQkFDN0Isc0JBQXNCOzJCQUNyQixRQUFRO3lCQUNWLENBQUM7Ozs7Z0JBdEQ1QixTQUFTLFNBQUM7b0JBQ1QsUUFBUSxFQUFFLGlCQUFpQjtvQkFDM0IsTUFBTSxFQUFFLENBQUMsNmhDQTZDUixDQUFDO29CQUNGLFFBQVEsRUFBRSxlQUFlO2lCQUMxQjs7K0JBcEREO0VBc0QwQyxnQkFBZ0I7U0FBN0Msb0JBQW9CIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IFNwaW5uZXJDb21wb25lbnQsIFNwaW5uZXJUZW1wbGF0ZSB9IGZyb20gJy4vc3Bpbm5lci5jb21wb25lbnQnO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6ICdzay10aHJlZS1ib3VuY2UnLFxyXG4gIHN0eWxlczogW2BcclxuICAgIC50aHJlZS1ib3VuY2Utc3Bpbm5lciB7XHJcbiAgICAgIG1hcmdpbjogMjVweCBhdXRvO1xyXG4gICAgICB3aWR0aDogNzBweDtcclxuICAgIH1cclxuICAgIFxyXG4gICAgLnRocmVlLWJvdW5jZS1zcGlubmVyID4gZGl2IHtcclxuICAgICAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xyXG4gICAgICB3aWR0aDogMThweDtcclxuICAgICAgaGVpZ2h0OiAxOHB4O1xyXG4gICAgICBcclxuICAgICAgYm9yZGVyLXJhZGl1czogMTAwJTtcclxuICAgICAgLXdlYmtpdC1hbmltYXRpb246IHNrLWJvdW5jZWRlbGF5IDEuNHMgaW5maW5pdGUgZWFzZS1pbi1vdXQgYm90aDtcclxuICAgICAgYW5pbWF0aW9uOiBzay1ib3VuY2VkZWxheSAxLjRzIGluZmluaXRlIGVhc2UtaW4tb3V0IGJvdGg7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIC50aHJlZS1ib3VuY2Utc3Bpbm5lciAuYm91bmNlMSB7XHJcbiAgICAgIC13ZWJraXQtYW5pbWF0aW9uLWRlbGF5OiAtMC4zMnM7XHJcbiAgICAgIGFuaW1hdGlvbi1kZWxheTogLTAuMzJzO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICAudGhyZWUtYm91bmNlLXNwaW5uZXIgLmJvdW5jZTIge1xyXG4gICAgICAtd2Via2l0LWFuaW1hdGlvbi1kZWxheTogLTAuMTZzO1xyXG4gICAgICBhbmltYXRpb24tZGVsYXk6IC0wLjE2cztcclxuICAgIH1cclxuICAgIFxyXG4gICAgQC13ZWJraXQta2V5ZnJhbWVzIHNrLWJvdW5jZWRlbGF5IHtcclxuICAgICAgMCUsIDgwJSwgMTAwJSB7XHJcbiAgICAgICAgLXdlYmtpdC10cmFuc2Zvcm06IHNjYWxlKDApO1xyXG4gICAgICB9XHJcbiAgICAgIDQwJSB7XHJcbiAgICAgICAgLXdlYmtpdC10cmFuc2Zvcm06IHNjYWxlKDEuMCk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIFxyXG4gICAgQGtleWZyYW1lcyBzay1ib3VuY2VkZWxheSB7XHJcbiAgICAgIDAlLCA4MCUsIDEwMCUge1xyXG4gICAgICAgIC13ZWJraXQtdHJhbnNmb3JtOiBzY2FsZSgwKTtcclxuICAgICAgICB0cmFuc2Zvcm06IHNjYWxlKDApO1xyXG4gICAgICB9XHJcbiAgICAgIDQwJSB7XHJcbiAgICAgICAgLXdlYmtpdC10cmFuc2Zvcm06IHNjYWxlKDEuMCk7XHJcbiAgICAgICAgdHJhbnNmb3JtOiBzY2FsZSgxLjApO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgYF0sXHJcbiAgdGVtcGxhdGU6IFNwaW5uZXJUZW1wbGF0ZVxyXG59KVxyXG5cclxuZXhwb3J0IGNsYXNzIFRocmVlQm91bmNlQ29tcG9uZW50IGV4dGVuZHMgU3Bpbm5lckNvbXBvbmVudCB7XHJcbiAgcHVibGljIGJhc2VDbGFzczogc3RyaW5nID0gJ3RocmVlLWJvdW5jZS1zcGlubmVyJztcclxuICBwdWJsaWMgY2hpbGRDbGFzczogc3RyaW5nID0gJ2JvdW5jZSc7XHJcbiAgcHVibGljIG51bUl0ZW1zOiBudW1iZXIgPSAzO1xyXG59XHJcbiJdfQ==