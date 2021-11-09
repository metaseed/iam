import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';

@Component({
  selector: 'search-page',
  template: `<doc-search-list (onClick)="onClick($event)"></doc-search-list>`
})

export class SearchPageComponent implements OnInit {
  constructor(private router: Router) { }

  onClick({id, title}) {
    const navigationExtras: NavigationExtras = {
      queryParams: {
        id,
        title,
        f: 'md'
      }
    };
    this.router.navigate(['/doc'], navigationExtras);
  }
  ngOnInit() { }
}
