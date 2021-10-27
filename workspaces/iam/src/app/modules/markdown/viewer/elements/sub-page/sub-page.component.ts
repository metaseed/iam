import { Component, Input, Inject } from '@angular/core';
import { DocMeta } from 'core';
import { Router, NavigationExtras } from '@angular/router';
import { Store, select, State } from '@ngrx/store';
import { getDocumentMetasByIdsSelector } from 'shared';
import { map, filter } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { DataSourceLines } from '../data-source-lines';
import { DocumentsEffects, DOCUMENT_EFFECTS_TOKEN } from 'app/modules/shared/store';

@Component({
  selector: 'i-subpage',
  templateUrl: './sub-page.component.html',
  styleUrls: ['./sub-page.component.scss']
})
export class SubPageComponent  extends DataSourceLines{

  public panelOpenState = false;
  constructor(private router: Router, private store: Store<any>, private state: State<any>,
    @Inject(DOCUMENT_EFFECTS_TOKEN) private documentEffects: DocumentsEffects,
    ) {
    super(store, state);
  }

  private hasOpened = false;
  public onPanelOpen = () => {
    this.panelOpenState = true;
    if (this.hasOpened) return;

    this.hasOpened = true;
    let source = this.source;

    this.pageList$ = this.store.pipe(
      select(getDocumentMetasByIdsSelector(this.ids)),
      filter(metas => !!metas?.length),
      map(metas => [...metas.filter(meta => !!meta)])
    );
    const ids = this.ids;
    this.documentEffects.readDocMetas_.next({ids});
  }
  public ids = [];
  @Input()
  public set pages(value: string) {
    this.ids = JSON.parse(value);
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
