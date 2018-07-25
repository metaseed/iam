/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Component } from '@angular/core';
import { SpinnerComponent } from './spinner.component';
export class WordPressComponent extends SpinnerComponent {
}
WordPressComponent.decorators = [
    { type: Component, args: [{
                selector: 'sk-word-press',
                styles: [`
    .word-press-spinner {
      position: relative;
      margin: 25px auto;
      width: 30px;
      height: 30px;
      border-radius: 30px;
      
      -webkit-animation: inner-circle 1s linear infinite;
      animation: inner-circle 1s linear infinite;
    }
    
    .inner-circle {
      position: absolute;
      top: 5px;
      left: 5px;
      display: block;
      width: 8px;
      height: 8px;
      border-radius: 8px;
      background: #fff;
    }
    
    @-webkit-keyframes inner-circle {
      0% {
        -webkit-transform: rotate(0);
      }
      100% {
        -webkit-transform: rotate(360deg);
      }
    }
    
    @keyframes inner-circle {
      0% {
        transform: rotate(0);
        -webkit-transform: rotate(0);
      }
      100% {
        transform: rotate(360deg);
        -webkit-transform: rotate(360deg);
      }
    }
  `],
                template: `
    <div [hidden]="!visible" class="word-press-spinner" [style.backgroundColor]="color">
      <span class="inner-circle"></span>
    </div>
  `
            },] },
];
function WordPressComponent_tsickle_Closure_declarations() {
    /** @type {!Array<{type: !Function, args: (undefined|!Array<?>)}>} */
    WordPressComponent.decorators;
    /**
     * @nocollapse
     * @type {function(): !Array<(null|{type: ?, decorators: (undefined|!Array<{type: !Function, args: (undefined|!Array<?>)}>)})>}
     */
    WordPressComponent.ctorParameters;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid29yZC1wcmVzcy5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AbWV0YXNlZWQvc3BpbmVyLyIsInNvdXJjZXMiOlsibGliL3NwaW5uZXIvd29yZC1wcmVzcy5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDMUMsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFzRHZELE1BQU0seUJBQTBCLFNBQVEsZ0JBQWdCOzs7WUFwRHZELFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUsZUFBZTtnQkFDekIsTUFBTSxFQUFFLENBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQTBDUixDQUFDO2dCQUNGLFFBQVEsRUFBRTs7OztHQUlUO2FBQ0YiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgU3Bpbm5lckNvbXBvbmVudCB9IGZyb20gJy4vc3Bpbm5lci5jb21wb25lbnQnO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6ICdzay13b3JkLXByZXNzJyxcclxuICBzdHlsZXM6IFtgXHJcbiAgICAud29yZC1wcmVzcy1zcGlubmVyIHtcclxuICAgICAgcG9zaXRpb246IHJlbGF0aXZlO1xyXG4gICAgICBtYXJnaW46IDI1cHggYXV0bztcclxuICAgICAgd2lkdGg6IDMwcHg7XHJcbiAgICAgIGhlaWdodDogMzBweDtcclxuICAgICAgYm9yZGVyLXJhZGl1czogMzBweDtcclxuICAgICAgXHJcbiAgICAgIC13ZWJraXQtYW5pbWF0aW9uOiBpbm5lci1jaXJjbGUgMXMgbGluZWFyIGluZmluaXRlO1xyXG4gICAgICBhbmltYXRpb246IGlubmVyLWNpcmNsZSAxcyBsaW5lYXIgaW5maW5pdGU7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIC5pbm5lci1jaXJjbGUge1xyXG4gICAgICBwb3NpdGlvbjogYWJzb2x1dGU7XHJcbiAgICAgIHRvcDogNXB4O1xyXG4gICAgICBsZWZ0OiA1cHg7XHJcbiAgICAgIGRpc3BsYXk6IGJsb2NrO1xyXG4gICAgICB3aWR0aDogOHB4O1xyXG4gICAgICBoZWlnaHQ6IDhweDtcclxuICAgICAgYm9yZGVyLXJhZGl1czogOHB4O1xyXG4gICAgICBiYWNrZ3JvdW5kOiAjZmZmO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICBALXdlYmtpdC1rZXlmcmFtZXMgaW5uZXItY2lyY2xlIHtcclxuICAgICAgMCUge1xyXG4gICAgICAgIC13ZWJraXQtdHJhbnNmb3JtOiByb3RhdGUoMCk7XHJcbiAgICAgIH1cclxuICAgICAgMTAwJSB7XHJcbiAgICAgICAgLXdlYmtpdC10cmFuc2Zvcm06IHJvdGF0ZSgzNjBkZWcpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICBcclxuICAgIEBrZXlmcmFtZXMgaW5uZXItY2lyY2xlIHtcclxuICAgICAgMCUge1xyXG4gICAgICAgIHRyYW5zZm9ybTogcm90YXRlKDApO1xyXG4gICAgICAgIC13ZWJraXQtdHJhbnNmb3JtOiByb3RhdGUoMCk7XHJcbiAgICAgIH1cclxuICAgICAgMTAwJSB7XHJcbiAgICAgICAgdHJhbnNmb3JtOiByb3RhdGUoMzYwZGVnKTtcclxuICAgICAgICAtd2Via2l0LXRyYW5zZm9ybTogcm90YXRlKDM2MGRlZyk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICBgXSxcclxuICB0ZW1wbGF0ZTogYFxyXG4gICAgPGRpdiBbaGlkZGVuXT1cIiF2aXNpYmxlXCIgY2xhc3M9XCJ3b3JkLXByZXNzLXNwaW5uZXJcIiBbc3R5bGUuYmFja2dyb3VuZENvbG9yXT1cImNvbG9yXCI+XHJcbiAgICAgIDxzcGFuIGNsYXNzPVwiaW5uZXItY2lyY2xlXCI+PC9zcGFuPlxyXG4gICAgPC9kaXY+XHJcbiAgYFxyXG59KVxyXG5cclxuZXhwb3J0IGNsYXNzIFdvcmRQcmVzc0NvbXBvbmVudCBleHRlbmRzIFNwaW5uZXJDb21wb25lbnQge31cclxuIl19