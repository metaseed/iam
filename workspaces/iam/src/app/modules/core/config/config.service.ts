import { HttpClient } from "@angular/common/http";
import { APP_BASE_HREF } from "@angular/common";
import { Injectable, Inject, InjectionToken } from "@angular/core";
import { Observable } from "rxjs";
import { shareReplay } from "rxjs/operators";

class HotkeyConfig {
  [key: string]: string[];
}

export interface ConfigModel {
  hotkeys: HotkeyConfig;
  storage: {
    github: {
      userName: string;
      dataRepoName: string;
    };
  };
}

@Injectable()
export class ConfigService {
  public config$: Observable<ConfigModel>;

  constructor(
    private http: HttpClient,
    @Inject(APP_BASE_HREF) private baseHref
  ) {
    this.config$ = this.http
      .get<ConfigModel>(`${this.baseHref}assets/config.json`)
      .pipe(shareReplay(1));
  }
}
