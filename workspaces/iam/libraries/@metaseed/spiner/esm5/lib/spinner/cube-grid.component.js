/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { SpinnerComponent, SpinnerTemplate } from './spinner.component';
var CubeGridComponent = /** @class */ (function (_super) {
    tslib_1.__extends(CubeGridComponent, _super);
    function CubeGridComponent() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.baseClass = 'cube-grid-spinner';
        _this.childClass = 'cube';
        _this.numItems = 9;
        return _this;
    }
    CubeGridComponent.decorators = [
        { type: Component, args: [{
                    selector: 'sk-cube-grid',
                    styles: ["\n    .cube-grid-spinner {\n      margin: 25px auto;\n      width: 40px;\n      height: 40px;\n    }\n    \n    .cube-grid-spinner div {\n      float: left;\n      width: 33%;\n      height: 33%;\n      \n      -webkit-animation: cubeGridScaleDelay 1.3s infinite ease-in-out;\n      animation: cubeGridScaleDelay 1.3s infinite ease-in-out;\n    }\n    \n    .cube-grid-spinner .cube1 {\n      -webkit-animation-delay: 0.2s;\n      animation-delay: 0.2s;\n    }\n    \n    .cube-grid-spinner .cube2 {\n      -webkit-animation-delay: 0.3s;\n      animation-delay: 0.3s;\n    }\n    \n    .cube-grid-spinner .cube3 {\n      -webkit-animation-delay: 0.4s;\n      animation-delay: 0.4s;\n    }\n    \n    .cube-grid-spinner .cube4 {\n      -webkit-animation-delay: 0.1s;\n      animation-delay: 0.1s;\n    }\n    \n    .cube-grid-spinner .cube5 {\n      -webkit-animation-delay: 0.2s;\n      animation-delay: 0.2s;\n    }\n    \n    .cube-grid-spinner .cube6 {\n      -webkit-animation-delay: 0.3s;\n      animation-delay: 0.3s;\n    }\n    \n    .cube-grid-spinner .cube7 {\n      -webkit-animation-delay: 0s;\n      animation-delay: 0s;\n    }\n    \n    .cube-grid-spinner .cube8 {\n      -webkit-animation-delay: 0.1s;\n      animation-delay: 0.1s;\n    }\n    \n    .cube-grid-spinner .cube9 {\n      -webkit-animation-delay: 0.2s;\n      animation-delay: 0.2s;\n    }\n    \n    @-webkit-keyframes cubeGridScaleDelay {\n      0%, 70%, 100% {\n        -webkit-transform: scale3D(1, 1, 1);\n        transform: scale3D(1, 1, 1);\n      }\n      35% {\n        -webkit-transform: scale3D(0, 0, 1);\n        transform: scale3D(0, 0, 1);\n      }\n    }\n    \n    @keyframes cubeGridScaleDelay {\n      0%, 70%, 100% {\n        -webkit-transform: scale3D(1, 1, 1);\n        transform: scale3D(1, 1, 1);\n      }\n      35% {\n        -webkit-transform: scale3D(0, 0, 1);\n        transform: scale3D(0, 0, 1);\n      }\n    }\n  "],
                    template: SpinnerTemplate
                },] },
    ];
    return CubeGridComponent;
}(SpinnerComponent));
export { CubeGridComponent };
function CubeGridComponent_tsickle_Closure_declarations() {
    /** @type {!Array<{type: !Function, args: (undefined|!Array<?>)}>} */
    CubeGridComponent.decorators;
    /**
     * @nocollapse
     * @type {function(): !Array<(null|{type: ?, decorators: (undefined|!Array<{type: !Function, args: (undefined|!Array<?>)}>)})>}
     */
    CubeGridComponent.ctorParameters;
    /** @type {?} */
    CubeGridComponent.prototype.baseClass;
    /** @type {?} */
    CubeGridComponent.prototype.childClass;
    /** @type {?} */
    CubeGridComponent.prototype.numItems;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3ViZS1ncmlkLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BtZXRhc2VlZC9zcGluZXIvIiwic291cmNlcyI6WyJsaWIvc3Bpbm5lci9jdWJlLWdyaWQuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMxQyxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsZUFBZSxFQUFFLE1BQU0scUJBQXFCLENBQUM7O0lBMEZqQyw2Q0FBZ0I7OzswQkFDMUIsbUJBQW1COzJCQUNsQixNQUFNO3lCQUNSLENBQUM7Ozs7Z0JBM0Y1QixTQUFTLFNBQUM7b0JBQ1QsUUFBUSxFQUFFLGNBQWM7b0JBQ3hCLE1BQU0sRUFBRSxDQUFDLHM0REFrRlIsQ0FBQztvQkFDRixRQUFRLEVBQUUsZUFBZTtpQkFDMUI7OzRCQXpGRDtFQTJGdUMsZ0JBQWdCO1NBQTFDLGlCQUFpQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBTcGlubmVyQ29tcG9uZW50LCBTcGlubmVyVGVtcGxhdGUgfSBmcm9tICcuL3NwaW5uZXIuY29tcG9uZW50JztcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gIHNlbGVjdG9yOiAnc2stY3ViZS1ncmlkJyxcclxuICBzdHlsZXM6IFtgXHJcbiAgICAuY3ViZS1ncmlkLXNwaW5uZXIge1xyXG4gICAgICBtYXJnaW46IDI1cHggYXV0bztcclxuICAgICAgd2lkdGg6IDQwcHg7XHJcbiAgICAgIGhlaWdodDogNDBweDtcclxuICAgIH1cclxuICAgIFxyXG4gICAgLmN1YmUtZ3JpZC1zcGlubmVyIGRpdiB7XHJcbiAgICAgIGZsb2F0OiBsZWZ0O1xyXG4gICAgICB3aWR0aDogMzMlO1xyXG4gICAgICBoZWlnaHQ6IDMzJTtcclxuICAgICAgXHJcbiAgICAgIC13ZWJraXQtYW5pbWF0aW9uOiBjdWJlR3JpZFNjYWxlRGVsYXkgMS4zcyBpbmZpbml0ZSBlYXNlLWluLW91dDtcclxuICAgICAgYW5pbWF0aW9uOiBjdWJlR3JpZFNjYWxlRGVsYXkgMS4zcyBpbmZpbml0ZSBlYXNlLWluLW91dDtcclxuICAgIH1cclxuICAgIFxyXG4gICAgLmN1YmUtZ3JpZC1zcGlubmVyIC5jdWJlMSB7XHJcbiAgICAgIC13ZWJraXQtYW5pbWF0aW9uLWRlbGF5OiAwLjJzO1xyXG4gICAgICBhbmltYXRpb24tZGVsYXk6IDAuMnM7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIC5jdWJlLWdyaWQtc3Bpbm5lciAuY3ViZTIge1xyXG4gICAgICAtd2Via2l0LWFuaW1hdGlvbi1kZWxheTogMC4zcztcclxuICAgICAgYW5pbWF0aW9uLWRlbGF5OiAwLjNzO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICAuY3ViZS1ncmlkLXNwaW5uZXIgLmN1YmUzIHtcclxuICAgICAgLXdlYmtpdC1hbmltYXRpb24tZGVsYXk6IDAuNHM7XHJcbiAgICAgIGFuaW1hdGlvbi1kZWxheTogMC40cztcclxuICAgIH1cclxuICAgIFxyXG4gICAgLmN1YmUtZ3JpZC1zcGlubmVyIC5jdWJlNCB7XHJcbiAgICAgIC13ZWJraXQtYW5pbWF0aW9uLWRlbGF5OiAwLjFzO1xyXG4gICAgICBhbmltYXRpb24tZGVsYXk6IDAuMXM7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIC5jdWJlLWdyaWQtc3Bpbm5lciAuY3ViZTUge1xyXG4gICAgICAtd2Via2l0LWFuaW1hdGlvbi1kZWxheTogMC4ycztcclxuICAgICAgYW5pbWF0aW9uLWRlbGF5OiAwLjJzO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICAuY3ViZS1ncmlkLXNwaW5uZXIgLmN1YmU2IHtcclxuICAgICAgLXdlYmtpdC1hbmltYXRpb24tZGVsYXk6IDAuM3M7XHJcbiAgICAgIGFuaW1hdGlvbi1kZWxheTogMC4zcztcclxuICAgIH1cclxuICAgIFxyXG4gICAgLmN1YmUtZ3JpZC1zcGlubmVyIC5jdWJlNyB7XHJcbiAgICAgIC13ZWJraXQtYW5pbWF0aW9uLWRlbGF5OiAwcztcclxuICAgICAgYW5pbWF0aW9uLWRlbGF5OiAwcztcclxuICAgIH1cclxuICAgIFxyXG4gICAgLmN1YmUtZ3JpZC1zcGlubmVyIC5jdWJlOCB7XHJcbiAgICAgIC13ZWJraXQtYW5pbWF0aW9uLWRlbGF5OiAwLjFzO1xyXG4gICAgICBhbmltYXRpb24tZGVsYXk6IDAuMXM7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIC5jdWJlLWdyaWQtc3Bpbm5lciAuY3ViZTkge1xyXG4gICAgICAtd2Via2l0LWFuaW1hdGlvbi1kZWxheTogMC4ycztcclxuICAgICAgYW5pbWF0aW9uLWRlbGF5OiAwLjJzO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICBALXdlYmtpdC1rZXlmcmFtZXMgY3ViZUdyaWRTY2FsZURlbGF5IHtcclxuICAgICAgMCUsIDcwJSwgMTAwJSB7XHJcbiAgICAgICAgLXdlYmtpdC10cmFuc2Zvcm06IHNjYWxlM0QoMSwgMSwgMSk7XHJcbiAgICAgICAgdHJhbnNmb3JtOiBzY2FsZTNEKDEsIDEsIDEpO1xyXG4gICAgICB9XHJcbiAgICAgIDM1JSB7XHJcbiAgICAgICAgLXdlYmtpdC10cmFuc2Zvcm06IHNjYWxlM0QoMCwgMCwgMSk7XHJcbiAgICAgICAgdHJhbnNmb3JtOiBzY2FsZTNEKDAsIDAsIDEpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICBcclxuICAgIEBrZXlmcmFtZXMgY3ViZUdyaWRTY2FsZURlbGF5IHtcclxuICAgICAgMCUsIDcwJSwgMTAwJSB7XHJcbiAgICAgICAgLXdlYmtpdC10cmFuc2Zvcm06IHNjYWxlM0QoMSwgMSwgMSk7XHJcbiAgICAgICAgdHJhbnNmb3JtOiBzY2FsZTNEKDEsIDEsIDEpO1xyXG4gICAgICB9XHJcbiAgICAgIDM1JSB7XHJcbiAgICAgICAgLXdlYmtpdC10cmFuc2Zvcm06IHNjYWxlM0QoMCwgMCwgMSk7XHJcbiAgICAgICAgdHJhbnNmb3JtOiBzY2FsZTNEKDAsIDAsIDEpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgYF0sXHJcbiAgdGVtcGxhdGU6IFNwaW5uZXJUZW1wbGF0ZVxyXG59KVxyXG5cclxuZXhwb3J0IGNsYXNzIEN1YmVHcmlkQ29tcG9uZW50IGV4dGVuZHMgU3Bpbm5lckNvbXBvbmVudCB7XHJcbiAgcHVibGljIGJhc2VDbGFzczogc3RyaW5nID0gJ2N1YmUtZ3JpZC1zcGlubmVyJztcclxuICBwdWJsaWMgY2hpbGRDbGFzczogc3RyaW5nID0gJ2N1YmUnO1xyXG4gIHB1YmxpYyBudW1JdGVtczogbnVtYmVyID0gOTtcclxufVxyXG4iXX0=