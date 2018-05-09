import { map } from 'rxjs/operators';
import { fromEvent } from 'rxjs';

export class Scrollable {
  get scroll$() {
    return fromEvent(this.element, 'scroll');
  }

  get isScrollDown$() {
    let lastValue = this.element.scrollTop;
    return this.scroll$.pipe(
      map(event => {
        const currentValue = this.element.scrollTop;
        if (currentValue - lastValue > 0) {
          lastValue = currentValue;
          return { scroll: event, isDown: true };
        }
        lastValue = currentValue;
        return { scroll: event, isDown: false };
      })
    );
  }

  constructor(protected element: HTMLElement) {}
}
