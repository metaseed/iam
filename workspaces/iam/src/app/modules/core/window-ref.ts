import { fromEvent } from 'rxjs';
import { Injectable, HostListener } from '@angular/core';

function _window(): Window {
  // return the native window obj
  return window;
}

@Injectable()
export class WindowRef {
  get scroll$() {
    const obs = fromEvent(this.nativeWindow, 'scroll');
    return obs;
  }

  get resize$() {
    const obs = fromEvent(this.nativeWindow, 'resize');
    return obs;
  }

  get nativeWindow(): Window {
    return _window();
  }
}
