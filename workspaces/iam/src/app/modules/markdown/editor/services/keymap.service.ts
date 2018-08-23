import 'codemirror/keymap/vim';
import 'codemirror/keymap/sublime';
import 'codemirror/keymap/emacs';
import { Injectable } from '@angular/core';

@Injectable()
export class KeyMapService {
  constructor() {
    // cm.setOption('keyMap', 'vim');
    // cm.setOption('keyMap', 'sublime');
  }
}
