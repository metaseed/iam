import { Component, Input, AfterViewInit, ElementRef } from "@angular/core";
import { DomSanitizer, Title } from "@angular/platform-browser";
import { MarkdownViewerService } from "./services/markdown.viewer.service";
import { Scrollable } from "core";
import { ViewChild } from "@angular/core";
import * as view from "../reducers/view";
import { Store } from "@ngrx/store";
import * as fromView from "../actions/view";
import * as MarkdownIt from "markdown-it";
import lozad from "../../../../packages/lazy-load";
import { TocComponent } from "./toc/toc.component";
import { of } from "rxjs/observable/of";
import { TocService } from "./services/toc.service";
@Component({
  // tslint:disable-next-line:component-selector
  selector: "markdown-viewer",
  template: ""
})
export class MarkdownViewerComponent {
  lozad: any;

  private hostElement: HTMLElement;
  private void$ = of<void>(undefined);

  @Input()
  set model(value: string) {
    if (value) {
      this.parsedModel = this.sanitized.bypassSecurityTrustHtml(
        this.service.render(value)
      );
    } else {
      this.parsedModel = "";
    }

    this.elementRef.nativeElement.innerHTML = this.parsedModel;

    setTimeout(() => {
      //remvoe timeout??
      TocComponent.prepareTitleAndToc(
        this.hostElement,
        this.service.parsedContent.title,
        this.tocService,
        this.titleService
      );
      this.lozad.observe();
    }, 0);
  }
  private parsedModel: any;

  constructor(
    private elementRef: ElementRef,
    private sanitized: DomSanitizer,
    private service: MarkdownViewerService,
    private tocService: TocService,
    private titleService: Title,
    private store: Store<view.State>
  ) {
    this.hostElement = elementRef.nativeElement;
    (<any>document).iamMarkdownIsPureViewMode = true;
  }
  ngAfterViewInit() {
    let container = this.hostElement;
    this.lozad = (<any>lozad)("img[data-src]", { container });
  }
}

// https://jsfiddle.net/axtn/a91fsar3/
// scroll sync
