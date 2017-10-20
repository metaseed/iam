import { Component, Input } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'markdown-viewer',
  templateUrl: 'markdown-viewer.component.html'
})
export class MarkdownViewerComponent {
  @Input()
  set model(value: string) {
    if (value) {
      this.parsedModel = this.sanitized.bypassSecurityTrustHtml(this.markdown.render(value));
    } else {
      this.parsedModel = '';
    }
  }

  private defaultConfig: MarkdownConfig = {
    markdownIt: {
      html: false,
      xhtmlOut: false,
      breaks: false,
      langPrefix: 'langPrefix-',
      linkify: true,
      typographer: false
    }
  };

  private parsedModel: any;
  private markdown: MarkdownIt.MarkdownIt;

  constructor(private sanitized: DomSanitizer, config?: MarkdownConfig) {
    config = config || utils.mergeConf(this.defaultConfig, config);

    if (!config.markdownIt.highlight) {
      config.markdownIt.highlight = this.DEFAULT_HIGHLIGHT_FUNCTION;
    }

    this.markdown = new MarkdownIt(config.markdownIt); // new markdown({ linkify: true });
    this.markdown.use(markdownVideoPlugin, {
      youtube: { width: 640, height: 390 }
    });
  }

  private DEFAULT_HIGHLIGHT_FUNCTION = (str, lang) => {
    if (lang && hljs.getLanguage(lang)) {
      try {
        return '<pre class="hljs"><code>' + highlightjs.highlight(lang, str, true).value + '</code></pre>';
      } catch (__) { }
    }
    return '<pre class="hljs"><code>' + this.markdown.utils.escapeHtml(str) + '</code></pre>';
  }

  private DEFAULT_CONTAINER_FUNCTION = (name: string, cssClass: string, showHeading: boolean) => {
    const regex = new RegExp(`^${name}`);
    return {
      validate: function (params) {
        return params.trim().match(regex);
      },

      render: function (tokens, idx) {
        if (tokens[idx].nesting === 1) {
          return `<div class="${cssClass ? cssClass : name}"> ${showHeading ? '<b>' + name + '</b>' : ''}`;
        } else {
          return '</div>';
        }
      }
    };
  }
}
