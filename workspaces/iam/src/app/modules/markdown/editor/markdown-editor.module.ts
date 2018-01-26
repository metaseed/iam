import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MonacoEditorComponent } from './monaco-editor/monaco-editor.component';
import { EditorToolbarComponent } from './editor-toolbar/markdown.editor-toolbar.component';
import { MarkdownEditorService } from './services/markdown.editor.service';
import { MonacoEditorLoaderModule } from './monaco-editor/monaco-editor-loader/monaco-editor-loader.module';
import { MarkdownEditorRoutingModule } from './markdown-editor-routing.module';
import { MarkdownEditorComponent } from './markdown-editor.component';
import { FormsModule } from '@angular/forms';
import { NgSpinKitModule } from 'ng-spin-kit';
import { MaterialModule } from 'app/modules/material/material.module';
import { CodemirrorComponent } from './codemirror-editor/codemirror.component';

@NgModule({
    declarations: [
        EditorToolbarComponent,
        CodemirrorComponent,
        MonacoEditorComponent,
        MarkdownEditorComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        NgSpinKitModule,
        MonacoEditorLoaderModule,
        MarkdownEditorRoutingModule,
        MaterialModule
    ],
    exports: [
        EditorToolbarComponent,
        MonacoEditorComponent,
        MarkdownEditorComponent,
        CodemirrorComponent,
        MonacoEditorLoaderModule
    ],
    providers: [
        MarkdownEditorService
    ]
})
export class MarkdownEditorModule { }