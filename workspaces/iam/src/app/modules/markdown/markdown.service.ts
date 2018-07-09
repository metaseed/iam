import { Injectable } from "@angular/core";
import { State } from "./state";
import { Store } from "@ngrx/store";
import { DocumentEffectsRead } from "../home/state";
import { Observable, Subject } from "rxjs";
import { ScrollEvent } from "core";
import { IMarkdownService } from "./model/markdown.model";

@Injectable()
export class MarkdownService implements IMarkdownService {
  constructor(private store:Store<State>){}

  viewerScroll$ = new Subject<ScrollEvent>();
  editorScroll$ = new Subject<ScrollEvent>();

  refresh(num, title, format) {
    this.store.dispatch(new DocumentEffectsRead({ id: num, title, format }));
  }

}
