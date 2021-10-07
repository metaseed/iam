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
  tags?: Array<string>; // tag list
  enable: Array<string>; // feature list
  subPage: Array<string>; // sub pages list
  subPages?: Array<string>;
  subpage: Array<string>;
  subpages?: Array<string>;

}

export class MetaPlugin {
  constructor(private markdownIt: MarkdownIt, private updateMeta: (obj) => DocYamlMeta) {
    this.markdownIt.use(this.metaPlugin);
  }

  metaPlugin = (md: MarkdownIt) => {
    md.block.ruler.before('code', 'meta', this.metaParser, { alt: [] });
    md.renderer.rules.meta_open = (tokens, index) => '<articleinfo class="doc-meta">';
    md.renderer.rules.meta_close = (tokens, index) => '</articleinfo>';
    md.renderer.rules.meta_body = (tokens, index) => {
      try {
        const token = tokens[index];
        const meta = token.content as unknown as DocYamlMeta;
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
            cont += `<a title="${link}" href="${link}">${author}</a>`;
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

        // tags
        const tag = meta.tags || meta.tag;
        if (tag) {
          const tagsStart = token.attrGet('tagsStart');
          const tagsEnd = token.attrGet('tagsEnd');
          // content += `<ul data-source-lines="[${tagsStart}, ${tagsEnd}]" tags="[${tag}]"  class="meta-tags">`;
          // tag.forEach(t => {
          //   content += '<li class="meta-tag">' + t + '</li>';
          // });
          // content += '</ul>';
          content += `<i-tag data-source-lines="[${tagsStart}, ${tagsEnd}]" tags="${tag}">`
          content += '</i-tag>'
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
    if (state.tShift[startLine] !== 0) {
      return false;
    }
    if (!this.getLine(state, startLine).match(/^---\s*$/)) {
      return false;
    }
    const data = [];
    let subPagesLineStart;
    let subPagesLineEnd;
    let tagsStart;
    let tagsEnd;
    let line = startLine;
    let findEnd = false;
    while (line < endLine) {
      line++;
      const str = this.getLine(state, line);
      if (/subPages?\s*:\s*\[/i.test(str)) subPagesLineStart = line;
      if (subPagesLineStart && !subPagesLineEnd && /.*\]/.test(str)) subPagesLineEnd = line + 1;

      if (/tags?\s*:\s*\[/i.test(str)) tagsStart = line;
      if (tagsStart && !tagsEnd && /.*\]/.test(str)) tagsEnd = line + 1;

      if (str.match(/^---\s*$/)) {
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
      const rawYAML = YAML.load(data.join('\n'), { json: true });

      state.line = line + 1;
      if (rawYAML) {
        let token = state.push('meta_open', 'meta', 1);
        token.markup = '---';
        token = state.push('meta_body', 'meta-body', 0);
        const meta = this.updateMeta(rawYAML);
        if (tagsStart && tagsEnd) {
          token.attrSet('tagsStart', tagsStart);
          token.attrSet('tagsEnd', tagsEnd);
        }
        token.content = <any>meta;
        if (meta?.enable.includes('toc')) {
          // put web component in html block; should not render it directly.
          token = state.push('html_block', '', 0);
          token.content = '<i-toc>/n</i-toc>';
        }

        const subPages = meta?.subPage || meta?.subPages || meta?.subpage || meta?.subpages;
        if (subPages.length) {
          // put web component in html block; should not render it directly.
          token = state.push('html_block', '', 0);
          token.content = `<i-subpage data-source-lines="[${subPagesLineStart}, ${subPagesLineEnd}]" pages="[${subPages}]"></i-subpage>`
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
