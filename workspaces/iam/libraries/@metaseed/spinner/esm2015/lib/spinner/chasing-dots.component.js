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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hhc2luZy1kb3RzLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BtZXRhc2VlZC9zcGlubmVyLyIsInNvdXJjZXMiOlsibGliL3NwaW5uZXIvY2hhc2luZy1kb3RzLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMxQyxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsZUFBZSxFQUFFLE1BQU0scUJBQXFCLENBQUM7QUF1RXhFLE1BQU0sMkJBQTRCLFNBQVEsZ0JBQWdCOzs7eUJBQzdCLHNCQUFzQjswQkFDckIsS0FBSzt3QkFDUCxDQUFDOzs7O1lBeEU1QixTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLGlCQUFpQjtnQkFDM0IsTUFBTSxFQUFFLENBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQStEUixDQUFDO2dCQUNGLFFBQVEsRUFBRSxlQUFlO2FBQzFCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IFNwaW5uZXJDb21wb25lbnQsIFNwaW5uZXJUZW1wbGF0ZSB9IGZyb20gJy4vc3Bpbm5lci5jb21wb25lbnQnO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6ICdzay1jaGFzaW5nLWRvdHMnLFxyXG4gIHN0eWxlczogW2BcclxuICAgIC5jaGFzaW5nLWRvdHMtc3Bpbm5lciB7XHJcbiAgICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcclxuICAgICAgbWFyZ2luOiAyNXB4IGF1dG87XHJcbiAgICAgIHdpZHRoOiA0MHB4O1xyXG4gICAgICBoZWlnaHQ6IDQwcHg7XHJcbiAgICAgIFxyXG4gICAgICAtd2Via2l0LWFuaW1hdGlvbjogc2stcm90YXRlIDIuMHMgaW5maW5pdGUgbGluZWFyO1xyXG4gICAgICBhbmltYXRpb246IHNrLXJvdGF0ZSAyLjBzIGluZmluaXRlIGxpbmVhcjtcclxuICAgIH1cclxuICAgIFxyXG4gICAgLmRvdDEsXHJcbiAgICAuZG90MiB7XHJcbiAgICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcclxuICAgICAgdG9wOiAwO1xyXG4gICAgICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XHJcbiAgICAgIHdpZHRoOiA2MCU7XHJcbiAgICAgIGhlaWdodDogNjAlO1xyXG4gICAgICBib3JkZXItcmFkaXVzOiAxMDAlO1xyXG4gICAgICBcclxuICAgICAgLXdlYmtpdC1hbmltYXRpb246IHNrLWJvdW5jZSAyLjBzIGluZmluaXRlIGVhc2UtaW4tb3V0O1xyXG4gICAgICBhbmltYXRpb246IHNrLWJvdW5jZSAyLjBzIGluZmluaXRlIGVhc2UtaW4tb3V0O1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICAuZG90MiB7XHJcbiAgICAgIHRvcDogYXV0bztcclxuICAgICAgYm90dG9tOiAwO1xyXG4gICAgICAtd2Via2l0LWFuaW1hdGlvbi1kZWxheTogLTEuMHM7XHJcbiAgICAgIGFuaW1hdGlvbi1kZWxheTogLTEuMHM7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIEAtd2Via2l0LWtleWZyYW1lcyBzay1yb3RhdGUge1xyXG4gICAgICAxMDAlIHtcclxuICAgICAgICAtd2Via2l0LXRyYW5zZm9ybTogcm90YXRlKDM2MGRlZyk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIFxyXG4gICAgQGtleWZyYW1lcyBzay1yb3RhdGUge1xyXG4gICAgICAxMDAlIHtcclxuICAgICAgICB0cmFuc2Zvcm06IHJvdGF0ZSgzNjBkZWcpO1xyXG4gICAgICAgIC13ZWJraXQtdHJhbnNmb3JtOiByb3RhdGUoMzYwZGVnKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgXHJcbiAgICBALXdlYmtpdC1rZXlmcmFtZXMgc2stYm91bmNlIHtcclxuICAgICAgMCUsIDEwMCUge1xyXG4gICAgICAgIC13ZWJraXQtdHJhbnNmb3JtOiBzY2FsZSgwLjApO1xyXG4gICAgICB9XHJcbiAgICAgIDUwJSB7XHJcbiAgICAgICAgLXdlYmtpdC10cmFuc2Zvcm06IHNjYWxlKDEuMCk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIFxyXG4gICAgQGtleWZyYW1lcyBzay1ib3VuY2Uge1xyXG4gICAgICAwJSwgMTAwJSB7XHJcbiAgICAgICAgdHJhbnNmb3JtOiBzY2FsZSgwLjApO1xyXG4gICAgICAgIC13ZWJraXQtdHJhbnNmb3JtOiBzY2FsZSgwLjApO1xyXG4gICAgICB9XHJcbiAgICAgIDUwJSB7XHJcbiAgICAgICAgdHJhbnNmb3JtOiBzY2FsZSgxLjApO1xyXG4gICAgICAgIC13ZWJraXQtdHJhbnNmb3JtOiBzY2FsZSgxLjApO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgYF0sXHJcbiAgdGVtcGxhdGU6IFNwaW5uZXJUZW1wbGF0ZVxyXG59KVxyXG5cclxuZXhwb3J0IGNsYXNzIENoYXNpbmdEb3RzQ29tcG9uZW50IGV4dGVuZHMgU3Bpbm5lckNvbXBvbmVudCB7XHJcbiAgcHVibGljIGJhc2VDbGFzczogc3RyaW5nID0gJ2NoYXNpbmctZG90cy1zcGlubmVyJztcclxuICBwdWJsaWMgY2hpbGRDbGFzczogc3RyaW5nID0gJ2RvdCc7XHJcbiAgcHVibGljIG51bUl0ZW1zOiBudW1iZXIgPSAyO1xyXG59XHJcbiJdfQ==