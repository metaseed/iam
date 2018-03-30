import { Inject, Injectable } from "@angular/core";
import { DOCUMENT } from "@angular/platform-browser";
import { auditTime, distinctUntilChanged, takeUntil } from "rxjs/operators";

import { ScrollService } from "./scroll.service";
import { fromEvent } from "rxjs/observable/fromEvent";
import { Observable } from "rxjs/Observable";
import { ReplaySubject, Subject } from "rxjs";

export interface ScrollItem {
  element: Element;
  index: number;
}

export interface ScrollSpyToken {
  active: Observable<ScrollItem | null>;
  unspy: () => void;
}

export class ScrollSpiedElement implements ScrollItem {
  top = 0;

  constructor(
    public readonly element: Element,
    public readonly index: number
  ) {}

  calculateTop(scrollTop: number, topOffset: number) {
    this.top = scrollTop + this.element.getBoundingClientRect().top - topOffset;
  }
}

export class ScrollSpiedElementGroup {
  lastMaxScrollTop: number;
  activeScrollItem: ReplaySubject<ScrollItem | null> = new ReplaySubject(1);

  resizeEvents$: Observable<any>;
  scrollEvents$: Observable<any>;

  private spiedElements: ScrollSpiedElement[];
  private onStopListening$ = new Subject();
  private lastContentHeight: number;

  constructor(
    elements: Element[],
    private _container: HTMLElement | Window = window,
    private topOffset = 0
  ) {
    this.spiedElements = elements.map(
      (elem, i) => new ScrollSpiedElement(elem, i)
    );

    this.resizeEvents$ = fromEvent(_container, "resize").pipe(auditTime(300));
    this.scrollEvents$ = fromEvent(_container, "scroll").pipe(auditTime(10));
  }

  spyOn() {
    this.calibrate();
    this.onScroll();
    this.scrollEvents$
      .pipe(takeUntil(this.onStopListening$))
      .subscribe(this.onScroll);
    this.resizeEvents$
      .pipe(takeUntil(this.onStopListening$))
      .subscribe(this.onResize);
  }

  unSpy() {
    this.activeScrollItem.complete();
    this.onStopListening$.next();
  }

  calibrate() {
    const scrollTop = this.getScrollTop();
    this.spiedElements.forEach(spiedElem =>
      spiedElem.calculateTop(scrollTop, this.topOffset)
    );
    this.spiedElements.sort((a, b) => b.top - a.top); // Sort in descending `top` order.
  }

  private onResize() {
    const contentHeight = this.getContentHeight();
    const viewportHeight = this.getViewportHeight();

    this.lastContentHeight = contentHeight;
    this.lastMaxScrollTop = contentHeight - viewportHeight;

    this.calibrate();
  }

  private onScroll() {
    if (this.lastContentHeight !== this.getContentHeight()) {
      // Something has caused the scroll height to change.
      // (E.g. image downloaded, accordion expanded/collapsed etc.)
      this.onResize();
    }

    const maxScrollTop = this.lastMaxScrollTop;
    let activeItem: ScrollItem | undefined;
    const scrollTop = this.getScrollTop();
    if (scrollTop + 1 >= maxScrollTop) {
      activeItem = this.spiedElements[0];
    } else {
      this.spiedElements.some(spiedElem => {
        if (spiedElem.top <= scrollTop) {
          activeItem = spiedElem;
          return true;
        }
        return false;
      });
    }

    this.activeScrollItem.next(activeItem || null);
  }

  private getContentHeight() {
    if (this._container instanceof HTMLElement) {
      return this._container.scrollHeight;
    }
    return document.body.scrollHeight || Number.MAX_SAFE_INTEGER;
  }

  private getViewportHeight() {
    if (this._container instanceof HTMLElement) {
      return this._container.clientHeight;
    }
    return document.body.clientHeight || 0;
  }

  private getScrollTop() {
    if (this._container instanceof HTMLElement) {
      return this._container.scrollTop;
    }
    return (window && window.pageYOffset) || 0;
  }
}

@Injectable()
export class ScrollSpyService {
  private spiedElementGroups: ScrollSpiedElementGroup[] = [];

  constructor(
    @Inject(DOCUMENT) private doc: any,
    private scrollService: ScrollService
  ) {}

  spyOn(
    elements: Element[],
    container: HTMLElement | Window = window,
    topOffset = 0
  ): ScrollSpyToken {
    const spiedGroup = new ScrollSpiedElementGroup(
      elements,
      container,
      topOffset
    );
    this.spiedElementGroups.push(spiedGroup);
    spiedGroup.spyOn();

    return {
      active: spiedGroup.activeScrollItem.pipe(distinctUntilChanged()),
      unspy: () => this.unspy(spiedGroup)
    };
  }

  private unspy(spiedGroup: ScrollSpiedElementGroup) {
    spiedGroup.unSpy();
    this.spiedElementGroups = this.spiedElementGroups.filter(
      group => group !== spiedGroup
    );
  }
}
