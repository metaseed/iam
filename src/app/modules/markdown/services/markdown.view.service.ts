import { Injectable } from '@angular/core';
import * as MarkdownIt from 'markdown-it';
import markdownVideoPlugin from 'markdown-it-video';
import { MarkdownConfig } from '../markdown.config';
import highlightjs from 'highlight.js';

import * as utils from '../../utils';
import { ContainerPlugin } from './plugins/container';
import tasklists from 'markdown-it-task-lists';
import emoji from 'markdown-it-emoji';

@Injectable()
export class MarkdownViewService {
  private defaultConfig: MarkdownConfig = {
    markdownIt: {
      html: true,
      xhtmlOut: false,
      breaks: false,
      langPrefix: 'langPrefix-',
      linkify: true,
      typographer: true
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
      })
      .use(tasklists, { enabled: true })
      .use(emoji);

    this.containerPlugin = new ContainerPlugin(this.markdown, 'spoiler');
  }

  public render(raw: string): string {
    return `${this.markdown.render(raw)}`;
  }

  private DEFAULT_HIGHLIGHT_FUNCTION = (str, lang) => {
    if (lang && highlightjs.getLanguage(lang)) {
      try {
        return '<pre class="hljs"><code>' + highlightjs.highlight(lang, str, true).value + '</code></pre>';
      } catch (__) { }
    }
    return '<pre class="hljs"><code>' + this.markdown.utils.escapeHtml(str) + '</code></pre>';
  }

}
