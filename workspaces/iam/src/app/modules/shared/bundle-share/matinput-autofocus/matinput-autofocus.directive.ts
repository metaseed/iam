import { Directive, ElementRef, Input, OnInit } from '@angular/core';
import { MatInput } from '@angular/material/input';

@Directive({
  selector: '[matInputAutofocus]',
})
export class AutofocusDirective implements OnInit {

  @Input()
  autofocusSelectValue = false;

  constructor(
    private matInput: MatInput,
    private elRef: ElementRef<HTMLInputElement>,
  ) { }

  ngOnInit(): void {
    setTimeout(() => {
      this.matInput.focus();

      if (this.autofocusSelectValue) {
        const input = this.elRef.nativeElement;
        input.setSelectionRange(0, input.value.length);
      }
    });
  }

}
