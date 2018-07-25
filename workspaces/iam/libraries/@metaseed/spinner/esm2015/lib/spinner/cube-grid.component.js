/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Component } from '@angular/core';
import { SpinnerComponent, SpinnerTemplate } from './spinner.component';
export class CubeGridComponent extends SpinnerComponent {
    constructor() {
        super(...arguments);
        this.baseClass = 'cube-grid-spinner';
        this.childClass = 'cube';
        this.numItems = 9;
    }
}
CubeGridComponent.decorators = [
    { type: Component, args: [{
                selector: 'sk-cube-grid',
                styles: [`
    .cube-grid-spinner {
      margin: 25px auto;
      width: 40px;
      height: 40px;
    }
    
    .cube-grid-spinner div {
      float: left;
      width: 33%;
      height: 33%;
      
      -webkit-animation: cubeGridScaleDelay 1.3s infinite ease-in-out;
      animation: cubeGridScaleDelay 1.3s infinite ease-in-out;
    }
    
    .cube-grid-spinner .cube1 {
      -webkit-animation-delay: 0.2s;
      animation-delay: 0.2s;
    }
    
    .cube-grid-spinner .cube2 {
      -webkit-animation-delay: 0.3s;
      animation-delay: 0.3s;
    }
    
    .cube-grid-spinner .cube3 {
      -webkit-animation-delay: 0.4s;
      animation-delay: 0.4s;
    }
    
    .cube-grid-spinner .cube4 {
      -webkit-animation-delay: 0.1s;
      animation-delay: 0.1s;
    }
    
    .cube-grid-spinner .cube5 {
      -webkit-animation-delay: 0.2s;
      animation-delay: 0.2s;
    }
    
    .cube-grid-spinner .cube6 {
      -webkit-animation-delay: 0.3s;
      animation-delay: 0.3s;
    }
    
    .cube-grid-spinner .cube7 {
      -webkit-animation-delay: 0s;
      animation-delay: 0s;
    }
    
    .cube-grid-spinner .cube8 {
      -webkit-animation-delay: 0.1s;
      animation-delay: 0.1s;
    }
    
    .cube-grid-spinner .cube9 {
      -webkit-animation-delay: 0.2s;
      animation-delay: 0.2s;
    }
    
    @-webkit-keyframes cubeGridScaleDelay {
      0%, 70%, 100% {
        -webkit-transform: scale3D(1, 1, 1);
        transform: scale3D(1, 1, 1);
      }
      35% {
        -webkit-transform: scale3D(0, 0, 1);
        transform: scale3D(0, 0, 1);
      }
    }
    
    @keyframes cubeGridScaleDelay {
      0%, 70%, 100% {
        -webkit-transform: scale3D(1, 1, 1);
        transform: scale3D(1, 1, 1);
      }
      35% {
        -webkit-transform: scale3D(0, 0, 1);
        transform: scale3D(0, 0, 1);
      }
    }
  `],
                template: SpinnerTemplate
            },] },
];
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3ViZS1ncmlkLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BtZXRhc2VlZC9zcGlubmVyLyIsInNvdXJjZXMiOlsibGliL3NwaW5uZXIvY3ViZS1ncmlkLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMxQyxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsZUFBZSxFQUFFLE1BQU0scUJBQXFCLENBQUM7QUEwRnhFLE1BQU0sd0JBQXlCLFNBQVEsZ0JBQWdCOzs7eUJBQzFCLG1CQUFtQjswQkFDbEIsTUFBTTt3QkFDUixDQUFDOzs7O1lBM0Y1QixTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLGNBQWM7Z0JBQ3hCLE1BQU0sRUFBRSxDQUFDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBa0ZSLENBQUM7Z0JBQ0YsUUFBUSxFQUFFLGVBQWU7YUFDMUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgU3Bpbm5lckNvbXBvbmVudCwgU3Bpbm5lclRlbXBsYXRlIH0gZnJvbSAnLi9zcGlubmVyLmNvbXBvbmVudCc7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICBzZWxlY3RvcjogJ3NrLWN1YmUtZ3JpZCcsXHJcbiAgc3R5bGVzOiBbYFxyXG4gICAgLmN1YmUtZ3JpZC1zcGlubmVyIHtcclxuICAgICAgbWFyZ2luOiAyNXB4IGF1dG87XHJcbiAgICAgIHdpZHRoOiA0MHB4O1xyXG4gICAgICBoZWlnaHQ6IDQwcHg7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIC5jdWJlLWdyaWQtc3Bpbm5lciBkaXYge1xyXG4gICAgICBmbG9hdDogbGVmdDtcclxuICAgICAgd2lkdGg6IDMzJTtcclxuICAgICAgaGVpZ2h0OiAzMyU7XHJcbiAgICAgIFxyXG4gICAgICAtd2Via2l0LWFuaW1hdGlvbjogY3ViZUdyaWRTY2FsZURlbGF5IDEuM3MgaW5maW5pdGUgZWFzZS1pbi1vdXQ7XHJcbiAgICAgIGFuaW1hdGlvbjogY3ViZUdyaWRTY2FsZURlbGF5IDEuM3MgaW5maW5pdGUgZWFzZS1pbi1vdXQ7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIC5jdWJlLWdyaWQtc3Bpbm5lciAuY3ViZTEge1xyXG4gICAgICAtd2Via2l0LWFuaW1hdGlvbi1kZWxheTogMC4ycztcclxuICAgICAgYW5pbWF0aW9uLWRlbGF5OiAwLjJzO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICAuY3ViZS1ncmlkLXNwaW5uZXIgLmN1YmUyIHtcclxuICAgICAgLXdlYmtpdC1hbmltYXRpb24tZGVsYXk6IDAuM3M7XHJcbiAgICAgIGFuaW1hdGlvbi1kZWxheTogMC4zcztcclxuICAgIH1cclxuICAgIFxyXG4gICAgLmN1YmUtZ3JpZC1zcGlubmVyIC5jdWJlMyB7XHJcbiAgICAgIC13ZWJraXQtYW5pbWF0aW9uLWRlbGF5OiAwLjRzO1xyXG4gICAgICBhbmltYXRpb24tZGVsYXk6IDAuNHM7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIC5jdWJlLWdyaWQtc3Bpbm5lciAuY3ViZTQge1xyXG4gICAgICAtd2Via2l0LWFuaW1hdGlvbi1kZWxheTogMC4xcztcclxuICAgICAgYW5pbWF0aW9uLWRlbGF5OiAwLjFzO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICAuY3ViZS1ncmlkLXNwaW5uZXIgLmN1YmU1IHtcclxuICAgICAgLXdlYmtpdC1hbmltYXRpb24tZGVsYXk6IDAuMnM7XHJcbiAgICAgIGFuaW1hdGlvbi1kZWxheTogMC4ycztcclxuICAgIH1cclxuICAgIFxyXG4gICAgLmN1YmUtZ3JpZC1zcGlubmVyIC5jdWJlNiB7XHJcbiAgICAgIC13ZWJraXQtYW5pbWF0aW9uLWRlbGF5OiAwLjNzO1xyXG4gICAgICBhbmltYXRpb24tZGVsYXk6IDAuM3M7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIC5jdWJlLWdyaWQtc3Bpbm5lciAuY3ViZTcge1xyXG4gICAgICAtd2Via2l0LWFuaW1hdGlvbi1kZWxheTogMHM7XHJcbiAgICAgIGFuaW1hdGlvbi1kZWxheTogMHM7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIC5jdWJlLWdyaWQtc3Bpbm5lciAuY3ViZTgge1xyXG4gICAgICAtd2Via2l0LWFuaW1hdGlvbi1kZWxheTogMC4xcztcclxuICAgICAgYW5pbWF0aW9uLWRlbGF5OiAwLjFzO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICAuY3ViZS1ncmlkLXNwaW5uZXIgLmN1YmU5IHtcclxuICAgICAgLXdlYmtpdC1hbmltYXRpb24tZGVsYXk6IDAuMnM7XHJcbiAgICAgIGFuaW1hdGlvbi1kZWxheTogMC4ycztcclxuICAgIH1cclxuICAgIFxyXG4gICAgQC13ZWJraXQta2V5ZnJhbWVzIGN1YmVHcmlkU2NhbGVEZWxheSB7XHJcbiAgICAgIDAlLCA3MCUsIDEwMCUge1xyXG4gICAgICAgIC13ZWJraXQtdHJhbnNmb3JtOiBzY2FsZTNEKDEsIDEsIDEpO1xyXG4gICAgICAgIHRyYW5zZm9ybTogc2NhbGUzRCgxLCAxLCAxKTtcclxuICAgICAgfVxyXG4gICAgICAzNSUge1xyXG4gICAgICAgIC13ZWJraXQtdHJhbnNmb3JtOiBzY2FsZTNEKDAsIDAsIDEpO1xyXG4gICAgICAgIHRyYW5zZm9ybTogc2NhbGUzRCgwLCAwLCAxKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgXHJcbiAgICBAa2V5ZnJhbWVzIGN1YmVHcmlkU2NhbGVEZWxheSB7XHJcbiAgICAgIDAlLCA3MCUsIDEwMCUge1xyXG4gICAgICAgIC13ZWJraXQtdHJhbnNmb3JtOiBzY2FsZTNEKDEsIDEsIDEpO1xyXG4gICAgICAgIHRyYW5zZm9ybTogc2NhbGUzRCgxLCAxLCAxKTtcclxuICAgICAgfVxyXG4gICAgICAzNSUge1xyXG4gICAgICAgIC13ZWJraXQtdHJhbnNmb3JtOiBzY2FsZTNEKDAsIDAsIDEpO1xyXG4gICAgICAgIHRyYW5zZm9ybTogc2NhbGUzRCgwLCAwLCAxKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIGBdLFxyXG4gIHRlbXBsYXRlOiBTcGlubmVyVGVtcGxhdGVcclxufSlcclxuXHJcbmV4cG9ydCBjbGFzcyBDdWJlR3JpZENvbXBvbmVudCBleHRlbmRzIFNwaW5uZXJDb21wb25lbnQge1xyXG4gIHB1YmxpYyBiYXNlQ2xhc3M6IHN0cmluZyA9ICdjdWJlLWdyaWQtc3Bpbm5lcic7XHJcbiAgcHVibGljIGNoaWxkQ2xhc3M6IHN0cmluZyA9ICdjdWJlJztcclxuICBwdWJsaWMgbnVtSXRlbXM6IG51bWJlciA9IDk7XHJcbn1cclxuIl19