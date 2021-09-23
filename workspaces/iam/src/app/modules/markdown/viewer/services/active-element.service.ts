import { Injectable, Inject } from "@angular/core";
import {
  MARKDOWN_SERVICE_TOKEN,
  IMarkdownService,
} from "../../model/markdown.model";
import { TocService } from "./toc.service";
import { combineLatest, Subject } from "rxjs";
import { map } from "rxjs/operators";

@Injectable()
export class ActiveElementService {
  constructor(
    @Inject(MARKDOWN_SERVICE_TOKEN) private markdownService: IMarkdownService,
    private tocService: TocService
  ) {
    combineLatest([
      markdownService.viewer$.pipe(map(v => v.activeElement$)),
      tocService.activeElement$,
    ]).subscribe(([activeElement$, activeItem]) => {
      (activeElement$ as Subject<Element>).next(activeItem);
    });
  }
}
