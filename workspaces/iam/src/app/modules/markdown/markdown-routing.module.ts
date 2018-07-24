import { Route, Routes, RouterModule } from '@angular/router';
import { MarkdownComponent } from './markdown.component';
import { NgModule } from '@angular/core';
import { CanDeactivateGuard } from './editor/services/can-deactive-guard.service';
import { MarkdownEditorComponent } from './editor/markdown-editor.component';

const documentRoutes: Routes = [
  {
    path: 'new',
    component: MarkdownComponent,
    canDeactivate: [CanDeactivateGuard]
  },
  {
    path: '',
    component: MarkdownComponent,
    canDeactivate: [CanDeactivateGuard],
    children: [
      {
        path: '',
        component: MarkdownEditorComponent
        // loadChildren: './editor/markdown-editor.module#MarkdownEditorModule'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(documentRoutes)],
  exports: [RouterModule]
})
export class MarkdownRoutingModule {}
