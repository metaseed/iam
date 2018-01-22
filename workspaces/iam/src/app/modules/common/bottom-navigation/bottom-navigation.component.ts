import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
@Component({
  selector: 'ms-bottom-navigation',
  templateUrl: './bottom-navigation.component.html',
  styleUrls: ['./bottom-navigation.component.scss']
})
export class BottomNavigationComponent implements OnInit {
  show = false;

  constructor(private router: Router, private activedRoute: ActivatedRoute) {
  }

  ngOnInit() {
    this.router.events.pipe(
      filter((event) => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      if (event.url.startsWith('/doc?') || event.url.startsWith('/doc/new')) {
        this.show = false;
      } else {
        this.show = true;
      }
      //console.log('NavigationEnd:', event);
    });
  }

}
