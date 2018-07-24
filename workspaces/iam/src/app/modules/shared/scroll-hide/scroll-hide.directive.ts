import { Directive, HostBinding, ElementRef, Input, OnDestroy } from '@angular/core';
import { WindowRef, IContainer } from 'core';
import { Subject, Observable, config, ReplaySubject, asyncScheduler } from 'rxjs';
import { takeUntil, switchMap, subscribeOn } from 'rxjs/operators';

const TRANSITION_DURATION = '.36s';

export interface ScrollHideItem {
  container$: Observable<IContainer>;
  marginTop?: HTMLElement & { _margin?: number };
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

  private _top;
  get top() {
    return this._top;
  }
  set top(v) {
    if (v !== this._top) {
      (this._windowRef.nativeElement as Window).requestAnimationFrame(
        () => (this._elementRef.nativeElement.style.top = v + 'px')
      );
      this._top = v;
    }
  }

  @HostBinding('style.left') left = '0';
  @HostBinding('style.transition-duration') transitionDuration = TRANSITION_DURATION;
  @HostBinding('style.transition-delay') t_d = '0s';
  @HostBinding('style.transition-property') transitionProperty = 'top';
  @HostBinding('style.transition-timing-function') t_f = 'ease-in-out';
  private _hide = false;

  @Input()
  set hide(hideCondition) {
    this._hide = hideCondition;
    if (hideCondition) {
      this.visibility = 'collapse';
    } else {
      this.visibility = 'visible';
      this.setMargin('Set');
    }
  }

  private _hideHeight_minus: number;
  get hideHeight() {
    return this._hideHeight_minus || this.height_minus;
  }
  @Input()
  set hideHeight(v: number) {
    this._hideHeight_minus = -v;
  }

  private _containerItems: ScrollHideItem[];

  setMargin = (o: 'Set' | 'Clear') => {
    if (!this._containerItems) return;
    const v = o === 'Set' ? this.height : 0;

    this._containerItems.forEach(item => {
      const margin = item.marginTop;
      if ((v !== 0 && item.container.scrollTop > this.height) || margin._margin === v) return;
      margin._margin = v;
      (this._windowRef.nativeElement as Window).requestAnimationFrame(
        () => (margin.style.marginTop = v + 'px')
      );
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

    containerItems.forEach(item => {
      const configContainer = (container: IContainer) => {
        const marginElement = item.marginTop || (container.nativeElement as HTMLElement);
        marginElement.style.transitionDuration = TRANSITION_DURATION;
        marginElement.style.transitionProperty = 'margin-top';
        marginElement.style.transitionTimingFunction = 'ease-in-out';
        marginElement.style.marginTop = this.height + 'px';
        item.marginTop = marginElement;
        item.marginTop._margin = this.height;
        item.container = container;
      };

      if (!item.container$ && item.container) {
        const sjt = new ReplaySubject<IContainer>(1);
        item.container$ = sjt;
        sjt.next(item.container);
      }

      let container$ = item.container$;
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
        containerItems.forEach(item => {
          if (item.marginTop !== undefined) {
            item.marginTop.style.transitionProperty = 'none';
          }
        });
      };

      const enableAnimation = () => {
        this.transitionProperty = 'top';
        containerItems.forEach(item => {
          if (item.marginTop !== undefined) {
            item.marginTop.style.transitionProperty = 'margin-top';
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
            this.setMargin('Clear');
            this.top = this.hideHeight;
          } else {
            this.setMargin('Set');
            this.top = 0;
          }
          disableScroll = false;
        });

      let lastY: number;
      let startY: number;
      let isDown: boolean;

      container$
        .pipe(
          takeUntil(this._destroy$),
          switchMap(c => c.touchStart$)
        )
        .subscribe(e => {
          if (this._hide) return;
          disableScroll = true;
          disableAnimation();
          lastY = e.touches[0].clientY;
        });

      container$
        .pipe(
          takeUntil(this._destroy$),
          switchMap(c => c.touchEnd$)
        )
        .subscribe(e => {
          if (this._hide) return;

          if (lastY - startY) {
            // isdown
            if (this.top < this.height_half_minus) {
              this.top = 0;
              this.setMargin('Set');
            } else {
              this.top = this.hideHeight;
              this.setMargin('Clear');
            }
          } else {
            if (this.top > this.height_half_minus) {
              this.top = 0;
              this.setMargin('Set');
            } else {
              this.top = this.hideHeight;
              this.setMargin('Clear');
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
          const delt = y - lastY;
          lastY = y;

          const top = this.top + delt;
          this.top = Math.min(Math.max(this.height_minus, top), 0);

          this._containerItems.forEach(item => {
            if (item.container.scrollTop > this.height) return;
            const margin = item.marginTop;
            let v = margin._margin + delt;
            v = Math.min(Math.max(0, v), this.height);
            if (v !== margin._margin) {
              item.container.scrollTop += delt;
              (this._windowRef.nativeElement as Window).requestAnimationFrame(
                () => (margin.style.marginTop = v + 'px')
              );
              margin._margin = v;
            }
          });
        });
    });
  }

  get height() {
    const v = (this._elementRef.nativeElement as HTMLElement).offsetHeight;
    this.height_minus = -v;
    this.height_half_minus = -v / 2;
    return v;
  }
  height_minus: number;
  height_half_minus: number;

  constructor(private _elementRef: ElementRef, private _windowRef: WindowRef) {}
  ngOnDestroy(): void {
    this._destroy$.next();
  }
}
