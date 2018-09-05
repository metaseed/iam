import { Directive, HostBinding, ElementRef, Input, OnDestroy } from '@angular/core';
import { WindowRef, IContainer } from 'core';
import { Subject, Observable, ReplaySubject, asyncScheduler } from 'rxjs';
import { takeUntil, switchMap, subscribeOn } from 'rxjs/operators';

const TRANSITION_DURATION = '.18s';

export interface ContainerItem {
  container$: Observable<IContainer>;
  elementWithMarginTop?: HTMLElement & { _margin?: number };
  container?: IContainer;
  containerScrollTopOnTouchStart?: number;
}

@Directive({
  selector: '[scrollHide]'
})
export class ScrollHideDirective implements OnDestroy {
  private _destroy$ = new Subject();

  @HostBinding('style.width')
  width = '100%';

  @HostBinding('style.visibility')
  visibility = 'visible';

  @HostBinding('style.position')
  position = 'fixed';

  @HostBinding('style.z-index')
  zIndex = 1000;

  @HostBinding('style.left')
  left = '0';

  @HostBinding('style.transition-duration')
  transitionDuration = TRANSITION_DURATION;
  @HostBinding('style.transition-delay')
  t_d = '0s';
  @HostBinding('style.transition-property')
  transitionProperty = 'top';
  @HostBinding('style.transition-timing-function')
  t_f = 'ease-in-out';

  private _top;
  get top() {
    return this._top;
  }
  set top(v) {
    if (v === this._top) return;
    (this._windowRef.nativeElement as Window).requestAnimationFrame(
      () => (this._elementRef.nativeElement.style.top = v + 'px')
    );
    this._top = v;
  }

  private _hide = false;
  @Input()
  set hide(v) {
    if (v === this._hide) return;
    if (v) {
      this.visibility = 'hidden';
    } else {
      this.visibility = 'visible';
      asyncScheduler.schedule(_ => this.setMargins('Set'));
    }
    this._hide = v;
  }

  @Input()
  set hideHeight(v: number) {
    this._hideHeight_minus = -v;
    this._hideHeight_half_minus = -v / 2;
  }
  private _hideHeight_minus: number;
  private _hideHeight_half_minus: number;
  get hideHeightMinus() {
    return this._hideHeight_minus || this._height_minus;
  }

  get hideHeightHalfMinus() {
    return this._hideHeight_half_minus || this._height_half_minus;
  }

  private _height: number;
  private _height_minus: number;
  private _height_half_minus: number;
  caculateHeight() {
    const v = (this._elementRef.nativeElement as HTMLElement).offsetHeight;
    this._height_minus = -v;
    this._height_half_minus = -v / 2;
    this._height = v;
  }

  private _containerItems: ContainerItem[];

  setMargin = (contariner: ContainerItem, o: 'Set' | 'Clear') => {
    const v = o === 'Set' ? this._height : 0;
    const marginElement = contariner.elementWithMarginTop;
    if (!marginElement || marginElement._margin === v) return;

    const scrollTop = contariner.container.scrollTop;
    // set margin, but scrollTop is big
    if (scrollTop > this._height && v !== 0) {
      return;
    }
    // remove margin, but scrollTop is small
    if (scrollTop > 0 && scrollTop <= this._height && v === 0) {
      return;
    }
    (this._windowRef.nativeElement as Window).requestAnimationFrame(() => {
      marginElement.style.marginTop = v + 'px';
    });
    marginElement._margin = v;
  };

  setMargins = (o: 'Set' | 'Clear') => {
    if (!this._containerItems) return;
    this._containerItems.forEach(item => this.setMargin(item, o));
  };

  @Input()
  set scrollHide(containerItems: ContainerItem[]) {
    if (!containerItems) return;
    if (!Array.isArray(containerItems)) {
      throw new Error('scrollHide attribute should be an array!');
    }
    this._containerItems = containerItems;
  }

  private _deltaSinceTouchStart = 0;

  constructor(private _elementRef: ElementRef, private _windowRef: WindowRef) {
    _windowRef.resizeEvent$.pipe(takeUntil(this._destroy$)).subscribe(e => {
      this.caculateHeight();
    });
  }

  ngOnDestroy(): void {
    this._destroy$.next();
  }

  ngAfterViewInit() {
    this.top = 0; // show it
    const containerItems = this._containerItems;
    if (containerItems.length === 0) return;

    this.caculateHeight();

    containerItems.forEach(item => {
      const configContainer = (container: IContainer) => {
        const marginElement = item.elementWithMarginTop || (container.nativeElement as HTMLElement);
        marginElement.style.transitionDuration = TRANSITION_DURATION;
        marginElement.style.transitionProperty = 'margin-top';
        marginElement.style.transitionTimingFunction = 'ease-in-out';
        marginElement.style.marginTop = this._height + 'px';
        item.elementWithMarginTop = marginElement;
        item.elementWithMarginTop._margin = this._height;
        item.container = container;
      };

      if (!item.container$ && item.container) {
        const sjt = new ReplaySubject<IContainer>(1);
        item.container$ = sjt;
        sjt.next(item.container);
      }

      const container$ = item.container$;
      container$
        .pipe(
          takeUntil(this._destroy$),
          subscribeOn(asyncScheduler)
        )
        .subscribe(container => {
          configContainer(container);
        });

      let disableScroll = false;

      const disableAnimation = () => {
        this.transitionProperty = 'none';
        containerItems.forEach(it => {
          if (it.elementWithMarginTop !== undefined) {
            it.elementWithMarginTop.style.transitionProperty = 'none';
          }
        });
      };

      const enableAnimation = () => {
        this.transitionProperty = 'top';
        containerItems.forEach(it => {
          if (it.elementWithMarginTop !== undefined) {
            it.elementWithMarginTop.style.transitionProperty = 'margin-top';
          }
        });
      };

      container$
        .pipe(
          takeUntil(this._destroy$),
          switchMap(c => c.scrollDown$)
        )
        .subscribe(e => {
          if (disableScroll || this._hide) return;
          disableScroll = true;
          if (e.isDown) {
            this.setMargins('Clear');
            this.top = this.hideHeightMinus;
            // console.log('scrollDown');
          } else {
            this.setMargins('Set');
            this.top = 0;
            // console.log('scrollup');
          }
          disableScroll = false;
        });

      let lastY: number;
      let startY: number;
      container$
        .pipe(
          takeUntil(this._destroy$),
          switchMap(c => c.touchStart$)
        )
        .subscribe(e => {
          if (this._hide) return;

          disableScroll = true;
          disableAnimation();
          // console.log('touchStart: ', e);
          this._containerItems.forEach(it => {
            it.containerScrollTopOnTouchStart = it.container.scrollTop;
          });
          lastY = e.touches[0].clientY;
          startY = lastY;
          this._deltaSinceTouchStart = 0;
        });

      container$
        .pipe(
          takeUntil(this._destroy$),
          switchMap(c => c.touchEnd$)
        )
        .subscribe(e => {
          if (this._hide) return;

          // console.log('touchEnd: ', e);

          const delta = startY - lastY;
          if (delta !== 0) {
            if (this.top > this.hideHeightHalfMinus) {
              this.top = 0;
              this.setMargins('Set');
            } else {
              this.top = this.hideHeightMinus;
              this.setMargins('Clear');
            }
          } else {
            // click
            if (this.top === 0) {
              this.top = this.hideHeightMinus;
              this.setMargins('Clear');
            } else {
              this.top = 0;
              this.setMargins('Set');
            }
          }

          enableAnimation();
          disableScroll = false;
        });

      container$
        .pipe(
          takeUntil(this._destroy$),
          switchMap(c => c.touchMove$)
        )
        .subscribe(e => {
          if (this._hide) return;

          const y = e.touches[0].clientY;
          // -: content move up -> toolbar hide;
          // +: content move down -> toolbar show;
          const deltSinceLastTouchMove = y - lastY;
          lastY = y;

          const top = this.top + deltSinceLastTouchMove;
          this._deltaSinceTouchStart = this._deltaSinceTouchStart + deltSinceLastTouchMove;
          // [-height,0]
          this.top = Math.min(Math.max(this.hideHeightMinus, top), 0);
          console.log('top', this.top);
          // console.log('touchMove: ', e, top);
          this._containerItems.forEach(it => {
            /* get scrollTop of container*/
            const scrollTop = it.containerScrollTopOnTouchStart - this._deltaSinceTouchStart;
            // console.log(scrollTop, it.containerScrollTopOnTouchStart, this._deltaSinceTouchStart);
            const marginElement = it.elementWithMarginTop;
            if (scrollTop >= this._height && marginElement._margin === 0) return;

            // console.log(marginValue);
            (this._windowRef.nativeElement as Window).requestAnimationFrame(() => {
              // [0, height]
              const marginValue = this._height + this.top;
              marginElement.style.marginTop = marginValue + 'px';
              marginElement._margin = marginValue;
              it.container.scrollTop -= marginValue;
            });
          });
        });
    });
  }
}
