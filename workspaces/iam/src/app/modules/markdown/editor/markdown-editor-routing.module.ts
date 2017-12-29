import { Routes, RouterModule } from '@angular/router';
import { MarkdownEditorComponent } from './markdown-editor.component';
import { NgModule } from '@angular/core';

const markdownEditorRoutes: Routes = [
    {
        path: '',
        component: MarkdownEditorComponent
    }
]
@NgModule({
    imports: [
        RouterModule.forChild(markdownEditorRoutes)
    ],
    exports: [
        RouterModule
    ]
})
export class MarkdownEditorRoutingModule { }