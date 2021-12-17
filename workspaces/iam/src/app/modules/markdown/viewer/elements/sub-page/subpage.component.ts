import { Component, Input, Inject } from '@angular/core';
import { DocFormat, DocMeta, getDefaultDocHeadMeta, getHeadMeta, ISearchItem, LogService, ManageSubscription, MSG_DISPLAY_TIMEOUT, NET_COMMU_TIMEOUT, setHeadMeta } from 'core';
import { Router, NavigationExtras } from '@angular/router';
import { map, filter, debounceTime, tap, take, timeout, find, catchError } from 'rxjs/operators';
import { EMPTY, Observable, Subscription } from 'rxjs';
import { DataSourceLines } from '../data-source-lines';
import { DocumentsEffects, DOCUMENT_EFFECTS_TOKEN } from 'app/modules/shared/store';
import { DocumentStore } from 'app/modules/shared/store/document.store';
import { DocEditorService } from 'app/modules/shared/doc-editor.service';
import { MatDialog } from '@angular/material/dialog';
import { SubPageIdSearchComponent } from './subpage-id-search.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { OperationStep } from 'packages/rx-store/src/effect';

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

  addToParentById(id: number, input?: HTMLInputElement) {
    id = +id;
    this.addSub(this.documentEffects.readDocument_.operationStatus$.pipe(
      find(status => status.step === OperationStep.Complete && status.trigger.id === id),
      timeout(NET_COMMU_TIMEOUT),
      map(() => {
        // get
        const currentId = this.store.docContent.currentId_.state;
        const parentContent = this.store.getDocContent(id).content;
        let parentHeadMeta = getHeadMeta(parentContent);
        if (!parentHeadMeta) {// no meta
          parentHeadMeta = getDefaultDocHeadMeta();
        }
        if (!parentHeadMeta.subPage) parentHeadMeta.subPage = [];

        if (parentHeadMeta.subPage.includes(currentId)) {
          this.snackbar.open(`parent doc already has this document as a subpage`, 'ok');
          return;
        }

        // update
        parentHeadMeta.subPage.push(currentId);
        const parentMeta = this.store.getDocMeta(id);
        parentMeta.subPage = parentHeadMeta.subPage;
        const content = setHeadMeta(parentContent, parentHeadMeta);

        // save
        this.logger.debug(`try to save parent doc content after add this page as subpage of parent doc: ${id}...`);
        this.documentEffects.saveDocument_.operationStatus$.pipe(
          find(status => status.step === OperationStep.Success && status.trigger.id === id),
          timeout(NET_COMMU_TIMEOUT),
          tap(o => {
            this.snackbar.open(`added to page(id: ${id}) as a subpage.`, 'ok');
          })
        ).subscribe()
        this.documentEffects.saveDocument_.next({ id, content, format: DocFormat[parentMeta.format] });
      }),
      catchError(err => {
        if (err.name === 'TimeoutError') {
          this.logger.error(err);
          this.snackbar.open(`this document not added to parent, because of timeout`, 'ok')
          return EMPTY;
        }
        this.snackbar.open(`this document not added to parent, because error happens`, 'ok')
        return EMPTY;
      })
    ));

    const parentMeta = this.store.getDocMeta(id);
    this.documentEffects.readDocument_.next({ id, format: parentMeta?.format })
  }

  addId(id: number, input?: HTMLInputElement) {
    id = +id;
    if (this.ids.includes(id)) {
      this.snackbar.open(`id ${id} already included`, 'ok')
      return;
    }
    this.ids.push(id);
    this.subPagesChanged = true;
    this.source = `subPage: [${this.ids}]`
    // clear the id in input element
    if (input) input.value = null;
  }

  addToParentBySearch() {
    this.searchDoc().subscribe(id => this.addToParentById(id));
  }

  addIdBySearch() {
    this.searchDoc().subscribe(id => this.addId(id));
  }
  private searchDoc() {
    const dialog = this.dialog.open(SubPageIdSearchComponent, { width: '95vw', height: '90vh' });

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
