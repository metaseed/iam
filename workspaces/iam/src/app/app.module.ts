import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { AppComponent } from "./app.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MarkdownModule } from "./modules";
import { HotkeyModule } from "angular-hotkey-module";
import { CoreModule } from "./modules/core/core.module";
import { HttpClientModule } from "@angular/common/http";
import { StoreModule } from "@ngrx/store";
import { DocsModule } from "docs";
import { NotFoundComponent } from "./not-found/not-found.component";
import { ServiceWorkerModule } from "@angular/service-worker";
import { APP_BASE_HREF, PlatformLocation } from "@angular/common";
import { environment } from "../environments/environment";
import { AppRoutingModule } from "./app-routing.module";
import { MaterialModule } from "./modules/material/material.module";
import { metaReducers, reducers } from "app/reducers";
import { StoreDevtoolsModule } from "@ngrx/store-devtools";
import { MsCommonModule } from "common";
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
    CoreModule,
    DocsModule,
    MsCommonModule,
    MaterialModule,

    ServiceWorkerModule.register(`./ngsw-worker.js`, {
      enabled: environment.production
    }),
    // StoreModule.forRoot({ a: 'b' });
    StoreModule.forRoot(reducers, { metaReducers }),
    HotkeyModule.forRoot({
      disableCheatSheet: false,
      cheatSheetHotkey: "h",
      cheatSheetCloseEsc: true,
      cheatSheetDescription: "shortcuts"
    }),
    StoreDevtoolsModule
      .instrument
      //   {
      //   name: 'NgRx Iam DevTools',
      //   logOnly: environment.production
      // }
      ()
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
