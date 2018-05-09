import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditorToolbarComponent } from './editor-toolbar/markdown.editor-toolbar.component';
import { MarkdownEditorService } from './services/markdown.editor.service';
// import { MonacoEditorLoaderModule } from "./monaco-editor/monaco-editor-loader/monaco-editor-loader.module";
import { MarkdownEditorRoutingModule } from './markdown-editor-routing.module';
import { MarkdownEditorComponent } from './markdown-editor.component';
import { FormsModule } from '@angular/forms';
import { NgSpinKitModule } from 'ng-spin-kit';
import { MaterialModule } from 'app/modules/material/material.module';
import { CodemirrorComponent } from './codemirror-editor/codemirror.component';
import { CodemirrorToolbarComponent } from './codemirror-editor/codemirror-toolbar/codemirror-toolbar.component';
import { DocSaveCoordinateService } from './services/doc-save-coordinate-service';
import { CanDeactivateGuard } from './services/can-deactive-guard.service';
import { DocDirtyNotifyDialog } from './doc-dirty-notify-dialog';

@NgModule({
  declarations: [
    EditorToolbarComponent,
    CodemirrorComponent,
    MarkdownEditorComponent,
    CodemirrorToolbarComponent,
    DocDirtyNotifyDialog
  ],
  imports: [
    CommonModule,
    FormsModule,
    NgSpinKitModule,
    // MonacoEditorLoaderModule,
    MarkdownEditorRoutingModule,
    MaterialModule
  ],
  exports: [
    EditorToolbarComponent,
    // MonacoEditorComponent,
    MarkdownEditorComponent,
    CodemirrorComponent
    // MonacoEditorLoaderModule
  ],
  providers: [MarkdownEditorService, DocSaveCoordinateService, CanDeactivateGuard],
  entryComponents: [DocDirtyNotifyDialog]
})
export class MarkdownEditorModule {}
