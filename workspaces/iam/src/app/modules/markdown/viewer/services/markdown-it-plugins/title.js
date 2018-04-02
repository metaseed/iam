// https://github.com/valeriangalliat/markdown-it-title 2018/03/28
export default (md, level = 1) => {
  const originalHeadingOpen = md.renderer.rules.heading_open;

  md.renderer.rules.heading_open = function(...args) {
    const [tokens, idx, , env, self] = args;

    if (!env.title && (level < 1 || tokens[idx].tag === `h${level}`)) {
      env.title = tokens[idx + 1].children.reduce(
        (acc, t) => acc + t.content,
        ""
      );
    }

    // Execute original rule.
    if (originalHeadingOpen) {
      return originalHeadingOpen.apply(this, args);
    } else {
      return self.renderToken(...args);
    }
  };
};
