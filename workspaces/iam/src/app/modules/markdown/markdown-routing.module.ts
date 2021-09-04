import { Route, Routes, RouterModule } from '@angular/router';
import { MarkdownComponent } from './markdown.component';
import { NgModule } from '@angular/core';
import { CanDeactivateGuard } from '../core/services/can-deactive-guard.service';
import { MarkdownEditorComponent } from './editor/markdown-editor.component';

const documentRoutes: Routes = [
  {
    path: '',
    component: MarkdownComponent,
    children: [
      {
        path: '',
        loadChildren: () => import('app/modules/markdown/editor/markdown-editor.module').then(m => m.MarkdownEditorModule)
      }
    ]
  },
  {
    path: 'new',
    component: MarkdownComponent,
    children: [
      {
        path: '',
        loadChildren: () => import('app/modules/markdown/editor/markdown-editor.module').then(m => m.MarkdownEditorModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(documentRoutes)],
  exports: [RouterModule]
})
export class MarkdownRoutingModule {}
