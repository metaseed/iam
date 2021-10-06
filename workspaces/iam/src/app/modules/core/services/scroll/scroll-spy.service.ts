import { Injectable } from '@angular/core';
import { distinctUntilChanged, takeUntil } from 'rxjs/operators';
import { ReplaySubject, Subject, Observable } from 'rxjs';
import { ContainerRef } from '../../dom';

export interface IScrollElement {
  element: Element;
  index: number;
}

export interface ScrollSpyToken {
  activeScrollElement$: Observable<IScrollElement | null>;
  isScrollDown$: Observable<any>;
  unSpy: () => void;
}

export class ScrollSpiedElement implements IScrollElement {
  top: number;

  constructor(public readonly element: Element, public readonly index: number) { }

  calculateTop(scrollTop: number, topOffset: number) {
    this.top = scrollTop + this.element.getBoundingClientRect().top - topOffset;
  }
}

export class ScrollSpiedElementGroup extends ContainerRef {
  private activeScrollElement = new ReplaySubject<IScrollElement | null>(1);
  private lastMaxScrollTop: number;
  private lastContentHeight: number;
  private spiedElements: ScrollSpiedElement[];
  private onStopListening$ = new Subject();

  activeScrollElement$ = this.activeScrollElement.pipe(distinctUntilChanged());

  constructor(
    elements: Element[],
    container: HTMLElement | Window = window,
    private _topOffset = 0
  ) {
    super(container);
    this.spiedElements = elements.map((elem, i) => new ScrollSpiedElement(elem, i));
  }

  spyOn() {
    this.calibrate();
    this.onScroll();
    this.scrollEvent$.pipe(takeUntil(this.onStopListening$)).subscribe(this.onScroll);
    this.resizeEvent$.pipe(takeUntil(this.onStopListening$)).subscribe(this.onResize);
  }

  unSpy() {
    this.activeScrollElement.complete();
    this.onStopListening$.next(null);
  }

  calibrate() {
    const scrollTop = this.scrollTop;
    this.spiedElements.forEach(spiedElem => spiedElem.calculateTop(scrollTop, this._topOffset));
    this.spiedElements.sort((a, b) => b.top - a.top); // Sort in descending `top` order.
  }

  private onResize = () => {
    this.lastContentHeight = this.contentHeight;
    this.lastMaxScrollTop = this.maxScrollTop;
    this.calibrate();
  };

  private onScroll = () => {
    if (this.lastContentHeight !== this.contentHeight) {
      // Something has caused the scroll height to change.
      // (E.g. image downloaded, accordion expanded/collapsed etc.)
      this.onResize();
    }

    let activeItem: IScrollElement | undefined;
    const maxScrollTop = this.lastMaxScrollTop;
    const scrollTop = this.scrollTop;

    if (scrollTop + 1 >= maxScrollTop) {
      activeItem = this.spiedElements[0];
    } else {
      activeItem = this.spiedElements.find(spiedElem => spiedElem.top <= scrollTop);
    }

    this.activeScrollElement.next(activeItem || null);
  };
}

@Injectable({ providedIn: 'root' })
export class ScrollSpyService {
  private spiedElementGroups: ScrollSpiedElementGroup[] = [];

  spyOn(
    elements: Element[],
    container: HTMLElement | Window = window,
    topOffset = 0
  ): ScrollSpyToken {
    const spiedGroup = new ScrollSpiedElementGroup(elements, container, topOffset);
    this.spiedElementGroups.push(spiedGroup);
    spiedGroup.spyOn();

    return {
      activeScrollElement$: spiedGroup.activeScrollElement$,
      isScrollDown$: spiedGroup.scrollDown$,
      unSpy: () => this.unSpy(spiedGroup)
    };
  }

  private unSpy(spiedGroup: ScrollSpiedElementGroup) {
    spiedGroup.unSpy();
    this.spiedElementGroups = this.spiedElementGroups.filter(group => group !== spiedGroup);
  }
}
