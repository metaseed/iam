import { InjectionToken } from "@angular/core";
import { Observable } from "rxjs";
import { ScrollEvent } from "core";

export const MARKDOWN_SERVICE_TOKEN = new InjectionToken('MARKDOWN_SERVICE_TOKEN');

export interface IMarkdownService {
  viewerScroll$:Observable<ScrollEvent>;
  editorScroll$:Observable<ScrollEvent>;
}
