import { Component, OnInit, AfterViewInit, Input, Renderer } from '@angular/core';
import { MarkdownComponent } from '../markdown.component';
import { DomSanitizer } from '@angular/platform-browser';
// import { AceEditorDirective } from '../editor/markdown-editor.directive';

import { Command, CommandService } from '../../../core';
import { Subscription } from 'rxjs/Subscription';
import { DocService } from '../../../../docs/index';
import { MarkdownEditorService } from '../../services/markdown.editor.service';
declare var monaco;
@Component({
  selector: 'editor-toolbar',
  templateUrl: './markdown.editor-toolbar.component.html',
  styleUrls: ['./markdown.editor-toolbar.component.scss']
})
export class EditorToolbarComponent implements OnInit, AfterViewInit {
  private static COMMANDS_CONFIG;

  isFullScreen: boolean;
  editor: any;

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
    private editorService: MarkdownEditorService,
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

    this.editorService.editorLoaded$.subscribe((editor) => {
      if (!EditorToolbarComponent.COMMANDS_CONFIG) {
        EditorToolbarComponent.COMMANDS_CONFIG = {
          Bold: { command: 'Bold', func: (selectedText, defaultText) => `**${selectedText || defaultText}**`, startSize: 2, hotKey: [monaco.KeyCode.AltCmd | monaco.KeyCode.KEY_B] }, // not Ctrl-M B also work
          Italic: { command: 'Italic', func: (selectedText, defaultText) => `*${selectedText || defaultText}*`, startSize: 1, hotKey: [monaco.KeyCode.AltCmd | monaco.KeyCode.KEY_I] },
          Heading: { command: 'Heading', func: (selectedText, defaultText) => `# ${selectedText || defaultText}`, startSize: 2, hotKey: [monaco.KeyCode.AltCmd | monaco.KeyCode.KEY_H] },
          Reference: { command: 'Reference', func: (selectedText, defaultText) => `> ${selectedText || defaultText}`, startSize: 2, hotKey: [monaco.KeyCode.AltCmd | monaco.KeyCode.KEY_R] },
          Link: { command: 'Link', func: (selectedText, defaultText) => `[${selectedText || defaultText}](http://)`, startSize: 1, hotKey: [monaco.KeyCode.AltCmd | monaco.KeyCode.KEY_L] },
          Image: { command: 'Image', func: (selectedText, defaultText) => `![${selectedText || defaultText}](http://)`, startSize: 2, hotKey: [monaco.KeyCode.AltCmd | monaco.KeyCode.KEY_M] },
          Ul: { command: 'Ul', func: (selectedText, defaultText) => `- ${selectedText || defaultText}`, startSize: 2, hotKey: [monaco.KeyCode.AltCmd | monaco.KeyCode.KEY_U] },
          Ol: { command: 'Ol', func: (selectedText, defaultText) => `1 ${selectedText || defaultText}`, startSize: 2, hotKey: [monaco.KeyCode.AltCmd | monaco.KeyCode.KEY_O] },
          Code: { command: 'Code', func: (selectedText, defaultText) => '```lang\r\n' + (selectedText || defaultText) + '\r\n```', startSize: 3, hotKey: [monaco.KeyCode.AltCmd | monaco.KeyCode.KEY_C] },
          Save: { command: 'Save', func: me.save, startSize: 0, hotKey: [monaco.KeyCode.CtrlCmd | monaco.KeyCode.KEY_S] },
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
  save = () => {
    const content = this.editor.session.getValue();
    this._docService.edit({ title: this.markdown.title, body: content });
    console.log('saving', content);
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
    if (this.editor) {
      setTimeout(() => {
        this.editor.resize();
        this.editor.focus();
      }, timeOut);
    }
  }

  insertContent(type: string) {
    if (!this.editor) {
      return;
    }
    let selectedText = this.editor.getSelection();
    const isSelected = !!selectedText;
    const range = this.editor.selection.getRange();

    const config = EditorToolbarComponent.COMMANDS_CONFIG[type];
    let startSize = config.startSize;
    selectedText = config.func(selectedText, config.command);
    this.editor.session.replace(range, selectedText);
    if (!isSelected) {
      range.start.column += startSize;
      range.end.column = range.start.column + config.command.length;
      this.editor.selection.setRange(range);
    }
    this.editor.focus();
  }
}
