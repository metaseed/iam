import { Component, OnInit, Input } from '@angular/core';
import { DocMeta } from 'core';
import { Router, NavigationExtras } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { getDocumentsByIdsSelector, DocumentEffectsReadDocMetas } from 'shared';
import { map, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'i-subpage',
  templateUrl: './sub-page.component.html',
  styleUrls: ['./sub-page.component.scss']
})
export class SubPageComponent implements OnInit {

  constructor(private router: Router, private store: Store<any>) {

  }

  private ids = new Array<number>();
  @Input()
  public set pages(value: string) {
    const ids = value.split(' ').map(id => +id);
    this.ids = ids;

    this.pageList$ = this.store.pipe(
      select(getDocumentsByIdsSelector(this.ids)),
      map(docs => [...(docs
        .map(doc => doc?.metaData)
        .filter(m => !!m))]
      ),
      tap(ms => console.log(ms)));
    this.store.dispatch(new DocumentEffectsReadDocMetas({ ids }));
  }

  public pageList$: Observable<DocMeta[]>

  ngOnInit(): void {
  }

  onShow(doc: DocMeta) {
    const navigationExtras: NavigationExtras = {
      queryParams: {
        id: doc.id,
        title: doc.title,
        f: doc.format || 'md'
      }
    };
    this.router.navigate(['/doc'], navigationExtras);
  }
}
