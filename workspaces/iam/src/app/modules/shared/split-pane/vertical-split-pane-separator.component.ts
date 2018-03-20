import { Component, OnInit } from '@angular/core';
import { SplitSeparatorComponent } from './split-pane-separator.component'

@Component({
  selector: 'vertical-split-separator',
  styles: [`
    :host {
      background-color: #eeeeee;
      border-left: 1px solid #ddd;
      cursor: col-resize;
      position: relative;
    }
    :host:hover {
      background-color: #ddd;
    }

    .invisible-extension {
      position: absolute;
      height: 100%;
      width: 100%;
      min-width: 7px;
    }

    .handle {
      width: 100%;
      height: 36px;
      background-color: #ddd;
      position: absolute;
      top: calc(50% - 17px);
      padding: 8px 0;
    }
    .handle-bar {
      border:1px solid #aaa;
      border-bottom-width:0;
      border-top-width:0;
      width:3px;
      height:20px;
      margin:auto;
    }
  `],
  template: `
    <!-- Used to extend the 'draggable' area in case the separator is too thin,
    so it's not too hard to drag. -->
    <div
      #invisibleExtension
      [hidden]="thickness >= 7"
      class="invisible-extension"></div>

    <div class="handle">
      <div class="handle-bar"> </div>
    </div>
  `,
  host: {
    '[style.width.px]': 'thickness'
  }
})
export class VerticalSplitSeparatorComponent
  extends SplitSeparatorComponent
  implements OnInit {

  ngAfterViewInit() {
    this.invisibleExtension.nativeElement.style.left =
      -(7 - this.thickness) / 2 + "px";
  }
}
