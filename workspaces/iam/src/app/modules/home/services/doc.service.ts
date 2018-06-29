import { Injectable, EventEmitter } from '@angular/core';
import { Location } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { MatSnackBar } from '@angular/material';

import { ReplaySubject, Observable } from 'rxjs';
import { map, flatMap, take } from 'rxjs/operators';

import { base64Encode, ConfigService, ConfigModel } from 'core';

import { Document,DocMeta } from 'core';
import { Repository, Content, GithubStorage, UserInfo, EditIssueParams } from 'net-storage';
import { Store } from '@ngrx/store';
import { State } from '../state/document.reducer';
import { DocumentEffectsDelete, DocumentEffectsLoad } from '../state/document.effects.actions';

@Injectable()
export class DocService {
  private _repoSub$:Observable<Repository>;

  constructor(
    private store: Store<State>,
    private snackBar: MatSnackBar,
    private location: Location,
    private router: Router,
    private activedRoute: ActivatedRoute,
    private _storage: GithubStorage
  ) {
    this._repoSub$ =this._storage.init();
  }


}
