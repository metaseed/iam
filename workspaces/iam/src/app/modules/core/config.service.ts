import 'rxjs/add/operator/toPromise';
import { HttpClient } from '@angular/common/http';
import { APP_BASE_HREF } from '@angular/common';
import { Injectable, Inject } from '@angular/core';
import { ReplaySubject } from 'rxjs';

class HotkeyConfig {
    [key: string]: string[];
}

export class ConfigModel {
    hotkeys: HotkeyConfig;
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