import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  QueryList,
  ViewChildren
} from '@angular/core';
import { startWith, takeUntil /*, subscribeOn */, subscribeOn } from 'rxjs/operators';
import { Subject, combineLatest, asapScheduler } from 'rxjs'; // rxjs 6
import { TocItem, TocService } from '../../services/toc.service';
import { ScrollService } from 'core';
import { Title } from '@angular/platform-browser';
import { BreakpointObserver } from '@angular/cdk/layout';
import { Breakpoints } from '@angular/cdk/layout';
import { BreakpointState } from '@angular/cdk/layout';
import { Location } from '@angular/common';

type TocType = 'None' | 'Floating' | 'EmbeddedSimple' | 'EmbeddedExpandable';

@Component({
  selector: 'i-toc',
  host: {
    '(document:click)': 'onClick($event)'
  },
  templateUrl: 'toc.component.html'
})
export class TocComponent implements OnInit, AfterViewInit, OnDestroy {
  activeIndex: number | null = null;
  type: TocType = 'None';

  show = true;
  isSmallScreen: boolean;
  isCollapsed = true;
  isEmbedded = false;
  @ViewChildren('tocItem')
  private items: QueryList<ElementRef>;
  private onDestroy = new Subject();
  public primaryMax = 4;
  tocList: TocItem[];

  static prepareTitleAndToc(
    targetElem: HTMLElement,
    docId: string,
    tocService: TocService,
    titleService: Title
  ): () => void {
    const titleEl = targetElem.querySelector('h1');
    const needsToc = !!titleEl && !/no-?toc/i.test(titleEl.className);
    const embeddedToc = targetElem.querySelector('i-toc.embedded');

    if (needsToc && !embeddedToc) {
      // Add an embedded ToC if it's needed and there isn't one in the content already.
      titleEl!.insertAdjacentHTML('afterend', '<i-toc></i-toc>');
    } else if (!needsToc && embeddedToc) {
      // Remove the embedded Toc if it's there and not needed.
      embeddedToc.remove();
    }

    return () => {
      tocService.reset();
      let title: string | null = '';

      // Only create ToC for docs with an `<h1>` heading.
      // If you don't want a ToC, add "no-toc" class to `<h1>`.
      if (titleEl) {
        title = typeof titleEl.innerText === 'string' ? titleEl.innerText : titleEl.textContent;

        if (needsToc) {
          tocService.genToc(targetElem, docId);
        }
      }

      // titleService.setTitle(title ? `Angular - ${title}` : "Angular");
    };
  }

  constructor(
    private bm: BreakpointObserver,
    private scrollService: ScrollService,
    public tocService: TocService,
    private elementRef: ElementRef,
    private location: Location
  ) {
    bm.observe([Breakpoints.Small, Breakpoints.XSmall]).subscribe((state: BreakpointState) => {
      if (state.matches) {
        this.show = false;
        this.isSmallScreen = true;
      } else {
        this.show = true;
        this.isSmallScreen = false;
      }
    });
    this.isEmbedded = elementRef.nativeElement.className.indexOf('embedded') !== -1;
  }

  ngOnInit() {
    this.tocService.tocList
      .pipe(
        takeUntil(this.onDestroy),
        subscribeOn(asapScheduler)
      )
      .subscribe(tocList => {
        const itemCount = count(tocList, item => item.level !== 'h1');

        this.type =
          itemCount > 0
            ? this.isEmbedded
              ? itemCount > this.primaryMax
                ? 'EmbeddedExpandable'
                : 'EmbeddedSimple'
              : 'Floating'
            : 'None';
        this.tocList = tocList;
      });
  }

  ngAfterViewInit() {
    if (!this.isEmbedded) {
      // We use the `asap` scheduler because updates to `activeItemIndex` are triggered by DOM changes,
      // which, in turn, are caused by the rendering that happened due to a ChangeDetection.
      // Without asap, we would be updating the model while still in a ChangeDetection handler, which is disallowed by Angular.
      combineLatest(
        this.tocService.activeItemIndex.pipe(subscribeOn(asapScheduler)),
        this.items.changes.pipe(startWith(this.items))
      )
        .pipe(takeUntil(this.onDestroy))
        .subscribe(([index, items]) => {
          this.activeIndex = index;
          if (index === null || index >= items.length) {
            return;
          }

          const e: HTMLElement = items.toArray()[index].nativeElement;
          const p = e.offsetParent;
          if (!p) return;
          const eRect = e.getBoundingClientRect();
          const pRect = p.getBoundingClientRect();

          const isInViewport = eRect.top >= pRect.top && eRect.bottom <= pRect.bottom;

          if (!isInViewport) {
            p.scrollTop += eRect.top - pRect.top - p.clientHeight / 2;
          }
        });
    }
  }

  ngOnDestroy() {
    this.onDestroy.next();
  }

  toggle(canScroll = true) {
    this.isCollapsed = !this.isCollapsed;
    if (canScroll && this.isCollapsed) {
      this.toTop();
    }
  }
  onClick(event) {
    if (!this.elementRef.nativeElement.contains(event.target)) {
      this.show = false;
    }
  }
  navigate(addr) {
    if (this.isSmallScreen) this.show = false;
  }

  toTop() {
    this.scrollService.scrollToTop();
  }
  toggleToc() {
    this.show = !this.show;
  }
}

function count<T>(array: T[], fn: (item: T) => boolean) {
  return array.reduce((count, item) => (fn(item) ? count + 1 : count), 0);
}
