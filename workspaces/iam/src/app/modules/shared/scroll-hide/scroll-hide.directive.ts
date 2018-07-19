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
import { ContainerRef, WindowRef, IContainer } from 'core';
import { Subject, Subscription, Observable } from 'rxjs';
import { takeUntil, switchMap, map } from 'rxjs/operators';

export interface ScrollHideItem {
  container$: Observable<IContainer>;
  padding?: HTMLElement & { _padding?: number };
  container?: IContainer;
}

@Directive({
  selector: '[scrollHide]'
})
export class ScrollHideDirective implements OnDestroy {
  private _destroy$ = new Subject();

  @HostBinding('style.width') width = '100%';
  @HostBinding('style.visibility') visibility = 'visible';
  @HostBinding('style.position') position = 'fixed';
  @HostBinding('style.z-index') zIndex = 1000;
  // @HostBinding('style.top') top_px = '0px';
  private _top;
  get top() {
    return this._top;
  }
  set top(v) {
    if (v !== this._top) {
      this._elementRef.nativeElement.style.top = v + 'px';
      // (this._windowRef.nativeElement as Window).requestAnimationFrame(
      //   timestamp => (this._elementRef.nativeElement.style.top = v + 'px')
      // );
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
    this.height = this._elementRef.nativeElement.getBoundingClientRect().height;
    if (hideCondition) {
      this.visibility = 'collapse';
    } else {
      this.visibility = 'visible';
      this.setPadding();
    }
  }

  private _containerItems: ScrollHideItem[];
  setPadding = () => {
    if (!this._containerItems) return;
    this._containerItems.forEach(item => {
      const padding = item.padding;
      if (item.container.scrollTop > this.height || padding._padding === this.height) return;
      padding._padding = this.height;
      padding.style.paddingTop = this.height + 'px';
    });
  };

  removePadding = () => {
    if (!this._containerItems) return;
    this._containerItems.forEach(item => {
      const padding = item.padding;
      if (item.container.scrollTop > this.height && padding._padding === 0) return;
      padding._padding = 0;
      padding.style.paddingTop = '0px';
    });
  };
  @Input()
  set scrollHide(containerItems: ScrollHideItem[]) {
    if (!containerItems) return;
    if (!Array.isArray(containerItems)) {
      throw 'scrollHide attribute should be an array!';
    }
    this._containerItems = containerItems;
  }

  ngAfterViewInit() {
    this.top = 0;
    const containerItems = this._containerItems;
    if (containerItems.length === 0) return;

    this.height = this._elementRef.nativeElement.getBoundingClientRect().height;
    containerItems.forEach(item => {
      let container$ = item.container$;

      container$.pipe(takeUntil(this._destroy$)).subscribe(container => {
        const padding = item.padding || (container.nativeElement as HTMLElement);
        padding.style.transitionDuration = '0.5s';
        padding.style.transitionProperty = 'padding-top';
        padding.style.transitionTimingFunction = 'ease-in-out';
        padding.style.paddingTop = this.height + 'px';
        item.padding = padding;
        item.container = container;
      });

      let disableScroll = false;

      container$
        .pipe(
          takeUntil(this._destroy$),
          switchMap(c => c.scrollDown$)
        )
        .subscribe(e => {
          if (disableScroll || this._hide) return;
          disableScroll = true;
          if (e.isDown) {
            this.top = this.height_minus;
            this.removePadding();
          } else {
            this.top = 0;
            this.setPadding();
          }
          disableScroll = false;
        });

      let startY: number;

      container$
        .pipe(
          takeUntil(this._destroy$),
          switchMap(c => c.touchStart$)
        )
        .subscribe(e => {
          if (this._hide) return;
          disableScroll = true;
          this.transitionDuration = '.2s';
          startY = e.touches[0].clientY;
        });

      container$
        .pipe(
          takeUntil(this._destroy$),
          switchMap(c => c.touchMove$)
        )
        .subscribe(e => {
          if (this._hide) return;
          this.transitionDuration = '.5s';
          if (this.top > this.height_half_minus) {
            this.top = 0;
            this.setPadding();
          } else {
            this.top = this.height_minus;
            this.removePadding();
          }
          disableScroll = false;
        });

      container$
        .pipe(
          takeUntil(this._destroy$),
          switchMap(c => c.touchEnd$)
        )
        .subscribe(e => {
          if (this._hide) return;

          const y = e.touches[0].clientY;
          const delt = y - startY;
          let top = this.top + delt;

          top = Math.min(Math.max(this.height_minus, top), 0);
          this.top = top;
        });
    });
  }

  private _height: number;
  get height() {
    return this._height;
  }
  height_minus: number;
  height_half_minus: number;

  set height(v) {
    this._height = v;
    this.height_minus = -v;
    this.height_half_minus = -v / 2;
  }
  constructor(
    private _viewContainer: ViewContainerRef,
    private _elementRef: ElementRef,
    private _windowRef: WindowRef
  ) {}
  ngOnDestroy(): void {
    this._destroy$.next();
  }
}
