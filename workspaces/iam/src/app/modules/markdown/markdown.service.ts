import { Injectable } from "@angular/core";
import { State } from "./state";
import { Store } from "@ngrx/store";
import { DocumentEffectsRead } from "../home/state";

@Injectable()
export class MarkdownService {
  constructor(private store:Store<State>){}
  refresh(num, title, format) {
    this.store.dispatch(new DocumentEffectsRead({ id: num, title, format }));
  }

}
