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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3Bpbm5lci5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AbWV0YXNlZWQvc3Bpbm5lci8iLCJzb3VyY2VzIjpbImxpYi9zcGlubmVyL3NwaW5uZXIuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBYSxNQUFNLGVBQWUsQ0FBQzs7O3VCQU9oQyxJQUFJO3lCQUVILHNCQUFzQjswQkFDckIsS0FBSzt3QkFDUCxDQUFDO3FCQUdKLENBQUM7cUJBR0QsTUFBTTs7MEJBR2xCLHVDQUFTOzs7OztrQkFBQyxLQUFjOztZQUNqQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7Z0JBQ1gsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO2dCQUNkLElBQUksQ0FBQyxPQUFPLEdBQUcsS0FBSyxDQUFDO2dCQUNyQixNQUFNLENBQUM7YUFDUjtZQUVELEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO2dCQUNqQixNQUFNLENBQUM7YUFDUjtZQUVELElBQUksQ0FBQyxPQUFPLEdBQUcsVUFBVSxDQUFDO2dCQUN4QixLQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQztnQkFDcEIsS0FBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO2FBQ2YsRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7Ozs7Ozs7O0lBR1QsaUNBQU07Ozs7UUFDWixZQUFZLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQzNCLElBQUksQ0FBQyxPQUFPLEdBQUcsU0FBUyxDQUFDOzswQkFHaEIsbUNBQUs7Ozs7O1lBQ2QsTUFBTSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7Ozs7Ozs7O0lBRzlCLHNDQUFXOzs7SUFBWDtRQUNFLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQztLQUNmOztnQkE5Q0YsU0FBUyxTQUFDO29CQUNULFFBQVEsRUFBRSxTQUFTO29CQUNuQixRQUFRLEVBQUUsRUFBRTtpQkFDYjs7OzswQkFRRSxLQUFLOzBCQUdMLEtBQUs7OEJBR0wsS0FBSzs7MkJBbkJSOztTQU1hLGdCQUFnQjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUE2QzdCLE1BQU0sQ0FBQyxxQkFBTSxlQUFlLEdBQUcsdU1BSTlCLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIElucHV0LCBPbkRlc3Ryb3kgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gIHNlbGVjdG9yOiAnc3Bpbm5lcicsXHJcbiAgdGVtcGxhdGU6ICcnXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBTcGlubmVyQ29tcG9uZW50IGltcGxlbWVudHMgT25EZXN0cm95IHtcclxuICBwdWJsaWMgdmlzaWJsZTogYm9vbGVhbiA9IHRydWU7XHJcbiAgcHVibGljIHRpbWVvdXQ6IGFueTtcclxuICBwdWJsaWMgYmFzZUNsYXNzOiBzdHJpbmcgPSAnY2hhc2luZy1kb3RzLXNwaW5uZXInO1xyXG4gIHB1YmxpYyBjaGlsZENsYXNzOiBzdHJpbmcgPSAnZG90JztcclxuICBwdWJsaWMgbnVtSXRlbXM6IG51bWJlciA9IDI7XHJcbiAgXHJcbiAgQElucHV0KClcclxuICBwdWJsaWMgZGVsYXk6IG51bWJlciA9IDA7XHJcbiAgXHJcbiAgQElucHV0KClcclxuICBwdWJsaWMgY29sb3I6IHN0cmluZyA9ICcjMzMzJztcclxuICBcclxuICBASW5wdXQoKVxyXG4gIHB1YmxpYyBzZXQgaXNSdW5uaW5nKHZhbHVlOiBib29sZWFuKSB7XHJcbiAgICBpZiAoIXZhbHVlKSB7XHJcbiAgICAgIHRoaXMuY2FuY2VsKCk7XHJcbiAgICAgIHRoaXMudmlzaWJsZSA9IGZhbHNlO1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcbiAgICBcclxuICAgIGlmICh0aGlzLnRpbWVvdXQpIHtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICB0aGlzLnRpbWVvdXQgPSBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgdGhpcy52aXNpYmxlID0gdHJ1ZTtcclxuICAgICAgdGhpcy5jYW5jZWwoKTtcclxuICAgIH0sIHRoaXMuZGVsYXkpO1xyXG4gIH1cclxuICBcclxuICBwcml2YXRlIGNhbmNlbCgpOiB2b2lkIHtcclxuICAgIGNsZWFyVGltZW91dCh0aGlzLnRpbWVvdXQpO1xyXG4gICAgdGhpcy50aW1lb3V0ID0gdW5kZWZpbmVkO1xyXG4gIH1cclxuICBcclxuICBwdWJsaWMgZ2V0IGl0ZW1zKCkge1xyXG4gICAgcmV0dXJuIEFycmF5KHRoaXMubnVtSXRlbXMpO1xyXG4gIH1cclxuICBcclxuICBuZ09uRGVzdHJveSgpOiBhbnkge1xyXG4gICAgdGhpcy5jYW5jZWwoKTtcclxuICB9XHJcbn1cclxuXHJcbmV4cG9ydCBjb25zdCBTcGlubmVyVGVtcGxhdGUgPSBgXHJcbiAgPGRpdiBbaGlkZGVuXT1cIiF2aXNpYmxlXCIgW25nQ2xhc3NdPVwiYmFzZUNsYXNzXCI+XHJcbiAgICAgIDxkaXYgKm5nRm9yPVwibGV0IGl0ZW0gb2YgaXRlbXM7IGxldCBpID0gaW5kZXhcIiBbbmdDbGFzc109XCJjaGlsZENsYXNzICsgKGkrMSlcIiBbc3R5bGUuYmFja2dyb3VuZENvbG9yXT1cImNvbG9yXCI+PC9kaXY+XHJcbiAgPC9kaXY+XHJcbmA7XHJcbiJdfQ==