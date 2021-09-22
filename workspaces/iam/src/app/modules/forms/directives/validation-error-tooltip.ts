import { AriaDescriber, FocusMonitor } from "@angular/cdk/a11y";
import { Directionality } from "@angular/cdk/bidi";
import { Overlay, ScrollDispatcher } from "@angular/cdk/overlay";
import { Platform } from "@angular/cdk/platform";
import { DOCUMENT } from "@angular/common";
import { Directive, ElementRef, Inject, NgZone, Optional, ViewContainerRef, OnInit, OnDestroy, Input } from "@angular/core";
import { FormControlName } from "@angular/forms";
import { MatTooltip, MatTooltipDefaultOptions, MAT_TOOLTIP_DEFAULT_OPTIONS, MAT_TOOLTIP_SCROLL_STRATEGY, TooltipComponent } from "@angular/material/tooltip";
import { Subscription } from "rxjs";
import { T } from "../utils";

/**
 * default customized error message templates of different validators.
 * could be overridden/configured from the input binding of 'errorMsg' of the ValidationErrorTooltip directive
 * 
 * @example: for the min validator
 * the key is the validator name, the value in the template would be filled by the min validator error message object:
 * {min: configured_min_value, actual: actual_value}
 */
const errorMsg = {
    required: T`this field is Required!`,
    min: T`min value is ${'min'}, but the current value is ${'actual'}!`,
}
/**
 * show validation errors in tooltip of the formControl associated UI element
 * automatically applied with the formControlName directive
 * 
 * it would show customized message from the 'errorMsg' input binding,
 * if not available, it would used the default one above, if still not available for that validator
 * it would generate the error message from the validator error message object.
 */
@Directive({
    selector: '[formControlName],[formControl]',
    host: {
        'class': 'mat-tooltip-trigger'
    }
})
export class ValidationErrorTooltip extends MatTooltip implements OnInit, OnDestroy {
    protected readonly _tooltipComponent = TooltipComponent;
    private _statusChangeSubscription: Subscription;
    constructor(
        overlay: Overlay,
        elementRef: ElementRef<HTMLElement>,
        scrollDispatcher: ScrollDispatcher,
        viewContainerRef: ViewContainerRef,
        ngZone: NgZone,
        platform: Platform,
        ariaDescriber: AriaDescriber,
        focusMonitor: FocusMonitor,
        @Inject(MAT_TOOLTIP_SCROLL_STRATEGY) scrollStrategy: any,
        @Optional() dir: Directionality,
        @Optional() @Inject(MAT_TOOLTIP_DEFAULT_OPTIONS) defaultOptions: MatTooltipDefaultOptions,
        @Inject(DOCUMENT) _document: any,
        private formControlName: FormControlName) {

        super(overlay, elementRef, scrollDispatcher, viewContainerRef, ngZone, platform, ariaDescriber,
            focusMonitor, scrollStrategy, dir, defaultOptions, _document);
    }

    @Input() errorMsg: Record<string, Function>;

    ngOnInit() {
        this.errorMsg = {...errorMsg, ...this.errorMsg};

        this._statusChangeSubscription = this.formControlName.statusChanges.subscribe(_ => {
            const errors = this.formControlName.errors;
            const messages = [];
            for (let key in errors) {
                const error = this.errorMsg[key] ? this.errorMsg[key](errors[key]) : this._getErrMsg(key, errors);
                messages.push(error);
            }
            const msg = messages.join('\n');
            if (this.message === msg) return;
            this.message = msg;
            if (msg) {
                this.show();
            }
        }, e => console.error(e));
    }

    ngOnDestroy() {
        this._statusChangeSubscription?.unsubscribe();
    }

    /**
     * create error msg from the errors object from validators
     * @param errors errors from validators
     * @returns error message string
     */
    private _getErrMsg(key: string, errors: object) {
        let error = ''
        let msg = ''
        for (let v in errors[key]) {
            msg += `${v}: ${errors[key][v]}; `
        }
        if (msg) msg = ' - ' + msg;
        error += `${key} validation ${msg}`
        return error;
    }
}