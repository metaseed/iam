import * as Markdown from 'markdown-it';

export const sourceLine = (md: Markdown.MarkdownIt) => {
  // const ruleKeys = Object.keys(md.renderer.rules);
  // ruleKeys.forEach(key => {
  //   const originalRule = md.renderer.rules[key];
  //   md.renderer.rules[key] = (tokens, index, options, env, render) => {
  //     const token = tokens[index];
  //     if (token.map) token.attrSet('data-source-lines', JSON.stringify(token.map));
  //     return originalRule
  //       ? originalRule(tokens, index, options, env, render)
  //       : render.renderToken(tokens, index, options);
  //   };
  // });

  const originalHeadingOpen = md.renderer.rules.heading_open;

  md.renderer.rules.heading_open = function(...args) {
    const [tokens, idx, options, env, render] = args;

    const token = tokens[idx];
    if (token.tag === 'h1') {
      tokens.forEach(token => {
        const parentMap = JSON.stringify(token.map); // start from 0
        token.attrSet('data-source-lines', parentMap);
        token.attrSet('data-source-lines-', 'true');
        if (token.children) {
          token.children.forEach(tk => {
            if (tk.map) {
              tk.attrSet('data-source-lines', JSON.stringify(tk.map));
            } else {
              tk.attrSet('data-source-lines', parentMap);
            }
          });
        }
      });
    }

    // Execute original rule.
    if (originalHeadingOpen) {
      return originalHeadingOpen.apply(this, args);
    } else {
      return render.renderToken(tokens, idx, options);
    }
  };
};
