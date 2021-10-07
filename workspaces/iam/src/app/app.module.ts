import { BrowserModule, HammerModule, HAMMER_GESTURE_CONFIG } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HotkeyModule } from '@metaseed/angular-hotkey';
import { CoreModule } from 'core';
import { HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { HomeModule } from 'home';
import { NotFoundComponent } from './not-found/not-found.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { APP_BASE_HREF, PlatformLocation } from '@angular/common';
import { environment } from 'environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { MaterialModule } from './modules/material/material.module';
import { metaReducers, reducers } from './state';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { SharedModule } from 'shared';
import { EffectsModule } from '@ngrx/effects';
import { AppEffects } from './state/app.effects';
import { NetStorageModule } from 'net-storage';
import { DatabaseModule, schema } from 'database';
import { RouteReuseStrategy } from '@angular/router';
import { CustomRouteReuseStrategy } from './routeReuseStrategy';
import { MyHammerConfig } from './hammer.config';
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
    StoreModule.forRoot(reducers, { metaReducers }),
    // Instrumentation must be imported after importing StoreModule (config is optional)
    // attention: after enable, it would trigger 2 times for action effects.
    !environment.production ? StoreDevtoolsModule.instrument({
      maxAge: 25, // Retains last 25 states
      logOnly: environment.production, // Restrict extension to log-only mode
      autoPause: true, // Pauses recording actions and state changes when the extension window is not open
    }):[],
    HotkeyModule.forRoot({
      disableCheatSheet: false,
      cheatSheetHotkey: 'h',
      cheatSheetCloseEsc: true,
      cheatSheetDescription: 'shortcuts'
    }),

    EffectsModule.forRoot([AppEffects])
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
export class AppModule { }
