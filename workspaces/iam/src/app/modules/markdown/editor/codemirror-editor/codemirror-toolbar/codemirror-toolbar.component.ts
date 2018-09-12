import { Component, OnInit, Input, HostBinding } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Utilities } from 'core';
import { VerticalSplitPaneComponent } from 'shared';

@Component({
  selector: 'ms-codemirror-toolbar',
  templateUrl: './codemirror-toolbar.component.html',
  styleUrls: ['./codemirror-toolbar.component.scss']
})
export class CodemirrorToolbarComponent implements OnInit {
  _destroy$ = new Subject();
  _options: any;
  isScreenWide$ = this._utils.isScreenWide$;

  @HostBinding('style.width')
  width;

  constructor(private _verticalSplitPane: VerticalSplitPaneComponent, private _utils: Utilities) {
    this._verticalSplitPane.notifySizeDidChange.pipe(takeUntil(this._destroy$)).subscribe(s => {
      if (this.width === s.primary) return;
      this.width = `${s.primary}px`;
    });
  }
  more = () => {};

  @Input()
  get options(): any {
    return this._options;
  }

  _hideIcons: any = { Ol: false, Italic: false, Link: false };
  set options(value: any) {
    this._options = value || {
      hideIcons: []
    };
    this._hideIcons = {};
    (this._options.hideIcons || []).forEach((v: any) => {
      this._hideIcons[v] = true;
    });
  }
  ngOnInit() {}
  ngOnDestroy() {
    this._destroy$.next();
  }
}
