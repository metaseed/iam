import { Component, OnInit, Input } from '@angular/core';
import { DocMeta } from 'core';
import { Router, NavigationExtras } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { getDocumentsByIdsSelector, DocumentEffectsReadDocMetas } from 'shared';
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
      select(getDocumentsByIdsSelector(this.ids)),
      map(docs => [...docs
        .map(doc => doc?.metaData)
        .filter(m => !!m)]
      ),
      filter(docs => !!docs?.length));
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

  private sourceLineStart:Number;
  private sourceLineEnd: Number;
  // eslint-disable-next-line @angular-eslint/no-input-rename
  @Input("data-source-lines")
  public set sourceLines(value) {
    const match = /\[\s*(\d+)\s*,\s*(\d+)\s*\]/.exec(value)
    this.sourceLineStart = +match[1];
    this.sourceLineEnd = + match[2];
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
