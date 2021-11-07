import { Component, Input, Inject } from '@angular/core';
import { DocMeta } from 'core';
import { Router, NavigationExtras } from '@angular/router';
import { map, filter, debounceTime } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { DataSourceLines } from '../data-source-lines';
import { DocumentsEffects, DOCUMENT_EFFECTS_TOKEN } from 'app/modules/shared/store';
import { DocumentStore } from 'app/modules/shared/store/document.store';

@Component({
  selector: 'i-subpage',
  templateUrl: './sub-page.component.html',
  styleUrls: ['./sub-page.component.scss']
})
export class SubPageComponent  extends DataSourceLines{

  public panelOpenState = false;
  constructor(private router: Router, private store: DocumentStore,
    @Inject(DOCUMENT_EFFECTS_TOKEN) private documentEffects: DocumentsEffects,
    ) {
    super(store);
  }

  private hasOpened = false;
  public onPanelOpen = () => {
    this.panelOpenState = true;
    if (this.hasOpened) return;

    this.hasOpened = true;

    this.pageList$ = this.store.docMetas$(this.ids).pipe(
      filter(metas => !!metas?.length),
      map(metas => [...metas.filter(meta => !!meta)]),
      debounceTime(300)
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
