import * as MarkdownIt from 'markdown-it';
import { uid } from 'core';
export class MermaidPlugin {
  constructor(private markdownIt: MarkdownIt.MarkdownIt) {
    this.markdownIt.use(this.mermaidPlugin, 'mermaid');
  }
  mermaidChart = code => {
    try {
      let id = 'id' + uid();
      this.mermaid().then(mermaid => {
        mermaid.parse(code);
        mermaid.init(undefined, `#${id}`);
      });
      return `<div class="mermaid" id="${id}">${code}</div>`;
    } catch (e) {
      return `<pre>${e}</pre>`;
    }
  };

  loadPreferences = (mermaid, preferenceStore) => {
    let mermaidTheme = preferenceStore.get('mermaid-theme');
    if (mermaidTheme === undefined) {
      mermaidTheme = 'default';
    }
    let ganttAxisFormat = preferenceStore.get('gantt-axis-format');
    if (ganttAxisFormat === undefined) {
      ganttAxisFormat = '%Y-%m-%d';
    }
    const option = {
      theme: mermaidTheme,
      gantt: {
        axisFormatter: [
          [
            ganttAxisFormat,
            d => {
              return d.getDay() === 1;
            }
          ]
        ]
      },
      startOnLoad: false
      // logLevel: 1
    };
    mermaid.initialize(option);
    return {
      'mermaid-theme': mermaidTheme,
      'gantt-axis-format': ganttAxisFormat
    };
  };

  private _mermaid;
  async mermaid() {
    if (!this._mermaid) {
      this._mermaid = await import('mermaid');
      this.loadPreferences(this._mermaid, {
        get: key => {
          // if (key === 'mermaid-theme') {
          //   return 'forest'
          // } else if (key === 'gantt-axis-format') {
          //   return '%Y/%m/%d'
          // } else {
          //   return undefined
          // }
          return undefined;
        }
      });
    }
    return this._mermaid;
  }

  mermaidPlugin = (markdown: MarkdownIt.MarkdownIt) => {
    const temp = markdown.renderer.rules.fence.bind(markdown.renderer.rules);

    markdown.renderer.rules.fence = (tokens, idx, options, env, slf) => {
      const token = tokens[idx];
      const code = token.content.trim();
      if (token.info === 'mermaid') {
        return this.mermaidChart(code);
      }
      const firstLine = code.split(/\n/)[0].trim();
      if (
        firstLine === 'gantt' ||
        firstLine === 'sequenceDiagram' ||
        firstLine.match(/^graph (?:TB|BT|RL|LR|TD);?$/)
      ) {
        return this.mermaidChart(code);
      }
      return temp(tokens, idx, options, env, slf);
    };
  };
}
