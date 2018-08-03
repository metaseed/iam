import { map, auditTime, share } from 'rxjs/operators';
import { fromEvent, Observable } from 'rxjs';
import { NgZone } from '@angular/core';

export class ScrollEvent {
  constructor(public event: Event, public isDown: boolean, public scrollTop: number) {}
}

export interface IContainer {
  scrollDown$: Observable<ScrollEvent>;
  resizeEvent$: Observable<Event>;
  scrollEvent$: Observable<Event>;
  touchStart$: Observable<TouchEvent>;
  touchMove$: Observable<TouchEvent>;
  touchEnd$: Observable<TouchEvent>;
  nativeElement: HTMLElement | Window | Document;
  contentHeight: number;
  viewportHeight: number;
  viewportWidth: number;
  scrollTop: number;
  maxScrollTop: number;
}

export class ContainerRef implements IContainer {
  scrollEvent$: Observable<Event>;
  resizeEvent$: Observable<Event>;
  touchStart$: Observable<TouchEvent>;
  touchEnd$: Observable<TouchEvent>;
  touchMove$: Observable<TouchEvent>;

  constructor(
    public nativeElement: HTMLElement | Window | Document = window,
    private _scrollAuditTime = 300,
    private _resizeAuditTime = 10,
    private ngZone?: NgZone
  ) {
    if (this.ngZone) {
      this.ngZone.runOutsideAngular(_ => {
        this.scrollEvent$ = fromEvent(this.nativeElement, 'scroll').pipe(
          auditTime(this._scrollAuditTime)
        );
        this.resizeEvent$ = fromEvent(this.nativeElement, 'resize').pipe(
          auditTime(this._resizeAuditTime)
        );
        this.touchStart$ = fromEvent<TouchEvent>(this.nativeElement, 'touchstart', {
          passive: true
        });
        this.touchMove$ = fromEvent<TouchEvent>(this.nativeElement, 'touchmove', { passive: true });
        this.touchEnd$ = fromEvent<TouchEvent>(this.nativeElement, 'touchend', { passive: true });
      });
    } else {
      this.scrollEvent$ = fromEvent(this.nativeElement, 'scroll').pipe(
        auditTime(this._scrollAuditTime)
      );
      this.resizeEvent$ = fromEvent(this.nativeElement, 'resize').pipe(
        auditTime(this._resizeAuditTime)
      );
      this.touchStart$ = fromEvent<TouchEvent>(this.nativeElement, 'touchstart', {
        passive: true
      });
      this.touchMove$ = fromEvent<TouchEvent>(this.nativeElement, 'touchmove', { passive: true });
      this.touchEnd$ = fromEvent<TouchEvent>(this.nativeElement, 'touchend', { passive: true });
    }
  }

  get contentHeight() {
    if (this.nativeElement instanceof HTMLElement) {
      return this.nativeElement.scrollHeight;
    }
    return document.body.scrollHeight || Number.MAX_SAFE_INTEGER;
  }

  get viewportHeight() {
    if (this.nativeElement instanceof HTMLElement) {
      return this.nativeElement.clientHeight;
    }
    return Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
  }

  get viewportWidth() {
    if (this.nativeElement instanceof HTMLElement) {
      return this.nativeElement.clientWidth;
    }
    return Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
  }

  get scrollTop() {
    if (this.nativeElement instanceof HTMLElement) {
      return this.nativeElement.scrollTop;
    }
    return (window && window.pageYOffset) || 0;
  }
  set scrollTop(v) {
    if (this.nativeElement instanceof HTMLElement) {
      this.nativeElement.scrollTop = v;
      return;
    }
    if (window) window.scrollTo(window.pageXOffset, v);
  }
  get maxScrollTop() {
    return this.contentHeight - this.viewportHeight;
  }

  get scrollDown$() {
    let lastValue = this.scrollTop;
    return this.scrollEvent$.pipe(
      map(event => {
        const scrollTop = this.scrollTop;
        if (scrollTop - lastValue > 0) {
          lastValue = scrollTop;
          return new ScrollEvent(event, true, scrollTop);
        }
        lastValue = scrollTop;
        return new ScrollEvent(event, false, scrollTop);
      }),
      share()
    );
  }
}
