import { Component, Input, AfterViewInit, ElementRef } from "@angular/core";
import { DomSanitizer } from "@angular/platform-browser";
import { MarkdownViewerService } from "./services/markdown.viewer.service";
import { Scrollable } from "core";
import { ViewChild } from "@angular/core";
import * as view from "../reducers/view";
import { Store } from "@ngrx/store";
import * as fromView from "../actions/view";
import * as MarkdownIt from "markdown-it";
import lozad from "../../../../packages/lazy-load";
@Component({
  // tslint:disable-next-line:component-selector
  selector: "markdown-viewer",
  templateUrl: "markdown-viewer.component.html",
  styleUrls: ["./markdown-viewer.component.scss"]
})
export class MarkdownViewerComponent {
  lozad: any;
  @ViewChild("div") viewerContainerDiv: ElementRef;
  @Input()
  set model(value: string) {
    if (value) {
      this.parsedModel = this.sanitized.bypassSecurityTrustHtml(
        this.service.render(value)
      );

      setTimeout(() => {
        this.lozad.observe();
      }, 0);
    } else {
      this.parsedModel = "";
    }
  }

  parsedModel: any;

  constructor(
    private sanitized: DomSanitizer,
    private service: MarkdownViewerService,
    private store: Store<view.State>
  ) {
    (<any>document).iamMarkdownIsPureViewMode = true;
  }
  ngAfterViewInit() {
    let container = this.viewerContainerDiv.nativeElement;
    this.lozad = (<any>lozad)("img[data-src]", { container });
  }
}

// https://jsfiddle.net/axtn/a91fsar3/
// scroll sync
