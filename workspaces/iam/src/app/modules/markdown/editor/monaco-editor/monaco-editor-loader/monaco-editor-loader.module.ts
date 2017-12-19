import { NgModule, NgZone, Inject } from '@angular/core';
import { MonacoEditorLoaderService } from './monaco-editor-loader.service';
import { MonacoEditorLoaderDirective } from './monaco-editor-loader.directive';
import { APP_BASE_HREF } from '@angular/common';

// export const factory = (ngZone: NgZone, baseHref) => {
//   return new MonacoEditorLoaderService(ngZone, baseHref);
// };

@NgModule({
  declarations: [
    MonacoEditorLoaderDirective
  ],
  exports: [MonacoEditorLoaderDirective],
  providers: [
    MonacoEditorLoaderService
    // {
    //   provide: MonacoEditorLoaderService,
    //   deps: [NgZone, APP_BASE_HREF],
    //   useFactory: factory
    // }
  ]
})
export class MonacoEditorLoaderModule { }
