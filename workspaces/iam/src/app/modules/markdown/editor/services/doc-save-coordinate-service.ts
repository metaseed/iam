import { Injectable } from "@angular/core";
import { Document } from "../../../docs/models/document";
import { MarkdownEditorService } from "./markdown.editor.service";
import { DocService } from "docs";

@Injectable()
export class DocSaveCoordinateService {
  isDirty: boolean;
  editor: CodeMirror.Editor;

  constructor(
    private editorService: MarkdownEditorService,
    private docService: DocService
  ) {
    this.editorService.editorLoaded$.subscribe((editor: CodeMirror.Editor) => {
      this.editor = editor;

      this.editorService.contentChanged$.subscribe(e => {
        this.checkDirty(editor);
      });
    });

    this.editorService.docLoaded$.subscribe((editor: CodeMirror.Editor) => {
      this.docLoadedHandler(editor);
    });

    this.docService.docSaved$.subscribe((doc: Document) => {
      this.docSavedHandler(this.editor);
    });
  }

  private docLoadedHandler(editor: CodeMirror.Editor) {
    this.docService.model.currentDoc.contentGeneration = editor
      .getDoc()
      .changeGeneration();
  }

  private docSavedHandler(editor: CodeMirror.Editor) {
    if (editor) {
      this.docService.model.currentDoc.contentGeneration = editor
        .getDoc()
        .changeGeneration();
    }
  }

  private checkDirty(editor) {
    this.isDirty = !editor
      .getDoc()
      .isClean(this.docService.model.currentDoc.contentGeneration);
  }
}
