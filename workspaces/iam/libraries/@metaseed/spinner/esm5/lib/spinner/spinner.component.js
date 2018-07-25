/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Component, Input } from '@angular/core';
var SpinnerComponent = /** @class */ (function () {
    function SpinnerComponent() {
        this.visible = true;
        this.baseClass = 'chasing-dots-spinner';
        this.childClass = 'dot';
        this.numItems = 2;
        this.delay = 0;
        this.color = '#333';
    }
    Object.defineProperty(SpinnerComponent.prototype, "isRunning", {
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            var _this = this;
            if (!value) {
                this.cancel();
                this.visible = false;
                return;
            }
            if (this.timeout) {
                return;
            }
            this.timeout = setTimeout(function () {
                _this.visible = true;
                _this.cancel();
            }, this.delay);
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    SpinnerComponent.prototype.cancel = /**
     * @return {?}
     */
    function () {
        clearTimeout(this.timeout);
        this.timeout = undefined;
    };
    Object.defineProperty(SpinnerComponent.prototype, "items", {
        get: /**
         * @return {?}
         */
        function () {
            return Array(this.numItems);
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    SpinnerComponent.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this.cancel();
    };
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
    return SpinnerComponent;
}());
export { SpinnerComponent };
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
export var /** @type {?} */ SpinnerTemplate = "\n  <div [hidden]=\"!visible\" [ngClass]=\"baseClass\">\n      <div *ngFor=\"let item of items; let i = index\" [ngClass]=\"childClass + (i+1)\" [style.backgroundColor]=\"color\"></div>\n  </div>\n";

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3Bpbm5lci5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AbWV0YXNlZWQvc3BpbmVyLyIsInNvdXJjZXMiOlsibGliL3NwaW5uZXIvc3Bpbm5lci5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFhLE1BQU0sZUFBZSxDQUFDOzs7dUJBT2hDLElBQUk7eUJBRUgsc0JBQXNCOzBCQUNyQixLQUFLO3dCQUNQLENBQUM7cUJBR0osQ0FBQztxQkFHRCxNQUFNOzswQkFHbEIsdUNBQVM7Ozs7O2tCQUFDLEtBQWM7O1lBQ2pDLEVBQUUsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztnQkFDWCxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUM7Z0JBQ2QsSUFBSSxDQUFDLE9BQU8sR0FBRyxLQUFLLENBQUM7Z0JBQ3JCLE1BQU0sQ0FBQzthQUNSO1lBRUQsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7Z0JBQ2pCLE1BQU0sQ0FBQzthQUNSO1lBRUQsSUFBSSxDQUFDLE9BQU8sR0FBRyxVQUFVLENBQUM7Z0JBQ3hCLEtBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDO2dCQUNwQixLQUFJLENBQUMsTUFBTSxFQUFFLENBQUM7YUFDZixFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQzs7Ozs7Ozs7SUFHVCxpQ0FBTTs7OztRQUNaLFlBQVksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDM0IsSUFBSSxDQUFDLE9BQU8sR0FBRyxTQUFTLENBQUM7OzBCQUdoQixtQ0FBSzs7Ozs7WUFDZCxNQUFNLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQzs7Ozs7Ozs7SUFHOUIsc0NBQVc7OztJQUFYO1FBQ0UsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO0tBQ2Y7O2dCQTlDRixTQUFTLFNBQUM7b0JBQ1QsUUFBUSxFQUFFLFNBQVM7b0JBQ25CLFFBQVEsRUFBRSxFQUFFO2lCQUNiOzs7OzBCQVFFLEtBQUs7MEJBR0wsS0FBSzs4QkFHTCxLQUFLOzsyQkFuQlI7O1NBTWEsZ0JBQWdCOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQTZDN0IsTUFBTSxDQUFDLHFCQUFNLGVBQWUsR0FBRyx1TUFJOUIsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgSW5wdXQsIE9uRGVzdHJveSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6ICdzcGlubmVyJyxcclxuICB0ZW1wbGF0ZTogJydcclxufSlcclxuZXhwb3J0IGNsYXNzIFNwaW5uZXJDb21wb25lbnQgaW1wbGVtZW50cyBPbkRlc3Ryb3kge1xyXG4gIHB1YmxpYyB2aXNpYmxlOiBib29sZWFuID0gdHJ1ZTtcclxuICBwdWJsaWMgdGltZW91dDogYW55O1xyXG4gIHB1YmxpYyBiYXNlQ2xhc3M6IHN0cmluZyA9ICdjaGFzaW5nLWRvdHMtc3Bpbm5lcic7XHJcbiAgcHVibGljIGNoaWxkQ2xhc3M6IHN0cmluZyA9ICdkb3QnO1xyXG4gIHB1YmxpYyBudW1JdGVtczogbnVtYmVyID0gMjtcclxuICBcclxuICBASW5wdXQoKVxyXG4gIHB1YmxpYyBkZWxheTogbnVtYmVyID0gMDtcclxuICBcclxuICBASW5wdXQoKVxyXG4gIHB1YmxpYyBjb2xvcjogc3RyaW5nID0gJyMzMzMnO1xyXG4gIFxyXG4gIEBJbnB1dCgpXHJcbiAgcHVibGljIHNldCBpc1J1bm5pbmcodmFsdWU6IGJvb2xlYW4pIHtcclxuICAgIGlmICghdmFsdWUpIHtcclxuICAgICAgdGhpcy5jYW5jZWwoKTtcclxuICAgICAgdGhpcy52aXNpYmxlID0gZmFsc2U7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuICAgIFxyXG4gICAgaWYgKHRoaXMudGltZW91dCkge1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcbiAgICBcclxuICAgIHRoaXMudGltZW91dCA9IHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICB0aGlzLnZpc2libGUgPSB0cnVlO1xyXG4gICAgICB0aGlzLmNhbmNlbCgpO1xyXG4gICAgfSwgdGhpcy5kZWxheSk7XHJcbiAgfVxyXG4gIFxyXG4gIHByaXZhdGUgY2FuY2VsKCk6IHZvaWQge1xyXG4gICAgY2xlYXJUaW1lb3V0KHRoaXMudGltZW91dCk7XHJcbiAgICB0aGlzLnRpbWVvdXQgPSB1bmRlZmluZWQ7XHJcbiAgfVxyXG4gIFxyXG4gIHB1YmxpYyBnZXQgaXRlbXMoKSB7XHJcbiAgICByZXR1cm4gQXJyYXkodGhpcy5udW1JdGVtcyk7XHJcbiAgfVxyXG4gIFxyXG4gIG5nT25EZXN0cm95KCk6IGFueSB7XHJcbiAgICB0aGlzLmNhbmNlbCgpO1xyXG4gIH1cclxufVxyXG5cclxuZXhwb3J0IGNvbnN0IFNwaW5uZXJUZW1wbGF0ZSA9IGBcclxuICA8ZGl2IFtoaWRkZW5dPVwiIXZpc2libGVcIiBbbmdDbGFzc109XCJiYXNlQ2xhc3NcIj5cclxuICAgICAgPGRpdiAqbmdGb3I9XCJsZXQgaXRlbSBvZiBpdGVtczsgbGV0IGkgPSBpbmRleFwiIFtuZ0NsYXNzXT1cImNoaWxkQ2xhc3MgKyAoaSsxKVwiIFtzdHlsZS5iYWNrZ3JvdW5kQ29sb3JdPVwiY29sb3JcIj48L2Rpdj5cclxuICA8L2Rpdj5cclxuYDtcclxuIl19