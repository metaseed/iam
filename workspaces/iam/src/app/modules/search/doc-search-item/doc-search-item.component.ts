import { Component, OnInit, Input } from '@angular/core';
import { ISearchItem, ITextMatch } from 'core';
import { Router, NavigationExtras } from '@angular/router';

@Component({
  selector: 'doc-search-item',
  templateUrl: './doc-search-item.component.html',
  styleUrls: ['./doc-search-item.component.scss']
})
export class DocSearchItemComponent implements OnInit {
  @Input()
  item: ISearchItem;
  constructor(private router: Router) {}

  onClick(event) {
    const navigationExtras: NavigationExtras = {
      queryParams: {
        id: this.item.id,
        title: this.item.title,
        f: 'md'
      }
    };
    this.router.navigate(['/doc'], navigationExtras);
  }
  getMatches(textMatch: ITextMatch) {
    const fragment = textMatch.fragment;
    let r = '';
    let lastIndex = 0;
    textMatch.matches.forEach(match => {
      const pair = match.indices;
      r += fragment.substr(lastIndex, pair[0] - lastIndex);
      r += `<em>${match.text}</em>`;
      lastIndex = pair[1];
    });
    r += fragment.substr(lastIndex);

    return r;
  }
  ngOnInit() {}
}
