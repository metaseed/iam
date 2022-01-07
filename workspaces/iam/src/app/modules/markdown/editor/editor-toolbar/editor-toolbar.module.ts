import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'material';
import { CodemirrorToolbarComponent } from '../codemirror-editor/codemirror-toolbar/codemirror-toolbar.component';
import { ChangeNoteInputComponent } from './change-note-input.component';
import { EditorToolbarComponent } from './markdown.editor-toolbar.component';

@NgModule({
  imports: [CommonModule,MaterialModule,ReactiveFormsModule, FormsModule],
  exports: [EditorToolbarComponent],
  declarations: [EditorToolbarComponent, ChangeNoteInputComponent, CodemirrorToolbarComponent],
  providers: [],
})
export class EditorToolbarModule { }
