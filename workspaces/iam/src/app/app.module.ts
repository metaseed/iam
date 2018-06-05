import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { AppComponent } from "./app.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HotkeyModule } from "@metaseed/angular-hotkey";
import { CoreModule } from "core";
import { HttpClientModule } from "@angular/common/http";
import { StoreModule } from "@ngrx/store";
import { DocsModule } from "docs";
import { NotFoundComponent } from "./not-found/not-found.component";
import { ServiceWorkerModule } from "@angular/service-worker";
import { APP_BASE_HREF, PlatformLocation } from "@angular/common";
import { environment } from "../environments/environment";
import { AppRoutingModule } from "./app-routing.module";
import { MaterialModule } from "./modules/material/material.module";
import { metaReducers, reducers } from "./state";
import { StoreDevtoolsModule } from "@ngrx/store-devtools";
import { SharedModule } from "shared";
import { EffectsModule } from '@ngrx/effects';
import { AppEffects } from './app.effects';
import { StorageModule } from "./storage/storage.module";
import { DBModule } from "./modules/db/database";
import { schema } from "./modules/db/schema";
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
    StorageModule,
    CoreModule,
    DocsModule,
    SharedModule,
    DBModule.provideDB(schema),
    MaterialModule,
    ServiceWorkerModule.register(`./ngsw-worker.js`, {
      enabled: environment.production
    }),
    StoreModule.forRoot(reducers, { metaReducers }),
    HotkeyModule.forRoot({
      disableCheatSheet: false,
      cheatSheetHotkey: "h",
      cheatSheetCloseEsc: true,
      cheatSheetDescription: "shortcuts"
    }),

    // !environment.production ? StoreDevtoolsModule.instrument() : [],

    EffectsModule.forRoot([AppEffects])
  ],
  providers: [
    {
      provide: APP_BASE_HREF,
      useFactory: getBaseHref,
      deps: [PlatformLocation]
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
