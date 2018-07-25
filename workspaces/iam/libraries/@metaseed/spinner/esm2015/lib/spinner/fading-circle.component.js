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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmFkaW5nLWNpcmNsZS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AbWV0YXNlZWQvc3Bpbm5lci8iLCJzb3VyY2VzIjpbImxpYi9zcGlubmVyL2ZhZGluZy1jaXJjbGUuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzFDLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxlQUFlLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQStLeEUsTUFBTSw0QkFBNkIsU0FBUSxnQkFBZ0I7Ozt5QkFDOUIsdUJBQXVCOzBCQUN0QixRQUFRO3dCQUNWLEVBQUU7Ozs7WUFoTDdCLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUsa0JBQWtCO2dCQUM1QixNQUFNLEVBQUUsQ0FBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0F1S1IsQ0FBQztnQkFDRixRQUFRLEVBQUUsZUFBZTthQUMxQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBTcGlubmVyQ29tcG9uZW50LCBTcGlubmVyVGVtcGxhdGUgfSBmcm9tICcuL3NwaW5uZXIuY29tcG9uZW50JztcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gIHNlbGVjdG9yOiAnc2stZmFkaW5nLWNpcmNsZScsXHJcbiAgc3R5bGVzOiBbYFxyXG4gICAgLmZhZGluZy1jaXJjbGUtc3Bpbm5lciB7XHJcbiAgICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcclxuICAgICAgbWFyZ2luOiAyNXB4IGF1dG87XHJcbiAgICAgIHdpZHRoOiA0MHB4O1xyXG4gICAgICBoZWlnaHQ6IDQwcHg7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIC5mYWRpbmctY2lyY2xlLXNwaW5uZXIgZGl2IHtcclxuICAgICAgcG9zaXRpb246IGFic29sdXRlO1xyXG4gICAgICB0b3A6IDA7XHJcbiAgICAgIGxlZnQ6IDA7XHJcbiAgICAgIHdpZHRoOiAxMDAlO1xyXG4gICAgICBoZWlnaHQ6IDEwMCU7XHJcbiAgICAgIGJhY2tncm91bmQtY29sb3I6IHRyYW5zcGFyZW50ICFpbXBvcnRhbnQ7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIC5mYWRpbmctY2lyY2xlLXNwaW5uZXIgZGl2OmJlZm9yZSB7XHJcbiAgICAgIGRpc3BsYXk6IGJsb2NrO1xyXG4gICAgICBtYXJnaW46IDAgYXV0bztcclxuICAgICAgd2lkdGg6IDE1JTtcclxuICAgICAgaGVpZ2h0OiAxNSU7XHJcbiAgICAgIGJvcmRlci1yYWRpdXM6IDEwMCU7XHJcbiAgICAgIGJhY2tncm91bmQtY29sb3I6ICMzMzM7XHJcbiAgICAgIGNvbnRlbnQ6ICcnO1xyXG4gICAgICAtd2Via2l0LWFuaW1hdGlvbjogc2stY2lyY2xlRmFkZURlbGF5IDEuMnMgaW5maW5pdGUgZWFzZS1pbi1vdXQgYm90aDtcclxuICAgICAgYW5pbWF0aW9uOiBzay1jaXJjbGVGYWRlRGVsYXkgMS4ycyBpbmZpbml0ZSBlYXNlLWluLW91dCBib3RoO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICAuZmFkaW5nLWNpcmNsZS1zcGlubmVyIC5jaXJjbGUyIHtcclxuICAgICAgLXdlYmtpdC10cmFuc2Zvcm06IHJvdGF0ZSgzMGRlZyk7XHJcbiAgICAgIC1tcy10cmFuc2Zvcm06IHJvdGF0ZSgzMGRlZyk7XHJcbiAgICAgIHRyYW5zZm9ybTogcm90YXRlKDMwZGVnKTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgLmZhZGluZy1jaXJjbGUtc3Bpbm5lciAuY2lyY2xlMyB7XHJcbiAgICAgIC13ZWJraXQtdHJhbnNmb3JtOiByb3RhdGUoNjBkZWcpO1xyXG4gICAgICAtbXMtdHJhbnNmb3JtOiByb3RhdGUoNjBkZWcpO1xyXG4gICAgICB0cmFuc2Zvcm06IHJvdGF0ZSg2MGRlZyk7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIC5mYWRpbmctY2lyY2xlLXNwaW5uZXIgLmNpcmNsZTQge1xyXG4gICAgICAtd2Via2l0LXRyYW5zZm9ybTogcm90YXRlKDkwZGVnKTtcclxuICAgICAgLW1zLXRyYW5zZm9ybTogcm90YXRlKDkwZGVnKTtcclxuICAgICAgdHJhbnNmb3JtOiByb3RhdGUoOTBkZWcpO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICAuZmFkaW5nLWNpcmNsZS1zcGlubmVyIC5jaXJjbGU1IHtcclxuICAgICAgLXdlYmtpdC10cmFuc2Zvcm06IHJvdGF0ZSgxMjBkZWcpO1xyXG4gICAgICAtbXMtdHJhbnNmb3JtOiByb3RhdGUoMTIwZGVnKTtcclxuICAgICAgdHJhbnNmb3JtOiByb3RhdGUoMTIwZGVnKTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgLmZhZGluZy1jaXJjbGUtc3Bpbm5lciAuY2lyY2xlNiB7XHJcbiAgICAgIC13ZWJraXQtdHJhbnNmb3JtOiByb3RhdGUoMTUwZGVnKTtcclxuICAgICAgLW1zLXRyYW5zZm9ybTogcm90YXRlKDE1MGRlZyk7XHJcbiAgICAgIHRyYW5zZm9ybTogcm90YXRlKDE1MGRlZyk7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIC5mYWRpbmctY2lyY2xlLXNwaW5uZXIgLmNpcmNsZTcge1xyXG4gICAgICAtd2Via2l0LXRyYW5zZm9ybTogcm90YXRlKDE4MGRlZyk7XHJcbiAgICAgIC1tcy10cmFuc2Zvcm06IHJvdGF0ZSgxODBkZWcpO1xyXG4gICAgICB0cmFuc2Zvcm06IHJvdGF0ZSgxODBkZWcpO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICAuZmFkaW5nLWNpcmNsZS1zcGlubmVyIC5jaXJjbGU4IHtcclxuICAgICAgLXdlYmtpdC10cmFuc2Zvcm06IHJvdGF0ZSgyMTBkZWcpO1xyXG4gICAgICAtbXMtdHJhbnNmb3JtOiByb3RhdGUoMjEwZGVnKTtcclxuICAgICAgdHJhbnNmb3JtOiByb3RhdGUoMjEwZGVnKTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgLmZhZGluZy1jaXJjbGUtc3Bpbm5lciAuY2lyY2xlOSB7XHJcbiAgICAgIC13ZWJraXQtdHJhbnNmb3JtOiByb3RhdGUoMjQwZGVnKTtcclxuICAgICAgLW1zLXRyYW5zZm9ybTogcm90YXRlKDI0MGRlZyk7XHJcbiAgICAgIHRyYW5zZm9ybTogcm90YXRlKDI0MGRlZyk7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIC5mYWRpbmctY2lyY2xlLXNwaW5uZXIgLmNpcmNsZTEwIHtcclxuICAgICAgLXdlYmtpdC10cmFuc2Zvcm06IHJvdGF0ZSgyNzBkZWcpO1xyXG4gICAgICAtbXMtdHJhbnNmb3JtOiByb3RhdGUoMjcwZGVnKTtcclxuICAgICAgdHJhbnNmb3JtOiByb3RhdGUoMjcwZGVnKTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgLmZhZGluZy1jaXJjbGUtc3Bpbm5lciAuY2lyY2xlMTEge1xyXG4gICAgICAtd2Via2l0LXRyYW5zZm9ybTogcm90YXRlKDMwMGRlZyk7XHJcbiAgICAgIC1tcy10cmFuc2Zvcm06IHJvdGF0ZSgzMDBkZWcpO1xyXG4gICAgICB0cmFuc2Zvcm06IHJvdGF0ZSgzMDBkZWcpO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICAuZmFkaW5nLWNpcmNsZS1zcGlubmVyIC5jaXJjbGUxMiB7XHJcbiAgICAgIC13ZWJraXQtdHJhbnNmb3JtOiByb3RhdGUoMzMwZGVnKTtcclxuICAgICAgLW1zLXRyYW5zZm9ybTogcm90YXRlKDMzMGRlZyk7XHJcbiAgICAgIHRyYW5zZm9ybTogcm90YXRlKDMzMGRlZyk7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIC5mYWRpbmctY2lyY2xlLXNwaW5uZXIgLmNpcmNsZTI6YmVmb3JlIHtcclxuICAgICAgLXdlYmtpdC1hbmltYXRpb24tZGVsYXk6IC0xLjFzO1xyXG4gICAgICBhbmltYXRpb24tZGVsYXk6IC0xLjFzO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICAuZmFkaW5nLWNpcmNsZS1zcGlubmVyIC5jaXJjbGUzOmJlZm9yZSB7XHJcbiAgICAgIC13ZWJraXQtYW5pbWF0aW9uLWRlbGF5OiAtMXM7XHJcbiAgICAgIGFuaW1hdGlvbi1kZWxheTogLTFzO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICAuZmFkaW5nLWNpcmNsZS1zcGlubmVyIC5jaXJjbGU0OmJlZm9yZSB7XHJcbiAgICAgIC13ZWJraXQtYW5pbWF0aW9uLWRlbGF5OiAtMC45cztcclxuICAgICAgYW5pbWF0aW9uLWRlbGF5OiAtMC45cztcclxuICAgIH1cclxuICAgIFxyXG4gICAgLmZhZGluZy1jaXJjbGUtc3Bpbm5lciAuY2lyY2xlNTpiZWZvcmUge1xyXG4gICAgICAtd2Via2l0LWFuaW1hdGlvbi1kZWxheTogLTAuOHM7XHJcbiAgICAgIGFuaW1hdGlvbi1kZWxheTogLTAuOHM7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIC5mYWRpbmctY2lyY2xlLXNwaW5uZXIgLmNpcmNsZTY6YmVmb3JlIHtcclxuICAgICAgLXdlYmtpdC1hbmltYXRpb24tZGVsYXk6IC0wLjdzO1xyXG4gICAgICBhbmltYXRpb24tZGVsYXk6IC0wLjdzO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICAuZmFkaW5nLWNpcmNsZS1zcGlubmVyIC5jaXJjbGU3OmJlZm9yZSB7XHJcbiAgICAgIC13ZWJraXQtYW5pbWF0aW9uLWRlbGF5OiAtMC42cztcclxuICAgICAgYW5pbWF0aW9uLWRlbGF5OiAtMC42cztcclxuICAgIH1cclxuICAgIFxyXG4gICAgLmZhZGluZy1jaXJjbGUtc3Bpbm5lciAuY2lyY2xlODpiZWZvcmUge1xyXG4gICAgICAtd2Via2l0LWFuaW1hdGlvbi1kZWxheTogLTAuNXM7XHJcbiAgICAgIGFuaW1hdGlvbi1kZWxheTogLTAuNXM7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIC5mYWRpbmctY2lyY2xlLXNwaW5uZXIgLmNpcmNsZTk6YmVmb3JlIHtcclxuICAgICAgLXdlYmtpdC1hbmltYXRpb24tZGVsYXk6IC0wLjRzO1xyXG4gICAgICBhbmltYXRpb24tZGVsYXk6IC0wLjRzO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICAuZmFkaW5nLWNpcmNsZS1zcGlubmVyIC5jaXJjbGUxMDpiZWZvcmUge1xyXG4gICAgICAtd2Via2l0LWFuaW1hdGlvbi1kZWxheTogLTAuM3M7XHJcbiAgICAgIGFuaW1hdGlvbi1kZWxheTogLTAuM3M7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIC5mYWRpbmctY2lyY2xlLXNwaW5uZXIgLmNpcmNsZTExOmJlZm9yZSB7XHJcbiAgICAgIC13ZWJraXQtYW5pbWF0aW9uLWRlbGF5OiAtMC4ycztcclxuICAgICAgYW5pbWF0aW9uLWRlbGF5OiAtMC4ycztcclxuICAgIH1cclxuICAgIFxyXG4gICAgLmZhZGluZy1jaXJjbGUtc3Bpbm5lciAuY2lyY2xlMTI6YmVmb3JlIHtcclxuICAgICAgLXdlYmtpdC1hbmltYXRpb24tZGVsYXk6IC0wLjFzO1xyXG4gICAgICBhbmltYXRpb24tZGVsYXk6IC0wLjFzO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICBALXdlYmtpdC1rZXlmcmFtZXMgc2stY2lyY2xlRmFkZURlbGF5IHtcclxuICAgICAgMCUsIDM5JSwgMTAwJSB7XHJcbiAgICAgICAgb3BhY2l0eTogMDtcclxuICAgICAgfVxyXG4gICAgICA0MCUge1xyXG4gICAgICAgIG9wYWNpdHk6IDE7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIFxyXG4gICAgQGtleWZyYW1lcyBzay1jaXJjbGVGYWRlRGVsYXkge1xyXG4gICAgICAwJSwgMzklLCAxMDAlIHtcclxuICAgICAgICBvcGFjaXR5OiAwO1xyXG4gICAgICB9XHJcbiAgICAgIDQwJSB7XHJcbiAgICAgICAgb3BhY2l0eTogMTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIGBdLFxyXG4gIHRlbXBsYXRlOiBTcGlubmVyVGVtcGxhdGVcclxufSlcclxuXHJcbmV4cG9ydCBjbGFzcyBGYWRpbmdDaXJjbGVDb21wb25lbnQgZXh0ZW5kcyBTcGlubmVyQ29tcG9uZW50IHtcclxuICBwdWJsaWMgYmFzZUNsYXNzOiBzdHJpbmcgPSAnZmFkaW5nLWNpcmNsZS1zcGlubmVyJztcclxuICBwdWJsaWMgY2hpbGRDbGFzczogc3RyaW5nID0gJ2NpcmNsZSc7XHJcbiAgcHVibGljIG51bUl0ZW1zOiBudW1iZXIgPSAxMjtcclxufVxyXG4iXX0=