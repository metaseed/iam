import { HammerGestureConfig } from '@angular/platform-browser';
import * as hammer from 'hammerjs';
import { Injectable } from "@angular/core";

@Injectable()
export class MyHammerConfig extends HammerGestureConfig {

  overrides = <any>{
    swipe: { direction: hammer.DIRECTION_HORIZONTAL },
    pinch: { enable: false },
    rotate: { enable: false },
  };

  constructor(){
    super();
    this.enableUserSelection();
  }

  private enableUserSelection() {
    // http://hammerjs.github.io/tips/#i-cant-select-my-text-anymore
    if (Hammer.defaults.cssProps.userSelect)
      delete Hammer.defaults.cssProps.userSelect;
  }
}
