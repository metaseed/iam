/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Component } from '@angular/core';
import { SpinnerComponent, SpinnerTemplate } from './spinner.component';
export class ChasingDotsComponent extends SpinnerComponent {
    constructor() {
        super(...arguments);
        this.baseClass = 'chasing-dots-spinner';
        this.childClass = 'dot';
        this.numItems = 2;
    }
}
ChasingDotsComponent.decorators = [
    { type: Component, args: [{
                selector: 'sk-chasing-dots',
                styles: [`
    .chasing-dots-spinner {
      position: relative;
      margin: 25px auto;
      width: 40px;
      height: 40px;
      
      -webkit-animation: sk-rotate 2.0s infinite linear;
      animation: sk-rotate 2.0s infinite linear;
    }
    
    .dot1,
    .dot2 {
      position: absolute;
      top: 0;
      display: inline-block;
      width: 60%;
      height: 60%;
      border-radius: 100%;
      
      -webkit-animation: sk-bounce 2.0s infinite ease-in-out;
      animation: sk-bounce 2.0s infinite ease-in-out;
    }
    
    .dot2 {
      top: auto;
      bottom: 0;
      -webkit-animation-delay: -1.0s;
      animation-delay: -1.0s;
    }
    
    @-webkit-keyframes sk-rotate {
      100% {
        -webkit-transform: rotate(360deg);
      }
    }
    
    @keyframes sk-rotate {
      100% {
        transform: rotate(360deg);
        -webkit-transform: rotate(360deg);
      }
    }
    
    @-webkit-keyframes sk-bounce {
      0%, 100% {
        -webkit-transform: scale(0.0);
      }
      50% {
        -webkit-transform: scale(1.0);
      }
    }
    
    @keyframes sk-bounce {
      0%, 100% {
        transform: scale(0.0);
        -webkit-transform: scale(0.0);
      }
      50% {
        transform: scale(1.0);
        -webkit-transform: scale(1.0);
      }
    }
  `],
                template: SpinnerTemplate
            },] },
];
function ChasingDotsComponent_tsickle_Closure_declarations() {
    /** @type {!Array<{type: !Function, args: (undefined|!Array<?>)}>} */
    ChasingDotsComponent.decorators;
    /**
     * @nocollapse
     * @type {function(): !Array<(null|{type: ?, decorators: (undefined|!Array<{type: !Function, args: (undefined|!Array<?>)}>)})>}
     */
    ChasingDotsComponent.ctorParameters;
    /** @type {?} */
    ChasingDotsComponent.prototype.baseClass;
    /** @type {?} */
    ChasingDotsComponent.prototype.childClass;
    /** @type {?} */
    ChasingDotsComponent.prototype.numItems;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hhc2luZy1kb3RzLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BtZXRhc2VlZC9zcGluZXIvIiwic291cmNlcyI6WyJsaWIvc3Bpbm5lci9jaGFzaW5nLWRvdHMuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzFDLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxlQUFlLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQXVFeEUsTUFBTSwyQkFBNEIsU0FBUSxnQkFBZ0I7Ozt5QkFDN0Isc0JBQXNCOzBCQUNyQixLQUFLO3dCQUNQLENBQUM7Ozs7WUF4RTVCLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUsaUJBQWlCO2dCQUMzQixNQUFNLEVBQUUsQ0FBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBK0RSLENBQUM7Z0JBQ0YsUUFBUSxFQUFFLGVBQWU7YUFDMUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgU3Bpbm5lckNvbXBvbmVudCwgU3Bpbm5lclRlbXBsYXRlIH0gZnJvbSAnLi9zcGlubmVyLmNvbXBvbmVudCc7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICBzZWxlY3RvcjogJ3NrLWNoYXNpbmctZG90cycsXHJcbiAgc3R5bGVzOiBbYFxyXG4gICAgLmNoYXNpbmctZG90cy1zcGlubmVyIHtcclxuICAgICAgcG9zaXRpb246IHJlbGF0aXZlO1xyXG4gICAgICBtYXJnaW46IDI1cHggYXV0bztcclxuICAgICAgd2lkdGg6IDQwcHg7XHJcbiAgICAgIGhlaWdodDogNDBweDtcclxuICAgICAgXHJcbiAgICAgIC13ZWJraXQtYW5pbWF0aW9uOiBzay1yb3RhdGUgMi4wcyBpbmZpbml0ZSBsaW5lYXI7XHJcbiAgICAgIGFuaW1hdGlvbjogc2stcm90YXRlIDIuMHMgaW5maW5pdGUgbGluZWFyO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICAuZG90MSxcclxuICAgIC5kb3QyIHtcclxuICAgICAgcG9zaXRpb246IGFic29sdXRlO1xyXG4gICAgICB0b3A6IDA7XHJcbiAgICAgIGRpc3BsYXk6IGlubGluZS1ibG9jaztcclxuICAgICAgd2lkdGg6IDYwJTtcclxuICAgICAgaGVpZ2h0OiA2MCU7XHJcbiAgICAgIGJvcmRlci1yYWRpdXM6IDEwMCU7XHJcbiAgICAgIFxyXG4gICAgICAtd2Via2l0LWFuaW1hdGlvbjogc2stYm91bmNlIDIuMHMgaW5maW5pdGUgZWFzZS1pbi1vdXQ7XHJcbiAgICAgIGFuaW1hdGlvbjogc2stYm91bmNlIDIuMHMgaW5maW5pdGUgZWFzZS1pbi1vdXQ7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIC5kb3QyIHtcclxuICAgICAgdG9wOiBhdXRvO1xyXG4gICAgICBib3R0b206IDA7XHJcbiAgICAgIC13ZWJraXQtYW5pbWF0aW9uLWRlbGF5OiAtMS4wcztcclxuICAgICAgYW5pbWF0aW9uLWRlbGF5OiAtMS4wcztcclxuICAgIH1cclxuICAgIFxyXG4gICAgQC13ZWJraXQta2V5ZnJhbWVzIHNrLXJvdGF0ZSB7XHJcbiAgICAgIDEwMCUge1xyXG4gICAgICAgIC13ZWJraXQtdHJhbnNmb3JtOiByb3RhdGUoMzYwZGVnKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgXHJcbiAgICBAa2V5ZnJhbWVzIHNrLXJvdGF0ZSB7XHJcbiAgICAgIDEwMCUge1xyXG4gICAgICAgIHRyYW5zZm9ybTogcm90YXRlKDM2MGRlZyk7XHJcbiAgICAgICAgLXdlYmtpdC10cmFuc2Zvcm06IHJvdGF0ZSgzNjBkZWcpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICBcclxuICAgIEAtd2Via2l0LWtleWZyYW1lcyBzay1ib3VuY2Uge1xyXG4gICAgICAwJSwgMTAwJSB7XHJcbiAgICAgICAgLXdlYmtpdC10cmFuc2Zvcm06IHNjYWxlKDAuMCk7XHJcbiAgICAgIH1cclxuICAgICAgNTAlIHtcclxuICAgICAgICAtd2Via2l0LXRyYW5zZm9ybTogc2NhbGUoMS4wKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgXHJcbiAgICBAa2V5ZnJhbWVzIHNrLWJvdW5jZSB7XHJcbiAgICAgIDAlLCAxMDAlIHtcclxuICAgICAgICB0cmFuc2Zvcm06IHNjYWxlKDAuMCk7XHJcbiAgICAgICAgLXdlYmtpdC10cmFuc2Zvcm06IHNjYWxlKDAuMCk7XHJcbiAgICAgIH1cclxuICAgICAgNTAlIHtcclxuICAgICAgICB0cmFuc2Zvcm06IHNjYWxlKDEuMCk7XHJcbiAgICAgICAgLXdlYmtpdC10cmFuc2Zvcm06IHNjYWxlKDEuMCk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICBgXSxcclxuICB0ZW1wbGF0ZTogU3Bpbm5lclRlbXBsYXRlXHJcbn0pXHJcblxyXG5leHBvcnQgY2xhc3MgQ2hhc2luZ0RvdHNDb21wb25lbnQgZXh0ZW5kcyBTcGlubmVyQ29tcG9uZW50IHtcclxuICBwdWJsaWMgYmFzZUNsYXNzOiBzdHJpbmcgPSAnY2hhc2luZy1kb3RzLXNwaW5uZXInO1xyXG4gIHB1YmxpYyBjaGlsZENsYXNzOiBzdHJpbmcgPSAnZG90JztcclxuICBwdWJsaWMgbnVtSXRlbXM6IG51bWJlciA9IDI7XHJcbn1cclxuIl19