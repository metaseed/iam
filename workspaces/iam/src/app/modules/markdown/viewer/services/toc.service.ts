import { Inject, Injectable } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { ReplaySubject } from 'rxjs';
import { ScrollSpyToken, ScrollSpyService } from 'core';
import { DOCUMENT } from '@angular/common';

export interface TocItem {
  content: SafeHtml;
  href: string;
  isSecondary?: boolean;
  level: string;
  title: string;
}

@Injectable()
export class TocService {
  tocList = new ReplaySubject<TocItem[]>(1);
  activeItemIndex$ = new ReplaySubject<number | null>(1);
  activeElement$ = new ReplaySubject<Element | null>(1);
  private scrollSpyToken: ScrollSpyToken | null = null;
  isScrollUp = false;

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private domSanitizer: DomSanitizer,
    private scrollSpyService: ScrollSpyService
  ) {}

  genToc(docElement?: Element, docId = '') {
    this.resetScrollSpyInfo();

    if (!docElement) {
      this.tocList.next([]);
      return;
    }

    const headings = this.findTocHeadings(docElement);
    const idMap = new Map<string, number>();
    const tocList = headings.map(heading => ({
      content: this.extractHeadingSafeHtml(heading),
      href: `${docId}#${this.getId(heading, idMap)}`,
      level: heading.tagName.toLowerCase(),
      title: (heading.textContent || '').trim()
    }));

    this.tocList.next(tocList);

    this.scrollSpyToken = this.scrollSpyService.spyOn(headings, <HTMLElement>docElement, 60);
    this.scrollSpyToken.activeScrollElement$.subscribe(item => {
      this.activeItemIndex$.next(item?.index);
      this.activeElement$.next(item?.element);
    });

    this.scrollSpyToken.isScrollDown$.subscribe(i => {
      this.isScrollUp = !i.isDown;
    });
  }

  reset() {
    this.resetScrollSpyInfo();
    this.tocList.next([]);
  }

  // This bad boy exists only to strip off the anchor link attached to a heading
  private extractHeadingSafeHtml(heading: HTMLHeadingElement) {
    const div: HTMLDivElement = this.document.createElement('div');
    div.innerHTML = heading.innerHTML;
    const anchorLinks: NodeListOf<HTMLAnchorElement> = div.querySelectorAll('a');
    for (let i = 0; i < anchorLinks.length; i++) {
      const anchorLink = anchorLinks[i];
      if (
        !anchorLink.classList.contains('deep-link') &&
        !anchorLink.classList.contains('edit-it')
      ) {
        // this is an anchor that contains actual content that we want to keep
        // move the contents of the anchor into its parent
        const parent = anchorLink.parentNode!;
        while (anchorLink.childNodes.length) {
          parent.insertBefore(anchorLink.childNodes[0], anchorLink);
        }
      }
      // now remove the anchor
      anchorLink.remove();
    }
    // security: the document element which provides this heading content
    // is always authored by the documentation team and is considered to be safe
    return this.domSanitizer.bypassSecurityTrustHtml(div.innerHTML.trim());
  }

  private findTocHeadings(docElement: Element): HTMLHeadingElement[] {
    const headings = docElement.querySelectorAll('h1,h2,h3');
    const skipNoTocHeadings = (heading: HTMLHeadingElement) =>
      !/(?:no-toc|notoc)/i.test(heading.className);

    return Array.prototype.filter.call(headings, skipNoTocHeadings);
  }

  private resetScrollSpyInfo() {
    if (this.scrollSpyToken) {
      this.scrollSpyToken.unSpy();
      this.scrollSpyToken = null;
    }

    this.activeItemIndex$.next(null);
    this.activeElement$.next(null);
  }

  // Extract the id from the heading; create one if necessary
  // Is it possible for a heading to lack an id?
  private getId(h: HTMLHeadingElement, idMap: Map<string, number>) {
    let id = h.id;
    if (id) {
      addToMap(id);
    } else {
      id = (h.textContent || '')
        .trim()
        .toLowerCase()
        .replace(/\W+/g, '-');
      id = addToMap(id);
      h.id = id;
    }
    return id;

    // Map guards against duplicate id creation.
    function addToMap(key: string) {
      const oldCount = idMap.get(key) || 0;
      const count = oldCount + 1;
      idMap.set(key, count);
      return count === 1 ? key : `${key}-${count}`;
    }
  }
}
