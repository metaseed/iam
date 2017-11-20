import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MonacoEditorComponent } from './monaco-editor/monaco-editor.component';
import { EditorToolbarComponent } from './editor-toolbar/markdown.editor-toolbar.component';
import { MarkdownEditorService } from './services/markdown.editor.service';
import { MonacoEditorLoaderModule } from './monaco-editor/monaco-editor-loader/monaco-editor-loader.module';

@NgModule({
    declarations: [
        EditorToolbarComponent,
        MonacoEditorComponent
    ],
    imports: [
        CommonModule,
        MonacoEditorLoaderModule
    ],
    exports: [
        EditorToolbarComponent,
        MonacoEditorComponent,
        MonacoEditorLoaderModule
    ],
    providers: [
        MarkdownEditorService
    ],
})
export class MarkdownEditorModule { }