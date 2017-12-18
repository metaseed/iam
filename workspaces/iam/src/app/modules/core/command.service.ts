
import { Injectable, Inject } from '@angular/core';
import { HotkeysService, Hotkey } from 'angular-hotkey-module';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/toPromise';
import { HttpClient } from '@angular/common/http';
import { APP_BASE_HREF } from '@angular/common';
class HotkeyConfig {
    [key: string]: string[];
}

class ConfigModel {
    hotkeys: HotkeyConfig;
}

export class Command {
    name: string;
    combo: string;
    ev: KeyboardEvent;
}

@Injectable()
export class CommandService {

    private subject: Subject<Command>;
    commands: Observable<Command>;

    constructor(private hotkeysService: HotkeysService,
        private http: HttpClient,
        @Inject(APP_BASE_HREF) private baseHref) {
        this.subject = new Subject<Command>();
        this.commands = this.subject.asObservable();
        this.http.get(`${baseHref}assets/config.json`).toPromise()
            .then(r => r as ConfigModel)
            .then(c => {
                for (const key in c.hotkeys) {
                    if (!c.hotkeys.hasOwnProperty(key)) {
                        continue;
                    }
                    const commands = c.hotkeys[key];
                    hotkeysService.add(new Hotkey(key, (ev, combo) => this.hotkey(ev, combo, commands)));
                }
            });
    }

    hotkey(ev: KeyboardEvent, combo: string, commands: string[]): boolean {
        console.log('hotkey event', combo);
        commands.forEach(c => {
            const command = {
                name: c,
                ev: ev,
                combo: combo
            } as Command;
            this.subject.next(command);
        });
        return true;
    }
}
