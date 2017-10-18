import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';

import { MarkdownItModule, MarkdownItConfig } from '../components';
import { MarkdownComponent } from './markdown';
@NgModule({
  declarations: [
    AppComponent,
    MarkdownComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MarkdownItModule.forRoot({
      html: true,
      linkify: true,
      breaks: true,
      typographer: true,
      containers: [
        // define your containers here.
        {
          name: 'note',
          showHeading: true,
          class: 'note'
        },
        {
          name: 'warning'
        }
      ]
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {

}
