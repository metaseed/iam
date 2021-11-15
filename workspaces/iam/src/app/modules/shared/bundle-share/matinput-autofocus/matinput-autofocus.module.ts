import { NgModule } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { AutofocusDirective } from './matinput-autofocus.directive';

@NgModule({
  imports: [MatInputModule],
  exports: [AutofocusDirective],
  declarations: [AutofocusDirective],
  providers: [],
})
export class AutofocusModule { }
