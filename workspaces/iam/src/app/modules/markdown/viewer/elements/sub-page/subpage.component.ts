import { Component, Input, Inject } from '@angular/core';
import { DocMeta } from 'core';
import { Router, NavigationExtras } from '@angular/router';
import { map, filter, debounceTime } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { DataSourceLines } from '../data-source-lines';
import { DocumentsEffects, DOCUMENT_EFFECTS_TOKEN } from 'app/modules/shared/store';
import { DocumentStore } from 'app/modules/shared/store/document.store';
import { DocEditorService } from 'app/modules/shared/doc-editor.service';
import { MatDialog } from '@angular/material/dialog';
import { SubPageIdSearchComponent } from './subpage-id-search.component';

@Component({
  selector: 'i-subpage',
  templateUrl: './subpage.component.html',
  styleUrls: ['./subpage.component.scss']
})
export class SubPageComponent extends DataSourceLines {

  public panelOpenState = false;
  constructor(private router: Router, private store: DocumentStore,
    @Inject(DOCUMENT_EFFECTS_TOKEN) private documentEffects: DocumentsEffects,
    docEditor: DocEditorService, private dialog: MatDialog
  ) {
    super(store, docEditor);
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
    this.documentEffects.readDocMetas_.next({ ids });
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
  addId(id) {
    this.ids.push(+id);
    this.source = `subpages: [${this.ids}]`
  }

  addIdBySearch() {
    const dialog = this.dialog.open(SubPageIdSearchComponent, {width: '100vw', height: '90vh'});
    dialog.afterClosed().subscribe(
      id =>  this.addId(id)
    )
  }

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