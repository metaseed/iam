import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { SpinnerModule } from '@metaseed/spinner';

@NgModule({
  imports: [BrowserModule, SpinnerModule],
  declarations: [AppComponent],
  bootstrap: [AppComponent]
})
export class AppModule {}
