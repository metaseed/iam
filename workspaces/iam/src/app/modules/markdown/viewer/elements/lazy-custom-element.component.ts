import { Component, ElementRef, Input, OnInit } from '@angular/core';
import { ElementsLoader } from './elements-loader';
import { LogService } from 'core';

@Component({
  selector: 'i-l',
  template: ''
})
export class LazyCustomElementComponent implements OnInit {
  @Input()
  selector = '';

  constructor(
    private elementRef: ElementRef,
    private elementsLoader: ElementsLoader,
    private logger: LogService
  ) {}

  ngOnInit() {
    if (!this.selector || /[^\w-]/.test(this.selector)) {
      this.logger.error(new Error(`Invalid selector for 'i-l': ${this.selector}`));
      return;
    }

    this.elementRef.nativeElement.innerHTML = `<${this.selector}></${this.selector}>`;
    this.elementsLoader.loadCustomElement(this.selector);
  }
}
