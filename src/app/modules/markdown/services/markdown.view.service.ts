import { Injectable } from '@angular/core';
import MarkdownIt = require('markdown-it'); // or import * as MarkdownIt from 'markdown-it';
import markdownVideoPlugin from 'markdown-it-video';
import { MarkdownConfig } from '../markdown.config';
import hljs from 'highlight.js';

import * as utils from '../../utils';
import { ContainerPlugin } from './plugins/container';


@Injectable()
export class MarkdownViewService {
  private defaultConfig: MarkdownConfig = {
    markdownIt: {
      html: true,
      xhtmlOut: false,
      breaks: false,
      langPrefix: 'langPrefix-',
      linkify: true,
      typographer: false
    }
  };

  private markdown: MarkdownIt.MarkdownIt;
  private containerPlugin: ContainerPlugin;

  constructor(config?: MarkdownConfig) {
    config = config || utils.mergeConf(this.defaultConfig, config);

    if (!config.markdownIt.highlight) {
      config.markdownIt.highlight = this.DEFAULT_HIGHLIGHT_FUNCTION;
    }

    this.markdown = new MarkdownIt(config.markdownIt);
    this.markdown
      .use(markdownVideoPlugin, {
        youtube: { width: 640, height: 390 }
      });
    this.containerPlugin = new ContainerPlugin(this.markdown, 'spolier');
  }

  public render(raw: string): string {
    return `${this.markdown.render(raw)}`;
  }

  private DEFAULT_HIGHLIGHT_FUNCTION = (str, lang) => {
    if (lang && hljs.getLanguage(lang)) {
      try {
        return '<pre class="hljs"><code>' + highlightjs.highlight(lang, str, true).value + '</code></pre>';
      } catch (__) { }
    }
    return '<pre class="hljs"><code>' + this.markdown.utils.escapeHtml(str) + '</code></pre>';
  }

}
