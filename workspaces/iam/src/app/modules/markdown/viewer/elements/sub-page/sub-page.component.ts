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

  public panelOpenState = false;
  constructor(private router: Router, private store: Store<any>) {

  }

  private hasOpened = false;
  public onPanelOpen = (e) => {
    if (this.hasOpened) return;
    this.hasOpened = true;
    this.pageList$ = this.store.pipe(
      select(getDocumentsByIdsSelector(this.ids)),
      map(docs => [...(docs
        .map(doc => doc?.metaData)
        .filter(m => !!m))]
      ),
      tap(ms => console.log(ms)));
    const ids = this.ids;
    this.store.dispatch(new DocumentEffectsReadDocMetas({ ids }));
  }
  public ids = new Array<number>();
  @Input()
  public set pages(value: string) {
    const ids = value.split(' ').map(id => +id);
    this.ids = ids;
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
