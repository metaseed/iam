import { Component, Input, ElementRef } from '@angular/core';
import { MarkdownViewerService } from './services/markdown.viewer.service';
import { DocumentRef, SubscriptionManager } from 'core';
import lozad from 'packages/lazy-load';
import { TocComponent } from './elements/toc/toc.component';
import { TocService } from './services/toc.service';
import { ElementsLoader } from './elements/elements-loader';
import { getAddr } from './utils/getUri';
import { MarkdownViewerContainerComponent } from './markdown-viewer-container.component';
import { Inject } from '@angular/core';
import { asyncScheduler, Subject } from 'rxjs';
import { debounceTime, tap } from 'rxjs/operators';

export const NO_ANIMATIONS = 'no-animations';

@Component({
  selector: 'markdown-viewer',
  template: '',
  styleUrls: ['./markdown-viewer.component.scss']
})
export class MarkdownViewerComponent extends SubscriptionManager {
  static animationsEnabled = false;
  static config_addTocByDefault = false;
  lozad: any;
  private hostElement: HTMLElement;
  private updateToc$ = new Subject<string>();
  private updateContent$ = new Subject<string>();

  @Input()
  set model(value: string) {
    if(value === null) return;
    this.updateContent$.next(value);
    this.updateToc$.next(value);
  }

  constructor(
    @Inject(MarkdownViewerContainerComponent) private parent: MarkdownViewerContainerComponent,
    private documentRef: DocumentRef,
    elementRef: ElementRef,
    private markdownViewerService: MarkdownViewerService,
    private tocService: TocService,
    private elementsLoader: ElementsLoader
  ) {
    super();

    (<any>document).iamMarkdownIsPureViewMode = true;
    this.hostElement = elementRef.nativeElement;
    const container = this.hostElement;
    this.lozad = lozad('img[data-src]', { container, enableAutoReload: true });

    super.addSub(
      this.updateContent$.pipe(
        debounceTime(500, asyncScheduler),
        tap(value => {
          this.markdownViewerService.render(this.hostElement, value);
          this.lozad.observe();

          const targetElement = this.parent.viewerContainerDiv.nativeElement;
          this.elementsLoader.loadContainedCustomElements(targetElement).subscribe();
        })
      ),
      this.updateToc$.pipe(
        debounceTime(2000, asyncScheduler),
        tap(_ => {
          const docId = getAddr(this.documentRef.document.location.href);
          const viewerContainerDiv = this.parent.viewerContainerDiv.nativeElement;
          let addTitleAndToc = () => {
            this.tocService.genToc(viewerContainerDiv, docId);
          };
          if (MarkdownViewerComponent.config_addTocByDefault) {
            addTitleAndToc = TocComponent.prepareTitleAndToc(
              this.hostElement,
              docId,
              this.tocService
            );
          }
          addTitleAndToc();
        })
      )
    );
  }

}

// https://jsfiddle.net/axtn/a91fsar3/
// scroll sync
