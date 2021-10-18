import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { DocumentEffectsRead } from 'shared';
import { MarkdownStore } from './markdown-container.store';
import { sideEffect } from 'packages/rx-store/src';

@Injectable()
export class MarkdownEffects {
  constructor(private store: MarkdownStore, private router: Router,private rxStore: Store<any>) {
    sideEffect(store.refresh_,tap(() => this.onRefresh()));
  }

  private onRefresh() {
    if (this.router.url.startsWith('/doc/new')) return;
    const params = this.router.parseUrl(this.router.url).queryParams;
    const title = params['title'];
    const num = +params['id'];
    const format = params['f'];
    this.rxStore.dispatch(new DocumentEffectsRead({ id: num, title, format }));
  }
}
