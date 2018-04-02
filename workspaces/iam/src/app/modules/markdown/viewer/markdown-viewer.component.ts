import { Component, Input, AfterViewInit, ElementRef, Output, EventEmitter } from "@angular/core";
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
import { Observable } from "rxjs/Observable";
import { switchMap, tap } from "rxjs/operators";
import { timer } from "rxjs/observable/timer";

export const NO_ANIMATIONS = 'no-animations';

@Component({
  // tslint:disable-next-line:component-selector
  selector: "markdown-viewer",
  template: ` <div #div class="markdown-view" [innerHtml]="parsedModel">
</div>
  `,
  styles: [
    `
  .markdown-view {
    max-width: 1000px;
    margin: auto;
  }

  `
  ]
})
export class MarkdownViewerComponent {
  static animationsEnabled = true;
  lozad: any;

  private void$ = of<void>(undefined);
  private hostElement: HTMLElement;
  @ViewChild("div") private viewContainerDiv;
  @Input()
  set model(value: string) {
    if (value) {
      this.parsedModel = this.sanitized.bypassSecurityTrustHtml(
        this.service.render(value)
      );
    } else {
      this.parsedModel = "";
    }

    if (!value) return;

    setTimeout(() => {
      //remvoe timeout??
      TocComponent.prepareTitleAndToc(
        this.hostElement,
        this.service.parsedContent.title,
        this.tocService,
        this.titleService
      )();
      this.lozad.observe();
    }, 0);
  }
  parsedModel: any;
  protected currViewContainer: HTMLElement = document.createElement('div');
  protected nextViewContainer: HTMLElement = document.createElement('div');

  private onDestroy$ = new EventEmitter<void>();
  private docContents$ = new EventEmitter<string>();
    // The new document is ready to be inserted into the viewer.
  // (Embedded components have been loaded and instantiated, if necessary.)
  @Output() docReady = new EventEmitter<void>();

  // The previous document has been removed from the viewer.
  // (The leaving animation (if any) has been completed and the node has been removed from the DOM.)
  @Output() docRemoved = new EventEmitter<void>();

  // The new document has been inserted into the viewer.
  // (The node has been inserted into the DOM, but the entering animation may still be in progress.)
  @Output() docInserted = new EventEmitter<void>();

  // The new document has been fully rendered into the viewer.
  // (The entering animation has been completed.)
  @Output() docRendered = new EventEmitter<void>();

  constructor(
    private sanitized: DomSanitizer,
    private service: MarkdownViewerService,
    private tocService: TocService,
    private titleService: Title,
    private store: Store<view.State>
  ) {
    (<any>document).iamMarkdownIsPureViewMode = true;
  }
  ngAfterViewInit() {
    var container = (this.hostElement = this.viewContainerDiv.nativeElement);
    this.lozad = (<any>lozad)("img[data-src]", { container });
  }

  ngOnDestroy() {
    this.onDestroy$.emit();
  }
  protected swapViews(onInsertedCb = () => {}): Observable<void> {
    const raf$ = new Observable<void>(subscriber => {
      const rafId = requestAnimationFrame(() => {
        subscriber.next();
        subscriber.complete();
      });
      return () => cancelAnimationFrame(rafId);
    });

    // Get the actual transition duration (taking global styles into account).
    // According to the [CSSOM spec](https://drafts.csswg.org/cssom/#serializing-css-values),
    // `time` values should be returned in seconds.
    const getActualDuration = (elem: HTMLElement) => {
      const cssValue = getComputedStyle(elem).transitionDuration || '';
      const seconds = Number(cssValue.replace(/s$/, ''));
      return 1000 * seconds;
    };
    const animateProp =
        (elem: HTMLElement, prop: keyof CSSStyleDeclaration, from: string, to: string, duration = 200) => {
          const animationsDisabled = !MarkdownViewerComponent.animationsEnabled
                                     || this.hostElement.classList.contains(NO_ANIMATIONS);
          if (prop === 'length' || prop === 'parentRule') {
            // We cannot animate length or parentRule properties because they are readonly
            return this.void$;
          }
          elem.style.transition = '';
          return animationsDisabled
              ? this.void$.pipe(tap(() => elem.style[prop] = to))
              : this.void$.pipe(
                    // In order to ensure that the `from` value will be applied immediately (i.e.
                    // without transition) and that the `to` value will be affected by the
                    // `transition` style, we need to ensure an animation frame has passed between
                    // setting each style.
                    switchMap(() => raf$), tap(() => elem.style[prop] = from),
                    switchMap(() => raf$), tap(() => elem.style.transition = `all ${duration}ms ease-in-out`),
                    switchMap(() => raf$), tap(() => (elem.style as any)[prop] = to),
                    switchMap(() => timer(getActualDuration(elem))), switchMap(() => this.void$),
                );
        };

    const animateLeave = (elem: HTMLElement) => animateProp(elem, 'opacity', '1', '0.1');
    const animateEnter = (elem: HTMLElement) => animateProp(elem, 'opacity', '0.1', '1');

    let done$ = this.void$;

    if (this.currViewContainer.parentElement) {
      done$ = done$.pipe(
          // Remove the current view from the viewer.
          switchMap(() => animateLeave(this.currViewContainer)),
          tap(() => this.currViewContainer.parentElement!.removeChild(this.currViewContainer)),
          tap(() => this.docRemoved.emit()),
      );
    }

    return done$.pipe(
        // Insert the next view into the viewer.
        tap(() => this.hostElement.appendChild(this.nextViewContainer)),
        tap(() => onInsertedCb()),
        tap(() => this.docInserted.emit()),
        switchMap(() => animateEnter(this.nextViewContainer)),
        // Update the view references and clean up unused nodes.
        tap(() => {
          const prevViewContainer = this.currViewContainer;
          this.currViewContainer = this.nextViewContainer;
          this.nextViewContainer = prevViewContainer;
          this.nextViewContainer.innerHTML = '';  // Empty to release memory.
        }),
    );
}

// https://jsfiddle.net/axtn/a91fsar3/
// scroll sync
