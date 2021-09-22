import { Attribute, Directive, ElementRef, forwardRef, Input, OnDestroy, ViewContainerRef } from "@angular/core";
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from "@angular/forms";
import { Subscription } from "rxjs";
import { getComponent, getDirectiveMetadata } from "../utils/discover";
import { getValueByPath, setValueByPath } from "../utils/validator-value-map";

@Directive({
  selector: '[modelBinding],[inputBinding],[outputBinding]',
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => ModelValueAccessor),
    multi: true
  }],
})
export class ModelValueAccessor implements ControlValueAccessor, OnDestroy {
  private _modelComponent: any;
  private _onChange = (_) => { };
  private _onTouched = () => { };
  private _subscription: Subscription;
  private _data: any;

  /**
   * reactive form value-accessor for user component that have Input() and Output() decorated property-pair.
   * the Input() decorated property used to set the value to the component from the FormControl,
   * the Output() decorated property used to notify and set the new value to the FormControl
   * 
   * Note: default reactive form value-accessor could only applied to the 'input' element.
   * 
   * |------------------Component---------------------|
   * |--SubComponent in view-----|                    |  |---obj={a:{b:'cde'}} in FormControl---|
   * |  @Input() model<----------|<--inputMap('cde')--|<-|<--inValuePath to get the 'cde'       |
   * |  @Output()modelChange(v)->|--outputMap(v)->|-->|->|-->outValuePath to set the value      |
   * |---------------------------|                    |  |--------------------------------------|
   * |------------------------------------------------|
   * 
   * here: inValuePath=outValuePath=valuePath='a.b'; inputBinding='model';outputBinding='modelChange'
   * 
   * @param _modelBinding attribute to config the Input() Output() pair, default is 'model', so the Input() decorated property is 'model', 
   * and real Output() decorated property is 'modelChange'. we could set the value explicitly if it's not 'model'.
   * i.e. modelBinding="value", would generate _inputBinding as 'value', and _outputBinding as 'valueChange', if the _inputBinding or _outBinding is not set explicitly.
   * @param _inputBinding if the user component Input() property is not 'model', set this attribute explicitly here.
   * @param _outputBinding if the user component Output() property is not 'modelChange', set this attribute here explicitly.
   * @param _valuePath property path to get/set the value from the object in FormControl. the path is a string separated by '.', i.e. 'a.b.c'
   * @param _inValuePath attribute to config the property path to get the value from the object in the FormControl, if not set explicitly, it use the value form _valuePath.
   * @param _outValuePath attribute to config the property path to set the value from the object in the FormControl, if not set explicitly, it use the value form _valuePath.
   */
  constructor(
    private _elementRef: ElementRef,
    viewRef: ViewContainerRef,
    @Attribute('modelBinding') private _modelBinding,
    @Attribute('inputBinding') private _inputBinding: string,
    @Attribute('outputBinding') private _outputBinding: string,
    @Attribute('valuePath') private _valuePath: string,
    @Attribute('inValuePath') private _inValuePath: string,
    @Attribute('outValuePath') private _outValuePath: string
  ) {
    this._modelBinding ||= 'model';
    this._inputBinding ||= this._modelBinding;
    this._outputBinding ||= this._modelBinding + 'Change';
    this._inValuePath ||= this._valuePath;
    this._outValuePath ||= this._valuePath;

    this._modelComponent = getComponent(viewRef);
    const meta = getDirectiveMetadata(this._modelComponent);
    if (!meta.inputs[this._inputBinding] ||
      !meta.outputs[this._outputBinding])
      throw `could not apply ModelValueAccessor to element: ${_elementRef.nativeElement.tagName.toLowerCase()},
       no @Input()'${this._inputBinding}'or @Output()'${this._outputBinding}' defined.`

    this._subscription = this._modelComponent[this._outputBinding]
      .subscribe(value => {
        if (this.outputMap) {
          value = this.outputMap.call(this._modelComponent, value);
        }

        if (!this._outValuePath) {
          this._onChange(value);
          return;
        }

        let data = { ...this._data };
        setValueByPath(data, this._outValuePath, value);
        this._onChange(data);
      });

    this._elementRef.nativeElement.addEventListener('blur', _ => this._onTouched(), { capture: true, passive: true }); // must have capture, otherwise cannot trigger.
  }

  @Input() inputMap: (v) => any
  @Input() outputMap: (v) => any

  ngOnDestroy(): void {
    this._subscription.unsubscribe();
  }

  writeValue(obj: any): void {
    this._data = obj;
    let value = getValueByPath(obj, this._inValuePath);

    if (this.inputMap) {
      value = this.inputMap.call(this._modelComponent, value);
    }
    this._modelComponent[this._inputBinding] = value;
  }

  registerOnChange(fn: any): void {
    this._onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this._onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    if (this._modelComponent.hasOwnProperty('disabled')) {
      this._modelComponent.disabled = isDisabled;
      return;
    }
    this._elementRef.nativeElement.querySelectorAll('*').forEach(e => e.disabled = isDisabled)
  }

}