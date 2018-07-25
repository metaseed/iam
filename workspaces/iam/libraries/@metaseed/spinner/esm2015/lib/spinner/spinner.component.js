/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Component, Input } from '@angular/core';
export class SpinnerComponent {
    constructor() {
        this.visible = true;
        this.baseClass = 'chasing-dots-spinner';
        this.childClass = 'dot';
        this.numItems = 2;
        this.delay = 0;
        this.color = '#333';
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set isRunning(value) {
        if (!value) {
            this.cancel();
            this.visible = false;
            return;
        }
        if (this.timeout) {
            return;
        }
        this.timeout = setTimeout(() => {
            this.visible = true;
            this.cancel();
        }, this.delay);
    }
    /**
     * @return {?}
     */
    cancel() {
        clearTimeout(this.timeout);
        this.timeout = undefined;
    }
    /**
     * @return {?}
     */
    get items() {
        return Array(this.numItems);
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this.cancel();
    }
}
SpinnerComponent.decorators = [
    { type: Component, args: [{
                selector: 'spinner',
                template: ''
            },] },
];
/** @nocollapse */
SpinnerComponent.propDecorators = {
    "delay": [{ type: Input },],
    "color": [{ type: Input },],
    "isRunning": [{ type: Input },],
};
function SpinnerComponent_tsickle_Closure_declarations() {
    /** @type {!Array<{type: !Function, args: (undefined|!Array<?>)}>} */
    SpinnerComponent.decorators;
    /**
     * @nocollapse
     * @type {function(): !Array<(null|{type: ?, decorators: (undefined|!Array<{type: !Function, args: (undefined|!Array<?>)}>)})>}
     */
    SpinnerComponent.ctorParameters;
    /** @type {!Object<string,!Array<{type: !Function, args: (undefined|!Array<?>)}>>} */
    SpinnerComponent.propDecorators;
    /** @type {?} */
    SpinnerComponent.prototype.visible;
    /** @type {?} */
    SpinnerComponent.prototype.timeout;
    /** @type {?} */
    SpinnerComponent.prototype.baseClass;
    /** @type {?} */
    SpinnerComponent.prototype.childClass;
    /** @type {?} */
    SpinnerComponent.prototype.numItems;
    /** @type {?} */
    SpinnerComponent.prototype.delay;
    /** @type {?} */
    SpinnerComponent.prototype.color;
}
export const /** @type {?} */ SpinnerTemplate = `
  <div [hidden]="!visible" [ngClass]="baseClass">
      <div *ngFor="let item of items; let i = index" [ngClass]="childClass + (i+1)" [style.backgroundColor]="color"></div>
  </div>
`;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3Bpbm5lci5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AbWV0YXNlZWQvc3BpbmVyLyIsInNvdXJjZXMiOlsibGliL3NwaW5uZXIvc3Bpbm5lci5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFhLE1BQU0sZUFBZSxDQUFDO0FBTTVELE1BQU07O3VCQUNzQixJQUFJO3lCQUVILHNCQUFzQjswQkFDckIsS0FBSzt3QkFDUCxDQUFDO3FCQUdKLENBQUM7cUJBR0QsTUFBTTs7Ozs7O1FBR2xCLFNBQVMsQ0FBQyxLQUFjO1FBQ2pDLEVBQUUsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztZQUNYLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQztZQUNkLElBQUksQ0FBQyxPQUFPLEdBQUcsS0FBSyxDQUFDO1lBQ3JCLE1BQU0sQ0FBQztTQUNSO1FBRUQsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7WUFDakIsTUFBTSxDQUFDO1NBQ1I7UUFFRCxJQUFJLENBQUMsT0FBTyxHQUFHLFVBQVUsQ0FBQyxHQUFHLEVBQUU7WUFDN0IsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUM7WUFDcEIsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO1NBQ2YsRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7Ozs7O0lBR1QsTUFBTTtRQUNaLFlBQVksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDM0IsSUFBSSxDQUFDLE9BQU8sR0FBRyxTQUFTLENBQUM7Ozs7O1FBR2hCLEtBQUs7UUFDZCxNQUFNLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQzs7Ozs7SUFHOUIsV0FBVztRQUNULElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQztLQUNmOzs7WUE5Q0YsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSxTQUFTO2dCQUNuQixRQUFRLEVBQUUsRUFBRTthQUNiOzs7O3NCQVFFLEtBQUs7c0JBR0wsS0FBSzswQkFHTCxLQUFLOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFnQ1IsTUFBTSxDQUFDLHVCQUFNLGVBQWUsR0FBRzs7OztDQUk5QixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBJbnB1dCwgT25EZXN0cm95IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICBzZWxlY3RvcjogJ3NwaW5uZXInLFxyXG4gIHRlbXBsYXRlOiAnJ1xyXG59KVxyXG5leHBvcnQgY2xhc3MgU3Bpbm5lckNvbXBvbmVudCBpbXBsZW1lbnRzIE9uRGVzdHJveSB7XHJcbiAgcHVibGljIHZpc2libGU6IGJvb2xlYW4gPSB0cnVlO1xyXG4gIHB1YmxpYyB0aW1lb3V0OiBhbnk7XHJcbiAgcHVibGljIGJhc2VDbGFzczogc3RyaW5nID0gJ2NoYXNpbmctZG90cy1zcGlubmVyJztcclxuICBwdWJsaWMgY2hpbGRDbGFzczogc3RyaW5nID0gJ2RvdCc7XHJcbiAgcHVibGljIG51bUl0ZW1zOiBudW1iZXIgPSAyO1xyXG4gIFxyXG4gIEBJbnB1dCgpXHJcbiAgcHVibGljIGRlbGF5OiBudW1iZXIgPSAwO1xyXG4gIFxyXG4gIEBJbnB1dCgpXHJcbiAgcHVibGljIGNvbG9yOiBzdHJpbmcgPSAnIzMzMyc7XHJcbiAgXHJcbiAgQElucHV0KClcclxuICBwdWJsaWMgc2V0IGlzUnVubmluZyh2YWx1ZTogYm9vbGVhbikge1xyXG4gICAgaWYgKCF2YWx1ZSkge1xyXG4gICAgICB0aGlzLmNhbmNlbCgpO1xyXG4gICAgICB0aGlzLnZpc2libGUgPSBmYWxzZTtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICBpZiAodGhpcy50aW1lb3V0KSB7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuICAgIFxyXG4gICAgdGhpcy50aW1lb3V0ID0gc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgIHRoaXMudmlzaWJsZSA9IHRydWU7XHJcbiAgICAgIHRoaXMuY2FuY2VsKCk7XHJcbiAgICB9LCB0aGlzLmRlbGF5KTtcclxuICB9XHJcbiAgXHJcbiAgcHJpdmF0ZSBjYW5jZWwoKTogdm9pZCB7XHJcbiAgICBjbGVhclRpbWVvdXQodGhpcy50aW1lb3V0KTtcclxuICAgIHRoaXMudGltZW91dCA9IHVuZGVmaW5lZDtcclxuICB9XHJcbiAgXHJcbiAgcHVibGljIGdldCBpdGVtcygpIHtcclxuICAgIHJldHVybiBBcnJheSh0aGlzLm51bUl0ZW1zKTtcclxuICB9XHJcbiAgXHJcbiAgbmdPbkRlc3Ryb3koKTogYW55IHtcclxuICAgIHRoaXMuY2FuY2VsKCk7XHJcbiAgfVxyXG59XHJcblxyXG5leHBvcnQgY29uc3QgU3Bpbm5lclRlbXBsYXRlID0gYFxyXG4gIDxkaXYgW2hpZGRlbl09XCIhdmlzaWJsZVwiIFtuZ0NsYXNzXT1cImJhc2VDbGFzc1wiPlxyXG4gICAgICA8ZGl2ICpuZ0Zvcj1cImxldCBpdGVtIG9mIGl0ZW1zOyBsZXQgaSA9IGluZGV4XCIgW25nQ2xhc3NdPVwiY2hpbGRDbGFzcyArIChpKzEpXCIgW3N0eWxlLmJhY2tncm91bmRDb2xvcl09XCJjb2xvclwiPjwvZGl2PlxyXG4gIDwvZGl2PlxyXG5gO1xyXG4iXX0=