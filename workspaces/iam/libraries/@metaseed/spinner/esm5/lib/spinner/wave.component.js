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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2F2ZS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AbWV0YXNlZWQvc3Bpbm5lci8iLCJzb3VyY2VzIjpbImxpYi9zcGlubmVyL3dhdmUuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMxQyxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsZUFBZSxFQUFFLE1BQU0scUJBQXFCLENBQUM7O0lBb0VyQyx5Q0FBZ0I7OzswQkFDdEIsY0FBYzsyQkFDYixNQUFNO3lCQUNSLENBQUM7Ozs7Z0JBckU1QixTQUFTLFNBQUM7b0JBQ1QsUUFBUSxFQUFFLFNBQVM7b0JBQ25CLE1BQU0sRUFBRSxDQUFDLHN6Q0E0RFIsQ0FBQztvQkFDRixRQUFRLEVBQUUsZUFBZTtpQkFDMUI7O3dCQW5FRDtFQXFFbUMsZ0JBQWdCO1NBQXRDLGFBQWEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgU3Bpbm5lckNvbXBvbmVudCwgU3Bpbm5lclRlbXBsYXRlIH0gZnJvbSAnLi9zcGlubmVyLmNvbXBvbmVudCc7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICBzZWxlY3RvcjogJ3NrLXdhdmUnLFxyXG4gIHN0eWxlczogW2BcclxuICAgIC53YXZlLXNwaW5uZXIge1xyXG4gICAgICBtYXJnaW46IDI1cHggYXV0bztcclxuICAgICAgd2lkdGg6IDQycHg7XHJcbiAgICAgIGhlaWdodDogNDBweDtcclxuICAgIH1cclxuICAgIFxyXG4gICAgLndhdmUtc3Bpbm5lciA+IGRpdiB7XHJcbiAgICAgIGRpc3BsYXk6IGlubGluZS1ibG9jaztcclxuICAgICAgd2lkdGg6IDVweDtcclxuICAgICAgbWFyZ2luLXJpZ2h0OiA0cHg7XHJcbiAgICAgIGhlaWdodDogMTAwJTtcclxuICAgICAgXHJcbiAgICAgIC13ZWJraXQtYW5pbWF0aW9uOiBzay1zdHJldGNoZGVsYXkgMS4ycyBpbmZpbml0ZSBlYXNlLWluLW91dDtcclxuICAgICAgYW5pbWF0aW9uOiBzay1zdHJldGNoZGVsYXkgMS4ycyBpbmZpbml0ZSBlYXNlLWluLW91dDtcclxuICAgIH1cclxuICAgIFxyXG4gICAgLndhdmUtc3Bpbm5lciA+IGRpdjpsYXN0LWNoaWxkIHtcclxuICAgICAgbWFyZ2luLXJpZ2h0OiAwO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICAud2F2ZS1zcGlubmVyIC5yZWN0MiB7XHJcbiAgICAgIC13ZWJraXQtYW5pbWF0aW9uLWRlbGF5OiAtMS4xcztcclxuICAgICAgYW5pbWF0aW9uLWRlbGF5OiAtMS4xcztcclxuICAgIH1cclxuICAgIFxyXG4gICAgLndhdmUtc3Bpbm5lciAucmVjdDMge1xyXG4gICAgICAtd2Via2l0LWFuaW1hdGlvbi1kZWxheTogLTEuMHM7XHJcbiAgICAgIGFuaW1hdGlvbi1kZWxheTogLTEuMHM7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIC53YXZlLXNwaW5uZXIgLnJlY3Q0IHtcclxuICAgICAgLXdlYmtpdC1hbmltYXRpb24tZGVsYXk6IC0wLjlzO1xyXG4gICAgICBhbmltYXRpb24tZGVsYXk6IC0wLjlzO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICAud2F2ZS1zcGlubmVyIC5yZWN0NSB7XHJcbiAgICAgIC13ZWJraXQtYW5pbWF0aW9uLWRlbGF5OiAtMC44cztcclxuICAgICAgYW5pbWF0aW9uLWRlbGF5OiAtMC44cztcclxuICAgIH1cclxuICAgIFxyXG4gICAgQC13ZWJraXQta2V5ZnJhbWVzIHNrLXN0cmV0Y2hkZWxheSB7XHJcbiAgICAgIDAlLCA0MCUsIDEwMCUge1xyXG4gICAgICAgIC13ZWJraXQtdHJhbnNmb3JtOiBzY2FsZVkoMC40KTtcclxuICAgICAgfVxyXG4gICAgICAyMCUge1xyXG4gICAgICAgIC13ZWJraXQtdHJhbnNmb3JtOiBzY2FsZVkoMS4wKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgXHJcbiAgICBAa2V5ZnJhbWVzIHNrLXN0cmV0Y2hkZWxheSB7XHJcbiAgICAgIDAlLCA0MCUsIDEwMCUge1xyXG4gICAgICAgIHRyYW5zZm9ybTogc2NhbGVZKDAuNCk7XHJcbiAgICAgICAgLXdlYmtpdC10cmFuc2Zvcm06IHNjYWxlWSgwLjQpO1xyXG4gICAgICB9XHJcbiAgICAgIDIwJSB7XHJcbiAgICAgICAgdHJhbnNmb3JtOiBzY2FsZVkoMS4wKTtcclxuICAgICAgICAtd2Via2l0LXRyYW5zZm9ybTogc2NhbGVZKDEuMCk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICBgXSxcclxuICB0ZW1wbGF0ZTogU3Bpbm5lclRlbXBsYXRlXHJcbn0pXHJcblxyXG5leHBvcnQgY2xhc3MgV2F2ZUNvbXBvbmVudCBleHRlbmRzIFNwaW5uZXJDb21wb25lbnQge1xyXG4gIHB1YmxpYyBiYXNlQ2xhc3M6IHN0cmluZyA9ICd3YXZlLXNwaW5uZXInO1xyXG4gIHB1YmxpYyBjaGlsZENsYXNzOiBzdHJpbmcgPSAncmVjdCc7XHJcbiAgcHVibGljIG51bUl0ZW1zOiBudW1iZXIgPSA1O1xyXG59XHJcbiJdfQ==