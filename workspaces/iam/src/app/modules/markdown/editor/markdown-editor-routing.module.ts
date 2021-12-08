import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CanDeactivateGuard } from 'core';
import { MarkdownEditorComponent } from './markdown-editor-component/markdown-editor.component';

const markdownEditorRoutes: Routes = [
  {
    path: '',
    canDeactivate: [CanDeactivateGuard],
    component: MarkdownEditorComponent
  },
  {
    path: 'new',
    canDeactivate: [CanDeactivateGuard],
    component: MarkdownEditorComponent
  },
];
@NgModule({
  imports: [RouterModule.forChild(markdownEditorRoutes)],
  exports: [RouterModule]
})
export class MarkdownEditorRoutingModule {}
