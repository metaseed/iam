import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  QueryList,
  ViewChildren
} from '@angular/core';
import { startWith, subscribeOn, tap } from 'rxjs/operators';
import { combineLatest, asapScheduler } from 'rxjs'; // rxjs 6
import { TocItem, TocService } from '../../services/toc.service';
import { SubscriptionManager } from 'core';
import { Title } from '@angular/platform-browser';
import { BreakpointObserver } from '@angular/cdk/layout';
import { Breakpoints } from '@angular/cdk/layout';
import { BreakpointState } from '@angular/cdk/layout';
import { Location } from '@angular/common';

type TocType = 'None' | 'Floating' | 'EmbeddedSimple' | 'EmbeddedExpandable';

@Component({
  selector: 'i-toc',
  host: {
    '(document:click)': 'onDocumentClick($event)'
  },
  templateUrl: 'toc.component.html'
})
export class TocComponent extends SubscriptionManager implements OnInit, AfterViewInit, OnDestroy {
  activeIndex: number | null = null;
  type: TocType = 'None';

  show = true;
  isSmallScreen: boolean;
  isCollapsed = true;
  isEmbedded = false;
  h1Count: number;
  @ViewChildren('tocItem')
  private items: QueryList<ElementRef>;
  public primaryMax = 4;
  private scrollContainer: Element;
  tocList: TocItem[];

  static prepareTitleAndToc(
    targetElem: HTMLElement,
    docId: string,
    tocService: TocService,
    titleService: Title
  ): () => void {
    const h1Title = targetElem.querySelector('h1');
    const needsToc = !!h1Title && !/no-?toc/i.test(h1Title.className);
    const embeddedToc = targetElem.querySelector('i-toc.embedded');

    if (needsToc && !embeddedToc) {
      // Add an embedded ToC if it's needed and there isn't one in the content already.
      h1Title.insertAdjacentHTML('afterend', '<i-toc></i-toc>');
    } else if (!needsToc && embeddedToc) {
      // Remove the embedded Toc if it's there and not needed.
      embeddedToc.remove();
    }

    return () => {
      tocService.reset();
      let title: string | null = '';

      // Only create ToC for docs with an `<h1>` heading.
      // If you don't want a ToC, add "no-toc" class to `<h1>`.
      if (h1Title) {
        title = typeof h1Title.innerText === 'string' ? h1Title.innerText : h1Title.textContent;

        if (needsToc) {
          tocService.genToc(targetElem, docId);
        }
      }

      titleService.setTitle(title ? `I'm - ${title}` : "I'm");
    };
  }

  constructor(
    breakpointObserver: BreakpointObserver,
    public tocService: TocService,
    private elementRef: ElementRef,
    private location: Location
  ) {
    super();
    breakpointObserver.observe([Breakpoints.Small, Breakpoints.XSmall]).subscribe((state: BreakpointState) => {
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
    super.addSub(
      this.tocService.tocList.pipe(
        subscribeOn(asapScheduler),
        tap(tocList => {
          this.h1Count = count(tocList, item => item.level !== 'h1');
          this.type =
            this.h1Count > 0
              ? this.isEmbedded
                ? this.h1Count > this.primaryMax
                  ? 'EmbeddedExpandable'
                  : 'EmbeddedSimple'
                : 'Floating'
              : 'None';
          this.tocList = tocList;
        })
      )
    );
  }

  ngAfterViewInit() {
    this.scrollContainer = document.getElementsByClassName('viewer-container')[0];
    if (!this.isEmbedded) {
      // We use the `asap` scheduler because updates to `activeItemIndex$` are triggered by DOM changes,
      // which, in turn, are caused by the rendering that happened due to a ChangeDetection.
      // Without asap, we would be updating the model while still in a ChangeDetection handler, which is disallowed by Angular.
      super.addSub(
        combineLatest([
          this.tocService.activeItemIndex$.pipe(subscribeOn(asapScheduler)),
          this.items.changes.pipe(startWith(this.items))])
          .subscribe(([index, items]: [number, QueryList<ElementRef<any>>]) => {
            this.activeIndex = index;
            if (index === null || index === undefined || index >= items.length) {
              return;
            }

            const e: HTMLElement = items.toArray()[index].nativeElement;
            const p = e.offsetParent;
            if (!p) return;
            const eRect = e.getBoundingClientRect();
            const pRect = p.getBoundingClientRect();

            const isInViewport = eRect.top >= pRect.top && eRect.bottom <= pRect.bottom;

            if (!isInViewport) {
              p.scrollTop += eRect.top - (pRect.top + p.clientHeight / 2);
            }
          }));
    }
  }

  toggle(canScroll = true) {
    this.isCollapsed = !this.isCollapsed;
    if (canScroll && this.isCollapsed) {
      this.toTop();
    }
  }

  onDocumentClick(event) {
    if (!this.elementRef.nativeElement.contains(event.target)) {
      this.show = false;
    }
  }

  navigate(addr) {
    if (this.isSmallScreen) this.show = false;
  }

  toTop() {
    const element = this.scrollContainer;
    (function smoothscroll() {
      var currentScroll = element.scrollTop;
      if (currentScroll > 0) {
        window.requestAnimationFrame(smoothscroll);
        element.scrollTop = currentScroll - (currentScroll / 5);
      }
    })();
  }

  toggleToc() {
    this.show = !this.show;
  }
}

function count<T>(array: T[], fn: (item: T) => boolean) {
  return array.reduce((count, item) => (fn(item) ? count + 1 : count), 0);
}
