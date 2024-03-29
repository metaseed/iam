/* eslint-disable  @angular-eslint/component-selector */
import {
  Component,
  HostBinding,
  ElementRef,
  ViewChild,
  Input,
  AfterViewInit
} from '@angular/core';
import { CodeComponent } from './code.component';

/**
 * An embeddable code block that displays nicely formatted code.
 * Example usage:
 *
 ```
 <i-code language="ts" linenums="2" class="special" title="Do Stuff">
 // a code block
 console.log('do stuff');
 </i-code>
  ```
 */
@Component({
  selector: 'i-code',
  template: `
    <!-- Content projection is used to get the content HTML provided to this component -->
    <div #content style="display: none"><ng-content></ng-content></div>

    <header *ngIf="title">{{title}}</header>

    <iam-code [ngClass]="classes"
              [language]="language"
              [linenums]="linenums"
              [path]="path"
              [region]="region"
              [hideCopy]="hidecopy"
              [title]="title">
    </iam-code>
  `
})
export class CodeExampleComponent implements AfterViewInit {
  classes: {};

  @Input() language: string;

  @Input() linenums: string;

  @Input() region: string;

  @Input()
  set title(title: string) {
    this._title = title;
    this.classes = {
      'headed-code': !!this.title,
      'simple-code': !this.title
    };
  }
  get title(): string {
    return this._title;
  }
  private _title: string;

  @Input()
  set path(path: string) {
    this._path = path;
    this.isAvoid = this.path.indexOf('.avoid.') !== -1;
  }
  get path(): string {
    return this._path;
  }
  private _path = '';

  @Input()
  set hidecopy(hidecopy: boolean) {
    // Coerce the boolean value.
    this._hidecopy = hidecopy != null && `${hidecopy}` !== 'false';
  }
  get hidecopy(): boolean {
    return this._hidecopy;
  }
  private _hidecopy: boolean;

  @Input('hide-copy')
  set hyphenatedHideCopy(hidecopy: boolean) {
    this.hidecopy = hidecopy;
  }

  @Input('hideCopy')
  set capitalizedHideCopy(hidecopy: boolean) {
    this.hidecopy = hidecopy;
  }

  @HostBinding('class.avoidFile') isAvoid = false;

  @ViewChild('content') content: ElementRef;

  @ViewChild(CodeComponent) icode: CodeComponent;

  ngAfterViewInit() {
    this.icode.code = this.content.nativeElement.innerHTML;
  }
}
