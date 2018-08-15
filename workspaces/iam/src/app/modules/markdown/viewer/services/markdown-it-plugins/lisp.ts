import * as MarkdownIt from 'markdown-it';
import { littleLisp } from 'lispjs';
export class LispPlugin {
  config = {
    markerPattern: /^\.\([\s\S]*?\)\./m
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
      const r = littleLisp.execute(tokens[index].content); // this.gState.tokens
      return r;
    };

    md.core.ruler.push('grab_state', function(state) {
      this.gState = state;
    });

    md.inline.ruler.before('text', 'lisp', this.lisp);
  };

  lisp = (state, silent?: boolean) => {
    // Don't run any pairs in validation mode
    if (silent) {
      return false;
    }

    // Reject if the token does not start with .
    if (
      state.src.charCodeAt(state.pos) !== 0x2e /* . */ ||
      state.src.charCodeAt(state.pos + 1) !== 0x28 /* ( */
    ) {
      return false;
    }

    let token;
    let match;
    const max = state.posMax;
    // Detect lisp markdown
    match = this.config.markerPattern.exec(state.src);
    match = !match
      ? []
      : match.filter(function(m) {
          // validate here!

          return true;
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
      token.markup = '.(lisp).';
      token = state.push('lisp_body', '', 0);
      token.content = lispExp;
      token = state.push('lisp_close', 'lisp', -1);
      return true;
    }
    return false;
  };
}
