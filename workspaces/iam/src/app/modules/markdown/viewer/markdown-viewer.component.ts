import { Component, Input, ElementRef, EventEmitter } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { MarkdownViewerService } from './services/markdown.viewer.service';
import { DocumentRef } from 'core';
import lozad from 'packages/lazy-load';
import { TocComponent } from './elements/toc/toc.component';
import { TocService } from './services/toc.service';
import { ElementsLoader } from './elements/elements-loader';
import { getAddr } from './utils/getUri';
import { MarkdownViewerContainerComponent } from './markdown-viewer-container.component';
import { Inject } from '@angular/core';
import { asyncScheduler, Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

export const NO_ANIMATIONS = 'no-animations';

@Component({
  selector: 'markdown-viewer',
  template: '',
  styleUrls: ['./markdown-viewer.component.scss']
})
export class MarkdownViewerComponent {
  static animationsEnabled = false;
  static config_addTocByDefault = false;
  lozad: any;
  private hostElement: HTMLElement;
  private updateToc = new Subject<string>();
  private updateContent = new Subject<string>();

  @Input()
  set model(value: string) {
    this.updateContent.next(value);
    this.updateToc.next(value);
  }

  constructor(
    @Inject(MarkdownViewerContainerComponent) private parent: MarkdownViewerContainerComponent,
    private documentRef: DocumentRef,
    elementRef: ElementRef,
    private service: MarkdownViewerService,
    private tocService: TocService,
    private titleService: Title,
    private elementsLoader: ElementsLoader
  ) {
    (<any>document).iamMarkdownIsPureViewMode = true;
    this.hostElement = elementRef.nativeElement;
    const container = this.hostElement;
    this.lozad = lozad('img[data-src]', { container });

    this.updateContent.pipe(debounceTime(500, asyncScheduler)).subscribe(value => {
      this.service.render(this.hostElement, value);
      this.lozad.observe();

      const targetElement = this.parent.viewerContainerDiv.nativeElement;
      this.elementsLoader.loadContainedCustomElements(targetElement).subscribe();
    });
    this.updateToc.pipe(debounceTime(3000, asyncScheduler)).subscribe(_ => {
      const docId = getAddr(this.documentRef.document.location.href);
      const targetElement = this.parent.viewerContainerDiv.nativeElement;
      let addTitleAndToc = () => {
        this.tocService.genToc(targetElement, docId);
      };
      if (MarkdownViewerComponent.config_addTocByDefault) {
        addTitleAndToc = TocComponent.prepareTitleAndToc(
          this.hostElement,
          docId,
          this.tocService,
          this.titleService
        );
      }
      addTitleAndToc();
    });
  }

}

// https://jsfiddle.net/axtn/a91fsar3/
// scroll sync
