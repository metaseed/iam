import { Injectable } from "@angular/core";
import { IDocEditor } from "../doc-viewer-editor/model/DocEditor";

@Injectable({providedIn:'root'})
export class DocEditorService {
  currentEditor: IDocEditor;
}
