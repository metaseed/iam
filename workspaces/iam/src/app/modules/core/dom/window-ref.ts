import { Injectable } from '@angular/core';
import { ContainerRef } from './container-ref';

@Injectable()
export class WindowRef extends ContainerRef {
  constructor() {
    super(window);
  }

  get window(): Window {
    return window;
  }
}
