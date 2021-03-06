// https://github.com/valeriangalliat/markdown-it-title 2018/03/28

module.exports = (updateTitle, level = 1) => md => {
  const originalHeadingOpen = md.renderer.rules.heading_open;

  md.renderer.rules.heading_open = function(...args) {
    const [tokens, idx, , env, self] = args;

    if (!env.title && (level < 1 || tokens[idx].tag === `h${level}`)) {
      env.title = tokens[idx + 1].children
        .filter(t => t.type === 'text')
        .reduce((acc, t) => acc + t.content, '')
        .trim();
      updateTitle && updateTitle(env.title, level);
    }

    // Execute original rule.
    if (originalHeadingOpen) {
      return originalHeadingOpen.apply(this, args);
    } else {
      return self.renderToken(...args);
    }
  };
};
