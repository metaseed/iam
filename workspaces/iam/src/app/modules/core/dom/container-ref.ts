import { map, auditTime, share } from 'rxjs/operators';
import { fromEvent } from 'rxjs';

export class ScrollEvent {
  constructor(public event: Event, public isDown: boolean, public scrollTop: number) {}
}

export class ContainerRef {
  scrollEvent$ = fromEvent(this.container, 'scroll').pipe(auditTime(this._scrollAuditTime));
  resizeEvent$ = fromEvent(this.container, 'resize').pipe(auditTime(this._resizeAuditTime));
  touchStart$ = fromEvent<TouchEvent>(this.container, 'touchstart');
  touchMove$ = fromEvent<TouchEvent>(this.container, 'touchmove');
  touchEnd$ = fromEvent<TouchEvent>(this.container, 'touchend');

  constructor(
    public container: HTMLElement | Window | Document = window,
    private _scrollAuditTime = 300,
    private _resizeAuditTime = 10
  ) {}

  get contentHeight() {
    if (this.container instanceof HTMLElement) {
      return this.container.scrollHeight;
    }
    return document.body.scrollHeight || Number.MAX_SAFE_INTEGER;
  }

  get viewportHeight() {
    if (this.container instanceof HTMLElement) {
      return this.container.clientHeight;
    }
    return Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
  }

  get viewportWidth() {
    if (this.container instanceof HTMLElement) {
      return this.container.clientWidth;
    }
    return Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
  }

  get scrollTop() {
    if (this.container instanceof HTMLElement) {
      return this.container.scrollTop;
    }
    return (window && window.pageYOffset) || 0;
  }

  get maxScrollTop() {
    return this.contentHeight - this.viewportHeight;
  }

  get scrollDown$() {
    let lastValue = this.scrollTop;
    return this.scrollEvent$.pipe(
      map(
        event => {
          const scrollTop = this.scrollTop;
          if (scrollTop - lastValue > 0) {
            lastValue = scrollTop;
            return new ScrollEvent(event, true, scrollTop);
          }
          lastValue = scrollTop;
          return new ScrollEvent(event, false, scrollTop);
        },
      ),
      share()
    );
  }
}
