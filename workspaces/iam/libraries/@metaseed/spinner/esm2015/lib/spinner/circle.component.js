/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Component } from '@angular/core';
import { SpinnerComponent, SpinnerTemplate } from './spinner.component';
export class CircleComponent extends SpinnerComponent {
    constructor() {
        super(...arguments);
        this.baseClass = 'circle-spinner';
        this.childClass = 'circle';
        this.numItems = 12;
    }
}
CircleComponent.decorators = [
    { type: Component, args: [{
                selector: 'sk-circle',
                styles: [`
    .circle-spinner {
      position: relative;
      margin: 25px auto;
      width: 40px;
      height: 40px;
    }
    
    .circle-spinner > div {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: transparent !important;
    }
    
    .circle-spinner div:before {
      display: block;
      margin: 0 auto;
      width: 15%;
      height: 15%;
      border-radius: 100%;
      background-color: #333;
      content: '';
      -webkit-animation: sk-circleBounceDelay 1.2s infinite ease-in-out both;
      animation: sk-circleBounceDelay 1.2s infinite ease-in-out both;
    }
    
    .circle-spinner .circle2 {
      -webkit-transform: rotate(30deg);
      -ms-transform: rotate(30deg);
      transform: rotate(30deg);
    }
    
    .circle-spinner .circle3 {
      -webkit-transform: rotate(60deg);
      -ms-transform: rotate(60deg);
      transform: rotate(60deg);
    }
    
    .circle-spinner .circle4 {
      -webkit-transform: rotate(90deg);
      -ms-transform: rotate(90deg);
      transform: rotate(90deg);
    }
    
    .circle-spinner .circle5 {
      -webkit-transform: rotate(120deg);
      -ms-transform: rotate(120deg);
      transform: rotate(120deg);
    }
    
    .circle-spinner .circle6 {
      -webkit-transform: rotate(150deg);
      -ms-transform: rotate(150deg);
      transform: rotate(150deg);
    }
    
    .circle-spinner .circle7 {
      -webkit-transform: rotate(180deg);
      -ms-transform: rotate(180deg);
      transform: rotate(180deg);
    }
    
    .circle-spinner .circle8 {
      -webkit-transform: rotate(210deg);
      -ms-transform: rotate(210deg);
      transform: rotate(210deg);
    }
    
    .circle-spinner .circle9 {
      -webkit-transform: rotate(240deg);
      -ms-transform: rotate(240deg);
      transform: rotate(240deg);
    }
    
    .circle-spinner .circle10 {
      -webkit-transform: rotate(270deg);
      -ms-transform: rotate(270deg);
      transform: rotate(270deg);
    }
    
    .circle-spinner .circle11 {
      -webkit-transform: rotate(300deg);
      -ms-transform: rotate(300deg);
      transform: rotate(300deg);
    }
    
    .circle-spinner .circle12 {
      -webkit-transform: rotate(330deg);
      -ms-transform: rotate(330deg);
      transform: rotate(330deg);
    }
    
    .circle-spinner .circle2:before {
      -webkit-animation-delay: -1.1s;
      animation-delay: -1.1s;
    }
    
    .circle-spinner .circle3:before {
      -webkit-animation-delay: -1s;
      animation-delay: -1s;
    }
    
    .circle-spinner .circle4:before {
      -webkit-animation-delay: -0.9s;
      animation-delay: -0.9s;
    }
    
    .circle-spinner .circle5:before {
      -webkit-animation-delay: -0.8s;
      animation-delay: -0.8s;
    }
    
    .circle-spinner .circle6:before {
      -webkit-animation-delay: -0.7s;
      animation-delay: -0.7s;
    }
    
    .circle-spinner .circle7:before {
      -webkit-animation-delay: -0.6s;
      animation-delay: -0.6s;
    }
    
    .circle-spinner .circle8:before {
      -webkit-animation-delay: -0.5s;
      animation-delay: -0.5s;
    }
    
    .circle-spinner .circle9:before {
      -webkit-animation-delay: -0.4s;
      animation-delay: -0.4s;
    }
    
    .circle-spinner .circle10:before {
      -webkit-animation-delay: -0.3s;
      animation-delay: -0.3s;
    }
    
    .circle-spinner .circle11:before {
      -webkit-animation-delay: -0.2s;
      animation-delay: -0.2s;
    }
    
    .circle-spinner .circle12:before {
      -webkit-animation-delay: -0.1s;
      animation-delay: -0.1s;
    }
    
    @-webkit-keyframes sk-circleBounceDelay {
      0%, 80%, 100% {
        -webkit-transform: scale(0);
        transform: scale(0);
      }
      40% {
        -webkit-transform: scale(1);
        transform: scale(1);
      }
    }
    
    @keyframes sk-circleBounceDelay {
      0%, 80%, 100% {
        -webkit-transform: scale(0);
        transform: scale(0);
      }
      40% {
        -webkit-transform: scale(1);
        transform: scale(1);
      }
    }
  `],
                template: SpinnerTemplate
            },] },
];
function CircleComponent_tsickle_Closure_declarations() {
    /** @type {!Array<{type: !Function, args: (undefined|!Array<?>)}>} */
    CircleComponent.decorators;
    /**
     * @nocollapse
     * @type {function(): !Array<(null|{type: ?, decorators: (undefined|!Array<{type: !Function, args: (undefined|!Array<?>)}>)})>}
     */
    CircleComponent.ctorParameters;
    /** @type {?} */
    CircleComponent.prototype.baseClass;
    /** @type {?} */
    CircleComponent.prototype.childClass;
    /** @type {?} */
    CircleComponent.prototype.numItems;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2lyY2xlLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BtZXRhc2VlZC9zcGlubmVyLyIsInNvdXJjZXMiOlsibGliL3NwaW5uZXIvY2lyY2xlLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMxQyxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsZUFBZSxFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFtTHhFLE1BQU0sc0JBQXVCLFNBQVEsZ0JBQWdCOzs7eUJBQ3hCLGdCQUFnQjswQkFDZixRQUFRO3dCQUNWLEVBQUU7Ozs7WUFwTDdCLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUsV0FBVztnQkFDckIsTUFBTSxFQUFFLENBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQTJLUixDQUFDO2dCQUNGLFFBQVEsRUFBRSxlQUFlO2FBQzFCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IFNwaW5uZXJDb21wb25lbnQsIFNwaW5uZXJUZW1wbGF0ZSB9IGZyb20gJy4vc3Bpbm5lci5jb21wb25lbnQnO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6ICdzay1jaXJjbGUnLFxyXG4gIHN0eWxlczogW2BcclxuICAgIC5jaXJjbGUtc3Bpbm5lciB7XHJcbiAgICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcclxuICAgICAgbWFyZ2luOiAyNXB4IGF1dG87XHJcbiAgICAgIHdpZHRoOiA0MHB4O1xyXG4gICAgICBoZWlnaHQ6IDQwcHg7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIC5jaXJjbGUtc3Bpbm5lciA+IGRpdiB7XHJcbiAgICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcclxuICAgICAgdG9wOiAwO1xyXG4gICAgICBsZWZ0OiAwO1xyXG4gICAgICB3aWR0aDogMTAwJTtcclxuICAgICAgaGVpZ2h0OiAxMDAlO1xyXG4gICAgICBiYWNrZ3JvdW5kLWNvbG9yOiB0cmFuc3BhcmVudCAhaW1wb3J0YW50O1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICAuY2lyY2xlLXNwaW5uZXIgZGl2OmJlZm9yZSB7XHJcbiAgICAgIGRpc3BsYXk6IGJsb2NrO1xyXG4gICAgICBtYXJnaW46IDAgYXV0bztcclxuICAgICAgd2lkdGg6IDE1JTtcclxuICAgICAgaGVpZ2h0OiAxNSU7XHJcbiAgICAgIGJvcmRlci1yYWRpdXM6IDEwMCU7XHJcbiAgICAgIGJhY2tncm91bmQtY29sb3I6ICMzMzM7XHJcbiAgICAgIGNvbnRlbnQ6ICcnO1xyXG4gICAgICAtd2Via2l0LWFuaW1hdGlvbjogc2stY2lyY2xlQm91bmNlRGVsYXkgMS4ycyBpbmZpbml0ZSBlYXNlLWluLW91dCBib3RoO1xyXG4gICAgICBhbmltYXRpb246IHNrLWNpcmNsZUJvdW5jZURlbGF5IDEuMnMgaW5maW5pdGUgZWFzZS1pbi1vdXQgYm90aDtcclxuICAgIH1cclxuICAgIFxyXG4gICAgLmNpcmNsZS1zcGlubmVyIC5jaXJjbGUyIHtcclxuICAgICAgLXdlYmtpdC10cmFuc2Zvcm06IHJvdGF0ZSgzMGRlZyk7XHJcbiAgICAgIC1tcy10cmFuc2Zvcm06IHJvdGF0ZSgzMGRlZyk7XHJcbiAgICAgIHRyYW5zZm9ybTogcm90YXRlKDMwZGVnKTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgLmNpcmNsZS1zcGlubmVyIC5jaXJjbGUzIHtcclxuICAgICAgLXdlYmtpdC10cmFuc2Zvcm06IHJvdGF0ZSg2MGRlZyk7XHJcbiAgICAgIC1tcy10cmFuc2Zvcm06IHJvdGF0ZSg2MGRlZyk7XHJcbiAgICAgIHRyYW5zZm9ybTogcm90YXRlKDYwZGVnKTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgLmNpcmNsZS1zcGlubmVyIC5jaXJjbGU0IHtcclxuICAgICAgLXdlYmtpdC10cmFuc2Zvcm06IHJvdGF0ZSg5MGRlZyk7XHJcbiAgICAgIC1tcy10cmFuc2Zvcm06IHJvdGF0ZSg5MGRlZyk7XHJcbiAgICAgIHRyYW5zZm9ybTogcm90YXRlKDkwZGVnKTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgLmNpcmNsZS1zcGlubmVyIC5jaXJjbGU1IHtcclxuICAgICAgLXdlYmtpdC10cmFuc2Zvcm06IHJvdGF0ZSgxMjBkZWcpO1xyXG4gICAgICAtbXMtdHJhbnNmb3JtOiByb3RhdGUoMTIwZGVnKTtcclxuICAgICAgdHJhbnNmb3JtOiByb3RhdGUoMTIwZGVnKTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgLmNpcmNsZS1zcGlubmVyIC5jaXJjbGU2IHtcclxuICAgICAgLXdlYmtpdC10cmFuc2Zvcm06IHJvdGF0ZSgxNTBkZWcpO1xyXG4gICAgICAtbXMtdHJhbnNmb3JtOiByb3RhdGUoMTUwZGVnKTtcclxuICAgICAgdHJhbnNmb3JtOiByb3RhdGUoMTUwZGVnKTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgLmNpcmNsZS1zcGlubmVyIC5jaXJjbGU3IHtcclxuICAgICAgLXdlYmtpdC10cmFuc2Zvcm06IHJvdGF0ZSgxODBkZWcpO1xyXG4gICAgICAtbXMtdHJhbnNmb3JtOiByb3RhdGUoMTgwZGVnKTtcclxuICAgICAgdHJhbnNmb3JtOiByb3RhdGUoMTgwZGVnKTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgLmNpcmNsZS1zcGlubmVyIC5jaXJjbGU4IHtcclxuICAgICAgLXdlYmtpdC10cmFuc2Zvcm06IHJvdGF0ZSgyMTBkZWcpO1xyXG4gICAgICAtbXMtdHJhbnNmb3JtOiByb3RhdGUoMjEwZGVnKTtcclxuICAgICAgdHJhbnNmb3JtOiByb3RhdGUoMjEwZGVnKTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgLmNpcmNsZS1zcGlubmVyIC5jaXJjbGU5IHtcclxuICAgICAgLXdlYmtpdC10cmFuc2Zvcm06IHJvdGF0ZSgyNDBkZWcpO1xyXG4gICAgICAtbXMtdHJhbnNmb3JtOiByb3RhdGUoMjQwZGVnKTtcclxuICAgICAgdHJhbnNmb3JtOiByb3RhdGUoMjQwZGVnKTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgLmNpcmNsZS1zcGlubmVyIC5jaXJjbGUxMCB7XHJcbiAgICAgIC13ZWJraXQtdHJhbnNmb3JtOiByb3RhdGUoMjcwZGVnKTtcclxuICAgICAgLW1zLXRyYW5zZm9ybTogcm90YXRlKDI3MGRlZyk7XHJcbiAgICAgIHRyYW5zZm9ybTogcm90YXRlKDI3MGRlZyk7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIC5jaXJjbGUtc3Bpbm5lciAuY2lyY2xlMTEge1xyXG4gICAgICAtd2Via2l0LXRyYW5zZm9ybTogcm90YXRlKDMwMGRlZyk7XHJcbiAgICAgIC1tcy10cmFuc2Zvcm06IHJvdGF0ZSgzMDBkZWcpO1xyXG4gICAgICB0cmFuc2Zvcm06IHJvdGF0ZSgzMDBkZWcpO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICAuY2lyY2xlLXNwaW5uZXIgLmNpcmNsZTEyIHtcclxuICAgICAgLXdlYmtpdC10cmFuc2Zvcm06IHJvdGF0ZSgzMzBkZWcpO1xyXG4gICAgICAtbXMtdHJhbnNmb3JtOiByb3RhdGUoMzMwZGVnKTtcclxuICAgICAgdHJhbnNmb3JtOiByb3RhdGUoMzMwZGVnKTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgLmNpcmNsZS1zcGlubmVyIC5jaXJjbGUyOmJlZm9yZSB7XHJcbiAgICAgIC13ZWJraXQtYW5pbWF0aW9uLWRlbGF5OiAtMS4xcztcclxuICAgICAgYW5pbWF0aW9uLWRlbGF5OiAtMS4xcztcclxuICAgIH1cclxuICAgIFxyXG4gICAgLmNpcmNsZS1zcGlubmVyIC5jaXJjbGUzOmJlZm9yZSB7XHJcbiAgICAgIC13ZWJraXQtYW5pbWF0aW9uLWRlbGF5OiAtMXM7XHJcbiAgICAgIGFuaW1hdGlvbi1kZWxheTogLTFzO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICAuY2lyY2xlLXNwaW5uZXIgLmNpcmNsZTQ6YmVmb3JlIHtcclxuICAgICAgLXdlYmtpdC1hbmltYXRpb24tZGVsYXk6IC0wLjlzO1xyXG4gICAgICBhbmltYXRpb24tZGVsYXk6IC0wLjlzO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICAuY2lyY2xlLXNwaW5uZXIgLmNpcmNsZTU6YmVmb3JlIHtcclxuICAgICAgLXdlYmtpdC1hbmltYXRpb24tZGVsYXk6IC0wLjhzO1xyXG4gICAgICBhbmltYXRpb24tZGVsYXk6IC0wLjhzO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICAuY2lyY2xlLXNwaW5uZXIgLmNpcmNsZTY6YmVmb3JlIHtcclxuICAgICAgLXdlYmtpdC1hbmltYXRpb24tZGVsYXk6IC0wLjdzO1xyXG4gICAgICBhbmltYXRpb24tZGVsYXk6IC0wLjdzO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICAuY2lyY2xlLXNwaW5uZXIgLmNpcmNsZTc6YmVmb3JlIHtcclxuICAgICAgLXdlYmtpdC1hbmltYXRpb24tZGVsYXk6IC0wLjZzO1xyXG4gICAgICBhbmltYXRpb24tZGVsYXk6IC0wLjZzO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICAuY2lyY2xlLXNwaW5uZXIgLmNpcmNsZTg6YmVmb3JlIHtcclxuICAgICAgLXdlYmtpdC1hbmltYXRpb24tZGVsYXk6IC0wLjVzO1xyXG4gICAgICBhbmltYXRpb24tZGVsYXk6IC0wLjVzO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICAuY2lyY2xlLXNwaW5uZXIgLmNpcmNsZTk6YmVmb3JlIHtcclxuICAgICAgLXdlYmtpdC1hbmltYXRpb24tZGVsYXk6IC0wLjRzO1xyXG4gICAgICBhbmltYXRpb24tZGVsYXk6IC0wLjRzO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICAuY2lyY2xlLXNwaW5uZXIgLmNpcmNsZTEwOmJlZm9yZSB7XHJcbiAgICAgIC13ZWJraXQtYW5pbWF0aW9uLWRlbGF5OiAtMC4zcztcclxuICAgICAgYW5pbWF0aW9uLWRlbGF5OiAtMC4zcztcclxuICAgIH1cclxuICAgIFxyXG4gICAgLmNpcmNsZS1zcGlubmVyIC5jaXJjbGUxMTpiZWZvcmUge1xyXG4gICAgICAtd2Via2l0LWFuaW1hdGlvbi1kZWxheTogLTAuMnM7XHJcbiAgICAgIGFuaW1hdGlvbi1kZWxheTogLTAuMnM7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIC5jaXJjbGUtc3Bpbm5lciAuY2lyY2xlMTI6YmVmb3JlIHtcclxuICAgICAgLXdlYmtpdC1hbmltYXRpb24tZGVsYXk6IC0wLjFzO1xyXG4gICAgICBhbmltYXRpb24tZGVsYXk6IC0wLjFzO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICBALXdlYmtpdC1rZXlmcmFtZXMgc2stY2lyY2xlQm91bmNlRGVsYXkge1xyXG4gICAgICAwJSwgODAlLCAxMDAlIHtcclxuICAgICAgICAtd2Via2l0LXRyYW5zZm9ybTogc2NhbGUoMCk7XHJcbiAgICAgICAgdHJhbnNmb3JtOiBzY2FsZSgwKTtcclxuICAgICAgfVxyXG4gICAgICA0MCUge1xyXG4gICAgICAgIC13ZWJraXQtdHJhbnNmb3JtOiBzY2FsZSgxKTtcclxuICAgICAgICB0cmFuc2Zvcm06IHNjYWxlKDEpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICBcclxuICAgIEBrZXlmcmFtZXMgc2stY2lyY2xlQm91bmNlRGVsYXkge1xyXG4gICAgICAwJSwgODAlLCAxMDAlIHtcclxuICAgICAgICAtd2Via2l0LXRyYW5zZm9ybTogc2NhbGUoMCk7XHJcbiAgICAgICAgdHJhbnNmb3JtOiBzY2FsZSgwKTtcclxuICAgICAgfVxyXG4gICAgICA0MCUge1xyXG4gICAgICAgIC13ZWJraXQtdHJhbnNmb3JtOiBzY2FsZSgxKTtcclxuICAgICAgICB0cmFuc2Zvcm06IHNjYWxlKDEpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgYF0sXHJcbiAgdGVtcGxhdGU6IFNwaW5uZXJUZW1wbGF0ZVxyXG59KVxyXG5cclxuZXhwb3J0IGNsYXNzIENpcmNsZUNvbXBvbmVudCBleHRlbmRzIFNwaW5uZXJDb21wb25lbnQge1xyXG4gIHB1YmxpYyBiYXNlQ2xhc3M6IHN0cmluZyA9ICdjaXJjbGUtc3Bpbm5lcic7XHJcbiAgcHVibGljIGNoaWxkQ2xhc3M6IHN0cmluZyA9ICdjaXJjbGUnO1xyXG4gIHB1YmxpYyBudW1JdGVtczogbnVtYmVyID0gMTI7XHJcbn1cclxuIl19