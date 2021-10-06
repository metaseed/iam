import { Component, OnInit, Input } from '@angular/core';
import { DocMeta } from 'core';
import { Router, NavigationExtras } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { getDocumentsByIdsSelector, DocumentEffectsReadDocMetas, getDocumentMetasByIdsSelector } from 'shared';
import { map, filter } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'i-subpage',
  templateUrl: './sub-page.component.html',
  styleUrls: ['./sub-page.component.scss']
})
export class SubPageComponent {

  public panelOpenState = false;
  constructor(private router: Router, private store: Store<any>) {
  }

  private hasOpened = false;
  public onPanelOpen = () => {
    this.panelOpenState = true;
    if (this.hasOpened) return;

    this.hasOpened = true;
    this.pageList$ = this.store.pipe(
      select(getDocumentMetasByIdsSelector(this.ids)),
      filter(metas => !!metas?.length),
      map(metas => [...metas.filter(meta => !!meta)])
    );
    const ids = this.ids;
    this.store.dispatch(new DocumentEffectsReadDocMetas({ ids }));
  }
  public ids = [];
  @Input()
  public set pages(value: string) {
    const ids = value.split(' ').map(id => +id);
    this.ids = ids;
    if (this.panelOpenState) {
      this.hasOpened = false;
      this.onPanelOpen();
    }
  }

  showDelete

  public pageList$: Observable<DocMeta[]>

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
