import { Injectable, Inject } from "@angular/core";
import {
  MARKDOWN_STORE_TOKEN,
  IMarkdownStore,
} from "../../model/markdown.model";
import { TocService } from "./toc.service";
import { combineLatest, Subject } from "rxjs";
import { map } from "rxjs/operators";

@Injectable()
export class ViewerActiveElementService {
  constructor(
    @Inject(MARKDOWN_STORE_TOKEN) private markdownService: IMarkdownStore,
    private tocService: TocService
  ) {
    combineLatest([
      markdownService.viewer_.pipe(map(v => v.activeElement$)),
      tocService.activeElement$,
    ]).subscribe(([viewerActiveElement$, tocActiveItem]) => {
      (viewerActiveElement$ as Subject<Element>).next(tocActiveItem);
    });
  }
}
