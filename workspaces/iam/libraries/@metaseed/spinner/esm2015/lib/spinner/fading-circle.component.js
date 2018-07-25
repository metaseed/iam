/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Component } from '@angular/core';
import { SpinnerComponent, SpinnerTemplate } from './spinner.component';
export class FadingCircleComponent extends SpinnerComponent {
    constructor() {
        super(...arguments);
        this.baseClass = 'fading-circle-spinner';
        this.childClass = 'circle';
        this.numItems = 12;
    }
}
FadingCircleComponent.decorators = [
    { type: Component, args: [{
                selector: 'sk-fading-circle',
                styles: [`
    .fading-circle-spinner {
      position: relative;
      margin: 25px auto;
      width: 40px;
      height: 40px;
    }
    
    .fading-circle-spinner div {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: transparent !important;
    }
    
    .fading-circle-spinner div:before {
      display: block;
      margin: 0 auto;
      width: 15%;
      height: 15%;
      border-radius: 100%;
      background-color: #333;
      content: '';
      -webkit-animation: sk-circleFadeDelay 1.2s infinite ease-in-out both;
      animation: sk-circleFadeDelay 1.2s infinite ease-in-out both;
    }
    
    .fading-circle-spinner .circle2 {
      -webkit-transform: rotate(30deg);
      -ms-transform: rotate(30deg);
      transform: rotate(30deg);
    }
    
    .fading-circle-spinner .circle3 {
      -webkit-transform: rotate(60deg);
      -ms-transform: rotate(60deg);
      transform: rotate(60deg);
    }
    
    .fading-circle-spinner .circle4 {
      -webkit-transform: rotate(90deg);
      -ms-transform: rotate(90deg);
      transform: rotate(90deg);
    }
    
    .fading-circle-spinner .circle5 {
      -webkit-transform: rotate(120deg);
      -ms-transform: rotate(120deg);
      transform: rotate(120deg);
    }
    
    .fading-circle-spinner .circle6 {
      -webkit-transform: rotate(150deg);
      -ms-transform: rotate(150deg);
      transform: rotate(150deg);
    }
    
    .fading-circle-spinner .circle7 {
      -webkit-transform: rotate(180deg);
      -ms-transform: rotate(180deg);
      transform: rotate(180deg);
    }
    
    .fading-circle-spinner .circle8 {
      -webkit-transform: rotate(210deg);
      -ms-transform: rotate(210deg);
      transform: rotate(210deg);
    }
    
    .fading-circle-spinner .circle9 {
      -webkit-transform: rotate(240deg);
      -ms-transform: rotate(240deg);
      transform: rotate(240deg);
    }
    
    .fading-circle-spinner .circle10 {
      -webkit-transform: rotate(270deg);
      -ms-transform: rotate(270deg);
      transform: rotate(270deg);
    }
    
    .fading-circle-spinner .circle11 {
      -webkit-transform: rotate(300deg);
      -ms-transform: rotate(300deg);
      transform: rotate(300deg);
    }
    
    .fading-circle-spinner .circle12 {
      -webkit-transform: rotate(330deg);
      -ms-transform: rotate(330deg);
      transform: rotate(330deg);
    }
    
    .fading-circle-spinner .circle2:before {
      -webkit-animation-delay: -1.1s;
      animation-delay: -1.1s;
    }
    
    .fading-circle-spinner .circle3:before {
      -webkit-animation-delay: -1s;
      animation-delay: -1s;
    }
    
    .fading-circle-spinner .circle4:before {
      -webkit-animation-delay: -0.9s;
      animation-delay: -0.9s;
    }
    
    .fading-circle-spinner .circle5:before {
      -webkit-animation-delay: -0.8s;
      animation-delay: -0.8s;
    }
    
    .fading-circle-spinner .circle6:before {
      -webkit-animation-delay: -0.7s;
      animation-delay: -0.7s;
    }
    
    .fading-circle-spinner .circle7:before {
      -webkit-animation-delay: -0.6s;
      animation-delay: -0.6s;
    }
    
    .fading-circle-spinner .circle8:before {
      -webkit-animation-delay: -0.5s;
      animation-delay: -0.5s;
    }
    
    .fading-circle-spinner .circle9:before {
      -webkit-animation-delay: -0.4s;
      animation-delay: -0.4s;
    }
    
    .fading-circle-spinner .circle10:before {
      -webkit-animation-delay: -0.3s;
      animation-delay: -0.3s;
    }
    
    .fading-circle-spinner .circle11:before {
      -webkit-animation-delay: -0.2s;
      animation-delay: -0.2s;
    }
    
    .fading-circle-spinner .circle12:before {
      -webkit-animation-delay: -0.1s;
      animation-delay: -0.1s;
    }
    
    @-webkit-keyframes sk-circleFadeDelay {
      0%, 39%, 100% {
        opacity: 0;
      }
      40% {
        opacity: 1;
      }
    }
    
    @keyframes sk-circleFadeDelay {
      0%, 39%, 100% {
        opacity: 0;
      }
      40% {
        opacity: 1;
      }
    }
  `],
                template: SpinnerTemplate
            },] },
];
function FadingCircleComponent_tsickle_Closure_declarations() {
    /** @type {!Array<{type: !Function, args: (undefined|!Array<?>)}>} */
    FadingCircleComponent.decorators;
    /**
     * @nocollapse
     * @type {function(): !Array<(null|{type: ?, decorators: (undefined|!Array<{type: !Function, args: (undefined|!Array<?>)}>)})>}
     */
    FadingCircleComponent.ctorParameters;
    /** @type {?} */
    FadingCircleComponent.prototype.baseClass;
    /** @type {?} */
    FadingCircleComponent.prototype.childClass;
    /** @type {?} */
    FadingCircleComponent.prototype.numItems;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmFkaW5nLWNpcmNsZS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AbWV0YXNlZWQvc3BpbmVyLyIsInNvdXJjZXMiOlsibGliL3NwaW5uZXIvZmFkaW5nLWNpcmNsZS5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDMUMsT0FBTyxFQUFFLGdCQUFnQixFQUFFLGVBQWUsRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBK0t4RSxNQUFNLDRCQUE2QixTQUFRLGdCQUFnQjs7O3lCQUM5Qix1QkFBdUI7MEJBQ3RCLFFBQVE7d0JBQ1YsRUFBRTs7OztZQWhMN0IsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSxrQkFBa0I7Z0JBQzVCLE1BQU0sRUFBRSxDQUFDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQXVLUixDQUFDO2dCQUNGLFFBQVEsRUFBRSxlQUFlO2FBQzFCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IFNwaW5uZXJDb21wb25lbnQsIFNwaW5uZXJUZW1wbGF0ZSB9IGZyb20gJy4vc3Bpbm5lci5jb21wb25lbnQnO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6ICdzay1mYWRpbmctY2lyY2xlJyxcclxuICBzdHlsZXM6IFtgXHJcbiAgICAuZmFkaW5nLWNpcmNsZS1zcGlubmVyIHtcclxuICAgICAgcG9zaXRpb246IHJlbGF0aXZlO1xyXG4gICAgICBtYXJnaW46IDI1cHggYXV0bztcclxuICAgICAgd2lkdGg6IDQwcHg7XHJcbiAgICAgIGhlaWdodDogNDBweDtcclxuICAgIH1cclxuICAgIFxyXG4gICAgLmZhZGluZy1jaXJjbGUtc3Bpbm5lciBkaXYge1xyXG4gICAgICBwb3NpdGlvbjogYWJzb2x1dGU7XHJcbiAgICAgIHRvcDogMDtcclxuICAgICAgbGVmdDogMDtcclxuICAgICAgd2lkdGg6IDEwMCU7XHJcbiAgICAgIGhlaWdodDogMTAwJTtcclxuICAgICAgYmFja2dyb3VuZC1jb2xvcjogdHJhbnNwYXJlbnQgIWltcG9ydGFudDtcclxuICAgIH1cclxuICAgIFxyXG4gICAgLmZhZGluZy1jaXJjbGUtc3Bpbm5lciBkaXY6YmVmb3JlIHtcclxuICAgICAgZGlzcGxheTogYmxvY2s7XHJcbiAgICAgIG1hcmdpbjogMCBhdXRvO1xyXG4gICAgICB3aWR0aDogMTUlO1xyXG4gICAgICBoZWlnaHQ6IDE1JTtcclxuICAgICAgYm9yZGVyLXJhZGl1czogMTAwJTtcclxuICAgICAgYmFja2dyb3VuZC1jb2xvcjogIzMzMztcclxuICAgICAgY29udGVudDogJyc7XHJcbiAgICAgIC13ZWJraXQtYW5pbWF0aW9uOiBzay1jaXJjbGVGYWRlRGVsYXkgMS4ycyBpbmZpbml0ZSBlYXNlLWluLW91dCBib3RoO1xyXG4gICAgICBhbmltYXRpb246IHNrLWNpcmNsZUZhZGVEZWxheSAxLjJzIGluZmluaXRlIGVhc2UtaW4tb3V0IGJvdGg7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIC5mYWRpbmctY2lyY2xlLXNwaW5uZXIgLmNpcmNsZTIge1xyXG4gICAgICAtd2Via2l0LXRyYW5zZm9ybTogcm90YXRlKDMwZGVnKTtcclxuICAgICAgLW1zLXRyYW5zZm9ybTogcm90YXRlKDMwZGVnKTtcclxuICAgICAgdHJhbnNmb3JtOiByb3RhdGUoMzBkZWcpO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICAuZmFkaW5nLWNpcmNsZS1zcGlubmVyIC5jaXJjbGUzIHtcclxuICAgICAgLXdlYmtpdC10cmFuc2Zvcm06IHJvdGF0ZSg2MGRlZyk7XHJcbiAgICAgIC1tcy10cmFuc2Zvcm06IHJvdGF0ZSg2MGRlZyk7XHJcbiAgICAgIHRyYW5zZm9ybTogcm90YXRlKDYwZGVnKTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgLmZhZGluZy1jaXJjbGUtc3Bpbm5lciAuY2lyY2xlNCB7XHJcbiAgICAgIC13ZWJraXQtdHJhbnNmb3JtOiByb3RhdGUoOTBkZWcpO1xyXG4gICAgICAtbXMtdHJhbnNmb3JtOiByb3RhdGUoOTBkZWcpO1xyXG4gICAgICB0cmFuc2Zvcm06IHJvdGF0ZSg5MGRlZyk7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIC5mYWRpbmctY2lyY2xlLXNwaW5uZXIgLmNpcmNsZTUge1xyXG4gICAgICAtd2Via2l0LXRyYW5zZm9ybTogcm90YXRlKDEyMGRlZyk7XHJcbiAgICAgIC1tcy10cmFuc2Zvcm06IHJvdGF0ZSgxMjBkZWcpO1xyXG4gICAgICB0cmFuc2Zvcm06IHJvdGF0ZSgxMjBkZWcpO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICAuZmFkaW5nLWNpcmNsZS1zcGlubmVyIC5jaXJjbGU2IHtcclxuICAgICAgLXdlYmtpdC10cmFuc2Zvcm06IHJvdGF0ZSgxNTBkZWcpO1xyXG4gICAgICAtbXMtdHJhbnNmb3JtOiByb3RhdGUoMTUwZGVnKTtcclxuICAgICAgdHJhbnNmb3JtOiByb3RhdGUoMTUwZGVnKTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgLmZhZGluZy1jaXJjbGUtc3Bpbm5lciAuY2lyY2xlNyB7XHJcbiAgICAgIC13ZWJraXQtdHJhbnNmb3JtOiByb3RhdGUoMTgwZGVnKTtcclxuICAgICAgLW1zLXRyYW5zZm9ybTogcm90YXRlKDE4MGRlZyk7XHJcbiAgICAgIHRyYW5zZm9ybTogcm90YXRlKDE4MGRlZyk7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIC5mYWRpbmctY2lyY2xlLXNwaW5uZXIgLmNpcmNsZTgge1xyXG4gICAgICAtd2Via2l0LXRyYW5zZm9ybTogcm90YXRlKDIxMGRlZyk7XHJcbiAgICAgIC1tcy10cmFuc2Zvcm06IHJvdGF0ZSgyMTBkZWcpO1xyXG4gICAgICB0cmFuc2Zvcm06IHJvdGF0ZSgyMTBkZWcpO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICAuZmFkaW5nLWNpcmNsZS1zcGlubmVyIC5jaXJjbGU5IHtcclxuICAgICAgLXdlYmtpdC10cmFuc2Zvcm06IHJvdGF0ZSgyNDBkZWcpO1xyXG4gICAgICAtbXMtdHJhbnNmb3JtOiByb3RhdGUoMjQwZGVnKTtcclxuICAgICAgdHJhbnNmb3JtOiByb3RhdGUoMjQwZGVnKTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgLmZhZGluZy1jaXJjbGUtc3Bpbm5lciAuY2lyY2xlMTAge1xyXG4gICAgICAtd2Via2l0LXRyYW5zZm9ybTogcm90YXRlKDI3MGRlZyk7XHJcbiAgICAgIC1tcy10cmFuc2Zvcm06IHJvdGF0ZSgyNzBkZWcpO1xyXG4gICAgICB0cmFuc2Zvcm06IHJvdGF0ZSgyNzBkZWcpO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICAuZmFkaW5nLWNpcmNsZS1zcGlubmVyIC5jaXJjbGUxMSB7XHJcbiAgICAgIC13ZWJraXQtdHJhbnNmb3JtOiByb3RhdGUoMzAwZGVnKTtcclxuICAgICAgLW1zLXRyYW5zZm9ybTogcm90YXRlKDMwMGRlZyk7XHJcbiAgICAgIHRyYW5zZm9ybTogcm90YXRlKDMwMGRlZyk7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIC5mYWRpbmctY2lyY2xlLXNwaW5uZXIgLmNpcmNsZTEyIHtcclxuICAgICAgLXdlYmtpdC10cmFuc2Zvcm06IHJvdGF0ZSgzMzBkZWcpO1xyXG4gICAgICAtbXMtdHJhbnNmb3JtOiByb3RhdGUoMzMwZGVnKTtcclxuICAgICAgdHJhbnNmb3JtOiByb3RhdGUoMzMwZGVnKTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgLmZhZGluZy1jaXJjbGUtc3Bpbm5lciAuY2lyY2xlMjpiZWZvcmUge1xyXG4gICAgICAtd2Via2l0LWFuaW1hdGlvbi1kZWxheTogLTEuMXM7XHJcbiAgICAgIGFuaW1hdGlvbi1kZWxheTogLTEuMXM7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIC5mYWRpbmctY2lyY2xlLXNwaW5uZXIgLmNpcmNsZTM6YmVmb3JlIHtcclxuICAgICAgLXdlYmtpdC1hbmltYXRpb24tZGVsYXk6IC0xcztcclxuICAgICAgYW5pbWF0aW9uLWRlbGF5OiAtMXM7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIC5mYWRpbmctY2lyY2xlLXNwaW5uZXIgLmNpcmNsZTQ6YmVmb3JlIHtcclxuICAgICAgLXdlYmtpdC1hbmltYXRpb24tZGVsYXk6IC0wLjlzO1xyXG4gICAgICBhbmltYXRpb24tZGVsYXk6IC0wLjlzO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICAuZmFkaW5nLWNpcmNsZS1zcGlubmVyIC5jaXJjbGU1OmJlZm9yZSB7XHJcbiAgICAgIC13ZWJraXQtYW5pbWF0aW9uLWRlbGF5OiAtMC44cztcclxuICAgICAgYW5pbWF0aW9uLWRlbGF5OiAtMC44cztcclxuICAgIH1cclxuICAgIFxyXG4gICAgLmZhZGluZy1jaXJjbGUtc3Bpbm5lciAuY2lyY2xlNjpiZWZvcmUge1xyXG4gICAgICAtd2Via2l0LWFuaW1hdGlvbi1kZWxheTogLTAuN3M7XHJcbiAgICAgIGFuaW1hdGlvbi1kZWxheTogLTAuN3M7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIC5mYWRpbmctY2lyY2xlLXNwaW5uZXIgLmNpcmNsZTc6YmVmb3JlIHtcclxuICAgICAgLXdlYmtpdC1hbmltYXRpb24tZGVsYXk6IC0wLjZzO1xyXG4gICAgICBhbmltYXRpb24tZGVsYXk6IC0wLjZzO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICAuZmFkaW5nLWNpcmNsZS1zcGlubmVyIC5jaXJjbGU4OmJlZm9yZSB7XHJcbiAgICAgIC13ZWJraXQtYW5pbWF0aW9uLWRlbGF5OiAtMC41cztcclxuICAgICAgYW5pbWF0aW9uLWRlbGF5OiAtMC41cztcclxuICAgIH1cclxuICAgIFxyXG4gICAgLmZhZGluZy1jaXJjbGUtc3Bpbm5lciAuY2lyY2xlOTpiZWZvcmUge1xyXG4gICAgICAtd2Via2l0LWFuaW1hdGlvbi1kZWxheTogLTAuNHM7XHJcbiAgICAgIGFuaW1hdGlvbi1kZWxheTogLTAuNHM7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIC5mYWRpbmctY2lyY2xlLXNwaW5uZXIgLmNpcmNsZTEwOmJlZm9yZSB7XHJcbiAgICAgIC13ZWJraXQtYW5pbWF0aW9uLWRlbGF5OiAtMC4zcztcclxuICAgICAgYW5pbWF0aW9uLWRlbGF5OiAtMC4zcztcclxuICAgIH1cclxuICAgIFxyXG4gICAgLmZhZGluZy1jaXJjbGUtc3Bpbm5lciAuY2lyY2xlMTE6YmVmb3JlIHtcclxuICAgICAgLXdlYmtpdC1hbmltYXRpb24tZGVsYXk6IC0wLjJzO1xyXG4gICAgICBhbmltYXRpb24tZGVsYXk6IC0wLjJzO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICAuZmFkaW5nLWNpcmNsZS1zcGlubmVyIC5jaXJjbGUxMjpiZWZvcmUge1xyXG4gICAgICAtd2Via2l0LWFuaW1hdGlvbi1kZWxheTogLTAuMXM7XHJcbiAgICAgIGFuaW1hdGlvbi1kZWxheTogLTAuMXM7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIEAtd2Via2l0LWtleWZyYW1lcyBzay1jaXJjbGVGYWRlRGVsYXkge1xyXG4gICAgICAwJSwgMzklLCAxMDAlIHtcclxuICAgICAgICBvcGFjaXR5OiAwO1xyXG4gICAgICB9XHJcbiAgICAgIDQwJSB7XHJcbiAgICAgICAgb3BhY2l0eTogMTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgXHJcbiAgICBAa2V5ZnJhbWVzIHNrLWNpcmNsZUZhZGVEZWxheSB7XHJcbiAgICAgIDAlLCAzOSUsIDEwMCUge1xyXG4gICAgICAgIG9wYWNpdHk6IDA7XHJcbiAgICAgIH1cclxuICAgICAgNDAlIHtcclxuICAgICAgICBvcGFjaXR5OiAxO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgYF0sXHJcbiAgdGVtcGxhdGU6IFNwaW5uZXJUZW1wbGF0ZVxyXG59KVxyXG5cclxuZXhwb3J0IGNsYXNzIEZhZGluZ0NpcmNsZUNvbXBvbmVudCBleHRlbmRzIFNwaW5uZXJDb21wb25lbnQge1xyXG4gIHB1YmxpYyBiYXNlQ2xhc3M6IHN0cmluZyA9ICdmYWRpbmctY2lyY2xlLXNwaW5uZXInO1xyXG4gIHB1YmxpYyBjaGlsZENsYXNzOiBzdHJpbmcgPSAnY2lyY2xlJztcclxuICBwdWJsaWMgbnVtSXRlbXM6IG51bWJlciA9IDEyO1xyXG59XHJcbiJdfQ==