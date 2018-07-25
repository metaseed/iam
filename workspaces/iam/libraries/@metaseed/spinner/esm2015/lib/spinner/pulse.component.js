/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Component } from '@angular/core';
import { SpinnerComponent } from './spinner.component';
export class PulseComponent extends SpinnerComponent {
}
PulseComponent.decorators = [
    { type: Component, args: [{
                selector: 'sk-pulse',
                styles: [`
    .pulse-spinner {
      margin: 25px auto;
      width: 40px;
      height: 40px;
      border-radius: 100%;
      
      -webkit-animation: sk-scaleout 1.0s infinite ease-in-out;
      animation: sk-scaleout 1.0s infinite ease-in-out;
    }
    
    @-webkit-keyframes sk-scaleout {
      0% {
        -webkit-transform: scale(0);
      }
      100% {
        -webkit-transform: scale(1.0);
        opacity: 0;
      }
    }
    
    @keyframes sk-scaleout {
      0% {
        -webkit-transform: scale(0);
        transform: scale(0);
      }
      100% {
        -webkit-transform: scale(1.0);
        transform: scale(1.0);
        opacity: 0;
      }
    }
  `],
                template: `
    <div [hidden]="!visible" class="pulse-spinner" [style.backgroundColor]="color"></div>
  `
            },] },
];
function PulseComponent_tsickle_Closure_declarations() {
    /** @type {!Array<{type: !Function, args: (undefined|!Array<?>)}>} */
    PulseComponent.decorators;
    /**
     * @nocollapse
     * @type {function(): !Array<(null|{type: ?, decorators: (undefined|!Array<{type: !Function, args: (undefined|!Array<?>)}>)})>}
     */
    PulseComponent.ctorParameters;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHVsc2UuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQG1ldGFzZWVkL3NwaW5uZXIvIiwic291cmNlcyI6WyJsaWIvc3Bpbm5lci9wdWxzZS5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDMUMsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0scUJBQXFCLENBQUM7QUEwQ3ZELE1BQU0scUJBQXNCLFNBQVEsZ0JBQWdCOzs7WUF4Q25ELFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUsVUFBVTtnQkFDcEIsTUFBTSxFQUFFLENBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBZ0NSLENBQUM7Z0JBQ0YsUUFBUSxFQUFFOztHQUVUO2FBQ0YiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgU3Bpbm5lckNvbXBvbmVudCB9IGZyb20gJy4vc3Bpbm5lci5jb21wb25lbnQnO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6ICdzay1wdWxzZScsXHJcbiAgc3R5bGVzOiBbYFxyXG4gICAgLnB1bHNlLXNwaW5uZXIge1xyXG4gICAgICBtYXJnaW46IDI1cHggYXV0bztcclxuICAgICAgd2lkdGg6IDQwcHg7XHJcbiAgICAgIGhlaWdodDogNDBweDtcclxuICAgICAgYm9yZGVyLXJhZGl1czogMTAwJTtcclxuICAgICAgXHJcbiAgICAgIC13ZWJraXQtYW5pbWF0aW9uOiBzay1zY2FsZW91dCAxLjBzIGluZmluaXRlIGVhc2UtaW4tb3V0O1xyXG4gICAgICBhbmltYXRpb246IHNrLXNjYWxlb3V0IDEuMHMgaW5maW5pdGUgZWFzZS1pbi1vdXQ7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIEAtd2Via2l0LWtleWZyYW1lcyBzay1zY2FsZW91dCB7XHJcbiAgICAgIDAlIHtcclxuICAgICAgICAtd2Via2l0LXRyYW5zZm9ybTogc2NhbGUoMCk7XHJcbiAgICAgIH1cclxuICAgICAgMTAwJSB7XHJcbiAgICAgICAgLXdlYmtpdC10cmFuc2Zvcm06IHNjYWxlKDEuMCk7XHJcbiAgICAgICAgb3BhY2l0eTogMDtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgXHJcbiAgICBAa2V5ZnJhbWVzIHNrLXNjYWxlb3V0IHtcclxuICAgICAgMCUge1xyXG4gICAgICAgIC13ZWJraXQtdHJhbnNmb3JtOiBzY2FsZSgwKTtcclxuICAgICAgICB0cmFuc2Zvcm06IHNjYWxlKDApO1xyXG4gICAgICB9XHJcbiAgICAgIDEwMCUge1xyXG4gICAgICAgIC13ZWJraXQtdHJhbnNmb3JtOiBzY2FsZSgxLjApO1xyXG4gICAgICAgIHRyYW5zZm9ybTogc2NhbGUoMS4wKTtcclxuICAgICAgICBvcGFjaXR5OiAwO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgYF0sXHJcbiAgdGVtcGxhdGU6IGBcclxuICAgIDxkaXYgW2hpZGRlbl09XCIhdmlzaWJsZVwiIGNsYXNzPVwicHVsc2Utc3Bpbm5lclwiIFtzdHlsZS5iYWNrZ3JvdW5kQ29sb3JdPVwiY29sb3JcIj48L2Rpdj5cclxuICBgXHJcbn0pXHJcblxyXG5leHBvcnQgY2xhc3MgUHVsc2VDb21wb25lbnQgZXh0ZW5kcyBTcGlubmVyQ29tcG9uZW50IHt9XHJcbiJdfQ==