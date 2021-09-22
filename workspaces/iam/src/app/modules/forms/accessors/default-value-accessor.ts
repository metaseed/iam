import { AfterViewInit, Attribute, ChangeDetectorRef, Directive, ElementRef, forwardRef, OnDestroy, Renderer2, ViewContainerRef } from "@angular/core";
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from "@angular/forms";
import { InputValueAccessor } from "./input-value-accessor";
import { ModelValueAccessor } from "./model-value-accessor";

/**
 * automatically applied with the formControlName or formControl directive
 * 
 * if the component has @Input()model and @Output()modelChange, it would automatically use the 'model-value-accessor',
 * if not, it would try to use the 'input-value-accessor' which would try to find the 'input' element in the DOM tree.
 */
@Directive({
  selector: '[formControlName]:not(input):not(select):not(textarea):not([modelBinding]):not([inputBinding]):not([outputBinding]):not([inputAccessor]), [formControl]:not(input):not(select):not(textarea):not([modelBinding]):not([inputBinding]):not([outputBinding]):not([inputAccessor])',
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => DefaultValueAccessor),
    multi: true
  }],
})
export class DefaultValueAccessor implements ControlValueAccessor, OnDestroy, AfterViewInit {
  private _valueAccessor: ControlValueAccessor;

  constructor(
    renderer: Renderer2,
    elementRef: ElementRef,
    changeDetector: ChangeDetectorRef,
    viewRef: ViewContainerRef,
    @Attribute('valuePath') valuePath: string,
    @Attribute('inValuePath') inValuePath: string,
    @Attribute('outValuePath') outValuePath: string) {
    try {
      this._valueAccessor = new ModelValueAccessor(elementRef, viewRef, 'model', undefined, undefined, valuePath,inValuePath,outValuePath);
    } catch {
      this._valueAccessor = new InputValueAccessor(renderer, elementRef, changeDetector, valuePath,inValuePath,outValuePath);
    }
  }

  ngAfterViewInit(): void {
    (this._valueAccessor as any).ngAfterViewInit?.();
  }

  ngOnDestroy(): void {
    (this._valueAccessor as any).ngOnDestroy?.();
  }

  writeValue(obj: any): void {
    this._valueAccessor.writeValue(obj);
  }

  registerOnChange(fn: any): void {
    this._valueAccessor.registerOnChange(fn);
  }

  registerOnTouched(fn: any): void {
    this._valueAccessor.registerOnTouched(fn);
  }

  setDisabledState?(isDisabled: boolean): void {
    this._valueAccessor.setDisabledState(isDisabled);
  }
}