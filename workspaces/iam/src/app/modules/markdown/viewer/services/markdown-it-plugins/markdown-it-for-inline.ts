import * as MarkdownIt from 'markdown-it';
import * as ParserCore from 'markdown-it/lib/parser_core'
'use strict';
// from https://github.com/markdown-it/markdown-it-for-inline 11/18/21
/**This plugin allows to apply function to certain types of inline tokens. Speed will be not fastest of possible, but you can do quick prototyping of certain rule types. */
export function for_inline_plugin(md: MarkdownIt, ruleName, tokenType, iterator) {

  const scan: ParserCore.RuleCore = (state) => {
    var i, blkIdx, inlineTokens;

    for (blkIdx = state.tokens.length - 1; blkIdx >= 0; blkIdx--) {
      if (state.tokens[blkIdx].type !== 'inline') {
        continue;
      }

      inlineTokens = state.tokens[blkIdx].children;

      for (i = inlineTokens.length - 1; i >= 0; i--) {
        if (inlineTokens[i].type !== tokenType) {
          continue;
        }

        iterator(inlineTokens, i);
      }
    }

    return false;
  }

  md.core.ruler.push(ruleName, scan);
};
