import { Attribute, ChangeDetectorRef, Directive, ElementRef, forwardRef, Input, Renderer2 } from "@angular/core";
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from "@angular/forms";
import { InputValueAccessorBase } from "./input-value-accessor-base";
import { getValueByPath, setValueByPath } from "../utils/validator-value-map";

/**
 * ValueAccessor directive for component that has an 'input' element inside it's DOM tree
 * this directive handle the input of type: number, checkbox, range
 * 
 * Note: option type and the select type input element are not support for now
 * Note: default reactive form value-accessor could only applied to the 'input' element.
 * 
 * |------------------Component---------------------|
 * |--input element------------|                    |  |---obj={a:{b:'cde'}} in FormControl---|
 * |  modify element property<-|<--inputMap('cde')--|<-|<--inValuePath to get the 'cde'       |
 * |  change or input event--->|--outputMap(v)->|-->|->|-->outValuePath to set the value      |
 * |---------------------------|                    |  |--------------------------------------|
 * |------------------------------------------------|
 * 
 * here: inValuePath=outValuePath=valuePath='a.b'
 * 
 * @param _valuePath property path to get/set the value from the object in FormControl. the value is a string separated by '.', i.e. 'a.b.c'
 * @param _inValuePath attribute to config the property path to get the value from the object in the FormControl, if not set explicitly, it use the value form _valuePath.
 * @param _outValuePath attribute to config the property path to set the value from the object in the FormControl, if not set explicitly, it use the value form _valuePath.
 */
@Directive({
  selector: '[inputAccessor]',
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => InputValueAccessor),
    multi: true
  }],
})
export class InputValueAccessor extends InputValueAccessorBase implements ControlValueAccessor {

  constructor(
    _renderer: Renderer2,
    _elementRef: ElementRef,
    private _changeDetector: ChangeDetectorRef,
    @Attribute('valuePath') private _valuePath: string,
    @Attribute('inValuePath') private _inValuePath: string,
    @Attribute('outValuePath') private _outValuePath: string
  ) {
    super(_renderer, _elementRef);
    this._inValuePath ||= this._valuePath;
    this._outValuePath ||= this._valuePath;
  }


  @Input() inputMap: (v) => any
  @Input() outputMap: (v) => any

  writeValue(data: any): void {
    super.writeValue(data);
    // at the time of ngInit, the _input is not available,
    // so we wait until ngAfterViewInit and rewrite the value at the base class
    if (!this._input) {
      return;
    }
    if (this._inValuePath) data = getValueByPath(data, this._inValuePath);

    if (this.inputMap) {
      data = this.inputMap.call(this._input, data);
    }

    if (this._input.type === 'number') {
      this._renderer.setProperty(this._input, 'value', data);
    } else if (this._input.type === 'checkbox') {
      this._renderer.setProperty(this._input, 'checked', data);
    }
    else {
      this._renderer.setProperty(this._input, 'value', data);
    }
  }

  protected setupViewToModelUpdate() {
    const change = e => {
      const value = this._getDataFromViewChange(e);
      this._onChange(value);
      // do change detect at next round to bubble up the UI update.
      this._changeDetector.markForCheck();
    };

    if (this._input.type === 'checkbox')
      this._input.addEventListener('change', change);
    else if (this._input.type === 'range') {
      this._input.addEventListener('change', change);
      this._input.addEventListener('input', change);
    }
    else {
      this._input.addEventListener('input', change);
    }
  }

  private _getDataFromViewChange(e: Event) {
    let value: any = this._input.value;
    if (this._input.type === 'checkbox')
      value = this._input.checked;

    if (this.outputMap) {
      value = this.outputMap.call(this._input, value);
    }

    if (!this._outValuePath) return value;

    let data = { ...this._data };
    setValueByPath(data, this._outValuePath, value);
    return data;
  }
}