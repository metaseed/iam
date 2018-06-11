//import './polyfills';
import { enableProdMode } from "@angular/core";
import { platformBrowserDynamic } from "@angular/platform-browser-dynamic";
import 'hammerjs';

import { AppModule } from "./app/app.module";
import { environment } from "./environments/environment";

import { hmrBootstrap } from "./hmr";

if (environment.production) {
  enableProdMode();
}

const bootstrap = platformBrowserDynamic().bootstrapModule(AppModule);
// .then(() => {
//   // if ('serviceWorker' in navigator) {
//   //   navigator.serviceWorker.register('/ngsw-worker.js');
//   // }
// })
// .catch(err => console.log(err));

if (environment.hmr) {
  if (module["hot"]) {
    hmrBootstrap(module, bootstrap);
  } else {
    console.error("HMR is not enabled for webpack-dev-server!");
    console.log("Are you using the --hmr flag for ng serve?");
  }
}
