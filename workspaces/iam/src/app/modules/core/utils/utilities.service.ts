import { Breakpoints, BreakpointObserver } from "@angular/cdk/layout";
import { map } from "rxjs/operators";
import { Injectable } from "@angular/core";

@Injectable({ providedIn: "root" })
export class Utilities {
  constructor(private breakpointObserver: BreakpointObserver) {}

  isWideScreen$ = this.breakpointObserver
    .observe([Breakpoints.Handset, Breakpoints.TabletPortrait])
    .pipe(map((b) => !b.matches));
}
