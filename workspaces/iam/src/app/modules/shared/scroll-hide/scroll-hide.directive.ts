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
  padding: HTMLElement;
}

@Directive({
  selector: '[scrollHide]'
})
export class ScrollHideDirective implements AfterViewInit, OnDestroy {
  containers: Array<ScrollHideItem>;
  private _destroy$ = new Subject();

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
    if (hideCondition) {
      this.transform = 'translateY(-100%)';
    } else {
      this.transform = 'translateY(0)';
    }
  }

  @Input()
  set scrollHide(containers) {
    if (!containers) return;
    if (!Array.isArray(containers)) {
      throw 'scrollHide attribute should be an array!';
    }
    this.containers = containers;
  }

  constructor(private _viewContainer: ViewContainerRef, private _elementRef: ElementRef) {}

  ngAfterViewInit() {
    if (this.containers.length === 0) return;

    this.containers.forEach(item => {
      let container = item.container;
      if (container instanceof Function) {
        container = container();
      }
      let paddingElement = item.padding || container;

      const containerRef = new ContainerRef(container);
      let position = 0;
      let disableScroll = false;
      let height = this._elementRef.nativeElement.getBoundingClientRect().height;
      paddingElement.style.paddingTop = height + 'px';
      containerRef.scrollDown$
        .pipe(takeUntil(this._destroy$))
        .subscribe(e => {
          if (disableScroll) return;
          height = this._elementRef.nativeElement.getBoundingClientRect().height;
          if (e.scrollTop <= 1) {
            paddingElement.style.paddingTop = height + 'px';
          } else {
            paddingElement.style.paddingTop = '0';
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

      containerRef.touchStart$.pipe(takeUntil(this._destroy$)).subscribe(e => {
        disableScroll = true;
        height = this._elementRef.nativeElement.getBoundingClientRect().height;

        startY = e.touches[0].clientY;
        this.transitionDuration = '.2s';
      });

      containerRef.touchEnd$.pipe(takeUntil(this._destroy$)).subscribe(e => {
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

      containerRef.touchMove$.pipe(takeUntil(this._destroy$)).subscribe(e => {
        const y = e.touches[0].clientY;
        const delt = y - startY;
        const delt_per = delt / height;

        position = position + delt_per;
        position = Math.min(Math.max(position, -1), 0);

        if (position === -1) {
          paddingElement.style.paddingTop = '0';
        } else {
          paddingElement.style.paddingTop = height + 'px';
        }
        this.transform = `translateY(${position * 100}%)`;
      });
    });
  }
  ngOnDestroy(): void {
    this._destroy$.next();
  }
}
