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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3ViZS1ncmlkLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BtZXRhc2VlZC9zcGlubmVyLyIsInNvdXJjZXMiOlsibGliL3NwaW5uZXIvY3ViZS1ncmlkLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDMUMsT0FBTyxFQUFFLGdCQUFnQixFQUFFLGVBQWUsRUFBRSxNQUFNLHFCQUFxQixDQUFDOztJQTBGakMsNkNBQWdCOzs7MEJBQzFCLG1CQUFtQjsyQkFDbEIsTUFBTTt5QkFDUixDQUFDOzs7O2dCQTNGNUIsU0FBUyxTQUFDO29CQUNULFFBQVEsRUFBRSxjQUFjO29CQUN4QixNQUFNLEVBQUUsQ0FBQyxzNERBa0ZSLENBQUM7b0JBQ0YsUUFBUSxFQUFFLGVBQWU7aUJBQzFCOzs0QkF6RkQ7RUEyRnVDLGdCQUFnQjtTQUExQyxpQkFBaUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgU3Bpbm5lckNvbXBvbmVudCwgU3Bpbm5lclRlbXBsYXRlIH0gZnJvbSAnLi9zcGlubmVyLmNvbXBvbmVudCc7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICBzZWxlY3RvcjogJ3NrLWN1YmUtZ3JpZCcsXHJcbiAgc3R5bGVzOiBbYFxyXG4gICAgLmN1YmUtZ3JpZC1zcGlubmVyIHtcclxuICAgICAgbWFyZ2luOiAyNXB4IGF1dG87XHJcbiAgICAgIHdpZHRoOiA0MHB4O1xyXG4gICAgICBoZWlnaHQ6IDQwcHg7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIC5jdWJlLWdyaWQtc3Bpbm5lciBkaXYge1xyXG4gICAgICBmbG9hdDogbGVmdDtcclxuICAgICAgd2lkdGg6IDMzJTtcclxuICAgICAgaGVpZ2h0OiAzMyU7XHJcbiAgICAgIFxyXG4gICAgICAtd2Via2l0LWFuaW1hdGlvbjogY3ViZUdyaWRTY2FsZURlbGF5IDEuM3MgaW5maW5pdGUgZWFzZS1pbi1vdXQ7XHJcbiAgICAgIGFuaW1hdGlvbjogY3ViZUdyaWRTY2FsZURlbGF5IDEuM3MgaW5maW5pdGUgZWFzZS1pbi1vdXQ7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIC5jdWJlLWdyaWQtc3Bpbm5lciAuY3ViZTEge1xyXG4gICAgICAtd2Via2l0LWFuaW1hdGlvbi1kZWxheTogMC4ycztcclxuICAgICAgYW5pbWF0aW9uLWRlbGF5OiAwLjJzO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICAuY3ViZS1ncmlkLXNwaW5uZXIgLmN1YmUyIHtcclxuICAgICAgLXdlYmtpdC1hbmltYXRpb24tZGVsYXk6IDAuM3M7XHJcbiAgICAgIGFuaW1hdGlvbi1kZWxheTogMC4zcztcclxuICAgIH1cclxuICAgIFxyXG4gICAgLmN1YmUtZ3JpZC1zcGlubmVyIC5jdWJlMyB7XHJcbiAgICAgIC13ZWJraXQtYW5pbWF0aW9uLWRlbGF5OiAwLjRzO1xyXG4gICAgICBhbmltYXRpb24tZGVsYXk6IDAuNHM7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIC5jdWJlLWdyaWQtc3Bpbm5lciAuY3ViZTQge1xyXG4gICAgICAtd2Via2l0LWFuaW1hdGlvbi1kZWxheTogMC4xcztcclxuICAgICAgYW5pbWF0aW9uLWRlbGF5OiAwLjFzO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICAuY3ViZS1ncmlkLXNwaW5uZXIgLmN1YmU1IHtcclxuICAgICAgLXdlYmtpdC1hbmltYXRpb24tZGVsYXk6IDAuMnM7XHJcbiAgICAgIGFuaW1hdGlvbi1kZWxheTogMC4ycztcclxuICAgIH1cclxuICAgIFxyXG4gICAgLmN1YmUtZ3JpZC1zcGlubmVyIC5jdWJlNiB7XHJcbiAgICAgIC13ZWJraXQtYW5pbWF0aW9uLWRlbGF5OiAwLjNzO1xyXG4gICAgICBhbmltYXRpb24tZGVsYXk6IDAuM3M7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIC5jdWJlLWdyaWQtc3Bpbm5lciAuY3ViZTcge1xyXG4gICAgICAtd2Via2l0LWFuaW1hdGlvbi1kZWxheTogMHM7XHJcbiAgICAgIGFuaW1hdGlvbi1kZWxheTogMHM7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIC5jdWJlLWdyaWQtc3Bpbm5lciAuY3ViZTgge1xyXG4gICAgICAtd2Via2l0LWFuaW1hdGlvbi1kZWxheTogMC4xcztcclxuICAgICAgYW5pbWF0aW9uLWRlbGF5OiAwLjFzO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICAuY3ViZS1ncmlkLXNwaW5uZXIgLmN1YmU5IHtcclxuICAgICAgLXdlYmtpdC1hbmltYXRpb24tZGVsYXk6IDAuMnM7XHJcbiAgICAgIGFuaW1hdGlvbi1kZWxheTogMC4ycztcclxuICAgIH1cclxuICAgIFxyXG4gICAgQC13ZWJraXQta2V5ZnJhbWVzIGN1YmVHcmlkU2NhbGVEZWxheSB7XHJcbiAgICAgIDAlLCA3MCUsIDEwMCUge1xyXG4gICAgICAgIC13ZWJraXQtdHJhbnNmb3JtOiBzY2FsZTNEKDEsIDEsIDEpO1xyXG4gICAgICAgIHRyYW5zZm9ybTogc2NhbGUzRCgxLCAxLCAxKTtcclxuICAgICAgfVxyXG4gICAgICAzNSUge1xyXG4gICAgICAgIC13ZWJraXQtdHJhbnNmb3JtOiBzY2FsZTNEKDAsIDAsIDEpO1xyXG4gICAgICAgIHRyYW5zZm9ybTogc2NhbGUzRCgwLCAwLCAxKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgXHJcbiAgICBAa2V5ZnJhbWVzIGN1YmVHcmlkU2NhbGVEZWxheSB7XHJcbiAgICAgIDAlLCA3MCUsIDEwMCUge1xyXG4gICAgICAgIC13ZWJraXQtdHJhbnNmb3JtOiBzY2FsZTNEKDEsIDEsIDEpO1xyXG4gICAgICAgIHRyYW5zZm9ybTogc2NhbGUzRCgxLCAxLCAxKTtcclxuICAgICAgfVxyXG4gICAgICAzNSUge1xyXG4gICAgICAgIC13ZWJraXQtdHJhbnNmb3JtOiBzY2FsZTNEKDAsIDAsIDEpO1xyXG4gICAgICAgIHRyYW5zZm9ybTogc2NhbGUzRCgwLCAwLCAxKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIGBdLFxyXG4gIHRlbXBsYXRlOiBTcGlubmVyVGVtcGxhdGVcclxufSlcclxuXHJcbmV4cG9ydCBjbGFzcyBDdWJlR3JpZENvbXBvbmVudCBleHRlbmRzIFNwaW5uZXJDb21wb25lbnQge1xyXG4gIHB1YmxpYyBiYXNlQ2xhc3M6IHN0cmluZyA9ICdjdWJlLWdyaWQtc3Bpbm5lcic7XHJcbiAgcHVibGljIGNoaWxkQ2xhc3M6IHN0cmluZyA9ICdjdWJlJztcclxuICBwdWJsaWMgbnVtSXRlbXM6IG51bWJlciA9IDk7XHJcbn1cclxuIl19