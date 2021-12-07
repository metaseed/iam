import { Directive, forwardRef } from "@angular/core";
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from "@angular/forms";
import { SubscriptionManager } from "core";
import { CodemirrorComponent } from "./codemirror.component";

@Directive({
  selector: 'ms-codemirror',
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => CodeMirrorValueAccessor),
    multi: true
  }],
})
export class CodeMirrorValueAccessor extends SubscriptionManager implements ControlValueAccessor {
  private codemirror: CodeMirror.EditorFromTextArea;

  constructor(private codeMirrorComponent: CodemirrorComponent) {
    super();

    this.addSub(codeMirrorComponent.afterInit.subscribe(editor => {
      this.codemirror = editor;
      this.codemirror.on("blur", () => {
        this.onTouched();
      });
      this.codemirror.on("change", () => {
        const value = this.codemirror.getValue();
        this.onChange(value);
      });
    }));
  }

  writeValue(value) {
    if(value == null) return;
    this.codeMirrorComponent.writeValue(value)
  }

  registerOnChange(fn) {
    this.onChange = fn;
  }

  registerOnTouched(fn) {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean) {
    this.codeMirrorComponent.host.disabled = true;
  }


  onChange(_) { }
  onTouched() { }
}
