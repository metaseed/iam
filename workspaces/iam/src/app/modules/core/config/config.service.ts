import { HttpClient } from '@angular/common/http';
import { APP_BASE_HREF } from '@angular/common';
import { Injectable, Inject, InjectionToken } from '@angular/core';
import { ReplaySubject } from 'rxjs';

class HotkeyConfig {
    [key: string]: string[];
}

export interface ConfigModel {
    hotkeys: HotkeyConfig;
    storage: {
      github: {
        dataRepo: string;
      }
    }
}

@Injectable()
export class ConfigService {
    public config$ = new ReplaySubject<ConfigModel>();

    constructor(private http: HttpClient,
        @Inject(APP_BASE_HREF) private baseHref) {
        this.http.get(`${this.baseHref}assets/config.json`).toPromise()
            .then(r => r as ConfigModel)
            .then(c => {
                this.config$.next(c);
            });
    }
}
