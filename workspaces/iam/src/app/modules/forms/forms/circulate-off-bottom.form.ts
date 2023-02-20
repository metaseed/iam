import { Injectable } from "@angular/core";
import { UntypedFormControl, Validators } from "@angular/forms";
import { ResettableFormGroup } from "../models";
import { validatorValueMap } from "../utils";
@Injectable()
export class CirculateOffBottomForm extends ResettableFormGroup {
  constructor(){
    super({
      CirculateOffBottomRPM: new UntypedFormControl(null, validatorValueMap('Quantity',Validators.min(0), Validators.required)),
      CirculateOffBottomFlowRate: new UntypedFormControl(null, validatorValueMap('Quantity',Validators.min(0), Validators.required)),
      CirculateOffBottomFlowRampRate: new UntypedFormControl(null, validatorValueMap('Quantity',Validators.min(0), Validators.required)),
      CirculateOffBottomUseDrillingRPM: new UntypedFormControl(),
      CirculateOffBottomUseDrillingFlowRate: new UntypedFormControl(),
    });
  }
}

/* example
<sdo-operations-container [formGroup]="form">

  <div class="operations-form-row">
    <sdo-automation-labeled-checkbox text="Use Drilling RPM"
      [invertTheme]="true"
      formControlName="CirculateOffBottomUseDrillingRPM"
    ></sdo-automation-labeled-checkbox>
    <sdo-automation-action-bar-measurement-input *ngIf="!form.value.CirculateOffBottomUseDrillingRPM"
      text="RPM"
      [unit]="form.value.CirculateOffBottomRPM.Unit"
      valuePath="Quantity"
      formControlName="CirculateOffBottomRPM"
    ></sdo-automation-action-bar-measurement-input>
  </div>
...

@Component({
  selector: 'sdo-circulate-off-bottom',
  templateUrl: './circulate-off-bottom.component.html',
  styleUrls: ['./circulate-off-bottom.component.scss'],
  providers: [StartedSegmentPipe, CirculateOffBottomForm],
})
export class CirculateOffBottomComponent extends OperationBaseComponent<CirculateOffBottomForm> {

  constructor(private opsContext: OpsContextService, public form: CirculateOffBottomForm) {
    super();
  }

  public applyChanges() {
    const value = this.form.value;
    this.opsContext.updateCirculteOffBottomProcedure({
      ...this.updateDetails(),
      CirculateOffBottomProcedure: value, //this.model.getFormData<CirculateOffBottomProcedure>(),
    });
    this.form.reset(value)
  }

}
*/