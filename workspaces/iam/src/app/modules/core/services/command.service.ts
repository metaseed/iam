import { Injectable, Inject } from "@angular/core";
import { HotkeysService, Hotkey } from "@metaseed/angular-hotkey";
import { Subject } from "rxjs/Subject";
import { Observable } from "rxjs/Observable";
import { ConfigService, ConfigModel } from "./config.service";

export class Command {
  name: string;
  combo: string;
  ev: KeyboardEvent;
}

@Injectable()
export class CommandService {
  private subject: Subject<Command>;
  commands: Observable<Command>;
  private config: ConfigModel;

  constructor(
    private hotkeysService: HotkeysService,
    private configService: ConfigService
  ) {
    this.subject = new Subject<Command>();
    this.commands = this.subject.asObservable();
    configService.config$.subscribe(config => {
      this.config = config;
      for (const key in config.hotkeys) {
        if (!config.hotkeys.hasOwnProperty(key)) {
          continue;
        }
        const commands = config.hotkeys[key];
        hotkeysService.add(
          new Hotkey(key, (ev, combo) => this.hotkey(ev, combo, commands))
        );
      }
    });
  }

  hotkey(ev: KeyboardEvent, combo: string, commands: string[]): boolean {
    console.log("hotkey event", combo);
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
