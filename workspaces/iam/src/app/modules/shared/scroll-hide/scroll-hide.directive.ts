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
import { transition } from '@angular/animations';

@Directive({
  selector: '[scrollHide]'
})
export class ScrollHideDirective implements AfterViewInit, OnDestroy {
  ngAfterViewInit() {
    const height = this._elementRef.nativeElement.getBoundingClientRect().height;
    (this._containerRef.container as HTMLElement).style.paddingTop = height + 'px';
  }
  ngOnDestroy(): void {
    this._destroy$.next();
  }
  private _destroy$ = new Subject();
  private _containerRef: ContainerRef;
  private _scrollDownSub: Subscription;

  @HostBinding('style.width') width = '100%';
  @HostBinding('style.position') position = 'fixed';
  @HostBinding('style.transform') transform = 'translateY(0)';
  @HostBinding('style.z-index') zIndex = 1000;
  @HostBinding('style.top') top = 0;
  @HostBinding('style.left') left = 0;
  @HostBinding('style.transition-duration') transitionDuration = '.4s';
  @HostBinding('style.transition-delay') t_d = '0s';
  @HostBinding('style.transition-property') t_p = 'transform';
  @HostBinding('style.transition-timing-function') t_f = 'ease-in-out';

  private _hide = false;
  @Input()
  set hide(hideCondition) {
    this._hide = hideCondition;
  }

  @Input()
  set scrollHide(container: HTMLElement) {
    if (!container) return;
    if (this._scrollDownSub) this._scrollDownSub.unsubscribe();

    this._containerRef = new ContainerRef(container);
    let position = 0;
    let disableScroll = false;

    this._scrollDownSub = this._containerRef.scrollDown$
      .pipe(takeUntil(this._destroy$))
      .subscribe(e => {
        if (disableScroll) return;
        height = height || this._elementRef.nativeElement.getBoundingClientRect().height;
        if (e.scrollTop <= 1) {
          container.style.paddingTop = height + 'px';
        } else {
          container.style.paddingTop = '0';
        }

        if (e.isDown || this._hide) {
          position = -1;
          this.transform = 'translateY(-100%)';
        } else {
          position = 0;
          this.transform = 'translateY(0)';
        }
      });

    let startY: number;
    let height: number;

    this._containerRef.touchStart$.pipe(takeUntil(this._destroy$)).subscribe(e => {
      disableScroll = true;
      height = this._elementRef.nativeElement.getBoundingClientRect().height;

      startY = e.touches[0].clientY;
      this.transitionDuration = '.2s';
    });

    this._containerRef.touchEnd$.pipe(takeUntil(this._destroy$)).subscribe(e => {
      this.transitionDuration = '.4s';
      if (position > -0.5) {
        position = 0;
        this.transform = 'translateY(0)';
      } else {
        position = -1;
        this.transform = 'translateY(-100%)';
      }
      disableScroll = false;
    });

    this._containerRef.touchMove$.pipe(takeUntil(this._destroy$)).subscribe(e => {
      const y = e.touches[0].clientY;
      const delt = y - startY;
      const delt_per = delt / height;

      position = position + delt_per;
      position = Math.min(Math.max(position, -1), 0);

      if (position === -1) {
        container.style.paddingTop = '0';
      } else {
        container.style.paddingTop = height + 'px';
      }
      this.transform = `translateY(${position * 100}%)`;
    });
  }

  constructor(private _viewContainer: ViewContainerRef, private _elementRef: ElementRef) {}
}
