import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';

@Injectable()
export class Utilities {
  isScreenWide$ = this.breakpointObserver
    .observe([Breakpoints.Handset, Breakpoints.TabletPortrait])
    .pipe(map(b => !b.matches));
  constructor(private breakpointObserver: BreakpointObserver) {}
}
