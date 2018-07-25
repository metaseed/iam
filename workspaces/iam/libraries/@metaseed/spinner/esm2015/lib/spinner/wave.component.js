/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Component } from '@angular/core';
import { SpinnerComponent, SpinnerTemplate } from './spinner.component';
export class WaveComponent extends SpinnerComponent {
    constructor() {
        super(...arguments);
        this.baseClass = 'wave-spinner';
        this.childClass = 'rect';
        this.numItems = 5;
    }
}
WaveComponent.decorators = [
    { type: Component, args: [{
                selector: 'sk-wave',
                styles: [`
    .wave-spinner {
      margin: 25px auto;
      width: 42px;
      height: 40px;
    }
    
    .wave-spinner > div {
      display: inline-block;
      width: 5px;
      margin-right: 4px;
      height: 100%;
      
      -webkit-animation: sk-stretchdelay 1.2s infinite ease-in-out;
      animation: sk-stretchdelay 1.2s infinite ease-in-out;
    }
    
    .wave-spinner > div:last-child {
      margin-right: 0;
    }
    
    .wave-spinner .rect2 {
      -webkit-animation-delay: -1.1s;
      animation-delay: -1.1s;
    }
    
    .wave-spinner .rect3 {
      -webkit-animation-delay: -1.0s;
      animation-delay: -1.0s;
    }
    
    .wave-spinner .rect4 {
      -webkit-animation-delay: -0.9s;
      animation-delay: -0.9s;
    }
    
    .wave-spinner .rect5 {
      -webkit-animation-delay: -0.8s;
      animation-delay: -0.8s;
    }
    
    @-webkit-keyframes sk-stretchdelay {
      0%, 40%, 100% {
        -webkit-transform: scaleY(0.4);
      }
      20% {
        -webkit-transform: scaleY(1.0);
      }
    }
    
    @keyframes sk-stretchdelay {
      0%, 40%, 100% {
        transform: scaleY(0.4);
        -webkit-transform: scaleY(0.4);
      }
      20% {
        transform: scaleY(1.0);
        -webkit-transform: scaleY(1.0);
      }
    }
  `],
                template: SpinnerTemplate
            },] },
];
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2F2ZS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AbWV0YXNlZWQvc3Bpbm5lci8iLCJzb3VyY2VzIjpbImxpYi9zcGlubmVyL3dhdmUuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzFDLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxlQUFlLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQW9FeEUsTUFBTSxvQkFBcUIsU0FBUSxnQkFBZ0I7Ozt5QkFDdEIsY0FBYzswQkFDYixNQUFNO3dCQUNSLENBQUM7Ozs7WUFyRTVCLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUsU0FBUztnQkFDbkIsTUFBTSxFQUFFLENBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQTREUixDQUFDO2dCQUNGLFFBQVEsRUFBRSxlQUFlO2FBQzFCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IFNwaW5uZXJDb21wb25lbnQsIFNwaW5uZXJUZW1wbGF0ZSB9IGZyb20gJy4vc3Bpbm5lci5jb21wb25lbnQnO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6ICdzay13YXZlJyxcclxuICBzdHlsZXM6IFtgXHJcbiAgICAud2F2ZS1zcGlubmVyIHtcclxuICAgICAgbWFyZ2luOiAyNXB4IGF1dG87XHJcbiAgICAgIHdpZHRoOiA0MnB4O1xyXG4gICAgICBoZWlnaHQ6IDQwcHg7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIC53YXZlLXNwaW5uZXIgPiBkaXYge1xyXG4gICAgICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XHJcbiAgICAgIHdpZHRoOiA1cHg7XHJcbiAgICAgIG1hcmdpbi1yaWdodDogNHB4O1xyXG4gICAgICBoZWlnaHQ6IDEwMCU7XHJcbiAgICAgIFxyXG4gICAgICAtd2Via2l0LWFuaW1hdGlvbjogc2stc3RyZXRjaGRlbGF5IDEuMnMgaW5maW5pdGUgZWFzZS1pbi1vdXQ7XHJcbiAgICAgIGFuaW1hdGlvbjogc2stc3RyZXRjaGRlbGF5IDEuMnMgaW5maW5pdGUgZWFzZS1pbi1vdXQ7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIC53YXZlLXNwaW5uZXIgPiBkaXY6bGFzdC1jaGlsZCB7XHJcbiAgICAgIG1hcmdpbi1yaWdodDogMDtcclxuICAgIH1cclxuICAgIFxyXG4gICAgLndhdmUtc3Bpbm5lciAucmVjdDIge1xyXG4gICAgICAtd2Via2l0LWFuaW1hdGlvbi1kZWxheTogLTEuMXM7XHJcbiAgICAgIGFuaW1hdGlvbi1kZWxheTogLTEuMXM7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIC53YXZlLXNwaW5uZXIgLnJlY3QzIHtcclxuICAgICAgLXdlYmtpdC1hbmltYXRpb24tZGVsYXk6IC0xLjBzO1xyXG4gICAgICBhbmltYXRpb24tZGVsYXk6IC0xLjBzO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICAud2F2ZS1zcGlubmVyIC5yZWN0NCB7XHJcbiAgICAgIC13ZWJraXQtYW5pbWF0aW9uLWRlbGF5OiAtMC45cztcclxuICAgICAgYW5pbWF0aW9uLWRlbGF5OiAtMC45cztcclxuICAgIH1cclxuICAgIFxyXG4gICAgLndhdmUtc3Bpbm5lciAucmVjdDUge1xyXG4gICAgICAtd2Via2l0LWFuaW1hdGlvbi1kZWxheTogLTAuOHM7XHJcbiAgICAgIGFuaW1hdGlvbi1kZWxheTogLTAuOHM7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIEAtd2Via2l0LWtleWZyYW1lcyBzay1zdHJldGNoZGVsYXkge1xyXG4gICAgICAwJSwgNDAlLCAxMDAlIHtcclxuICAgICAgICAtd2Via2l0LXRyYW5zZm9ybTogc2NhbGVZKDAuNCk7XHJcbiAgICAgIH1cclxuICAgICAgMjAlIHtcclxuICAgICAgICAtd2Via2l0LXRyYW5zZm9ybTogc2NhbGVZKDEuMCk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIFxyXG4gICAgQGtleWZyYW1lcyBzay1zdHJldGNoZGVsYXkge1xyXG4gICAgICAwJSwgNDAlLCAxMDAlIHtcclxuICAgICAgICB0cmFuc2Zvcm06IHNjYWxlWSgwLjQpO1xyXG4gICAgICAgIC13ZWJraXQtdHJhbnNmb3JtOiBzY2FsZVkoMC40KTtcclxuICAgICAgfVxyXG4gICAgICAyMCUge1xyXG4gICAgICAgIHRyYW5zZm9ybTogc2NhbGVZKDEuMCk7XHJcbiAgICAgICAgLXdlYmtpdC10cmFuc2Zvcm06IHNjYWxlWSgxLjApO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgYF0sXHJcbiAgdGVtcGxhdGU6IFNwaW5uZXJUZW1wbGF0ZVxyXG59KVxyXG5cclxuZXhwb3J0IGNsYXNzIFdhdmVDb21wb25lbnQgZXh0ZW5kcyBTcGlubmVyQ29tcG9uZW50IHtcclxuICBwdWJsaWMgYmFzZUNsYXNzOiBzdHJpbmcgPSAnd2F2ZS1zcGlubmVyJztcclxuICBwdWJsaWMgY2hpbGRDbGFzczogc3RyaW5nID0gJ3JlY3QnO1xyXG4gIHB1YmxpYyBudW1JdGVtczogbnVtYmVyID0gNTtcclxufVxyXG4iXX0=