import { Component, EventEmitter, Inject, Input, OnInit, Output } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { DocMeta } from 'core';
import { DocumentsEffects, DOCUMENT_EFFECTS_TOKEN } from 'shared';

@Component({
  selector: 'doc-list',
  template: `
  <div class="doc-card-container">
  <ng-container *ngFor="let meta of docMetas; let i = index; trackBy:trackByFunc">
    <doc-item [docMeta]="meta" (delete)="onDelete(meta)" (show)="onShow(meta)"></doc-item>
  </ng-container>
</div>`,
  styles: [`
.doc-card-container {
  display: flex;
  flex-flow: row wrap;
  box-sizing: border-box;
  justify-content: space-around;
}
`]
})

export class DocListComponent implements OnInit {

  private _docMetas: DocMeta[];

  constructor(@Inject(DOCUMENT_EFFECTS_TOKEN) private documentEffects: DocumentsEffects,
    private router: Router,) { }
  trackByFunc = (i, doc) => doc.id;
  @Output()
  show=new EventEmitter<DocMeta>();

  onShow(doc: DocMeta) {
    this.show.emit(doc);
    const navigationExtras: NavigationExtras = {
      queryParams: {
        id: doc.id,
        title: doc.title,
        f: doc.format || 'md'
      }
    };
    this.router.navigate(['/doc'], navigationExtras);
  }

  onDelete(doc: DocMeta) {
    this.documentEffects.deleteDocument_.next({ id: doc.id });
  }
  @Input()
  set docMetas(v) {
    this._docMetas = v;
  }
  get docMetas() {
    return this._docMetas;
  }
  ngOnInit() { }
}
