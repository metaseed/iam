import { InjectionToken, Type } from '@angular/core';
import { LoadChildrenCallback } from '@angular/router';

// Modules containing custom elements must be set up as lazy-loaded routes (loadChildren)
// TODO(andrewjs): This is a hack, Angular should have first-class support for preparing a module
// that contains custom elements.
export const ELEMENT_MODULE_LOAD_CALLBACKS_AS_ROUTES = [
  {
    selector: 'i-toc',
    loadChildren: () => import('./toc/toc.module').then(m => m.TocModule)
  },
  {
    selector: 'i-subpage',
    loadChildren: () => import('./sub-page/subpage.module').then(m => m.SubPageModule)
  },
  {
    selector: 'i-code',
    loadChildren: () => import('./code/code-example.module').then(m => m.CodeExampleModule)
  },
  {
    selector: 'i-tag',
    loadChildren: () => import('./tags/tags.module').then(m => m.TagsModule)
  },
  {
    selector: 'i-version',
    loadChildren: () => import('./version/version.module').then(m => m.VersionModule)
  }
];

/**
 * Interface expected to be implemented by all modules that declare a component that can be used as
 * a custom element.
 */
export interface WithCustomElementComponent {
  customElementComponent: Type<any>;
}

/** Injection token to provide the element path modules. */
export const ELEMENT_MODULE_LOAD_CALLBACKS_TOKEN = new InjectionToken<Map<string, LoadChildrenCallback>>('iam/elements-map');

/** Map of possible custom element selectors to their lazy-loadable module paths. */
export const ELEMENT_MODULE_LOAD_CALLBACKS = new Map<string, LoadChildrenCallback>();
ELEMENT_MODULE_LOAD_CALLBACKS_AS_ROUTES.forEach(route => {
  ELEMENT_MODULE_LOAD_CALLBACKS.set(route.selector, route.loadChildren);
});
