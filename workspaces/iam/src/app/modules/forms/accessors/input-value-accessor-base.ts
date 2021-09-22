import { AfterViewInit, Directive, ElementRef, Renderer2 } from "@angular/core";
import { ControlValueAccessor } from "@angular/forms";

/**
 * value accessor for component with an 'input' element in the DOM tree
 */
@Directive()
export abstract class InputValueAccessorBase implements AfterViewInit, ControlValueAccessor {
    protected _input: HTMLInputElement;
    protected _data: any;

    protected _onChange = (_: any) => { }
    private _onTouched = () => { }

    constructor(protected _renderer: Renderer2, protected _elementRef: ElementRef) { }

    ngAfterViewInit(): void {
        this._input = (this._elementRef.nativeElement as HTMLElement).querySelector('input');
        if (!this._input) {
            console.error(`InputValueAccessorBase: could not find 'input' element inside the '${this._elementRef.nativeElement.tagName.toLowerCase()}' element`);
            return;
        }
        this._input.addEventListener('blur', _ => this._onTouched());
        this.setupViewToModelUpdate();

        if (this._data) {
            setTimeout(() => this.writeValue(this._data), 0); // delay one loop to override the default value from the model value binding.
        }
    }

    registerOnChange(fn: any): void {
        this._onChange = fn;
    }

    registerOnTouched(fn: any): void {
        this._onTouched = fn;
    }

    setDisabledState?(isDisabled: boolean): void {
        this._renderer.setProperty(this._input, 'disabled', isDisabled);
    }

    writeValue(data: any): void {
        this._data = data;
    }

    protected abstract setupViewToModelUpdate()
}
