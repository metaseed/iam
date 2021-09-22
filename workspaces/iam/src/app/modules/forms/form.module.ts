import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ValidationErrorTooltip } from './directives/validation-error-tooltip';
import { DefaultValueAccessor, InputValueAccessor, ModelValueAccessor } from './accessors';

const directives = [
  DefaultValueAccessor,
  ModelValueAccessor,
  InputValueAccessor,
  ValidationErrorTooltip,
];

@NgModule({
  imports: [
    CommonModule,
    MatTooltipModule,
  ],
  declarations: directives,
  exports: directives,
})
export class FormModule {
}
