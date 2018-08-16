import * as MarkdownIt from 'markdown-it';
import { littleLisp } from 'lispjs';
export class LispPlugin {
  config = {
    markerPattern: /\*\([\s\S]*?\)\*/gm
  };

  gState;

  constructor(private markdownIt: MarkdownIt.MarkdownIt, options?) {
    this.config = { ...this.config, ...options };
    this.markdownIt.use(this.lispPlugin, this.config);
  }

  lispPlugin = (md: MarkdownIt.MarkdownIt, options) => {
    md.renderer.rules.lisp_open = function(tokens, index) {
      return '';
    };

    md.renderer.rules.lisp_close = function(tokens, index) {
      return '';
    };

    md.renderer.rules.lisp_body = (tokens, index) => {
      try {
        const r = littleLisp.execute(tokens[index].content); // this.gState.tokens
        return r;
      } catch (e) {
        console.error(e);
        return e;
      }
    };

    md.core.ruler.push('grab_state', function(state) {
      this.gState = state;
    });

    md.inline.ruler.before('backticks', 'lisp', this.parse);
  };

  parse = (state, silent?: boolean) => {
    const pos = state.pos;
    const max = state.posMax;

    let token;
    let match;
    let start: number;
    // Don't run any pairs in validation mode
    if (silent) {
      return false;
    }

    // Reject if the token does not start with .
    if (
      state.src.charCodeAt(pos) !== 0x2a /* * */ ||
      state.src.charCodeAt(pos + 1) !== 0x28 /* ( */
    ) {
      return false;
    }

    start = pos;

    // while(pos < max && )

    // Detect lisp markdown
    const regex = this.config.markerPattern;
    regex.lastIndex = start;
    match = regex.exec(state.src);
    match = !match
      ? []
      : match.filter(function(m: string) {
          // validate here!
          let counter = 0;
          for (let i = 0; i < m.length; i++) {
            const charCode = m.charCodeAt(i);
            if (charCode === 0x28 /* ( */) counter += 1;
            if (charCode === 0x29 /* ) */) counter -= 1;
          }
          return counter === 0;
        });
    if (match.length < 1) {
      return false;
    }

    // Update pos so the parser can continue
    const len = match[0].length;
    if (len > 0) {
      state.pos = state.pos + len;
      const lispExp = match[0].slice(1, -1);
      // Build content
      token = state.push('lisp_open', 'lisp', 1);
      token.markup = '*()*';
      token = state.push('lisp_body', 'lisp-body', 0);
      token.content = lispExp;
      token = state.push('lisp_close', 'lisp', -1);
      return true;
    }
    return false;
  };
}
