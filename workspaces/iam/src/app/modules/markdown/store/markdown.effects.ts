import { Inject, Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { StateSubject } from 'packages/rx-store/src/core';
import { DocumentsEffects, DOCUMENT_EFFECTS_TOKEN } from '../../shared/store';
import { DocumentStore } from 'app/modules/shared/store/document.store';

@Injectable()
export class MarkdownEffects {
  constructor(private router: Router,
    private store: DocumentStore,
    @Inject(DOCUMENT_EFFECTS_TOKEN) private documentEffects: DocumentsEffects,
    ) { }

  refresh_ = new StateSubject<any>().addEffect(tap(() => this.onRefresh()));

  private onRefresh() {
    if (this.router.url.startsWith('/doc/new')) return;

    const params = this.router.parseUrl(this.router.url).queryParams;
    const title = params['title'];
    const id = +params['id'];
    const format = params['f'];
    this.documentEffects.readDocument_.next({ id, title, format });
    this.store.currentId_.next(id);

  }
}
