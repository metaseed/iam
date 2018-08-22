import * as Markdown from 'markdown-it';

const headers = ['h1', 'h2', 'h3', 'h4'];

export const sourceLine = (md: Markdown.MarkdownIt) => {
  const originalHeadingOpen = md.renderer.rules.heading_open;

  md.renderer.rules.heading_open = function(...args) {
    const [tokens, idx, options, env, render] = args;

    const token = tokens[idx];
    if (headers.includes(token.tag)) {
      token.attrSet('data-source-lines', JSON.stringify(token.map));
    }

    // Execute original rule.
    if (originalHeadingOpen) {
      return originalHeadingOpen.apply(this, args);
    } else {
      return render.renderToken(tokens, idx, options);
    }
  };
};
