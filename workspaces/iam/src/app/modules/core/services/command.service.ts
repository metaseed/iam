import { Injectable } from "@angular/core";
import { HotkeysService, Hotkey } from "@metaseed/angular-hotkey";
import { Subject, Observable } from "rxjs";
import { ConfigService, ConfigModel } from "../config/config.service";

export class Command {
  name: string;
  combo: string;
  ev: KeyboardEvent;
}

@Injectable()
export class CommandService {
  private subject: Subject<Command>;
  private config: ConfigModel;

  commands: Observable<Command>;

  constructor(
    private hotkeysService: HotkeysService,
    private configService: ConfigService
  ) {
    this.subject = new Subject<Command>();
    this.commands = this.subject;
    configService.config$.subscribe((config) => {
      this.config = config;
      for (const key of Object.keys(config.hotkeys)) {
        const commands = config.hotkeys[key];
        hotkeysService.add(
          new Hotkey(key, (ev, combo) => this.hotkey(ev, combo, commands))
        );
      }
    });
  }

  hotkey(ev: KeyboardEvent, combo: string, commands: string[]): boolean {
    console.log("hotkey event", combo);
    commands.forEach((c) => {
      const command = {
        name: c,
        ev: ev,
        combo: combo,
      } as Command;
      this.subject.next(command);
    });
    return true;
  }
}
