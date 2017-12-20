
import { Injectable, Inject } from '@angular/core';
import { HotkeysService, Hotkey } from 'angular-hotkey-module';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import { ConfigService } from './config.service';
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
        private configService: ConfigService) {
        this.subject = new Subject<Command>();
        this.commands = this.subject.asObservable();
        let hotkeys = configService.config.hotkeys;
        for (const key in hotkeys) {
            if (!hotkeys.hasOwnProperty(key)) {
                continue;
            }
            const commands = hotkeys[key];
            hotkeysService.add(new Hotkey(key, (ev, combo) => this.hotkey(ev, combo, commands)));
        }
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
