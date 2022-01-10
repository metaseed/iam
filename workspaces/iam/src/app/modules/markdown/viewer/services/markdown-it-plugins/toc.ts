import * as MarkdownIt from "markdown-it";
import * as ParserInline from 'markdown-it/lib/parser_inline';
'use strict';
// reference this to implement popup toc: https://codepad.co/snippet/
// var string = require("string");
let defaultOptions = {
  includeLevel: [1, 2],
  containerClass: 'table-of-contents',
  slugify: s => s,
  // function(str) {
  //   return string(str)
  //     .slugify()
  //     .toString();
  // },
  markerPattern: /^\[\[toc\]\]/im,
  listType: 'ul',
  getHref: (slug, state) => `#${slug}`,
  format: undefined
};

export default function toc(md: MarkdownIt, option) {
  let options = { ...defaultOptions, ...option };
  let tocRegexp = options.markerPattern;
  let grabbedState;

  const tocInlineRule: ParserInline.RuleInline = (state, silent) => {
    var token;
    var match;

    // Reject if the token does not start with [
    if (state.src.charCodeAt(state.pos) !== 0x5b /* [ */) {
      return false;
    }
    // Don't run any pairs in validation mode
    if (silent) {
      return false;
    }

    // Detect TOC markdown
    match = tocRegexp.exec(state.src);
    match = !match
      ? []
      : match.filter(function (m) {
        return m;
      });
    if (match.length < 1) {
      return false;
    }

    // Build content
    token = state.push('toc_open', 'toc', 1);
    token.markup = '[[toc]]';
    token = state.push('toc_body', '', 0);
    token = state.push('toc_close', 'toc', -1);

    // Update pos so the parser can continue
    var newline = state.src.indexOf('\n');
    if (newline !== -1) {
      state.pos = state.pos + newline;
    } else {
      state.pos = state.pos + state.posMax + 1;
    }

    return true;
  }

  md.renderer.rules.toc_open = function (tokens, index) {
    return `<div class="${options.containerClass}">`;
  };

  md.renderer.rules.toc_close = function (tokens, index) {
    return '</div>';
  };

  md.renderer.rules.toc_body = function (tokens, index) {
    return renderChildrenTokens(0, grabbedState.tokens)[1];
  };

  function renderChildrenTokens(pos, tokens) {
    const headings = [];
    let buffer = '',
      currentLevel,
      subHeadings,
      size = tokens.length,
      i = pos;

    while (i < size) {
      var token = tokens[i];
      var heading = tokens[i - 1];
      var level = token.tag && parseInt(token.tag.substr(1, 1));
      if (
        token.type !== 'heading_close' ||
        options.includeLevel.indexOf(level) == -1 ||
        heading.type !== 'inline'
      ) {
        i++;
        continue; // Skip if not matching criteria
      }
      if (!currentLevel) {
        currentLevel = level; // We init with the first found level
      } else {
        if (level > currentLevel) {
          subHeadings = renderChildrenTokens(i, tokens);
          buffer += subHeadings[1];
          i = subHeadings[0];
          continue;
        }
        if (level < currentLevel) {
          // Finishing the sub headings
          buffer += '</li>';
          headings.push(buffer);
          return [
            i,
            `<${options.listType}>${headings.join('')}</${options.listType}>`
          ];
        }
        if (level == currentLevel) {
          // Finishing the sub headings
          buffer += '</li>';
          headings.push(buffer);
        }
      }
      var title = heading.children
        .filter(token => token.type === 'text' || token.type === 'code_inline')
        .reduce((acc, t) => acc + t.content, '');
      buffer = `<li><a href="${options.getHref(options.slugify(title))}">
      ${typeof options.format === 'function' ? options.format(heading.content) : title}
        </a>`;
      i++;
    }
    buffer += buffer === '' ? '' : '</li>';
    headings.push(buffer);
    return [i, `<${options.listType}>${headings.join('')}</${options.listType}>`];
  }

  // Catch all the tokens for iteration later
  md.core.ruler.push('grab_state', function (state) {
    grabbedState = state;
    return false;
  });

  // Insert TOC
  md.inline.ruler.after('emphasis', 'toc', tocInlineRule);
};
