// const string = require("string");
// https://github.com/valeriangalliat/markdown-it-anchor
import MarkdownIt from "markdown-it";
import StateCore from "markdown-it/lib/rules_core/state_core";

// const slugify = s =>
//   string(s)
//     .slugify()
//     .toString();

const slugify = s => s;

const permalinkHref = slug => `#${slug}`;

const renderPermalink = (slug, opts, state: StateCore, idx) => {
  const space = () => Object.assign(new state.Token('text', '', 0), { content: ' ' });

  const linkTokens = [
    Object.assign(new state.Token('link_open', 'a', 1), {
      attrs: [
        ['class', opts.permalinkClass],
        ['href', opts.permalinkHref(slug, state)],
        ['aria-hidden', 'true']
      ]
    }),
    Object.assign(new state.Token('html_block', '', 0), {
      content: opts.permalinkSymbol
    }),
    new state.Token('link_close', 'a', -1)
  ];

  // `push` or `unshift` according to position option.
  // Space is at the opposite side.
  if (opts.permalinkBefore) {
    linkTokens.push(space());
    state.tokens[idx + 1].children.unshift(...linkTokens);
  } else {
    linkTokens.unshift(space());
    state.tokens[idx + 1].children.push(...linkTokens);
  }

};

const uniqueSlug = (slug, slugs: object) => {
  // Mark this slug as used in the environment.
  slugs[slug] = (slugs.hasOwnProperty(slug) ? slugs[slug] : 0) + 1;

  // First slug, return as is.
  if (slugs[slug] === 1) {
    return slug;
  }

  // Duplicate slug, add a `-2`, `-3`, etc. to keep ID unique.
  return slug + '-' + slugs[slug];
};

const isLevelSelectedNumber = selection => level => level >= selection;
const isLevelSelectedArray = selection => level => selection.includes(level);

anchor.defaults = {
  level: 1,
  slugify,
  permalink: false,
  renderPermalink,
  permalinkClass: 'header-anchor',
  permalinkSymbol: '¶', // 🔗
  permalinkBefore: false,
  permalinkHref
};

export default function anchor(md: MarkdownIt, opts) {
  opts = Object.assign({}, anchor.defaults, opts);

  md.core.ruler.push('anchor', state => {
    const slugs = {};
    const tokens = state.tokens;

    const isLevelSelected = Array.isArray(opts.level)
      ? isLevelSelectedArray(opts.level)
      : isLevelSelectedNumber(opts.level);

    tokens
      .filter(token => token.type === 'heading_open')
      .filter(token => isLevelSelected(+token.tag.substr(1)))
      .forEach(token => {
        // Aggregate the next token children text.
        const title = tokens[tokens.indexOf(token) + 1].children
          .filter(token => token.type === 'text' || token.type === 'code_inline')
          .reduce((acc, t) => acc + t.content, '');

        let slug = token.attrGet('id');

        if (slug == null) {
          slug = uniqueSlug(opts.slugify(title), slugs);
          token.attrPush(['id', slug]);
        }

        if (opts.permalink) {
          opts.renderPermalink(slug, opts, state, tokens.indexOf(token));
        }

        if (opts.callback) {
          opts.callback(token, { slug, title });
        }
      });

    return false;
  });
};
