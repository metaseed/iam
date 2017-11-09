import { Component, OnInit, AfterViewInit, Input, Renderer } from '@angular/core';
import { MarkdownComponent } from '../markdown.component';
import { DomSanitizer } from '@angular/platform-browser';
import { AceEditorDirective } from '../editor/markdown-editor.directive';
import { Command, CommandService } from '../../../core';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'editor-toolbar',
  templateUrl: './markdown.editor-toolbar.component.html',
  styleUrls: ['./markdown.editor-toolbar.component.scss']
})
export class EditorToolbarComponent implements OnInit, AfterViewInit {
  isFullScreen: boolean;
  editor: any;

  _subscription: Subscription;
  _options: any;
  _hideIcons: any = {};
  constructor(private markdown: MarkdownComponent,
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
    this.editor = this.markdown.editor.editor;
    const configs = EditorToolbarComponent.COMMANDS_CONFIG;
    for (let key in configs) {
      if (configs.hasOwnProperty(key)) {
        var config = configs[key];

        this.editor.commands.addCommand({
          name: key,
          bindKey: config.hotKey,
          exec: function (editor) {
            me.insertContent(key);
          }
        });
      }
    }
    this.editor.commands.addCommand({
      name: 'save',
      bindKey: { win: 'Ctrl-S', mac: 'Cmd-S' },
      exec: function (editor) {
        console.log('saving', editor.session.getValue());
      }
    });

  }

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



  private static COMMANDS_CONFIG = {
    Bold: { command: 'Bold', func: (selectedText, defaultText) => `**${selectedText || defaultText}**`, startSize: 2, hotKey: { win: 'Alt-B', mac: 'Cmd-B' } }, // not Ctrl-M B also work
    Italic: { command: 'Italic', func: (selectedText, defaultText) => `*${selectedText || defaultText}*`, startSize: 1, hotKey: { win: 'Alt-I', mac: 'Cmd-I' } },
    Heading: { command: 'Heading', func: (selectedText, defaultText) => `# ${selectedText || defaultText}`, startSize: 2, hotKey: { win: 'Alt-H', mac: 'Cmd-H' } },
    Reference: { command: 'Reference', func: (selectedText, defaultText) => `> ${selectedText || defaultText}`, startSize: 2, hotKey: { win: 'Alt-R', mac: 'Cmd-R' } },
    Link: { command: 'Link', func: (selectedText, defaultText) => `[${selectedText || defaultText}](http://)`, startSize: 1, hotKey: { win: 'Alt-L', mac: 'Cmd-L' } },
    Image: { command: 'Image', func: (selectedText, defaultText) => `![${selectedText || defaultText}](http://)`, startSize: 2, hotKey: { win: 'Alt-M', mac: 'Cmd-M' } },
    Ul: { command: 'Ul', func: (selectedText, defaultText) => `- ${selectedText || defaultText}`, startSize: 2, hotKey: { win: 'Alt-U', mac: 'Cmd-U' } },
    Ol: { command: 'Ol', func: (selectedText, defaultText) => `1 ${selectedText || defaultText}`, startSize: 2, hotKey: { win: 'Alt-O', mac: 'Cmd-O' } },
    Code: { command: 'Code', func: (selectedText, defaultText) => '```lang\r\n' + (selectedText || defaultText) + '\r\n```', startSize: 3, hotKey: { win: 'Alt-C', mac: 'Cmd-C' } },
  };

  insertContent(type: string) {
    if (!this.editor) {
      return;
    }
    let selectedText = this.editor.getSelectedText();
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
