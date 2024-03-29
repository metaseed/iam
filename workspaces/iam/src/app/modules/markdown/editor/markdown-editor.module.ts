import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MarkdownEditorService } from './services/markdown-editor.service';
import { MarkdownEditorRoutingModule } from './markdown-editor-routing.module';
import { FormsModule } from '@angular/forms';
import { SpinnerModule } from '@metaseed/spinner';
import { MaterialModule } from '../../material/material.module';
import { CodemirrorComponent } from './codemirror-editor/codemirror-component/codemirror.component';
import { EditorSaveService } from './services/editor-save-service';
import { CanDeactivateGuard } from '../../core/services/can-deactive-guard.service';
import { SharedModule } from 'shared';
import { KeyMapService } from './services/keymap.service';
import { FileUploadComponent } from './codemirror-editor/file-upload/file-upload.component';
import { EditorToolbarModule } from './editor-toolbar/editor-toolbar.module';
import { CodeMirrorValueAccessor } from './codemirror-editor/codemirror-component/codemirror.value-accessor';
import { MarkdownEditorComponent } from './markdown-editor-component/markdown-editor.component';

@NgModule({
    declarations: [
        CodemirrorComponent,
        MarkdownEditorComponent,
        FileUploadComponent,
        CodeMirrorValueAccessor
    ],
    imports: [
        SharedModule,
        CommonModule,
        FormsModule,
        SpinnerModule,
        EditorToolbarModule,
        MarkdownEditorRoutingModule,
        MaterialModule
    ],
    exports: [MarkdownEditorComponent, CodemirrorComponent],
    providers: [
        KeyMapService,
        MarkdownEditorService,
        EditorSaveService,
        CanDeactivateGuard
    ]
})
export class MarkdownEditorModule {
  // when module loaded initial the markdown-editor service to set the currentEditor in the DocEditorService in 'root'
  constructor(private editor: MarkdownEditorService) { }
}
