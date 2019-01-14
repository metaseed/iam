import {
  Component,
  ViewChild,
  ElementRef,
  HostListener,
  EventEmitter,
  Input,
  Output,
  OnChanges,
  SimpleChanges
} from '@angular/core';

@Component({
  selector: 'split-pane',
  template: '',
  host: { style: 'height: 100%' }
})
export class SplitPaneComponent implements OnChanges {
  @ViewChild('primaryComponent')
  primaryComponent: ElementRef;
  @ViewChild('secondaryComponent')
  secondaryComponent: ElementRef;

  @Input('primary-component-initialratio')
  initialRatio: number = 0.5;
  @Input('primary-component-minsize')
  primaryMinSize: number = 0;
  @Input('secondary-component-minsize')
  secondaryMinSize: number = 0;
  @Input('separator-thickness')
  separatorThickness: number = 6;
  @Input('primary-component-toggled-off')
  primaryToggledOff: boolean = false;
  @Input('secondary-component-toggled-off')
  secondaryToggledOff: boolean = false;
  @Input('local-storage-key')
  localStorageKey: string = null;
  @Output('on-change')
  notifySizeDidChange: EventEmitter<any> = new EventEmitter<any>();
  @Output('on-begin-resizing')
  notifyBeginResizing: EventEmitter<any> = new EventEmitter<any>();
  @Output('on-ended-resizing')
  notifyEndedResizing: EventEmitter<any> = new EventEmitter<any>();

  primarySizeBeforeTogglingOff: number;
  secondarySizeBeforTogglingOff: number;
  dividerSize: number = 8.0;
  isResizing: boolean = false;

  ngAfterViewInit() {
    this.checkBothToggledOff();

    if (!this.primaryToggledOff && !this.secondaryToggledOff) {
      let ratio: number = this.initialRatio;
      if (this.localStorageKey != null) {
        let ratioStr = localStorage.getItem(this.localStorageKey);
        if (ratioStr != null) {
          ratio = JSON.parse(ratioStr);
        }
      }

      let size = ratio * this.getTotalSize();
      this.applySizeChange(size);
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    this.checkBothToggledOff();

    if (changes['primaryToggledOff']) {
      if (changes['primaryToggledOff'].currentValue === true) {
        this.primarySizeBeforeTogglingOff = this.getPrimarySize();
        this.secondarySizeBeforTogglingOff = this.getSecondarySize();
        this.applySizeChange(0);
      } else {
        const size =
          (this.getAvailableSize() * this.primarySizeBeforeTogglingOff) /
          (this.primarySizeBeforeTogglingOff + this.secondarySizeBeforTogglingOff);
        this.applySizeChange(size);
      }
    } else if (changes['secondaryToggledOff']) {
      if (changes['secondaryToggledOff'].currentValue === true) {
        this.primarySizeBeforeTogglingOff = this.getPrimarySize();
        this.secondarySizeBeforTogglingOff = this.getSecondarySize();
        this.applySizeChange(this.getTotalSize());
      } else {
        const size =
          (this.getAvailableSize() * this.primarySizeBeforeTogglingOff) /
          (this.primarySizeBeforeTogglingOff + this.secondarySizeBeforTogglingOff);
        this.applySizeChange(size);
      }
    }
  }

  getTotalSize(): number {
    throw "SplitPaneComponent shouldn't be instantiated. Override this method.";
  }

  getPrimarySize(): number {
    throw "SplitPaneComponent shouldn't be instantiated. Override this method.";
  }

  getSecondarySize(): number {
    throw "SplitPaneComponent shouldn't be instantiated. Override this method.";
  }

  dividerPosition(size: number): void {
    throw "SplitPaneComponent shouldn't be instantiated. Override this method.";
  }

  getAvailableSize(): number {
    return this.getTotalSize() - this.dividerSize;
  }

  applySizeChange(size: number) {
    let primarySize = this.checkValidBounds(
      size,
      this.primaryMinSize,
      this.getAvailableSize() - this.secondaryMinSize
    );

    if (this.primaryToggledOff) {
      primarySize = 0;
    } else if (this.secondaryToggledOff) {
      primarySize = this.getTotalSize();
    }

    this.dividerPosition(primarySize);
    const ps = this.getPrimarySize();
    if (ps !== primarySize) {
      setTimeout(
        _ =>
          this.notifySizeDidChange.emit({
            primary: this.getPrimarySize(),
            secondary: this.getSecondarySize()
          }),
        0
      );
      return;
    }
    this.notifySizeDidChange.emit({
      primary: this.getPrimarySize(),
      secondary: this.getSecondarySize()
    });
  }

  notifyWillChangeSize(resizing: boolean) {
    this.isResizing = resizing;
    this.notifyBeginResizing.emit();
  }

  checkValidBounds(newSize: number, minSize: number, maxSize: number): number {
    return newSize >= minSize ? (newSize <= maxSize ? newSize : maxSize) : minSize;
  }

  checkBothToggledOff() {
    // We do not allow both the primary and secondary content to be toggled off
    // at the same time, because then it would be very confusing.
    if (this.primaryToggledOff && this.secondaryToggledOff) {
      console.warn('You cannot toggle off both the primary and secondary component');
    }
  }

  stopResizing() {
    this.isResizing = false;
    this.primaryComponent.nativeElement.style.cursor = 'auto';
    this.secondaryComponent.nativeElement.style.cursor = 'auto';

    if (this.localStorageKey != null) {
      const ratio = this.getPrimarySize() / this.getTotalSize();
      localStorage.setItem(this.localStorageKey, JSON.stringify(ratio));
    }

    this.notifyEndedResizing.emit();
  }

  @HostListener('mouseup', ['$event'])
  @HostListener('touchend', ['$event'])
  onMouseup(event) {
    if (this.isResizing) {
      this.stopResizing();
      return false;
    }
  }
}
