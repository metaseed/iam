/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Component } from '@angular/core';
import { SpinnerComponent, SpinnerTemplate } from './spinner.component';
export class WanderingCubesComponent extends SpinnerComponent {
    constructor() {
        super(...arguments);
        this.baseClass = 'wandering-cubes-spinner';
        this.childClass = 'cube';
        this.numItems = 2;
    }
}
WanderingCubesComponent.decorators = [
    { type: Component, args: [{
                selector: 'sk-wandering-cubes',
                styles: [`
    .wandering-cubes-spinner {
      position: relative;
      margin: 25px auto;
      width: 40px;
      height: 40px;
    }
    
    .cube1,
    .cube2 {
      position: absolute;
      top: 0;
      left: 0;
      width: 15px;
      height: 15px;
      
      -webkit-animation: sk-cubemove 1.8s infinite ease-in-out;
      animation: sk-cubemove 1.8s infinite ease-in-out;
    }
    
    .cube2 {
      -webkit-animation-delay: -0.9s;
      animation-delay: -0.9s;
    }
    
    @-webkit-keyframes sk-cubemove {
      25% {
        -webkit-transform: translateX(42px) rotate(-90deg) scale(0.5);
      }
      50% {
        -webkit-transform: translateX(42px) translateY(42px) rotate(-180deg);
      }
      75% {
        -webkit-transform: translateX(0px) translateY(42px) rotate(-270deg) scale(0.5);
      }
      100% {
        -webkit-transform: rotate(-360deg);
      }
    }
    
    @keyframes sk-cubemove {
      25% {
        transform: translateX(42px) rotate(-90deg) scale(0.5);
        -webkit-transform: translateX(42px) rotate(-90deg) scale(0.5);
      }
      50% {
        transform: translateX(42px) translateY(42px) rotate(-179deg);
        -webkit-transform: translateX(42px) translateY(42px) rotate(-179deg);
      }
      50.1% {
        transform: translateX(42px) translateY(42px) rotate(-180deg);
        -webkit-transform: translateX(42px) translateY(42px) rotate(-180deg);
      }
      75% {
        transform: translateX(0px) translateY(42px) rotate(-270deg) scale(0.5);
        -webkit-transform: translateX(0px) translateY(42px) rotate(-270deg) scale(0.5);
      }
      100% {
        transform: rotate(-360deg);
        -webkit-transform: rotate(-360deg);
      }
    }
  `],
                template: SpinnerTemplate
            },] },
];
function WanderingCubesComponent_tsickle_Closure_declarations() {
    /** @type {!Array<{type: !Function, args: (undefined|!Array<?>)}>} */
    WanderingCubesComponent.decorators;
    /**
     * @nocollapse
     * @type {function(): !Array<(null|{type: ?, decorators: (undefined|!Array<{type: !Function, args: (undefined|!Array<?>)}>)})>}
     */
    WanderingCubesComponent.ctorParameters;
    /** @type {?} */
    WanderingCubesComponent.prototype.baseClass;
    /** @type {?} */
    WanderingCubesComponent.prototype.childClass;
    /** @type {?} */
    WanderingCubesComponent.prototype.numItems;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2FuZGVyaW5nLWN1YmVzLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BtZXRhc2VlZC9zcGlubmVyLyIsInNvdXJjZXMiOlsibGliL3NwaW5uZXIvd2FuZGVyaW5nLWN1YmVzLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMxQyxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsZUFBZSxFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFzRXhFLE1BQU0sOEJBQStCLFNBQVEsZ0JBQWdCOzs7eUJBQ2hDLHlCQUF5QjswQkFDeEIsTUFBTTt3QkFDUixDQUFDOzs7O1lBdkU1QixTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLG9CQUFvQjtnQkFDOUIsTUFBTSxFQUFFLENBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBOERSLENBQUM7Z0JBQ0YsUUFBUSxFQUFFLGVBQWU7YUFDMUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgU3Bpbm5lckNvbXBvbmVudCwgU3Bpbm5lclRlbXBsYXRlIH0gZnJvbSAnLi9zcGlubmVyLmNvbXBvbmVudCc7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICBzZWxlY3RvcjogJ3NrLXdhbmRlcmluZy1jdWJlcycsXHJcbiAgc3R5bGVzOiBbYFxyXG4gICAgLndhbmRlcmluZy1jdWJlcy1zcGlubmVyIHtcclxuICAgICAgcG9zaXRpb246IHJlbGF0aXZlO1xyXG4gICAgICBtYXJnaW46IDI1cHggYXV0bztcclxuICAgICAgd2lkdGg6IDQwcHg7XHJcbiAgICAgIGhlaWdodDogNDBweDtcclxuICAgIH1cclxuICAgIFxyXG4gICAgLmN1YmUxLFxyXG4gICAgLmN1YmUyIHtcclxuICAgICAgcG9zaXRpb246IGFic29sdXRlO1xyXG4gICAgICB0b3A6IDA7XHJcbiAgICAgIGxlZnQ6IDA7XHJcbiAgICAgIHdpZHRoOiAxNXB4O1xyXG4gICAgICBoZWlnaHQ6IDE1cHg7XHJcbiAgICAgIFxyXG4gICAgICAtd2Via2l0LWFuaW1hdGlvbjogc2stY3ViZW1vdmUgMS44cyBpbmZpbml0ZSBlYXNlLWluLW91dDtcclxuICAgICAgYW5pbWF0aW9uOiBzay1jdWJlbW92ZSAxLjhzIGluZmluaXRlIGVhc2UtaW4tb3V0O1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICAuY3ViZTIge1xyXG4gICAgICAtd2Via2l0LWFuaW1hdGlvbi1kZWxheTogLTAuOXM7XHJcbiAgICAgIGFuaW1hdGlvbi1kZWxheTogLTAuOXM7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIEAtd2Via2l0LWtleWZyYW1lcyBzay1jdWJlbW92ZSB7XHJcbiAgICAgIDI1JSB7XHJcbiAgICAgICAgLXdlYmtpdC10cmFuc2Zvcm06IHRyYW5zbGF0ZVgoNDJweCkgcm90YXRlKC05MGRlZykgc2NhbGUoMC41KTtcclxuICAgICAgfVxyXG4gICAgICA1MCUge1xyXG4gICAgICAgIC13ZWJraXQtdHJhbnNmb3JtOiB0cmFuc2xhdGVYKDQycHgpIHRyYW5zbGF0ZVkoNDJweCkgcm90YXRlKC0xODBkZWcpO1xyXG4gICAgICB9XHJcbiAgICAgIDc1JSB7XHJcbiAgICAgICAgLXdlYmtpdC10cmFuc2Zvcm06IHRyYW5zbGF0ZVgoMHB4KSB0cmFuc2xhdGVZKDQycHgpIHJvdGF0ZSgtMjcwZGVnKSBzY2FsZSgwLjUpO1xyXG4gICAgICB9XHJcbiAgICAgIDEwMCUge1xyXG4gICAgICAgIC13ZWJraXQtdHJhbnNmb3JtOiByb3RhdGUoLTM2MGRlZyk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIFxyXG4gICAgQGtleWZyYW1lcyBzay1jdWJlbW92ZSB7XHJcbiAgICAgIDI1JSB7XHJcbiAgICAgICAgdHJhbnNmb3JtOiB0cmFuc2xhdGVYKDQycHgpIHJvdGF0ZSgtOTBkZWcpIHNjYWxlKDAuNSk7XHJcbiAgICAgICAgLXdlYmtpdC10cmFuc2Zvcm06IHRyYW5zbGF0ZVgoNDJweCkgcm90YXRlKC05MGRlZykgc2NhbGUoMC41KTtcclxuICAgICAgfVxyXG4gICAgICA1MCUge1xyXG4gICAgICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlWCg0MnB4KSB0cmFuc2xhdGVZKDQycHgpIHJvdGF0ZSgtMTc5ZGVnKTtcclxuICAgICAgICAtd2Via2l0LXRyYW5zZm9ybTogdHJhbnNsYXRlWCg0MnB4KSB0cmFuc2xhdGVZKDQycHgpIHJvdGF0ZSgtMTc5ZGVnKTtcclxuICAgICAgfVxyXG4gICAgICA1MC4xJSB7XHJcbiAgICAgICAgdHJhbnNmb3JtOiB0cmFuc2xhdGVYKDQycHgpIHRyYW5zbGF0ZVkoNDJweCkgcm90YXRlKC0xODBkZWcpO1xyXG4gICAgICAgIC13ZWJraXQtdHJhbnNmb3JtOiB0cmFuc2xhdGVYKDQycHgpIHRyYW5zbGF0ZVkoNDJweCkgcm90YXRlKC0xODBkZWcpO1xyXG4gICAgICB9XHJcbiAgICAgIDc1JSB7XHJcbiAgICAgICAgdHJhbnNmb3JtOiB0cmFuc2xhdGVYKDBweCkgdHJhbnNsYXRlWSg0MnB4KSByb3RhdGUoLTI3MGRlZykgc2NhbGUoMC41KTtcclxuICAgICAgICAtd2Via2l0LXRyYW5zZm9ybTogdHJhbnNsYXRlWCgwcHgpIHRyYW5zbGF0ZVkoNDJweCkgcm90YXRlKC0yNzBkZWcpIHNjYWxlKDAuNSk7XHJcbiAgICAgIH1cclxuICAgICAgMTAwJSB7XHJcbiAgICAgICAgdHJhbnNmb3JtOiByb3RhdGUoLTM2MGRlZyk7XHJcbiAgICAgICAgLXdlYmtpdC10cmFuc2Zvcm06IHJvdGF0ZSgtMzYwZGVnKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIGBdLFxyXG4gIHRlbXBsYXRlOiBTcGlubmVyVGVtcGxhdGVcclxufSlcclxuXHJcbmV4cG9ydCBjbGFzcyBXYW5kZXJpbmdDdWJlc0NvbXBvbmVudCBleHRlbmRzIFNwaW5uZXJDb21wb25lbnQge1xyXG4gIHB1YmxpYyBiYXNlQ2xhc3M6IHN0cmluZyA9ICd3YW5kZXJpbmctY3ViZXMtc3Bpbm5lcic7XHJcbiAgcHVibGljIGNoaWxkQ2xhc3M6IHN0cmluZyA9ICdjdWJlJztcclxuICBwdWJsaWMgbnVtSXRlbXM6IG51bWJlciA9IDI7XHJcbn1cclxuIl19