import { BrowserModule, HammerModule, HAMMER_GESTURE_CONFIG } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { HotkeyModule } from '@metaseed/angular-hotkey';
import { CoreModule, screenConsoleLog } from 'core';
import { HttpClientModule } from '@angular/common/http';
import { HomeModule } from 'home';
import { NotFoundComponent } from './not-found/not-found.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { APP_BASE_HREF, PlatformLocation } from '@angular/common';
import { environment } from 'environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { MaterialModule } from './modules/material/material.module';
import { SharedModule } from 'shared';
import { NetStorageModule } from 'net-storage';
import { DatabaseModule } from 'database';
import { RouteReuseStrategy } from '@angular/router';
import { CustomRouteReuseStrategy } from './routeReuseStrategy';
import { MyHammerConfig } from './hammer.config';
import { enableProdMode } from 'packages/rx-store/src/core/dev-mode-checking';
/**
 * This function is used internal to get a string instance of the `<base href="" />` value from `index.html`.
 * This is an exported function, instead of a private function or inline lambda, to prevent this error:
 *
 * `Error encountered resolving symbol values statically.`
 * `Function calls are not supported.`
 * `Consider replacing the function or lambda with a reference to an exported function.`
 *
 * @param platformLocation an Angular service used to interact with a browser's URL
 * @return a string instance of the `<base href="" />` value from `index.html`
 */
export function getBaseHref(platformLocation: PlatformLocation): string {
  return platformLocation.getBaseHrefFromDOM();
}
@NgModule({
  declarations: [NotFoundComponent, AppComponent],
  imports: [
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    NetStorageModule,
    CoreModule,
    HomeModule,
    SharedModule.forRoot(),
    DatabaseModule,
    MaterialModule,
    HammerModule,
    ServiceWorkerModule.register(`./ngsw-worker.js`, {
      enabled: environment.production
    }),
    HotkeyModule.forRoot({
      disableCheatSheet: false,
      cheatSheetHotkey: 'h',
      cheatSheetCloseEsc: true,
      cheatSheetDescription: 'shortcuts'
    }),

  ],
  providers: [
    {
      provide: HAMMER_GESTURE_CONFIG,
      useClass: MyHammerConfig
    },
    {
      provide: APP_BASE_HREF,
      useFactory: getBaseHref,
      deps: [PlatformLocation]
    },
    { provide: RouteReuseStrategy, useClass: CustomRouteReuseStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(){
    if(environment.production){
      enableProdMode();
      screenConsoleLog()
    }
  }
}
