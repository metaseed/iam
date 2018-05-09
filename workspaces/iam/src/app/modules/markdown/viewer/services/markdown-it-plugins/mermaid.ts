import * as MarkdownIt from 'markdown-it';
import * as mermaid from 'mermaid';
import { uid } from 'core';
export class Mermaid {
  constructor(private markdownIt: MarkdownIt.MarkdownIt) {
    this.markdownIt.use(this.MermaidPlugin, 'mermaid');
    (<any>this.markdownIt).mermaid.loadPreferences({
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
  mermaidChart = code => {
    try {
      mermaid.parse(code);
      let id = 'id' + uid();
      setTimeout(() => mermaid.init(undefined, `#${id}`), 0);
      return `<div class="mermaid" id="${id}">${code}</div>`;
    } catch ({ str, hash }) {
      return `<pre>${str}</pre>`;
    }
  };

  MermaidPlugin = md => {
    md.mermaid = mermaid;
    mermaid.loadPreferences = preferenceStore => {
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
      // setInterval(() => mermaid.init(), 5000);
      return {
        'mermaid-theme': mermaidTheme,
        'gantt-axis-format': ganttAxisFormat
      };
    };

    const temp = md.renderer.rules.fence.bind(md.renderer.rules);
    md.renderer.rules.fence = (tokens, idx, options, env, slf) => {
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
