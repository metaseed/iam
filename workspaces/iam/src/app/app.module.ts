import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MarkdownModule } from './modules';
import { HotkeyModule } from 'angular-hotkey-module';
import { CoreModule } from './modules/core/core.module';
import { HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { DocsModule } from './docs/docs.module';
import { NotFoundComponent } from './not-found/not-found.component';
@NgModule({
  declarations: [
    NotFoundComponent,
    AppComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    MarkdownModule.forRoot(),
    CoreModule,
    DocsModule,
    // StoreModule.forRoot({ a: 'b' });
    HotkeyModule.forRoot({
      disableCheatSheet: false,
      cheatSheetHotkey: 'h',
      cheatSheetCloseEsc: true,
      cheatSheetDescription: 'shortcuts'
    })
  ],
  providers: [

  ],
  bootstrap: [AppComponent]
})
export class AppModule {

}