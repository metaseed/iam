## Main task of this user story:
https://dev.azure.com/slb1-swt/Planck/_sprints/backlog/Automation/Planck/Program/Sprint%20Iterations/2021/Q3/Q3.12

 Create a prototype to validate the idea of using the Angular Reactive From, and research the possibility of migration the current used Form model in the project with the Angular Reactive Form
### pull request:
https://dev.azure.com/slb1-swt/Planck/_git/planck/pullrequest/233231
### what is done:

* after researching they could co-exist, and with the created value-accessor, the migration is compatible with current used Form  model.
* the circulate-off-bottom page has been migrated successfully.
* functions added:
    * model-value-accessor
    * input-value-accessor
    * validation error indicator
    * validation error tooltip

> with model-value-accessor, it just requires the custom UI Component has a @Input()/@Output property pair to bind the FormControl to UI.

> with input-value-accessor, it just requires there is a 'input' element in the Dom tree of the component view.

> the default-value-accessor is used to give a convenient way to automatically apply the value accessor if there is an FormControlName or FormControl directive, and it would first try the  model-value-accessor with the default @Input model and @Output modelChange property pair on the host, if not available it will try to find the 'input' element and use the input-value-accessor.

#### below is the UI after migration
![](https://dev.azure.com/slb1-swt/a7e47f75-3058-4e37-85a8-4f7806df1f73/_apis/wit/attachments/7599cb7f-4561-4b6a-981f-1a48de46ee4d?fileName=image.png)
## Benefits of using Angular Reactive Form
* It's reactive, the value from formControl/formGroup is an Observable. We also can get the snapshot of the value via the value property.
* Its validators included, it support async validator too.
* It's state management: disabled, touched, dirty, valid, focus.
* It's state exposed via CSS classes on the component where formControl/formControlName/formGroup applied. so we can customize error indicator via css directly, no extra logic needed.
* It support for submit/reset/patch of form values, and events related to them.
* It's model designed via builder pattern and support DYNAMIC building of form.

* It's standard and maintained by google Angular team, and it's terminology/pattern/logic taken by the technology community.
* Invest to learning it would benefits the future projects that use Angular Form.
* New team members that have background knowledge would get start to work easier. no need to take time to familiar with custom implementation.
* maintained by google vs maintained by team developers.
* It's the foundation of the template driven Angular form, the knowledge facilitates the deep understanding of the template driven form.

## Limitation
* It's value accessor only support the 'input' element where formControl/formGroup/ngModel is applied.

## Status of our implementation in the shared/forms folder
* support submit/reset the form.
* support dirty/valid state
* support sync validation and error indicator on custom control via explicit logic inside.
* we have implemented part of the functionality provided by Angular Form very well, but may need to implement/maintain new functionality if required.
* no directive to mark the ui component, so the CSS of the element can not be modified, we use logic to explicitly modify the css class of the specific element in component, which means we need to implement similar logic when we need to implement another custom component, and also hard to show validation messages directly on control in a common way.

## to show error indicator
```css
.ng-invalid:not([ng-reflect-form]) .input-error {
  border-left: 6px solid var(--sdo-theme-danger-default);
}
.ng-valid.ng-dirty:not([ng-reflect-form]) .input-error {
  border-left: 6px solid var(--sdo-theme-primary-default);
}
.ng-valid.ng-touched:not(.ng-dirty):not([ng-reflect-form]) .input-error {
  border : 1px solid $blue;
}
```
## to reset