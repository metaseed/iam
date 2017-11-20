/// <reference path="../../../../../../../../node_modules/monaco-editor/monaco.d.ts" />
import { Component, OnInit, AfterViewInit, Input, Renderer } from '@angular/core';
import { MarkdownComponent } from '../../markdown.component';
import { DomSanitizer } from '@angular/platform-browser';

import { Subscription } from 'rxjs/Subscription';
import { DocService } from '../../../../docs/index';
import { MarkdownEditorService } from '../../editor/index';
import { CommandService, Command } from '../../../core/index';
@Component({
  selector: 'editor-toolbar',
  templateUrl: './markdown.editor-toolbar.component.html',
  styleUrls: ['./markdown.editor-toolbar.component.scss']
})
export class EditorToolbarComponent implements OnInit, AfterViewInit {
  private static COMMANDS_CONFIG;

  isFullScreen: boolean;
  editor: monaco.editor.IStandaloneCodeEditor;

  _subscription: Subscription;
  _options: any;
  _hideIcons: any = {};

  @Input()
  get options(): any {
    return this._options;
  }
  set options(value: any) {
    this._options = value || {
      hideIcons: []
    };
    this._hideIcons = {};
    (this._options.hideIcons || []).forEach((v: any) => {
      this._hideIcons[v] = true;
    });
  }

  constructor(private markdown: MarkdownComponent,
    private _editorService: MarkdownEditorService,
    private _docService: DocService,
    private _renderer: Renderer,
    private _commandService: CommandService,
    private _domSanitizer: DomSanitizer) {
    this._subscription = _commandService.commands.subscribe(c => this.handleCommand(c));
  }

  handleCommand(command: Command) {
    this.insertContent(command.name);
  }
  ngOnInit() {
  }

  ngAfterViewInit() {
    const me = this;

    this._editorService.editorLoaded$.subscribe((editor: monaco.editor.IStandaloneCodeEditor) => {
      if (!EditorToolbarComponent.COMMANDS_CONFIG) {
        EditorToolbarComponent.COMMANDS_CONFIG = {
          Bold: { command: 'Bold', func: (selectedText, defaultText) => `**${selectedText || defaultText}**`, startSize: 2, hotKey: [monaco.KeyMod.chord(monaco.KeyMod.CtrlCmd | monaco.KeyCode.KEY_M, monaco.KeyCode.KEY_B)] },
          Italic: { command: 'Italic', func: (selectedText, defaultText) => `*${selectedText || defaultText}*`, startSize: 1, hotKey: [monaco.KeyMod.chord(monaco.KeyMod.CtrlCmd | monaco.KeyCode.KEY_M, monaco.KeyCode.KEY_I)] },
          Heading: { command: 'Heading', func: (selectedText, defaultText) => `# ${selectedText || defaultText}`, startSize: 2, hotKey: [monaco.KeyMod.chord(monaco.KeyMod.CtrlCmd | monaco.KeyCode.KEY_M, monaco.KeyCode.KEY_H)] },
          Reference: { command: 'Reference', func: (selectedText, defaultText) => `> ${selectedText || defaultText}`, startSize: 2, hotKey: [monaco.KeyMod.chord(monaco.KeyMod.CtrlCmd | monaco.KeyCode.KEY_M, monaco.KeyCode.KEY_R)] },
          Link: { command: 'Link', func: (selectedText, defaultText) => `[${selectedText || defaultText}](http://)`, startSize: 1, hotKey: [monaco.KeyMod.chord(monaco.KeyMod.CtrlCmd | monaco.KeyCode.KEY_M, monaco.KeyCode.KEY_L)] },
          Image: { command: 'Image', func: (selectedText, defaultText) => `![${selectedText || defaultText}](http://)`, startSize: 2, hotKey: [monaco.KeyMod.chord(monaco.KeyMod.CtrlCmd | monaco.KeyCode.KEY_M, monaco.KeyCode.KEY_M)] },
          Ul: { command: 'Ul', func: (selectedText, defaultText) => `- ${selectedText || defaultText}`, startSize: 2, hotKey: [monaco.KeyMod.chord(monaco.KeyMod.CtrlCmd | monaco.KeyCode.KEY_M, monaco.KeyCode.KEY_U)] },
          Ol: { command: 'Ol', func: (selectedText, defaultText) => `1 ${selectedText || defaultText}`, startSize: 2, hotKey: [monaco.KeyMod.chord(monaco.KeyMod.CtrlCmd | monaco.KeyCode.KEY_M, monaco.KeyCode.KEY_O)] },
          Code: { command: 'Code', func: (selectedText, defaultText) => '```lang\r\n' + (selectedText || defaultText) + '\r\n```', startSize: 3, hotKey: [monaco.KeyMod.chord(monaco.KeyMod.CtrlCmd | monaco.KeyCode.KEY_M, monaco.KeyCode.KEY_C)] },
          Save: { command: 'Save', func: me.save, startSize: 0, hotKey: [monaco.KeyMod.CtrlCmd | monaco.KeyCode.KEY_S] },
        };
      }
      this.editor = editor;
      const configs = EditorToolbarComponent.COMMANDS_CONFIG;
      for (let key in configs) {
        if (configs.hasOwnProperty(key)) {
          var config = configs[key];

          this.editor.addAction({
            id: key,
            label: key,
            contextMenuGroupId: 'navigation',
            keybindings: config.hotKey,
            run: function (editor) {
              me.insertContent(key);
            }
          });
        }
      }

    });
  }
  getFirstLine(text) {
    var index = text.indexOf("\n");
    if (index === -1) index = undefined;
    return text.substring(0, index);
  }
  save = () => {
    const content = this.editor.getValue();
    let title = this.getFirstLine(content);
    this._docService.edit({ title: title ? title.slice(2) : 'iam title', body: content });
  }
  new = () => {
    this._docService.newDoc();
  }

  togglePreview() {
    this.markdown.showPreviewPanel = !this.markdown.showPreviewPanel;
    this.editorResize();
  }

  previewPanelClick(event: Event) {
    event.preventDefault();
    event.stopPropagation();
  }

  fullScreen() {
    this.isFullScreen = !this.isFullScreen;
    this._renderer.setElementStyle(document.body, 'overflowY', this.isFullScreen ? 'hidden' : 'auto');
    this.editorResize();
  }
  editorResize(timeOut: number = 100) {
    setTimeout(() => {
      this._editorService.refresh();

    }, timeOut);
  }
  insertContent(type: string) {
    if (!this.editor) {
      return;
    }
    let selection = this.editor.getSelection();

    const config = EditorToolbarComponent.COMMANDS_CONFIG[type];
    let startSize = config.startSize;
    let selectionText: string = this.editor.getModel().getValueInRange(selection);
    selectionText = config.func(selectionText, config.command);
    this.editor.executeEdits('', [{ identifier: null, range: selection, text: selectionText, forceMoveMarkers: true }]);
    if (selection.startColumn == selection.endColumn && selection.startLineNumber == selection.endLineNumber) {
      selection = new monaco.Selection(selection.startLineNumber, selection.startColumn + startSize, selection.endLineNumber, selection.startColumn + startSize + config.command.length);
      this.editor.setSelection(selection);
    }
    this.editor.layout();
  }
}
