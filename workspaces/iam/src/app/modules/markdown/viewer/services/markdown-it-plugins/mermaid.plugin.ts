// https://github.com/mermaid-js/mermaid
// https://github.com/tylingsoft/markdown-it-mermaid
// https://github.com/liradb2000/markdown-it-mermaid/blob/master/src/index.js

import MarkdownIt from 'markdown-it';
import { uid } from 'core';
import MermaidConst from 'mermaid';
type Mermaid = typeof MermaidConst;
export class MermaidPlugin {
  constructor(private markdownIt: MarkdownIt) {
    this.markdownIt.use(this.mermaidPlugin, 'mermaid');
  }

  mermaidChart = code => {
    try {

      const id = 'id' + uid();
      // 10.0 not work
      // this.mermaid().then(mermaid => {
      //   const e = document.getElementById(id)
      //   mermaid.render(id, code, e);
      // });
      this.mermaid().then(mermaid => {
        mermaid.parse(code);
        mermaid.init(undefined, `#${id}`);
      });
      return `<div class="mermaid" id="${id}">${code}</div>`;
    } catch (e) {
      return `<pre>${e}</pre>`;
    }
  };

  loadPreferences = (mermaid: Mermaid, preferenceStore) => {
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
    mermaid.initialize(option as any);
    return {
      'mermaid-theme': mermaidTheme,
      'gantt-axis-format': ganttAxisFormat
    };
  };


  mermaid = ((mermaid: Mermaid) => async () => {
    if (!mermaid) {
      const mermaidModule = (await import('mermaid')).default;
      if (!mermaid) {
        mermaid = mermaidModule;
        this.loadPreferences(mermaid, {
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
    }
    return mermaid;
  })(undefined)

  mermaidPlugin = (markdown: MarkdownIt) => {
    const originalFenceRule = markdown.renderer.rules.fence.bind(markdown.renderer.rules);

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
      return originalFenceRule(tokens, idx, options, env, slf);
    };
  };
}
