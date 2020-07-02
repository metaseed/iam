import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'home-top-bar',
  templateUrl: './home-top-bar.component.html',
  styleUrls: ['./home-top-bar.component.scss']
})
export class HomeTopBarComponent implements OnInit {
  constructor(private router: Router) { }

  ngOnInit() { }

  onClick(e) {
    this.router.navigate(['/search']);
  }

  onShowTree() {
    this.showTree.next(true);
  }
  @Output()
  showTree = new EventEmitter<boolean>();
}
