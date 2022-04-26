import {
  Inject,
  Injectable,
  Injector,
  Optional,
} from "@angular/core";

import * as MarkdownIt from "markdown-it";
import * as markdownVideoPlugin from "markdown-it-video";
import { tasklists } from "./markdown-it-plugins/markdown-it-task-lists";
import * as emoji from "markdown-it-emoji";
// import * as emoji from 'markdown-it-emoji/light';
import * as sub from "markdown-it-sub";
import * as sup from "markdown-it-sup";
import * as ins from "markdown-it-ins";
import * as mark from "markdown-it-mark";
import * as abbr from "markdown-it-abbr";
import * as deflist from "markdown-it-deflist";
import title from "./markdown-it-plugins/title";
import { html } from "./markdown-it-plugins/html";
// import * as footnote from "./markdown-it-plugins/footnote";
import * as imsize from "./markdown-it-plugins/imsize";
import anchor from "./markdown-it-plugins/anchor";
import fence from "./markdown-it-plugins/code/fence";
import toc from "./markdown-it-plugins/toc";
import { ContainerPlugin } from "./markdown-it-plugins/container";
import { MarkdownConfig } from "../markdown.config";
import latex from "markdown-it-latex";
import { mergeConf, DocumentRef } from "core";
import { MermaidPlugin } from "./markdown-it-plugins/mermaid.plugin";
import { CopierService } from "core";
import { Subscription, asyncScheduler } from "rxjs";
import { getAddr } from "../utils/getUri";
import { Utilities } from "core";
import { LispPlugin } from "./markdown-it-plugins/lisp";
import { sourceLine } from "./markdown-it-plugins/source-line";
import { markdownitIncrementalDOM } from "./markdown-it-plugins/incremental-dom";
import * as IncrementalDom from "incremental-dom";
import { MetaPlugin } from "./markdown-it-plugins/meta";
import { DocumentStore } from "app/modules/shared/store/document.store";
import { Title } from "@angular/platform-browser";
import { setInnerHtml } from "./exec-script";
import { DEFAULT_HIGHLIGHT_FUNCTION, ViewerService } from "./markdown-it-plugins/code/highlight";

const enableIDOM = true;

@Injectable()
export class MarkdownViewerService implements ViewerService {
  private defaultConfig: MarkdownConfig = {
    markdownIt: {
      html: true,
      xhtmlOut: false,
      breaks: false,
      langPrefix: "langPrefix-",
      linkify: true,
      typographer: true,
    },
  };

  mediaChangeSubscription: Subscription;
  public markdownIt: MarkdownIt;
  public env: any = {};
  public target: HTMLElement;
  private showCodeLineNumber: boolean;
  constructor(
    private docRef: DocumentRef,
    private titleService: Title,
    private store: DocumentStore,
    private injector: Injector,
    @Inject('MarkdownConfig') @Optional() config?: MarkdownConfig
  ) {
    config = config || mergeConf(this.defaultConfig, config);

    if (!config.markdownIt.highlight) {
      config.markdownIt.highlight = DEFAULT_HIGHLIGHT_FUNCTION(this, injector);
    }

    this.markdownIt = new MarkdownIt(config.markdownIt);
    new MetaPlugin(this.markdownIt, this.updateMeta);
    new LispPlugin(this.markdownIt);
    this.markdownIt
      .use(markdownitIncrementalDOM, IncrementalDom, {
        incrementalizeDefaultRules: true,
      })
      .use(
        title((title, level) => {
          this.updateMeta({ title });
          this.titleService.setTitle(title ? `${title} - I'm` : "I'm");
        }, 1)
      )
      .use(markdownVideoPlugin, {
        youtube: { width: 640, height: 390 },
      })
      .use(tasklists, { enabled: true, label: true, labelAfter: true })
      .use(emoji)
      .use(sub)
      .use(sup)
      .use(ins)
      .use(mark)
      // .use(footnote, {
      //   getUrl: (_) => getAddr(this.docRef.document.location.href),
      // })
      .use(deflist)
      .use(abbr)
      .use(fence)
      .use(anchor, {
        level: 1,
        // slugify: string => string,
        permalink: true,
        permalinkHref: (slug, state) => {
          return `${getAddr(this.docRef.document.location.href)}#${slug}`;
        },
        permalinkClass: "deep-link",
        permalinkSymbol: `<i class="material-icons deep-link-icon">link</i>`, // "¶",
        permalinkBefore: false,
      })
      .use(toc, {
        getHref: (slug, state) => {
          return `${getAddr(this.docRef.document.location.href)}#${slug}`;
        },
        includeLevel: [2, 3, 4],
      })
      // .use(imsize, { autofill: true })
      .use(sourceLine)
      .use(latex)
      .use(html(IncrementalDom, enableIDOM));

    new MermaidPlugin(this.markdownIt);
    new ContainerPlugin(this.markdownIt, "warning");

    this.docRef.document["copier"] = new CopierService();
  }

  private updateMeta = (yamlMeta) => {

    function isDiff(obj: object, withObj: object) {
      if (obj == null && withObj != null || withObj == null && obj != null) return true;
      if (Array.isArray(obj)) {
        if (!Array.isArray(withObj)) return true;

        if (obj.length !== withObj.length) return true;
      }

      for (const [key, value] of Object.entries(obj)) {
        if (!withObj?.hasOwnProperty(key)) return true;

        const withValue = withObj[key];
        if (value !== withValue) {
          if (typeof value === "object") {
            if (isDiff(value, withValue)) return true;
          } else {
            return true;
          }
        }
      }
      return false;
    }

    if (!yamlMeta) return yamlMeta;

    const metaDataInStore = this.store.currentDocMeta$.state;
    if (!metaDataInStore) return yamlMeta;

    if (!isDiff(yamlMeta, metaDataInStore)) return metaDataInStore;

    const newMeta = {
      ...metaDataInStore,
      ...yamlMeta,
    };

    asyncScheduler.schedule(
      meta => {
        this.store.docMeta.set(meta);
      },
      0,
      newMeta
    );
    return newMeta;
  };


  public render(target: HTMLElement, raw: string): string {
    this.target = target;
    if (enableIDOM) {
      try {
        const mdIt = this.markdownIt;
        const code_inline_original: any = this.markdownIt.renderer.rules.code_inline; // latex code_inline rule or default
        const { elementClose, elementOpen, elementVoid, text, skipNode, skip } = IncrementalDom;

        const incrementalDomRenderer = mdIt["IncrementalDOMRenderer"];
        const irender_code_inline_rule = incrementalDomRenderer.rules.code_inline;
        // override the irender rules
        incrementalDomRenderer.rules.code_inline = (...args) => {
          const [tokens, idx, options, env, slf] = args;
          const content = tokens[idx].content;
          if (content.startsWith("$") || content.startsWith("@")) {
            // latex
            return code_inline_original(...args);
          }
          return irender_code_inline_rule(...args);
        };

        const parsed = mdIt.parse(raw, this.env);
        const r = IncrementalDom.patch(
          target,
          // should not use: (mdIt as any).renderToIncrementalDOM(raw, this.env),
          // because the rules changed again when it get the IncrementalDOMRenderer
          incrementalDomRenderer.render(parsed, mdIt["options"], this.env)
        );

        return r.textContent;
      } catch (e) {
        console.error(e);
        return e;
      }
    } else {
      const r = this.markdownIt.render(raw, this.env);
      // target.innerHTML = r; script tags could not be executed
      setInnerHtml(target, r); // script tags could be executed
      return r;
    }
  }

}
