import { Component, Input, Inject } from '@angular/core';
import { DocMeta, ISearchItem, LogService, ManageSubscription, MSG_DISPLAY_TIMEOUT } from 'core';
import { Router, NavigationExtras } from '@angular/router';
import { map, filter, debounceTime, tap } from 'rxjs/operators';
import { Observable, Subscription } from 'rxjs';
import { DataSourceLines } from '../data-source-lines';
import { DocumentsEffects, DOCUMENT_EFFECTS_TOKEN } from 'app/modules/shared/store';
import { DocumentStore } from 'app/modules/shared/store/document.store';
import { DocEditorService } from 'app/modules/shared/doc-editor.service';
import { MatDialog } from '@angular/material/dialog';
import { SubPageIdSearchComponent } from './subpage-id-search.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'i-subpage',
  templateUrl: './subpage.component.html',
  styleUrls: ['./subpage.component.scss']
})
export class SubPageComponent extends ManageSubscription(DataSourceLines) {
  public isPanelOpen = false;

  constructor(private router: Router, private store: DocumentStore,
    @Inject(DOCUMENT_EFFECTS_TOKEN) private documentEffects: DocumentsEffects,
    docEditor: DocEditorService, private dialog: MatDialog,
    private snackbar: MatSnackBar
  ) {
    super(store, docEditor);
  }

  private subPagesChanged = false;

  public onPanelOpen = (() => {
    let metasSub: Subscription;
    return () => {
      this.isPanelOpen = true;
      if (!this.subPagesChanged) return;

      this.subPagesChanged = false;

      this.removeSub(metasSub);
      metasSub = this.addObs(
        this.store.docMetasOfIds$(this.ids).pipe(
          // filter(metas => !!metas?.length), should not filter. case: delete the last one
          map(metas => metas.filter(meta => !!meta)),
          debounceTime(300),
          tap(metas => this.pageList = metas)
        )
      );

      const { ids } = this;
      if (ids.length > 0)
        this.documentEffects.readDocMetas_.next({ ids });
    }
  })();

  public ids: number[] = [];
  public pageList: DocMeta[] = [];

  @Input()
  public set pages(value: string) {
    this.ids = JSON.parse(value);
    this.subPagesChanged = true;
    if (this.isPanelOpen) {
      this.onPanelOpen();
    }
  }

  delete(meta: DocMeta) {
    const index = this.ids.indexOf(meta.id);
    if (index !== -1) {
      this.ids.splice(index, 1);
      this.subPagesChanged = true;
      this.source = `subPage: [${this.ids}]`
      if (this.isPanelOpen) {
        this.onPanelOpen();
      }
      return;
    }
    this.logger.debug('SubPageComponent.delete: id not found')
  }


  addToParentById(id, input?: HTMLInputElement) {

  }

  addId(id, input?: HTMLInputElement) {
    if (this.ids.includes(+id)) {
      this.snackbar.open(`id ${id} already included`, 'ok', {
        duration: MSG_DISPLAY_TIMEOUT
      })
      return;
    }
    this.ids.push(+id);
    this.subPagesChanged = true;
    this.source = `subPage: [${this.ids}]`
    // clear the id in input element
    if(input) input.value = null;
  }

  addToParentBySearch(){

  }

  addIdBySearch() {
    this.searchDoc().subscribe(id=>this.addId(id));
  }
  private searchDoc(){
    const dialog = this.dialog.open(SubPageIdSearchComponent);

    return dialog.afterClosed().pipe(
      map((r: ISearchItem) => r.id)
    )
  }

  public pageList$: Observable<DocMeta[]>

  onShowDoc(doc: DocMeta) {
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
