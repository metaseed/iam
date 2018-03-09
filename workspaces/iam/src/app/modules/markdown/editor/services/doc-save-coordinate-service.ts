import { Injectable } from "@angular/core";
import { Document } from "../../../docs/models/document";
import { MarkdownEditorService } from "./markdown.editor.service";
import { DocService } from "docs";

@Injectable()
export class DocSaveCoordinateService {
  isDirty: boolean;

  constructor(
    private editorService: MarkdownEditorService,
    private docService: DocService
  ) {
    editorService.editorLoaded$.subscribe((editor: CodeMirror.Editor) => {
      editorService.contentChanged$.subscribe(e => {
        this.checkDirty(editor);
      });
    });
  }

  public docLoadedHandler(editor: CodeMirror.Editor) {
    this.docService.model.currentDoc.contentGeneration = editor
      .getDoc()
      .changeGeneration();
  }

  public docSavedHandler(editor: CodeMirror.Editor) {
    this.docService.model.currentDoc.contentGeneration = editor
      .getDoc()
      .changeGeneration();
  }

  private checkDirty(editor) {
    this.isDirty = editor
      .getDoc()
      .isClean(this.docService.model.currentDoc.contentGeneration);
  }
}
