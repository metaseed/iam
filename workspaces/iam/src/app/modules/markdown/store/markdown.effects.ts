import { Inject, Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { StateSubject } from 'packages/rx-store/src/core';
import { DocumentsEffects, DOCUMENT_EFFECTS_TOKEN } from '../../shared/store';

@Injectable()
export class MarkdownEffects {
  constructor(private router: Router,
    @Inject(DOCUMENT_EFFECTS_TOKEN) private documentEffects: DocumentsEffects,
    ) { }

  refresh_ = new StateSubject<any>().addEffect(tap(() => this.onRefresh()));

  private onRefresh() {
    if (this.router.url.startsWith('/doc/new')) return;
    const params = this.router.parseUrl(this.router.url).queryParams;
    const title = params['title'];
    const num = +params['id'];
    const format = params['f'];
    this.documentEffects.readDocument_.next({ id: num, title, format });
  }
}
