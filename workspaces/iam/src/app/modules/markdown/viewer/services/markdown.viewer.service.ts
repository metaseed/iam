import { Injectable, Optional, Renderer2, RendererFactory2 } from '@angular/core';
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
// import 'prismjs/components/prism-php';// have problem
import 'prismjs/components/prism-powershell';
import 'prismjs/components/prism-lisp';
import 'prismjs/components/prism-python';
import 'prismjs/components/prism-sass';
import 'prismjs/components/prism-sql';
import 'prismjs/components/prism-vim';
import 'prismjs/components/prism-yaml';
import 'prismjs/plugins/line-numbers/prism-line-numbers';
import * as MarkdownIt from 'markdown-it';
import * as markdownVideoPlugin from 'markdown-it-video';
import * as tasklists from 'markdown-it-task-lists';
import * as emoji from 'markdown-it-emoji';
// import * as emoji from 'markdown-it-emoji/light';
import * as sub from 'markdown-it-sub';
import * as sup from 'markdown-it-sup';
import * as ins from 'markdown-it-ins';
import * as mark from 'markdown-it-mark';
import * as abbr from 'markdown-it-abbr';
import * as deflist from 'markdown-it-deflist';
import * as title from './markdown-it-plugins/title';
import * as footnote from './markdown-it-plugins/footnote';
import * as imsize from './markdown-it-plugins/imsize';
import * as anchor from './markdown-it-plugins/anchor';
import * as toc from './markdown-it-plugins/toc';
import { ContainerPlugin } from './markdown-it-plugins/container';
import { MarkdownConfig } from '../markdown.config';
import latex from 'markdown-it-latex';
import { mergeConf, DocumentRef, base64Encode } from 'core';
import { Router } from '@angular/router';
// import latex from 'markdown-it-katex';
import { MermaidPlugin } from './markdown-it-plugins/mermaid.plugin';
import { CopierService } from 'core';
import { Subscription } from 'rxjs';
import { getAddr } from '../utils/getUri';
import { Utilities, addFunctionToHeader } from 'core';
import { take } from 'rxjs/operators';
import { LispPlugin } from './markdown-it-plugins/lisp';
import { sourceLine } from './markdown-it-plugins/source-line';

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

  public parsedContent: { title?: string } = {};
  mediaChangeSubscription: Subscription;
  private markdown: MarkdownIt.MarkdownIt;
  private containerPlugin: ContainerPlugin;
  private mermaidPlugin: MermaidPlugin;
  private lispPlugin: LispPlugin;
  private showCodeLineNumber: boolean;
  constructor(
    private router: Router,
    private docRef: DocumentRef,
    private utils: Utilities,
    @Optional() config?: MarkdownConfig
  ) {
    this.utils.isScreenWide$.subscribe(wide => (this.showCodeLineNumber = wide));
    config = config || mergeConf(this.defaultConfig, config);

    if (!config.markdownIt.highlight) {
      config.markdownIt.highlight = this.DEFAULT_HIGHLIGHT_FUNCTION;
    }

    this.markdown = new MarkdownIt(config.markdownIt);
    this.lispPlugin = new LispPlugin(this.markdown);
    this.markdown
      .use(title)
      .use(markdownVideoPlugin, {
        youtube: { width: 640, height: 390 }
      })
      .use(tasklists, { enabled: false })
      .use(emoji)
      .use(sub)
      .use(sup)
      .use(ins)
      .use(mark)
      .use(footnote, {
        getUrl: _ => getAddr(this.docRef.document.location.href)
      })
      .use(deflist)
      .use(abbr)
      .use(anchor, {
        level: 1,
        // slugify: string => string,
        permalink: true,
        permalinkHref: (slug, state) => {
          return `${getAddr(this.docRef.document.location.href)}#${slug}`;
        },
        permalinkClass: 'deep-link',
        permalinkSymbol: `<i class="material-icons deep-link-icon">link</i>`, // "¶",
        permalinkBefore: false
      })
      .use(toc, {
        getHref: (slug, state) => {
          return `${getAddr(this.docRef.document.location.href)}#${slug}`;
        },
        includeLevel: [2, 3, 4]
      })
      .use(latex)
      .use(imsize, { autofill: true })
      .use(sourceLine);

    this.mermaidPlugin = new MermaidPlugin(this.markdown);

    this.containerPlugin = new ContainerPlugin(this.markdown, 'warning');
    // Beautify output of parser for html content
    this.markdown.renderer.rules.table_open = function() {
      return '<table class="table table-striped">\n';
    };
    this.markdown.renderer.rules.blockquote_open = function() {
      return '<blockquote class="blockquote">\n';
    };
    (<any>this.docRef.document).copier = new CopierService();

    function wrap_text(event) {
      const e = event.target.parentElement.parentElement.getElementsByTagName('code')[0];
      if (!e.nowrap) {
        e.style['white-space'] = 'pre';
        e.nowrap = true;
      } else {
        e.style['white-space'] = 'pre-wrap';
        e.nowrap = false;
      }
    }
    addFunctionToHeader(wrap_text);
  }

  public render(raw: string): string {
    const env: any = {};
    const r = `${this.markdown.render(raw, env)}`;
    this.parsedContent.title = env.title;
    return r;
  }

  private DEFAULT_HIGHLIGHT_FUNCTION = (str, lang) => {
    const language = prismjs.languages[lang];
    if (lang && language) {
      const preNode: Element = this.docRef.document.createElement('pre');
      const codeNode = this.docRef.document.createElement('code');
      preNode.className = (this.showCodeLineNumber ? 'line-numbers' : '') + ' language-' + lang;
      preNode.appendChild(codeNode);
      codeNode.textContent = str;

      try {
        prismjs.highlightElement(codeNode);

        return `<div class="markdown-code">
<div class="code-buttons">

<button class="material-icons code-button"
onclick="editEvent(event.target.parentElement.parentElement.parentElement)">
edit
</button>

<button class="material-icons code-button"
onclick="wrap_text(event)">
wrap_text
</button>

<button class="material-icons code-button no-print"
title="Copy code snippet"
originalstr=${base64Encode(str)}
onclick="document.copier.copyText(this.attributes.originalstr.value,true)">
<span aria-hidden="true">content_copy</span>
</button></div>${preNode.outerHTML}</div>`;
      } catch (e) {
        console.error(e);
      }
    }
    return `<pre class="highlight"><code>${this.markdown.utils.escapeHtml(str)} </code></pre>`;
  };
}
