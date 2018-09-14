import { Routes, RouterModule } from '@angular/router';
import { MarkdownEditorComponent } from './markdown-editor.component';
import { NgModule } from '@angular/core';
import { CanDeactivateGuard } from 'core';

const markdownEditorRoutes: Routes = [
  {
    path: '',
    canDeactivate: [CanDeactivateGuard],
    component: MarkdownEditorComponent
  }
];
@NgModule({
  imports: [RouterModule.forChild(markdownEditorRoutes)],
  exports: [RouterModule]
})
export class MarkdownEditorRoutingModule {}
