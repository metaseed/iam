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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3Bpbm5lci5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AbWV0YXNlZWQvc3Bpbm5lci8iLCJzb3VyY2VzIjpbImxpYi9zcGlubmVyL3NwaW5uZXIuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBYSxNQUFNLGVBQWUsQ0FBQztBQU01RCxNQUFNOzt1QkFDc0IsSUFBSTt5QkFFSCxzQkFBc0I7MEJBQ3JCLEtBQUs7d0JBQ1AsQ0FBQztxQkFHSixDQUFDO3FCQUdELE1BQU07Ozs7OztRQUdsQixTQUFTLENBQUMsS0FBYztRQUNqQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7WUFDWCxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUM7WUFDZCxJQUFJLENBQUMsT0FBTyxHQUFHLEtBQUssQ0FBQztZQUNyQixNQUFNLENBQUM7U0FDUjtRQUVELEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO1lBQ2pCLE1BQU0sQ0FBQztTQUNSO1FBRUQsSUFBSSxDQUFDLE9BQU8sR0FBRyxVQUFVLENBQUMsR0FBRyxFQUFFO1lBQzdCLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDO1lBQ3BCLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQztTQUNmLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDOzs7OztJQUdULE1BQU07UUFDWixZQUFZLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQzNCLElBQUksQ0FBQyxPQUFPLEdBQUcsU0FBUyxDQUFDOzs7OztRQUdoQixLQUFLO1FBQ2QsTUFBTSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7Ozs7O0lBRzlCLFdBQVc7UUFDVCxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUM7S0FDZjs7O1lBOUNGLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUsU0FBUztnQkFDbkIsUUFBUSxFQUFFLEVBQUU7YUFDYjs7OztzQkFRRSxLQUFLO3NCQUdMLEtBQUs7MEJBR0wsS0FBSzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBZ0NSLE1BQU0sQ0FBQyx1QkFBTSxlQUFlLEdBQUc7Ozs7Q0FJOUIsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgSW5wdXQsIE9uRGVzdHJveSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6ICdzcGlubmVyJyxcclxuICB0ZW1wbGF0ZTogJydcclxufSlcclxuZXhwb3J0IGNsYXNzIFNwaW5uZXJDb21wb25lbnQgaW1wbGVtZW50cyBPbkRlc3Ryb3kge1xyXG4gIHB1YmxpYyB2aXNpYmxlOiBib29sZWFuID0gdHJ1ZTtcclxuICBwdWJsaWMgdGltZW91dDogYW55O1xyXG4gIHB1YmxpYyBiYXNlQ2xhc3M6IHN0cmluZyA9ICdjaGFzaW5nLWRvdHMtc3Bpbm5lcic7XHJcbiAgcHVibGljIGNoaWxkQ2xhc3M6IHN0cmluZyA9ICdkb3QnO1xyXG4gIHB1YmxpYyBudW1JdGVtczogbnVtYmVyID0gMjtcclxuICBcclxuICBASW5wdXQoKVxyXG4gIHB1YmxpYyBkZWxheTogbnVtYmVyID0gMDtcclxuICBcclxuICBASW5wdXQoKVxyXG4gIHB1YmxpYyBjb2xvcjogc3RyaW5nID0gJyMzMzMnO1xyXG4gIFxyXG4gIEBJbnB1dCgpXHJcbiAgcHVibGljIHNldCBpc1J1bm5pbmcodmFsdWU6IGJvb2xlYW4pIHtcclxuICAgIGlmICghdmFsdWUpIHtcclxuICAgICAgdGhpcy5jYW5jZWwoKTtcclxuICAgICAgdGhpcy52aXNpYmxlID0gZmFsc2U7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuICAgIFxyXG4gICAgaWYgKHRoaXMudGltZW91dCkge1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcbiAgICBcclxuICAgIHRoaXMudGltZW91dCA9IHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICB0aGlzLnZpc2libGUgPSB0cnVlO1xyXG4gICAgICB0aGlzLmNhbmNlbCgpO1xyXG4gICAgfSwgdGhpcy5kZWxheSk7XHJcbiAgfVxyXG4gIFxyXG4gIHByaXZhdGUgY2FuY2VsKCk6IHZvaWQge1xyXG4gICAgY2xlYXJUaW1lb3V0KHRoaXMudGltZW91dCk7XHJcbiAgICB0aGlzLnRpbWVvdXQgPSB1bmRlZmluZWQ7XHJcbiAgfVxyXG4gIFxyXG4gIHB1YmxpYyBnZXQgaXRlbXMoKSB7XHJcbiAgICByZXR1cm4gQXJyYXkodGhpcy5udW1JdGVtcyk7XHJcbiAgfVxyXG4gIFxyXG4gIG5nT25EZXN0cm95KCk6IGFueSB7XHJcbiAgICB0aGlzLmNhbmNlbCgpO1xyXG4gIH1cclxufVxyXG5cclxuZXhwb3J0IGNvbnN0IFNwaW5uZXJUZW1wbGF0ZSA9IGBcclxuICA8ZGl2IFtoaWRkZW5dPVwiIXZpc2libGVcIiBbbmdDbGFzc109XCJiYXNlQ2xhc3NcIj5cclxuICAgICAgPGRpdiAqbmdGb3I9XCJsZXQgaXRlbSBvZiBpdGVtczsgbGV0IGkgPSBpbmRleFwiIFtuZ0NsYXNzXT1cImNoaWxkQ2xhc3MgKyAoaSsxKVwiIFtzdHlsZS5iYWNrZ3JvdW5kQ29sb3JdPVwiY29sb3JcIj48L2Rpdj5cclxuICA8L2Rpdj5cclxuYDtcclxuIl19