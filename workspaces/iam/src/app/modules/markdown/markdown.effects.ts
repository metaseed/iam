import { Injectable, Inject } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable } from 'rxjs';
import { Action } from '@ngrx/store';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { MarkdownService } from './markdown.service';
import { RefreshAction } from './state/actions/document';
import { DocumentActionTypes } from './state/actions/document';
import { MARKDOWN_SERVICE_TOKEN } from './model/markdown.model';

@Injectable()
export class MarkdownEffects {
  @Effect({ dispatch: false })
  Refresh: Observable<Action> = this.actions$.pipe(
    ofType<RefreshAction>(DocumentActionTypes.Refresh),
    tap(_ => {
      this.onRefresh();
    })
  );
  private onRefresh() {
    if (this.router.url.startsWith('/doc/new')) return;
    const params = this.router.parseUrl(this.router.url).queryParams;
    let title = params['title'];
    let num = +params['id'];
    let format = params['f'];
    this.markdownService.refresh(num, title, format);
  }
  constructor(
    private actions$: Actions,
    private router: Router,
    @Inject(MARKDOWN_SERVICE_TOKEN)private markdownService: MarkdownService
  ) {}
}
