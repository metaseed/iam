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
import 'prismjs/components/prism-php';
import 'prismjs/components/prism-powershell';
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
//import latex from 'markdown-it-katex';
import { Mermaid } from './markdown-it-plugins/mermaid';
import { CopierService } from 'core';
import { Subscription } from 'rxjs';
import { getAddr } from '../utils/getUri';
import { Utilities } from '../../../core/utils';
import { take } from 'rxjs/operators';

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
  private mermaidPlugin: Mermaid;
  private showCodeLineNumber: boolean;
  constructor(
    private router: Router,
    private document: DocumentRef,
    private utils: Utilities,
    @Optional() config?: MarkdownConfig
  ) {
    this.utils.isScreenWide$.pipe(take(1)).subscribe(wide => (this.showCodeLineNumber = wide));
    config = config || mergeConf(this.defaultConfig, config);

    if (!config.markdownIt.highlight) {
      config.markdownIt.highlight = this.DEFAULT_HIGHLIGHT_FUNCTION;
    }

    this.markdown = new MarkdownIt(config.markdownIt);
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
        getUrl: _ => getAddr(this.document.document.location.href)
      })
      .use(deflist)
      .use(abbr)
      .use(anchor, {
        level: 1,
        // slugify: string => string,
        permalink: true,
        permalinkHref: (slug, state) => {
          return `${getAddr(this.document.document.location.href)}#${slug}`;
        },
        permalinkClass: 'deep-link',
        permalinkSymbol: `<svg aria-hidden="true" class="deep-link-icon" height="16" version="1.1" width="16"><path d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg>`, //"¶",
        permalinkBefore: false
      })
      .use(toc, {
        getHref: (slug, state) => {
          return `${getAddr(this.document.document.location.href)}#${slug}`;
        },
        includeLevel: [2, 3, 4]
      })
      .use(latex)
      .use(imsize, { autofill: true });

    this.mermaidPlugin = new Mermaid(this.markdown);

    this.containerPlugin = new ContainerPlugin(this.markdown, 'warning');
    // Beautify output of parser for html content
    this.markdown.renderer.rules.table_open = function() {
      return '<table class="table table-striped">\n';
    };
    this.markdown.renderer.rules.blockquote_open = function() {
      return '<blockquote class="blockquote">\n';
    };
    (<any>this.document.document).copier = new CopierService();
  }

  public render(raw: string): string {
    let env: any = {};
    const r = `${this.markdown.render(raw, env)}`;
    this.parsedContent.title = env.title;
    return r;
  }

  private DEFAULT_HIGHLIGHT_FUNCTION = (str, lang) => {
    let language = prismjs.languages[lang];
    if (lang && language) {
      let preNode: Element = this.document.document.createElement('pre');
      let codeNode = this.document.document.createElement('code');
      preNode.className = (this.showCodeLineNumber ? 'line-numbers' : '') + ' language-' + lang;
      preNode.appendChild(codeNode);
      codeNode.textContent = str;
      try {
        prismjs.highlightElement(codeNode);

        return `<div class="markdown-code" style="position:relative"><button class="material-icons copy-button no-print"
        title="Copy code snippet"
        originalstr=${base64Encode(str)}
        onclick="document.copier.copyText(this.attributes.originalstr.value,true)">
        <span aria-hidden="true">content_copy</span>
      </button>${preNode.outerHTML}</div>`;
      } catch (__) {}
    }
    return `<pre class="highlight"><code>${this.markdown.utils.escapeHtml(str)} </code></pre>`;
  };
}
