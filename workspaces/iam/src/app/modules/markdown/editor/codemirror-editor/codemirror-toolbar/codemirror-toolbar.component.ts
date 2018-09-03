import { Component, OnInit, Input, HostBinding } from '@angular/core';
import { MarkdownComponent } from '../../../markdown.component';

import { Subscription, Subject } from 'rxjs';
import { MarkdownEditorService } from '../..';
import { CommandService, Command } from 'core';
import * as CodeMirror from 'codemirror';
import { takeUntil } from 'rxjs/operators';
import { Utilities } from 'core';
import { VerticalSplitPaneComponent } from 'shared';

interface ICommandConfig {
  [key: string]: {
    command: string;
    func: (selectedText: string, defaultText: string, config?: any) => string;
    startSize?: number;
    endSize?: number;
    hotKey: string;
  };
}

@Component({
  selector: 'ms-codemirror-toolbar',
  templateUrl: './codemirror-toolbar.component.html',
  styleUrls: ['./codemirror-toolbar.component.scss']
})
export class CodemirrorToolbarComponent implements OnInit {
  private static COMMANDS_CONFIG: ICommandConfig;
  destroy$ = new Subject();
  _subscription: Subscription;
  _options: any;
  editor: CodeMirror.Editor;
  doc: CodeMirror.Doc;
  isScreenWide$ = this.utils.isScreenWide$;

  @HostBinding('style.width')
  width;

  constructor(
    public markdown: MarkdownComponent,
    private _verticalSplitPane: VerticalSplitPaneComponent,
    private _editorService: MarkdownEditorService,
    private utils: Utilities,
    private _commandService: CommandService
  ) {
    this._verticalSplitPane.notifySizeDidChange.pipe(takeUntil(this.destroy$)).subscribe(s => {
      if (this.width === s.primary) return;
      this.width = `${s.primary}px`;
    });

    this._subscription = this._commandService.commands.subscribe(c => this.handleCommand(c));
    const me = this;
    this._editorService.editorLoaded$
      .pipe(takeUntil(this.destroy$))
      .subscribe((editor: CodeMirror.Editor) => {
        if (!CodemirrorToolbarComponent.COMMANDS_CONFIG) {
          CodemirrorToolbarComponent.COMMANDS_CONFIG = {
            Bold: {
              command: 'Bold',
              func: (selectedText, defaultText) => {
                // disabled because of after edit the content would scroll because of this event

                // const pos = this.doc.getCursor();
                // const cur = (this.editor as any).getSearchCursor(/\*+/, pos);
                // let found = cur.findPrevious();
                // let lang: string;
                // if (found) {
                //   lang = cur.pos.match[1];
                // } else {
                //   found = cur.findNext();
                //   if (found) {
                //     lang = cur.pos.match[1];
                //   } else {
                //     lang = '';
                //   }
                // }
                return `**${selectedText || defaultText}**`;
              },
              endSize: 2,
              hotKey: 'Ctrl-M B'
            },
            Italic: {
              command: 'Italic',
              func: (selectedText, defaultText) => `*${selectedText || defaultText}*`,
              endSize: 1,
              hotKey: 'Ctrl-M I'
            },
            Heading: {
              command: 'Heading',
              func: (selectedText, defaultText) => `# ${selectedText || defaultText}`,
              startSize: 2,
              hotKey: 'Ctrl-M H'
            },
            Reference: {
              command: 'Reference',
              func: (selectedText, defaultText) => `> ${selectedText || defaultText}`,
              endSize: 2,
              hotKey: 'Ctrl-M R'
            },
            Link: {
              command: 'Link',
              func: (selectedText, defaultText) => `[${selectedText || defaultText}](http://)`,
              endSize: 1,
              hotKey: 'Ctrl-M L'
            },
            Image: {
              command: 'Image',
              func: (selectedText, defaultText) => `![${selectedText || defaultText}](http://)`,
              endSize: 1,
              hotKey: 'Ctrl-M M'
            },
            Ul: {
              command: 'Ul',
              func: (selectedText, defaultText) => `- ${selectedText || defaultText}`,
              startSize: 2,
              hotKey: 'Ctrl-M U'
            },
            Ol: {
              command: 'Ol',
              func: (selectedText, defaultText) => `1 ${selectedText || defaultText}`,
              endSize: 2,
              hotKey: 'Ctrl-M O'
            },
            Code: {
              command: 'Code',
              func: (selectedText, defaultText, config) => {
                const pos = this.doc.getCursor();
                const cur = (this.editor as any).getSearchCursor(/^\s*```[^\S\n\r]*(\S+)/, pos);
                let found = cur.findPrevious();
                let lang: string;
                if (found) {
                  lang = cur.pos.match[1];
                } else {
                  found = cur.findNext();
                  if (found) {
                    lang = cur.pos.match[1];
                  } else {
                    lang = '';
                  }
                }
                config.startSize = lang ? lang.length + 4 : 3;
                return '```' + lang + '\r\n' + (selectedText || defaultText) + '\r\n```';
              },
              startSize: 3,
              hotKey: 'Ctrl-M C'
            }
          };
        }
        me.editor = editor;
        me.doc = <any>editor;
        const configs = CodemirrorToolbarComponent.COMMANDS_CONFIG;
        const option = {};
        for (const key in configs) {
          if (configs.hasOwnProperty(key)) {
            const config = configs[key];
            option[config.hotKey] = function() {
              me.insertContent(key);
            };
          }
        }

        option['Ctrl-M Q'] = function(editor) {
          // (<HTMLElement>(me.div.nativeElement)).click();
          // document.activeElement.blur();
          editor.display.input.textarea.blur();
        };
        option['Ctrl-Up'] = 'scrollLineUp';
        option['Ctrl-G'] = 'jumpToLine';
        option['Ctrl-Down'] = 'scrollLineDown';
        option['Ctrl-F'] = 'findPersistent';
        option['Shift-Delete'] = 'killLine';
        option['Shift-Backspace'] = 'delLineLeft';
        option['Ctrl-Shift-K'] = 'deleteLine';
        option['Home'] = 'goLineStart';
        option['End'] = 'goLineEnd';
        option['Ctrl-Left'] = 'goWordLeft';
        option['Ctrl-Right'] = 'goWordRight';
        option['Ctrl-Alt-Left'] = 'goSubwordLeft';
        option['Ctrl-Alt-Right'] = 'goSubwordRight';
        option['Ctrl-Backspace'] = 'delWordBefore';
        option['Ctrl-Shift-Backspace'] = 'delWordAfter';
        option['Ctrl-Alt-Backspace'] = 'delGroupBefore';
        option['Ctrl-Alt-Shift-Backspace'] = 'delGroupAfter';
        option['Tab'] = cm => {
          if (cm.somethingSelected()) {
            cm.indentSelection('add');
            return;
          }
          if (undefined) cm.replaceSelection('\t', 'end', '+input');
          else cm.execCommand('insertSoftTab');
        };
        option['Shift-Tab'] = cm => {
          cm.indentSelection('subtract');
        };
        const commands = (CodeMirror as any).commands;
        // const keyMap = (CodeMirror as any).keyMap;
        // option['Ctrl-a'] = keyMap['default']['Alt-G'];

        option['Alt-\\'] = commands['goToBracket'];
        option['Alt-Shift-\\'] = commands['selectBetweenBrackets'];
        option['Alt-Shift-Right'] = commands['selectScope'];
        option['Ctrl-Enter'] = commands['insertLineAfter'];
        option['Ctrl-Shift-Enter'] = commands['insertLineBefore'];
        option['Alt-Up'] = commands['swapLineUp'];
        option['Alt-Down'] = commands['swapLineDown'];
        option['Ctrl-/'] = commands['toggleCommentIndented'];
        option['Ctrl-I'] = commands['selectLine'];
        option['Ctrl-D'] = commands['selectNextOccurrence'];
        option['Ctrl-H'] = commands['replace'];
        option['Alt-Shift+Down'] = commands['duplicateLine'];
        option['Backspace'] = commands['smartBackspace'];
        option['Alt-M'] = 'showInCenter';

        /*
Ctrl-F / Cmd-F Start searching
Ctrl-G / Cmd-G Find next
Shift-Ctrl-G / Shift-Cmd-G Find previous
Shift-Ctrl-F / Cmd-Option-F Replace
Shift-Ctrl-R / Shift-Cmd-Option-F Replace all
Alt-F Persistent search (dialog doesn't autoclose, enter to find next, Shift-Enter to find previous)
Alt-G Jump to line*/
        me.editor.setOption('extraKeys', (<any>CodeMirror).normalizeKeyMap(option));
      });
  }
  more = () => {};

  @Input()
  get options(): any {
    return this._options;
  }

  _hideIcons: any = { Ol: false, Italic: false, Link: false };
  set options(value: any) {
    this._options = value || {
      hideIcons: []
    };
    this._hideIcons = {};
    (this._options.hideIcons || []).forEach((v: any) => {
      this._hideIcons[v] = true;
    });
  }
  handleCommand(command: Command) {
    this.insertContent(command.name);
  }
  insertContent(type: string) {
    if (!this.editor) {
      return;
    }
    let selectionText = this.doc.getSelection();

    if (type === 'Focus') {
      this.editor.focus();
      return;
    }

    const config = CodemirrorToolbarComponent.COMMANDS_CONFIG[type];
    // let selectionText: string = this.editor.getModel().getValueInRange(selection);
    selectionText = config.func(selectionText, '', config);
    if (config.startSize !== undefined) {
      this.doc.replaceSelection(selectionText, 'start');
      for (let i = 0; i < config.startSize; i++) this.editor.execCommand('goCharRight');
    } else if (config.endSize !== undefined) {
      this.doc.replaceSelection(selectionText);
      for (let i = 0; i < config.endSize; i++) this.editor.execCommand('goCharLeft');
    }
    this.editor.focus();

    // if (config.command === 'Ul') {
    //   this._hideIcons.Ul = true;
    //   this._hideIcons.Ol = false;
    // } else if (config.command === 'Ol') {
    //   this._hideIcons.Ul = false;
    //   this._hideIcons.Ol = true;
    // } else if (config.command === 'Bold') {
    // this._hideIcons.Bold = true;
    //   this._hideIcons.Italic = false;
    // } else if (config.command === 'Italic') {
    //   this._hideIcons.Bold = false;
    //   this._hideIcons.Italic = true;
    // } else if (config.command === 'Link') {
    //   this._hideIcons.Link = true;
    //   this._hideIcons.Image = false;
    // } else if (config.command === 'Image') {
    //   this._hideIcons.Link = false;
    //   this._hideIcons.Image = true;
    // }

    // let p = this.doc.getCursor();
    // this.doc.extendSelection(<any>{ line: p.line, ch: p.ch + 2 })
    // this.editor.executeEdits('', [{ identifier: null, range: selection, text: selectionText, forceMoveMarkers: true }]);
    // if (selection.startColumn == selection.endColumn && selection.startLineNumber == selection.endLineNumber) {
    // selection = new monaco.Selection(selection.startLineNumber, selection.startColumn + startSize, selection.endLineNumber, selection.startColumn + startSize + config.command.length);
    //   this.editor.setSelection(selection);
    // }
    // this.editor.layout();
  }
  ngOnInit() {}
  ngOnDestroy() {
    this.destroy$.next();
  }
}
