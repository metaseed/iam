import { Injectable, Inject } from '@angular/core';
import { PlatformLocation } from '@angular/common';
import { DOCUMENT } from '@angular/platform-browser';
import { fromEvent } from 'rxjs';

@Injectable()
export class ScrollService {
  private _topOfPageElement: Element;

  get topOfPageElement() {
    if (!this._topOfPageElement) {
      this._topOfPageElement = this.document.getElementById('top-of-page') || this.document.body;
    }
    return this._topOfPageElement;
  }

  constructor(@Inject(DOCUMENT) private document: any, private location: PlatformLocation) {}

  scroll() {
    const hash = this.getCurrentHash();
    const element: HTMLElement = hash ? this.document.getElementById(hash) : this.topOfPageElement;
    this.scrollToElement(element);
  }

  scrollToElement(
    element: HTMLElement | null,
    container: HTMLElement | Window = window,
    topOffset: number = 0
  ) {
    if (element) {
      element.scrollIntoView();

      if (container instanceof HTMLElement) {
        container.scrollTop = element.offsetTop + topOffset;
      } else if (window && window.scrollBy) {
        // Scroll as much as necessary to align the top of `element` at `topOffset`.
        // (Usually, `.top` will be 0, except for cases where the element cannot be scrolled all the
        //  way to the top, because the viewport is larger than the height of the content after the
        //  element.)
        window.scrollBy(0, element.getBoundingClientRect().top - topOffset);

        // If we are very close to the top (<20px), then scroll all the way up.
        // (This can happen if `element` is at the top of the page, but has a small top-margin.)
        if (window.pageYOffset < 20) {
          window.scrollBy(0, -window.pageYOffset);
        }
      }
    }
  }

  /** Scroll to the top of the document. */
  scrollToTop() {
    this.scrollToElement(<HTMLElement>this.topOfPageElement);
  }

  /**
   * Return the hash fragment from the `PlatformLocation`, minus the leading `#`.
   */
  private getCurrentHash() {
    return decodeURIComponent(this.location.hash.replace(/^#/, ''));
  }
}
