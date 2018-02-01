import { Component, OnInit, AfterViewInit, Input, Renderer } from '@angular/core';
import { MarkdownComponent } from '../../../markdown.component';
import { DomSanitizer } from '@angular/platform-browser';

import { Subscription } from 'rxjs/Subscription';
import { DocService } from 'docs';
import { MarkdownEditorService } from '../../../editor/index';
import { CommandService, Command, DocumentRef } from '../../../../core/index';
import { Store, select } from '@ngrx/store';
import { State } from '../../../reducers';
import * as doc from '../../../actions/document';
import * as edit from '../../../actions/edit';
import { OnDestroy } from '@angular/core';
import { ObservableMedia } from '@angular/flex-layout';
import * as fromMarkdown from '../../../reducers';
import * as CodeMirror from 'codemirror';
@Component({
  selector: 'ms-codemirror-toolbar',
  templateUrl: './codemirror-toolbar.component.html',
  styleUrls: ['./codemirror-toolbar.component.scss']
})

export class CodemirrorToolbarComponent implements OnInit {
  private static COMMANDS_CONFIG;
  editorLoadedSubscription: Subscription;
  mediaChangeSubscription: Subscription;
  _subscription: Subscription;
  _options: any;
  gtsmBreakpoint = false;
  editor: CodeMirror.Editor;
  doc: CodeMirror.Doc;
  constructor(
    private media: ObservableMedia,
    public markdown: MarkdownComponent,
    private _editorService: MarkdownEditorService,
    private _docService: DocService,
    private _renderer: Renderer,
    private _commandService: CommandService,
    private _docRef: DocumentRef,
    private _domSanitizer: DomSanitizer,
    private store: Store<State>
  ) {
    this.mediaChangeSubscription = media.subscribe(change => {
      if (!['xs', 'sm'].includes(change.mqAlias)) {
        this.gtsmBreakpoint = false;
      } else {
        this.gtsmBreakpoint = true;
      }
    });
    this._subscription = _commandService.commands.subscribe(c => this.handleCommand(c));
    let me = this;
    this.editorLoadedSubscription = this._editorService.editorLoaded$.subscribe((editor: CodeMirror.Editor) => {
      if (!CodemirrorToolbarComponent.COMMANDS_CONFIG) {
        CodemirrorToolbarComponent.COMMANDS_CONFIG = {
          Bold: { command: 'Bold', func: (selectedText, defaultText) => `**${selectedText || defaultText}**`, startSize: 2, hotKey: 'Ctrl-M B' },
          Italic: { command: 'Italic', func: (selectedText, defaultText) => `*${selectedText || defaultText}*`, startSize: 1, hotKey: 'Ctrl-M I' },
          Heading: { command: 'Heading', func: (selectedText, defaultText) => `# ${selectedText || defaultText}`, startSize: 2, hotKey: 'Ctrl-M H' },
          Reference: { command: 'Reference', func: (selectedText, defaultText) => `> ${selectedText || defaultText}`, startSize: 2, hotKey: 'Ctrl-M R' },
          Link: { command: 'Link', func: (selectedText, defaultText) => `[${selectedText || defaultText}](http://)`, startSize: 1, hotKey: 'Ctrl-M L' },
          Image: { command: 'Image', func: (selectedText, defaultText) => `![${selectedText || defaultText}](http://)`, startSize: 2, hotKey: 'Ctrl-M M' },
          Ul: { command: 'Ul', func: (selectedText, defaultText) => `- ${selectedText || defaultText}`, startSize: 2, hotKey: 'Ctrl-M U' },
          Ol: { command: 'Ol', func: (selectedText, defaultText) => `1 ${selectedText || defaultText}`, startSize: 2, hotKey: 'Ctrl-M O' },
          Code: { command: 'Code', func: (selectedText, defaultText) => '```lang\r\n' + (selectedText || defaultText) + '\r\n```', startSize: 3, hotKey: 'Ctrl-M C' },

        };
      }
      me.editor = editor;
      me.doc = <any>editor;
      const configs = CodemirrorToolbarComponent.COMMANDS_CONFIG;
      let option = {};
      for (let key in configs) {
        if (configs.hasOwnProperty(key)) {
          var config = configs[key];
          option[config.hotKey] = function (editor) {
            me.insertContent(key);
          };
        }
      }
      me.editor.setOption("extraKeys", (<any>CodeMirror).normalizeKeyMap(option));
    });
  }

  command(command: string) {
    if (command === 'Undo') {
      this.editor.execCommand('undo');
    } else if (command === 'Redo') {
      this.editor.execCommand('redo');
    }
  }

  @Input()
  get options(): any {
    return this._options;
  }

  _hideIcons: any = {};
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

    const config = CodemirrorToolbarComponent.COMMANDS_CONFIG[type];
    let startSize = config.startSize;
    // let selectionText: string = this.editor.getModel().getValueInRange(selection);
    selectionText = config.func(selectionText, config.command);
    this.doc.replaceSelection(selectionText, 'around');
    // let p = this.doc.getCursor();
    // this.doc.extendSelection(<any>{ line: p.line, ch: p.ch + 2 })
    // this.editor.executeEdits('', [{ identifier: null, range: selection, text: selectionText, forceMoveMarkers: true }]);
    // if (selection.startColumn == selection.endColumn && selection.startLineNumber == selection.endLineNumber) {
    //   selection = new monaco.Selection(selection.startLineNumber, selection.startColumn + startSize, selection.endLineNumber, selection.startColumn + startSize + config.command.length);
    //   this.editor.setSelection(selection);
    // }
    // this.editor.layout();
  }
  ngOnInit() {
  }
  ngOnDestroy() {
    if (this.editorLoadedSubscription)
      this.editorLoadedSubscription.unsubscribe();
    if (this.mediaChangeSubscription) {
      this.mediaChangeSubscription.unsubscribe();
      this.mediaChangeSubscription = null;
    }
  }
}
