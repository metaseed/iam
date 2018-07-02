import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { Injectable } from '@angular/core';

@Injectable()
export class DocEffectsUtil {
  constructor(private router: Router, private location: Location) {}

  modifyUrlAfterSaved(num: number, title: string, format: string) {
    const url = this.router
      .createUrlTree(['/doc'], {
        queryParams: {
          id: num,
          title: title,
          f: format
        }
      })
      .toString();

    this.location.go(url);
  }


}
