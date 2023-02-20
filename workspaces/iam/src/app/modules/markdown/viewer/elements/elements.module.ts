import { NgModule } from '@angular/core';
import { ROUTES } from '@angular/router';
import { ElementsLoader } from './elements-loader';
import {
  ELEMENT_MODULE_LOAD_CALLBACKS,
  ELEMENT_MODULE_LOAD_CALLBACKS_AS_ROUTES,
  ELEMENT_MODULE_LOAD_CALLBACKS_TOKEN
} from './element-registry';
import { LazyCustomElementComponent } from './lazy-custom-element.component';

@NgModule({
  exports: [LazyCustomElementComponent],
  declarations: [LazyCustomElementComponent],
  providers: [
    ElementsLoader,
    { provide: ELEMENT_MODULE_LOAD_CALLBACKS_TOKEN, useValue: ELEMENT_MODULE_LOAD_CALLBACKS },

    // Providing these routes as a signal to the build system that these modules should be
    // registered as lazy-loadable.
    // TODO(andrewjs): Provide first-class support for providing this.
    // NOTE: update from 13 to 14 need to remove this;
    //{ provide: ROUTES, useValue: ELEMENT_MODULE_LOAD_CALLBACKS_AS_ROUTES, multi: true }
  ]
})
export class ElementsModule {}
