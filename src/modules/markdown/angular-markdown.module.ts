import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { MarkdownEditorComponent } from './components/markdown-editor.component';
import { MarkdownViewerComponent } from './components/markdown-viewer.component';

@NgModule({
  imports: [
    FormsModule
  ],
  declarations: [
    MarkdownEditorComponent,
    MarkdownViewerComponent
  ],
  exports: [
    MarkdownEditorComponent,
    MarkdownViewerComponent
  ],
})
export class AngularMarkdownModule { }
