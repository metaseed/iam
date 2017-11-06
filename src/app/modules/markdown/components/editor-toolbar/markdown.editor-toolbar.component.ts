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
    this.editor.commands.addCommand({
      name: 'save',
      bindKey: { win: 'Ctrl-S', 'mac': 'Cmd-S' },
      exec: function (editor) {
        console.log('saving', editor.session.getValue());
      }
    });
    this.editor.commands.addCommand({
      name: 'italic',
      bindKey: { win: 'Ctrl-I', 'mac': 'Cmd-I' },
      exec: function (editor) {
        me.insertContent('Italic');
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
  insertContent(type: string) {
    if (!this.editor) {
      return;
    }
    let selectedText = this.editor.getSelectedText();
    const isSelected = !!selectedText;
    let startSize = 2;
    let initText = '';
    const range = this.editor.selection.getRange();
    switch (type) {
      case 'Bold':
        initText = 'Bold Text';
        selectedText = `**${selectedText || initText}**`;
        break;
      case 'Italic':
        initText = 'Italic Text';
        selectedText = `*${selectedText || initText}*`;
        startSize = 1;
        break;
      case 'Heading':
        initText = 'Heading';
        selectedText = `# ${selectedText || initText}`;
        break;
      case 'Reference':
        initText = 'Reference';
        selectedText = `> ${selectedText || initText}`;
        break;
      case 'Link':
        selectedText = `[](http://)`;
        startSize = 1;
        break;
      case 'Image':
        selectedText = `![](http://)`;
        break;
      case 'Ul':
        selectedText = `- ${selectedText || initText}`;
        break;
      case 'Ol':
        selectedText = `1. ${selectedText || initText}`;
        startSize = 3;
        break;
      case 'Code':
        initText = 'Source Code';
        selectedText = '```language\r\n' + (selectedText || initText) + '\r\n```';
        startSize = 3;
        break;
    }
    this.editor.session.replace(range, selectedText);
    if (!isSelected) {
      range.start.column += startSize;
      range.end.column = range.start.column + initText.length;
      this.editor.selection.setRange(range);
    }
    this.editor.focus();
  }
}
