import { tap } from 'rxjs/operators';

export function consoleLog<T>(info = '') {
  return tap<T>({
    next(a) {
      console.log('%c--------------------DEBUG:Tap.next', 'color: #60e2ee;');
      console.error('%c' + info + ':next', 'color: #60e2ee;');
      console.count(info + ':next');
      console.info(a);
      // console.trace(info+'%c:next','color: green;');//
      // console.log((new Error().stack));
    },
    error(info) {
      console.error('----------------------DEBUG:Tap.error');
      console.count(info + ':error');
    },
    complete() {
      console.info(
        '%c----------------------DEBUG:Tap.complete',
        'color:yellow'
      );
      console.error('%c' + info + ':complete', 'color: yellow;');
      console.count(info + ':complete');
    },
  });
}
