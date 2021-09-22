import { FormGroup } from "@angular/forms";


export class ResettableFormGroup extends FormGroup  {
  private appliedData: any;

  update(update: object): void {
    // only used to init data after show the form.
    if (!this.appliedData) {
      this.appliedData = update
      this.reset(this.appliedData);
    }
  }
  reset(value?: any, options?: { onlySelf?: boolean; emitEvent?: boolean; }) {
    this.appliedData = value;
    super.reset(value);
  }
}
