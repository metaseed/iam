import { Injectable, Optional } from '@angular/core';
// import highlightjs from 'highlight.js/lib/highlight';
import * as prismjs from 'prismjs';
// import 'prismjs/components/prism-core';
import 'prismjs/components/prism-clike';
import 'prismjs/components/prism-c';

import 'prismjs/components/prism-typescript';
import 'prismjs/components/prism-bash';
import 'prismjs/components/prism-cpp';
import 'prismjs/components/prism-csharp';
import 'prismjs/components/prism-css';
import 'prismjs/components/prism-docker';
import 'prismjs/components/prism-git';
import 'prismjs/components/prism-graphql';
import 'prismjs/components/prism-java';
import 'prismjs/components/prism-json';
import 'prismjs/components/prism-makefile';
import 'prismjs/components/prism-markdown';
import 'prismjs/components/prism-php';
import 'prismjs/components/prism-powershell';
import 'prismjs/components/prism-python';
import 'prismjs/components/prism-sass';
import 'prismjs/components/prism-sql';
import 'prismjs/components/prism-vim';
import 'prismjs/components/prism-yaml';
import * as MarkdownIt from 'markdown-it';
import * as markdownVideoPlugin from 'markdown-it-video';
import * as tasklists from 'markdown-it-task-lists';
import * as emoji from 'markdown-it-emoji/light';
import * as sub from 'markdown-it-sub';
import * as sup from 'markdown-it-sup';
import * as ins from 'markdown-it-ins';
import * as mark from 'markdown-it-mark';
import * as footnote from 'markdown-it-footnote';
import * as deflist from 'markdown-it-deflist';
import * as abbr from 'markdown-it-abbr';
import * as imsize from 'markdown-it-imsize';
import * as anchor from 'markdown-it-anchor';
import * as toc from './plugins/markdown-it-table-of-contents';
import { ContainerPlugin } from './plugins/container';
import { MarkdownConfig } from '../markdown.config';
import latex from 'markdown-it-latex';
import { mergeConf } from '../../../core/index';
import { Router } from '@angular/router';
//import latex from 'markdown-it-katex';
import { Mermaid } from './plugins/mermaid';

@Injectable()
export class MarkdownViewerService {
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
  private mermaidPlugin: Mermaid;
  constructor(private router: Router, @Optional() config?: MarkdownConfig) {
    config = config || mergeConf(this.defaultConfig, config);

    if (!config.markdownIt.highlight) {
      config.markdownIt.highlight = this.DEFAULT_HIGHLIGHT_FUNCTION;
    }

    this.markdown = new MarkdownIt(config.markdownIt);
    this.markdown
      .use(markdownVideoPlugin, {
        youtube: { width: 640, height: 390 }
      })
      .use(tasklists, { enabled: false })
      .use(emoji)
      .use(sub)
      .use(sup)
      .use(ins)
      .use(mark)
      .use(footnote)
      .use(deflist)
      .use(abbr)
      .use(anchor)
      .use(toc, {
        url: '.' + this.router.url
      })
      .use(latex)
      .use(imsize, { autofill: true });

    this.mermaidPlugin = new Mermaid(this.markdown);

    this.containerPlugin = new ContainerPlugin(this.markdown, 'warning');
    // Beautify output of parser for html content
    this.markdown.renderer.rules.table_open = function () {
      return '<table class="table table-striped">\n';
    };
    this.markdown.renderer.rules.blockquote_open = function () {
      return '<blockquote class="blockquote">\n';
    };

  }

  public render(raw: string): string {
    return `${this.markdown.render(raw)}`;
  }

  private DEFAULT_HIGHLIGHT_FUNCTION = (str, lang) => {
    let language = prismjs.languages[lang];
    if (lang && language) {
      try {
        return `<pre class="language-${lang}"><code> ${prismjs.highlight(str, language)} </code></pre>`;
      } catch (__) { }
    }
    return `<pre class="highlight"><code>${this.markdown.utils.escapeHtml(str)} </code></pre>`;
  }
  // private DEFAULT_HIGHLIGHT_FUNCTION = (str, lang) => {
  //   if (lang && highlightjs.getLanguage(lang)) {
  //     try {
  //       return '<pre class="hljs"><code>' + highlightjs.highlight(lang, str, true).value + '</code></pre>';
  //     } catch (__) { }
  //   }
  //   return '<pre class="hljs"><code>' + this.markdown.utils.escapeHtml(str) + '</code></pre>';
  // }

}
