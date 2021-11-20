import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { CodemirrorToolbarComponent } from '../codemirror-editor/codemirror-toolbar/codemirror-toolbar.component';
import { ChangeNoteInputComponent } from './change-note-input.component';
import { EditorToolbarComponent } from './markdown.editor-toolbar.component';


@NgModule({
  imports: [CommonModule,MatBottomSheetModule,MatToolbarModule,MatIconModule, MatFormFieldModule, MatInputModule, MatButtonModule,MatMenuModule,ReactiveFormsModule, FormsModule],
  exports: [EditorToolbarComponent],
  declarations: [EditorToolbarComponent, ChangeNoteInputComponent, CodemirrorToolbarComponent],
  providers: [],
})
export class EditorToolbarModule { }
