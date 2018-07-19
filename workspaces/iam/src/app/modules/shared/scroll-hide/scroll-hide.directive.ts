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
  padding: HTMLElement;
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
    if (hideCondition) {
      this.visibility = 'collapse';
    } else {
      this.visibility = 'visible';
    }
    this.height = this._elementRef.nativeElement.getBoundingClientRect().height;
  }

  private _containerItems: ScrollHideItem[];

  @Input()
  set scrollHide(containerItems: ScrollHideItem[]) {
    if (!containerItems) return;
    if (!Array.isArray(containerItems)) {
      throw 'scrollHide attribute should be an array!';
    }
    this._containerItems = containerItems;
  }

  ngAfterViewInit() {
    const containerItems = this._containerItems;
    if (containerItems.length === 0) return;

    this.height = this._elementRef.nativeElement.getBoundingClientRect().height;
    containerItems.forEach(item => {
      let container$ = item.container$;

      container$.pipe(takeUntil(this._destroy$)).subscribe(container => {
        const c = item.padding || (container.nativeElement as HTMLElement);
        c.style.transitionDuration = '0.5s';
        c.style.transitionProperty = 'padding-top';
        c.style.transitionTimingFunction = 'ease-in-out';

        this.paddingElements.push(c);
      });

      const setPadding = () => {
        this.paddingElements.forEach(con => {
          if (con.scrollTop > this.height || con._padding === this.height) return;
          con._padding = this.height;
          con.style.paddingTop = this.height + 'px';
        });
      };

      const removePadding = () => {
        this.paddingElements.forEach(c => {
          if (c.scrollTop > this.height || c._padding === 0) return;
          c._padding = 0;
          c.style.paddingTop = '0px';
        });
      };

      setTimeout(_ => setPadding(), 0);

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
            removePadding();
          } else {
            this.top = 0;
            setPadding();
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
            setPadding();
          } else {
            this.top = this.height_minus;
            removePadding();
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

  private paddingElements: Array<HTMLElement & { _padding?: number }> = [];
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
