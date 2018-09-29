// https://github.com/CaliStyle/markdown-it-meta

import * as MarkdownIt from 'markdown-it';
import YAML from 'js-yaml';

export class MetaPlugin {
  constructor(private markdownIt: MarkdownIt.MarkdownIt, private updateMeta: (object) => void) {
    this.markdownIt.use(this.metaPlugin);
  }

  metaPlugin = (md: MarkdownIt.MarkdownIt) => {
    md.renderer.rules.meta_open = (tokens, index) => '<articleinfo class="doc-meta">';
    md.renderer.rules.meta_close = (tokens, index) => '</articleinfo>';
    md.renderer.rules.meta_body = (tokens, index) => {
      try {
        const meta = (tokens[index] as any).docmeta;
        let content = '';
        if (meta.author) {
          let link;
          meta.author.replace(/<(.*)>/, (match, p1, offset, string) => {
            content += '<author class="meta-author">';
            const author = string.substr(0, offset);
            link = p1;
            if (link) {
              if (link.includes('@')) {
                link = 'mailto:' + link;
              }
              content += `<a href="${link}">${author}</a>`;
            } else {
              content += author;
            }

            content += '</author>';
          });
        }
        if (meta.version || meta.updateDate) {
          content += `<div class="meta-version-date">`;
          if (meta.version) {
            content += `<span class="meta-version"> v${meta.version} </span>`;
          }
          if (meta.updateDate) {
            if (meta.createDate) {
              const createDate = meta.createDate;
              content += `<span style="margin-left:10px" class="meta-date">${createDate.toLocaleDateString()} - </span>`;
            }
            content += `<span class="meta-date">  ${meta.updateDate.toLocaleDateString()}</span>`;
          }
          content += `</div>`;
        }

        if (meta.tag) {
          content += '<ul class="meta-tags">';
          meta.tag.forEach(tag => {
            content += '<li class="meta-tag">' + tag + '</li>';
          });
          content += '</ul>';
        }
        if (meta.enable && meta.enable.length > 0) {
        }
        return content;
      } catch (e) {
        console.log(e);
        return e;
      }
    };

    md.block.ruler.before('code', 'meta', this.metaParser, { alt: [] });
  };

  get = (state, line) => {
    const pos = state.bMarks[line];
    const max = state.eMarks[line];
    return state.src.substr(pos, max - pos);
  };

  metaParser = (state, startLine?, endLine?, silent?) => {
    if (startLine > 5 || state.blkIndent !== 0) {
      return false;
    }
    if (state.tShift[startLine] < 0) {
      return false;
    }
    if (!this.get(state, startLine).match(/^---$/)) {
      return false;
    }
    const data = [];
    let line = startLine;
    while (line < endLine) {
      line++;
      const str = this.get(state, line);
      if (str.match(/^---$/)) {
        break;
      }
      if (state.tShift[line] < 0) {
        break;
      }
      data.push(str);
    }

    try {
      const d = YAML.safeLoad(data.join('\n'), { json: true });

      state.line = line + 1;
      if (d) {
        let token = state.push('meta_open', 'meta', 1);
        token.markup = '---';
        token = state.push('meta_body', 'meta-body', 0);
        token.docmeta = this.updateMeta(d);
        if (token.docmeta.enable.includes('toc')) {
          // put web component in html block; should not render it directly.
          token = state.push('html_block', '', 0);
          token.content = '<i-toc>/n</i-toc>';
        }
        token = state.push('meta_close', 'meta', -1);
        token.markup = '---';
      }
    } catch (e) {
      console.log(e);
      return false;
    }
    // (this.markdownIt as any).meta = Object.assign({}, (this.markdownIt as any).meta, d);
    return true;
  };
}
