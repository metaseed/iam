import { Component, OnInit, Input } from '@angular/core';
import { DocumentRef, WindowRef, ContainerRef } from 'core';
import { AfterViewInit, ViewChild } from '@angular/core';
import { MatProgressBar } from '@angular/material';

@Component({
  selector: 'ms-reading-position-indicator',
  templateUrl: './reading-position-indicator.component.html',
  styleUrls: ['./reading-position-indicator.component.scss']
})
export class ReadingPositionIndicatorComponent implements OnInit, AfterViewInit {
  value: number;
  constructor(private _docRef: DocumentRef, private _windowRef: WindowRef) {}

  ngOnInit() {}

  @Input() element: HTMLElement;

  ngAfterViewInit() {
    new ContainerRef(this.element).scrollEvent$.subscribe(event => {
      this.setProgress(event);
    });

    this._windowRef.resizeEvent$.subscribe(event => this.setProgress(event));
  }
  private setProgress(event) {
    const position = this.Value;
    const length = this.Max;
    const value = (position / length) * 100;
    this.value = value;
  }

  private get Max() {
    return this.element.scrollHeight - this.element.clientHeight;
  }

  private get Value() {
    return this.element.scrollTop;
  }
}
