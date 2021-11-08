import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditorToolbarComponent } from './editor-toolbar/markdown.editor-toolbar.component';
import { MarkdownEditorService } from './services/markdown-editor.service';
import { MarkdownEditorRoutingModule } from './markdown-editor-routing.module';
import { MarkdownEditorComponent } from './markdown-editor.component';
import { FormsModule } from '@angular/forms';
import { SpinnerModule } from '@metaseed/spinner';
import { MaterialModule } from '../../material/material.module';
import { CodemirrorComponent } from './codemirror-editor/codemirror-component/codemirror.component';
import { CodemirrorToolbarComponent } from './codemirror-editor/codemirror-toolbar/codemirror-toolbar.component';
import { DocSaveCoordinateService } from './services/doc-save-coordinate-service';
import { CanDeactivateGuard } from '../../core/services/can-deactive-guard.service';
import { DocDirtyNotifyDialog } from './doc-dirty-notify-dialog';
import { SharedModule } from 'shared';
import { KeyMapService } from './services/keymap.service';
import { FileUploadComponent } from './codemirror-editor/file-upload/file-upload.component';

@NgModule({
  declarations: [
    EditorToolbarComponent,
    CodemirrorComponent,
    MarkdownEditorComponent,
    CodemirrorToolbarComponent,
    DocDirtyNotifyDialog,
    FileUploadComponent
  ],
  imports: [
    SharedModule,
    CommonModule,
    FormsModule,
    SpinnerModule,
    MarkdownEditorRoutingModule,
    MaterialModule
  ],
  exports: [EditorToolbarComponent, MarkdownEditorComponent, CodemirrorComponent],
  providers: [
    KeyMapService,
    MarkdownEditorService,
    DocSaveCoordinateService,
    CanDeactivateGuard
  ],
  entryComponents: [DocDirtyNotifyDialog]
})
export class MarkdownEditorModule {
  // when module loaded initial the markdown-editor service to set the currentEditor in the DocEditorService in 'root'
  constructor(private editor: MarkdownEditorService) { }
}
