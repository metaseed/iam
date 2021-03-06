import * as MarkdownIt from 'markdown-it';
import { container_plugin } from './common-container';

export class ContainerPlugin {
  constructor(
    private markdown: MarkdownIt,
    name: string,
    private option?: { validate: (params) => any; render: (tokens, idx) => string }
  ) {
    this.option = this.option || this.DEFAULT_CONTAINER_FUNCTION(name);
    this.markdown.use(container_plugin, name, this.option);
  }

  private DEFAULT_CONTAINER_FUNCTION = (
    name: string,
    cssClass?: string,
    showHeading: boolean = true
  ) => {
    const regex = new RegExp(`^${name}\\s*(.*)$`);
    const me = this;
    return {
      validate: function(params: string) {
        return params.trim().match(regex);
      },

      render: function(tokens, idx) {
        const m = tokens[idx].info.trim().match(regex);

        if (tokens[idx].nesting === 1) {
          return `<div class="${cssClass ? cssClass : name}">
                    ${showHeading ? '<b>' + me.markdown.utils.escapeHtml(m[1]) + '</b>' : ''}\n`;
        } else {
          return '</div>';
        }
      }
    };
  };
}
