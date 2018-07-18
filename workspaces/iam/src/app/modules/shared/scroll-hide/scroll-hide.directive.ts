import {
  Directive,
  HostBinding,
  ElementRef,
  Input,
  ViewContainerRef,
  OnDestroy,
  OnInit,
  AfterViewInit
} from '@angular/core';
import { ContainerRef } from 'core';
import { Subject, Subscription } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

export interface ScrollHideItem {
  container: HTMLElement;
  padding?: HTMLElement & { _padding?: number };
  paddingAlways?: boolean;
}

@Directive({
  selector: '[scrollHide]'
})
export class ScrollHideDirective implements AfterViewInit, OnDestroy {
  containers: Array<ScrollHideItem>;
  private _destroy$ = new Subject();

  @HostBinding('style.width') width = '100%';
  @HostBinding('style.visibility') visibility = 'visible';
  @HostBinding('style.position') position = 'fixed';
  @HostBinding('style.z-index') zIndex = 1000;
  // @HostBinding('style.top') top_px = '0px';
  private _top = 0;
  get top() {
    return this._top;
  }
  set top(v) {
    if (v !== this._top) {
      this._elementRef.nativeElement.style.top = v + 'px';
      this._top = v;
    }
  }
  @HostBinding('style.left') left = '0';
  @HostBinding('style.transition-duration') transitionDuration = '.5s';
  @HostBinding('style.transition-delay') t_d = '0s';
  @HostBinding('style.transition-property') t_p = 'top';
  @HostBinding('style.transition-timing-function') t_f = 'ease-in-out';
  private _hide = false;
  @Input()
  set hide(hideCondition) {
    this._hide = hideCondition;
    if (hideCondition) {
      this.visibility = 'collapse';
    } else {
      this.visibility = 'visible';
    }
  }

  @Input()
  @Input()
  set scrollHide(containers: ScrollHideItem[]) {
    if (!containers) return;
    if (!Array.isArray(containers)) {
      throw 'scrollHide attribute should be an array!';
    }
    this.containers = containers;
  }

  constructor(private _viewContainer: ViewContainerRef, private _elementRef: ElementRef) {}

  ngAfterViewInit() {
    if (this.containers.length === 0) return;

    const height = this._elementRef.nativeElement.getBoundingClientRect().height;
    const height_minus = -height;
    const height_half_minus = height_minus / 2;

    this.containers.forEach(item => {
      let container = item.container;
      if (container instanceof Function) {
        container = container();
        item.container = container;
      }
      if (!item.padding) item.padding = container;
      const p = item.padding;
      if (p) {
        p.style.transitionDuration = '0.5s';
        p.style.transitionProperty = 'padding-top';
        p.style.transitionTimingFunction = 'ease-in-out';
      }

      const setPadding = () => {
        this.containers.forEach(c => {
          const e = c.padding;
          if ((!c.paddingAlways && c.container.scrollTop > height) || e._padding === height) return;
          e._padding = height;
          e.style.paddingTop = height + 'px';
        });
      };

      const removePadding = () => {
        this.containers.forEach(c => {
          const e = c.padding;
          if ((!c.paddingAlways && c.container.scrollTop > height) || e._padding === 0) return;
          e._padding = 0;
          e.style.paddingTop = '0px';
        });
      };

      setPadding();
      const containerRef = new ContainerRef(container);

      let disableScroll = false;

      containerRef.scrollDown$.pipe(takeUntil(this._destroy$)).subscribe(e => {
        if (disableScroll || this._hide) return;
        disableScroll = true;
        if (e.isDown) {
          this.top = height_minus;
          removePadding();
        } else {
          this.top = 0;
          setPadding();
        }
        disableScroll = false;
      });

      let startY: number;

      containerRef.touchStart$.pipe(takeUntil(this._destroy$)).subscribe(e => {
        if (this._hide) return;
        disableScroll = true;
        this.transitionDuration = '.2s';
        startY = e.touches[0].clientY;
      });

      containerRef.touchEnd$.pipe(takeUntil(this._destroy$)).subscribe(e => {
        if (this._hide) return;
        this.transitionDuration = '.5s';
        if (this.top > height_half_minus) {
          this.top = 0;
          setPadding();
        } else {
          this.top = height_minus;
          removePadding();
        }
        disableScroll = false;
      });

      containerRef.touchMove$.pipe(takeUntil(this._destroy$)).subscribe(e => {
        if (this._hide) return;

        const y = e.touches[0].clientY;
        const delt = y - startY;
        let top = this.top + delt;

        top = Math.min(Math.max(height_minus, top), 0);
        this.top = top;
      });
    });
  }
  ngOnDestroy(): void {
    this._destroy$.next();
  }
}
