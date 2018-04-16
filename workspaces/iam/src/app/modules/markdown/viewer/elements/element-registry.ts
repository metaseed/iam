import { InjectionToken, Type } from "@angular/core";

// Modules containing custom elements must be set up as lazy-loaded routes (loadChildren)
// TODO(andrewjs): This is a hack, Angular should have first-class support for preparing a module
// that contains custom elements.
export const ELEMENT_MODULE_PATHS_AS_ROUTES = [
  {
    selector: "i-toc",
    loadChildren: "./toc/toc.module#TocModule"
  },
  {
    selector: "i-code",
    loadChildren: "./code/code-example.module#CodeExampleModule"
  }
];

export interface WithCustomElementComponent {
  customElementComponent: Type<any>;
}

export const ELEMENT_MODULE_PATHS_TOKEN = new InjectionToken(
  "iam/elements-map"
);

export const ELEMENT_MODULE_PATHS = new Map<string, string>();
ELEMENT_MODULE_PATHS_AS_ROUTES.forEach(route => {
  ELEMENT_MODULE_PATHS.set(route.selector, route.loadChildren);
});
