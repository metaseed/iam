/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Component } from '@angular/core';
import { SpinnerComponent, SpinnerTemplate } from './spinner.component';
export class FoldingCubeComponent extends SpinnerComponent {
    constructor() {
        super(...arguments);
        this.baseClass = 'folding-cube-spinner';
        this.childClass = 'cube';
        this.numItems = 4;
    }
}
FoldingCubeComponent.decorators = [
    { type: Component, args: [{
                selector: 'sk-folding-cube',
                styles: [`
    .folding-cube-spinner {
      position: relative;
      margin: 25px auto;
      width: 40px;
      height: 40px;
      
      -webkit-transform: rotateZ(45deg);
      transform: rotateZ(45deg);
    }
    
    .folding-cube-spinner div {
      position: relative;
      float: left;
      width: 50%;
      height: 50%;
      background-color: transparent !important;
      -webkit-transform: scale(1.1);
      -ms-transform: scale(1.1);
      transform: scale(1.1);
    }
    
    .folding-cube-spinner div:before {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: #333;
      content: '';
      -webkit-transform-origin: 100% 100%;
      -ms-transform-origin: 100% 100%;
      transform-origin: 100% 100%;
      -webkit-animation: sk-foldCubeAngle 2.4s infinite linear both;
      animation: sk-foldCubeAngle 2.4s infinite linear both;
    }
    
    .folding-cube-spinner .cube2 {
      -webkit-transform: scale(1.1) rotateZ(90deg);
      transform: scale(1.1) rotateZ(90deg);
    }
    
    .folding-cube-spinner .cube4 {
      -webkit-transform: scale(1.1) rotateZ(180deg);
      transform: scale(1.1) rotateZ(180deg);
    }
    
    .folding-cube-spinner .cube3 {
      -webkit-transform: scale(1.1) rotateZ(270deg);
      transform: scale(1.1) rotateZ(270deg);
    }
    
    .folding-cube-spinner .cube2:before {
      -webkit-animation-delay: 0.3s;
      animation-delay: 0.3s;
    }
    
    .folding-cube-spinner .cube4:before {
      -webkit-animation-delay: 0.6s;
      animation-delay: 0.6s;
    }
    
    .folding-cube-spinner .cube3:before {
      -webkit-animation-delay: 0.9s;
      animation-delay: 0.9s;
    }
    
    @-webkit-keyframes sk-foldCubeAngle {
      0%, 10% {
        -webkit-transform: perspective(140px) rotateX(-180deg);
        transform: perspective(140px) rotateX(-180deg);
        opacity: 0;
      }
      25%, 75% {
        -webkit-transform: perspective(140px) rotateX(0deg);
        transform: perspective(140px) rotateX(0deg);
        opacity: 1;
      }
      90%, 100% {
        -webkit-transform: perspective(140px) rotateY(180deg);
        transform: perspective(140px) rotateY(180deg);
        opacity: 0;
      }
    }
    
    @keyframes sk-foldCubeAngle {
      0%, 10% {
        -webkit-transform: perspective(140px) rotateX(-180deg);
        transform: perspective(140px) rotateX(-180deg);
        opacity: 0;
      }
      25%, 75% {
        -webkit-transform: perspective(140px) rotateX(0deg);
        transform: perspective(140px) rotateX(0deg);
        opacity: 1;
      }
      90%, 100% {
        -webkit-transform: perspective(140px) rotateY(180deg);
        transform: perspective(140px) rotateY(180deg);
        opacity: 0;
      }
    }
  `],
                template: SpinnerTemplate
            },] },
];
function FoldingCubeComponent_tsickle_Closure_declarations() {
    /** @type {!Array<{type: !Function, args: (undefined|!Array<?>)}>} */
    FoldingCubeComponent.decorators;
    /**
     * @nocollapse
     * @type {function(): !Array<(null|{type: ?, decorators: (undefined|!Array<{type: !Function, args: (undefined|!Array<?>)}>)})>}
     */
    FoldingCubeComponent.ctorParameters;
    /** @type {?} */
    FoldingCubeComponent.prototype.baseClass;
    /** @type {?} */
    FoldingCubeComponent.prototype.childClass;
    /** @type {?} */
    FoldingCubeComponent.prototype.numItems;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9sZGluZy1jdWJlLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BtZXRhc2VlZC9zcGlubmVyLyIsInNvdXJjZXMiOlsibGliL3NwaW5uZXIvZm9sZGluZy1jdWJlLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMxQyxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsZUFBZSxFQUFFLE1BQU0scUJBQXFCLENBQUM7QUE4R3hFLE1BQU0sMkJBQTRCLFNBQVEsZ0JBQWdCOzs7eUJBQzdCLHNCQUFzQjswQkFDckIsTUFBTTt3QkFDUixDQUFDOzs7O1lBL0c1QixTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLGlCQUFpQjtnQkFDM0IsTUFBTSxFQUFFLENBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQXNHUixDQUFDO2dCQUNGLFFBQVEsRUFBRSxlQUFlO2FBQzFCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IFNwaW5uZXJDb21wb25lbnQsIFNwaW5uZXJUZW1wbGF0ZSB9IGZyb20gJy4vc3Bpbm5lci5jb21wb25lbnQnO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6ICdzay1mb2xkaW5nLWN1YmUnLFxyXG4gIHN0eWxlczogW2BcclxuICAgIC5mb2xkaW5nLWN1YmUtc3Bpbm5lciB7XHJcbiAgICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcclxuICAgICAgbWFyZ2luOiAyNXB4IGF1dG87XHJcbiAgICAgIHdpZHRoOiA0MHB4O1xyXG4gICAgICBoZWlnaHQ6IDQwcHg7XHJcbiAgICAgIFxyXG4gICAgICAtd2Via2l0LXRyYW5zZm9ybTogcm90YXRlWig0NWRlZyk7XHJcbiAgICAgIHRyYW5zZm9ybTogcm90YXRlWig0NWRlZyk7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIC5mb2xkaW5nLWN1YmUtc3Bpbm5lciBkaXYge1xyXG4gICAgICBwb3NpdGlvbjogcmVsYXRpdmU7XHJcbiAgICAgIGZsb2F0OiBsZWZ0O1xyXG4gICAgICB3aWR0aDogNTAlO1xyXG4gICAgICBoZWlnaHQ6IDUwJTtcclxuICAgICAgYmFja2dyb3VuZC1jb2xvcjogdHJhbnNwYXJlbnQgIWltcG9ydGFudDtcclxuICAgICAgLXdlYmtpdC10cmFuc2Zvcm06IHNjYWxlKDEuMSk7XHJcbiAgICAgIC1tcy10cmFuc2Zvcm06IHNjYWxlKDEuMSk7XHJcbiAgICAgIHRyYW5zZm9ybTogc2NhbGUoMS4xKTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgLmZvbGRpbmctY3ViZS1zcGlubmVyIGRpdjpiZWZvcmUge1xyXG4gICAgICBwb3NpdGlvbjogYWJzb2x1dGU7XHJcbiAgICAgIHRvcDogMDtcclxuICAgICAgbGVmdDogMDtcclxuICAgICAgd2lkdGg6IDEwMCU7XHJcbiAgICAgIGhlaWdodDogMTAwJTtcclxuICAgICAgYmFja2dyb3VuZC1jb2xvcjogIzMzMztcclxuICAgICAgY29udGVudDogJyc7XHJcbiAgICAgIC13ZWJraXQtdHJhbnNmb3JtLW9yaWdpbjogMTAwJSAxMDAlO1xyXG4gICAgICAtbXMtdHJhbnNmb3JtLW9yaWdpbjogMTAwJSAxMDAlO1xyXG4gICAgICB0cmFuc2Zvcm0tb3JpZ2luOiAxMDAlIDEwMCU7XHJcbiAgICAgIC13ZWJraXQtYW5pbWF0aW9uOiBzay1mb2xkQ3ViZUFuZ2xlIDIuNHMgaW5maW5pdGUgbGluZWFyIGJvdGg7XHJcbiAgICAgIGFuaW1hdGlvbjogc2stZm9sZEN1YmVBbmdsZSAyLjRzIGluZmluaXRlIGxpbmVhciBib3RoO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICAuZm9sZGluZy1jdWJlLXNwaW5uZXIgLmN1YmUyIHtcclxuICAgICAgLXdlYmtpdC10cmFuc2Zvcm06IHNjYWxlKDEuMSkgcm90YXRlWig5MGRlZyk7XHJcbiAgICAgIHRyYW5zZm9ybTogc2NhbGUoMS4xKSByb3RhdGVaKDkwZGVnKTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgLmZvbGRpbmctY3ViZS1zcGlubmVyIC5jdWJlNCB7XHJcbiAgICAgIC13ZWJraXQtdHJhbnNmb3JtOiBzY2FsZSgxLjEpIHJvdGF0ZVooMTgwZGVnKTtcclxuICAgICAgdHJhbnNmb3JtOiBzY2FsZSgxLjEpIHJvdGF0ZVooMTgwZGVnKTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgLmZvbGRpbmctY3ViZS1zcGlubmVyIC5jdWJlMyB7XHJcbiAgICAgIC13ZWJraXQtdHJhbnNmb3JtOiBzY2FsZSgxLjEpIHJvdGF0ZVooMjcwZGVnKTtcclxuICAgICAgdHJhbnNmb3JtOiBzY2FsZSgxLjEpIHJvdGF0ZVooMjcwZGVnKTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgLmZvbGRpbmctY3ViZS1zcGlubmVyIC5jdWJlMjpiZWZvcmUge1xyXG4gICAgICAtd2Via2l0LWFuaW1hdGlvbi1kZWxheTogMC4zcztcclxuICAgICAgYW5pbWF0aW9uLWRlbGF5OiAwLjNzO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICAuZm9sZGluZy1jdWJlLXNwaW5uZXIgLmN1YmU0OmJlZm9yZSB7XHJcbiAgICAgIC13ZWJraXQtYW5pbWF0aW9uLWRlbGF5OiAwLjZzO1xyXG4gICAgICBhbmltYXRpb24tZGVsYXk6IDAuNnM7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIC5mb2xkaW5nLWN1YmUtc3Bpbm5lciAuY3ViZTM6YmVmb3JlIHtcclxuICAgICAgLXdlYmtpdC1hbmltYXRpb24tZGVsYXk6IDAuOXM7XHJcbiAgICAgIGFuaW1hdGlvbi1kZWxheTogMC45cztcclxuICAgIH1cclxuICAgIFxyXG4gICAgQC13ZWJraXQta2V5ZnJhbWVzIHNrLWZvbGRDdWJlQW5nbGUge1xyXG4gICAgICAwJSwgMTAlIHtcclxuICAgICAgICAtd2Via2l0LXRyYW5zZm9ybTogcGVyc3BlY3RpdmUoMTQwcHgpIHJvdGF0ZVgoLTE4MGRlZyk7XHJcbiAgICAgICAgdHJhbnNmb3JtOiBwZXJzcGVjdGl2ZSgxNDBweCkgcm90YXRlWCgtMTgwZGVnKTtcclxuICAgICAgICBvcGFjaXR5OiAwO1xyXG4gICAgICB9XHJcbiAgICAgIDI1JSwgNzUlIHtcclxuICAgICAgICAtd2Via2l0LXRyYW5zZm9ybTogcGVyc3BlY3RpdmUoMTQwcHgpIHJvdGF0ZVgoMGRlZyk7XHJcbiAgICAgICAgdHJhbnNmb3JtOiBwZXJzcGVjdGl2ZSgxNDBweCkgcm90YXRlWCgwZGVnKTtcclxuICAgICAgICBvcGFjaXR5OiAxO1xyXG4gICAgICB9XHJcbiAgICAgIDkwJSwgMTAwJSB7XHJcbiAgICAgICAgLXdlYmtpdC10cmFuc2Zvcm06IHBlcnNwZWN0aXZlKDE0MHB4KSByb3RhdGVZKDE4MGRlZyk7XHJcbiAgICAgICAgdHJhbnNmb3JtOiBwZXJzcGVjdGl2ZSgxNDBweCkgcm90YXRlWSgxODBkZWcpO1xyXG4gICAgICAgIG9wYWNpdHk6IDA7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIFxyXG4gICAgQGtleWZyYW1lcyBzay1mb2xkQ3ViZUFuZ2xlIHtcclxuICAgICAgMCUsIDEwJSB7XHJcbiAgICAgICAgLXdlYmtpdC10cmFuc2Zvcm06IHBlcnNwZWN0aXZlKDE0MHB4KSByb3RhdGVYKC0xODBkZWcpO1xyXG4gICAgICAgIHRyYW5zZm9ybTogcGVyc3BlY3RpdmUoMTQwcHgpIHJvdGF0ZVgoLTE4MGRlZyk7XHJcbiAgICAgICAgb3BhY2l0eTogMDtcclxuICAgICAgfVxyXG4gICAgICAyNSUsIDc1JSB7XHJcbiAgICAgICAgLXdlYmtpdC10cmFuc2Zvcm06IHBlcnNwZWN0aXZlKDE0MHB4KSByb3RhdGVYKDBkZWcpO1xyXG4gICAgICAgIHRyYW5zZm9ybTogcGVyc3BlY3RpdmUoMTQwcHgpIHJvdGF0ZVgoMGRlZyk7XHJcbiAgICAgICAgb3BhY2l0eTogMTtcclxuICAgICAgfVxyXG4gICAgICA5MCUsIDEwMCUge1xyXG4gICAgICAgIC13ZWJraXQtdHJhbnNmb3JtOiBwZXJzcGVjdGl2ZSgxNDBweCkgcm90YXRlWSgxODBkZWcpO1xyXG4gICAgICAgIHRyYW5zZm9ybTogcGVyc3BlY3RpdmUoMTQwcHgpIHJvdGF0ZVkoMTgwZGVnKTtcclxuICAgICAgICBvcGFjaXR5OiAwO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgYF0sXHJcbiAgdGVtcGxhdGU6IFNwaW5uZXJUZW1wbGF0ZVxyXG59KVxyXG5cclxuZXhwb3J0IGNsYXNzIEZvbGRpbmdDdWJlQ29tcG9uZW50IGV4dGVuZHMgU3Bpbm5lckNvbXBvbmVudCB7XHJcbiAgcHVibGljIGJhc2VDbGFzczogc3RyaW5nID0gJ2ZvbGRpbmctY3ViZS1zcGlubmVyJztcclxuICBwdWJsaWMgY2hpbGRDbGFzczogc3RyaW5nID0gJ2N1YmUnO1xyXG4gIHB1YmxpYyBudW1JdGVtczogbnVtYmVyID0gNDtcclxufVxyXG4iXX0=