import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MarkdownModule } from './modules';
import { HotkeyModule } from 'angular-hotkey-module';
import { CoreModule } from './modules/core/core.module';
@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    MarkdownModule.forRoot(),
    CoreModule,
    HotkeyModule.forRoot({
      disableCheatSheet: false,
      cheatSheetHotkey: 'h',
      cheatSheetCloseEsc: true,
      cheatSheetDescription: 'shortcuts'
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {

}
