// https://github.com/CaliStyle/markdown-it-meta

import MarkdownIt from 'markdown-it';
import YAML from 'js-yaml';
import StateBlock from 'markdown-it/lib/rules_block/state_block';
import Renderer from 'markdown-it/lib/renderer';
import { DocMeta } from 'core';

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
  constructor(private markdownIt: MarkdownIt, private updateMeta: (obj: object) => DocMeta) {
    this.markdownIt.use(this.metaPlugin);
  }

  private metaPlugin = (md: MarkdownIt) => {
    md.block.ruler.before('code', 'meta', this.blockParseMetaTokens, { alt: [] });

    md.renderer.rules.meta_open = (tokens, index) => '<articleinfo class="doc-meta">';
    md.renderer.rules.meta_close = (tokens, index) => '</articleinfo>';
    md.renderer.rules.meta_body = this.renderMetaBodyToken;
  };

  private renderMetaBodyToken: Renderer.RenderRule = (tokens, index) => {
    try {
      const token = tokens[index];
      const meta = token.meta as unknown as DocYamlMeta;
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

      if (meta.enable && meta.enable.length > 0) {
      }
      return content;
    } catch (e) {
      console.log(e);
      return e;
    }
  };

  private getLine(state: StateBlock,
    /**
     * start from 0
     */
    line: number) {

    const pos = state.bMarks[line];
    const max = state.eMarks[line];

    return state.src.substring(pos, max);
  };

  // passed as call back to core_parser.ruler, so use lambda to keep 'this' as the class instance.
  private blockParseMetaTokens = (state: StateBlock, startLine: number, endLine: number, silent: boolean) => {
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

      if (rawYAML) {
        let token = state.push('meta_open', '', 1);
        token.markup = '---';

        token = state.push('meta_body', '', 0);

        const meta = this.updateMeta(rawYAML);
        token.meta = meta;

        if (meta.version || meta.updateDate) {
          token = state.push('html_block', '', 0);
          // const idMatch = document.URL.match(/id=(\d+)/)[1];
          token.content = `<i-version version="${meta.version}" create-date="${meta.createDate?.toLocaleDateString()??''}" update-date="${meta.updateDate?.toLocaleDateString()??''}"></i-version>`
        }

        if (meta?.enable.includes('toc')) {
          // put web component in html block; and  use default render. should not render it directly.
          token = state.push('html_block', '', 0);
          token.content = '<i-toc></i-toc>';
        }

        const tag = meta.tag;
        if (tag) {
          token = state.push('html_block', '', 0);
          token.content += `<i-tag data-source-lines="[${tagsStart}, ${tagsEnd}]" tags="${tag}">`
          token.content += '</i-tag>'
        }

        const subPages = meta?.subPage;
        if (subPages) { // show subpage even lenth is 0 to add
          // put web component in html block; should not render it directly.
          token = state.push('html_block', '', 0);
          token.content = `<i-subpage data-source-lines="[${subPagesLineStart}, ${subPagesLineEnd}]" pages="[${subPages}]"></i-subpage>`
        }

        token = state.push('meta_close', '', -1);
        token.markup = '---';
      }
    } catch (e) {
      console.log(e);
      return false;
    }
    state.line = line + 1;
    // (this.markdownIt as any).meta = Object.assign({}, (this.markdownIt as any).meta, d);
    return true;
  };
}
