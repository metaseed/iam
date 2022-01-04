import 'codemirror/keymap/vim';
import 'codemirror/keymap/sublime';
import 'codemirror/keymap/emacs';
import { Inject, Injectable } from '@angular/core';
import { CommandService, Command, DEFAULT_DOC_HEAD_META } from 'core';
import { MarkdownEditorService } from './markdown-editor.service';
import { FileUploadService } from './file-upload.service';
import * as CodeMirror from 'codemirror';
import { ICodeMirrorEditor } from '../model';
import { MARKDOWN_STORE_TOKEN, IMarkdownStore } from '../../model/markdown.model';

interface ICommandConfig {
  [key: string]: {
    command: string;
    func: (selectedText: string, defaultText: string, config?: any) => string;
    startSize?: number;
    endSize?: number;
    hotKey: string;
  };
}

@Injectable()
export class KeyMapService {
  private static COMMANDS_CONFIG: ICommandConfig;
  editor: ICodeMirrorEditor;

  constructor(
    private _editorService: MarkdownEditorService,
    private _commandService: CommandService,
    private _uploadService: FileUploadService,
    @Inject(MARKDOWN_STORE_TOKEN) private markdownStore: IMarkdownStore

  ) {
    // cm.setOption('keyMap', 'vim');
    // cm.setOption('keyMap', 'sublime');
    this._commandService.commands.subscribe(c => this.handleCommand(c));

    this._editorService.docEditorLoaded$.subscribe((editor: CodeMirror.Editor) => {
      if (!KeyMapService.COMMANDS_CONFIG) {
        KeyMapService.COMMANDS_CONFIG = {
          Bold: {
            command: 'Bold',
            func: (selectedText, defaultText) => {
              return `**${selectedText || defaultText}**`;
            },
            startSize: 2,
            hotKey: 'Ctrl-M B'
          },
          Italic: {
            command: 'Italic',
            func: (selectedText, defaultText) => `*${selectedText || defaultText}*`,
            startSize: 1,
            hotKey: 'Ctrl-M T'
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
            startSize: 2,
            hotKey: 'Ctrl-M R'
          },
          Link: {
            command: 'Link',
            func: (selectedText, defaultText) => `[${selectedText || defaultText}]()`,
            endSize: 1,
            hotKey: 'Ctrl-M L'
          },
          Image: {
            command: 'Image',
            func: (selectedText, defaultText) => `![${selectedText || defaultText}]()`,
            endSize: 1,
            hotKey: 'Ctrl-M I'
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
            startSize: 2,
            hotKey: 'Ctrl-M O'
          },
          Code: {
            command: 'Code',
            func: (selectedText, defaultText, config) => {
              const pos = this.editor.getCursor();
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
      this.editor = <any>editor;
      const configs = KeyMapService.COMMANDS_CONFIG;
      const option = {};
      for (const key in configs) {
        if (configs.hasOwnProperty(key)) {
          const config = configs[key];
          const me = this;
          option[config.hotKey] = function () {
            me.insertContent(key);
          };
        }
      }
      this.codeMirrorMaps(option);
    });
  }

  codeMirrorMaps(option) {
    option['Ctrl-M Q'] = function (editor) {
      editor.display.input.textarea.blur();
    };
    option['Ctrl-Alt-Up'] = () => {
      this.markdownStore.scrollView_.next({isUp:true});
    };
    option['Ctrl-Alt-Down'] = () => {
      this.markdownStore.scrollView_.next({isUp:false});
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
    const commands = this._commandService.commands;
    // const keyMap = (CodeMirror as any).keyMap;
    // option['Ctrl-a'] = keyMap['default']['Alt-G'];

    option['Alt-\\'] = 'goToBracket';
    option['Alt-Shift-\\'] = 'selectBetweenBrackets';
    option['Alt-Shift-Right'] = 'selectScope';
    option['Ctrl-Enter'] = 'insertLineAfter';
    option['Ctrl-Shift-Enter'] = 'insertLineBefore';
    option['Alt-Up'] = 'swapLineUp';
    option['Alt-Down'] = 'swapLineDown';
    option['Ctrl-/'] = 'toggleCommentIndented';
    option['Ctrl-I'] = 'selectLine';
    option['Ctrl-D'] = 'selectNextOccurrence';
    option['Ctrl-H'] = 'replace';
    option['Esc'] = 'singleSelectionTop';
    option['Alt-Shift+Down'] = 'duplicateLine';
    option['Backspace'] = 'smartBackspace' ;
    option['Alt-M'] = 'showInCenter';
    option['Ctrl-M M'] = this.insertMeta;
    /*
Ctrl-F / Cmd-F Start searching
Ctrl-G / Cmd-G Find next
Shift-Ctrl-G / Shift-Cmd-G Find previous
Shift-Ctrl-F / Cmd-Option-F Replace
Shift-Ctrl-R / Shift-Cmd-Option-F Replace all
Alt-F Persistent search (dialog doesn't autoclose, enter to find next, Shift-Enter to find previous)
Alt-G Jump to line*/
    this.editor.setOption('extraKeys', (<any>CodeMirror).normalizeKeyMap(option));
  }

  private insertMeta(cm) {
    cm.setCursor({ line: 1, ch: 0 });
    cm.replaceSelection(DEFAULT_DOC_HEAD_META, 'start');
    cm.focus();
  }

  handleCommand(command: Command) {
    this.insertContent(command.name);
  }
  insertContent(type: string) {
    if (!this.editor) {
      return;
    }
    let selectionText = this.editor.getSelection();

    if (type === 'Focus') {
      this.editor.focus();
      return;
    } else if (type === 'Meta') {
      this.insertMeta(this.editor);
      return;
    }

    const config = KeyMapService.COMMANDS_CONFIG[type];
    // let selectionText: string = this.editor.getModel().getValueInRange(selection);
    selectionText = config.func(selectionText, '', config);
    const position = this.editor.getCursor();
    if (config.startSize) {
      this.editor.replaceSelection(selectionText, 'start');
      this.editor.focus();
      this.editor.setCursor({ line: position.line, ch: position.ch + config.startSize });
      // for (let i = 0; i < config.startSize; i++) this.editor.execCommand('goCharRight');
    } else if (config.endSize) {
      this.editor.replaceSelection(selectionText, 'around');
      const end = this.editor.getCursor('to');
      this.editor.focus();
      this.editor.setCursor({ line: end.line, ch: end.ch - config.endSize });

      // for (let i = 0; i < config.endSize; i++) this.editor.execCommand('goCharLeft');
    }
    if (config.command === 'Image') {
      this._uploadService.fileUploaded = path => this.editor.replaceSelection(path);
      this._uploadService.upload('image');
    }
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
}
