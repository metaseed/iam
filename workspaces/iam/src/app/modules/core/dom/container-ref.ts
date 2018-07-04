import { map, auditTime } from 'rxjs/operators';
import { fromEvent } from 'rxjs';

export class ContainerRef {
  scrollEvent$ = fromEvent(this.container, 'scroll').pipe(auditTime(this._scrollAuditTime));
  resizeEvent$ = fromEvent(this.container, 'resize').pipe(auditTime(this._resizeAuditTime));

  constructor(
    protected container: HTMLElement | Window = window,
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
    return document.body.clientHeight || 0;
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

  get isScrollDown$() {
    let lastValue = this.scrollTop;
    return this.scrollEvent$.pipe(
      map(event => {
        const currentValue = this.scrollTop;
        if (currentValue - lastValue > 0) {
          lastValue = currentValue;
          return { scroll: event, isDown: true };
        }
        lastValue = currentValue;
        return { scroll: event, isDown: false };
      })
    );
  }

}
