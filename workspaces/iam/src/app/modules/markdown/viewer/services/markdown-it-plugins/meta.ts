// https://github.com/CaliStyle/markdown-it-meta

import * as MarkdownIt from 'markdown-it';
import YAML from 'js-yaml';
import * as StateBlock from 'markdown-it/lib/rules_block/state_block';

export class DocYamlMeta {
  author: string; // name <email>
  version: string;
  updateDate: Date;
  createDate: Date;
  tag: Array<string>;
  tags: Array<string>; // tag list
  enable: Array<string>; // feature list
  subPage: Array<string>; // sub pages list
}

export class MetaPlugin {
  constructor(private markdownIt: MarkdownIt, private updateMeta: (object) => DocYamlMeta) {
    this.markdownIt.use(this.metaPlugin);
  }

  metaPlugin = (md: MarkdownIt) => {
    md.block.ruler.before('code', 'meta', this.metaParser, { alt: [] });
    md.renderer.rules.meta_open = (tokens, index) => '<articleinfo class="doc-meta">';
    md.renderer.rules.meta_close = (tokens, index) => '</articleinfo>';
    md.renderer.rules.meta_body = (tokens, index) => {
      try {
        const meta = tokens[index].content as unknown as DocYamlMeta;
        let content = '';
        if (meta.author) {
          let link;
          const r = meta.author.match(/<(.*)>/);
          let cont = '<author class="meta-author">';
          const author = meta.author.substr(0, r.index);
          link = r[1];
          if (link) {
            if (link.includes('@')) {
              link = 'mailto:' + link;
            }
            cont += `<a href="${link}">${author}</a>`;
          } else {
            cont += author;
          }

          cont += '</author>';
          content += cont;
        }

        if (meta.version || meta.updateDate) {
          content += `<div class="meta-version-date">`;

          if (meta.version) {
            content += `<span class="meta-version">&nbsp; v${meta.version} </span>`;
          }
          if (meta.updateDate) {
            if (meta.createDate) {
              const createDate = meta.createDate;
              content += `<span style="margin-left:10px" class="meta-date">${createDate.toLocaleDateString()} - </span>`;
            }
            content += `<span class="meta-date">  ${meta.updateDate.toLocaleDateString()}</span>`;
          }

          const idMatch = document.URL.match(/id=(\d+)/);
          if (idMatch) {
            content += `<span class="meta-version">&nbsp; (id:${idMatch[1]})</span>`;
          }

          content += `</div>`;
        }
        const tag = meta.tags || meta.tag;
        if (tag) {
          content += '<ul class="meta-tags">';
          tag.forEach(t => {
            content += '<li class="meta-tag">' + t + '</li>';
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
  };

  getLine = (state, line) => {
    const pos = state.bMarks[line];
    const max = state.eMarks[line];
    return state.src.substr(pos, max - pos);
  };

  metaParser = (state: StateBlock, startLine: number, endLine: number, silent: boolean) => {
    if (startLine > 5 || state.blkIndent !== 0) {
      return false;
    }
    if (state.tShift[startLine] < 0) {
      return false;
    }
    if (!this.getLine(state, startLine).match(/^---$/)) {
      return false;
    }
    const data = [];
    let line = startLine;
    let findEnd = false;
    while (line < endLine) {
      line++;
      const str = this.getLine(state, line);
      if (str.match(/^---$/)) {
        findEnd = true;
        break;
      }
      if (state.tShift[line] < 0) {
        break;
      }
      data.push(str);
    }

    if (!findEnd) return;

    try {
      const d = YAML.safeLoad(data.join('\n'), { json: true });

      state.line = line + 1;
      if (d) {
        let token = state.push('meta_open', 'meta', 1);
        token.markup = '---';
        token = state.push('meta_body', 'meta-body', 0);
        const meta = this.updateMeta(d);
        token.content = <any>meta;
        if (meta?.enable.includes('toc')) {
          // put web component in html block; should not render it directly.
          token = state.push('html_block', '', 0);
          token.content = '<i-toc>/n</i-toc>';
        }

        if (meta?.subPage?.length) {
          // put web component in html block; should not render it directly.
          token = state.push('html_block', '', 0);
          const pages = meta.subPage.join(' ');
          token.content = `<i-subpage pages="${pages}"></i-subpage>`
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
