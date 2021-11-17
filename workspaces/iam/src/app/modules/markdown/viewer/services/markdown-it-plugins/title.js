// https://github.com/valeriangalliat/markdown-it-title 2018/03/28

module.exports = (updateTitle, level = 1) => md => {
  let originalHeadingOpen = md.renderer.rules.heading_open;

  md.renderer.rules.heading_open = function (...args) {
    const [tokens, idx, options, env, self] = args;

    if (idx === 0 && tokens[idx].tag === `h${level}`) {
      const title = tokens[idx + 1].content;
      env.title = title.replace(/[<>:"/\\|?*]/g, '~') // sync the regex with the one in doc-meta.ts
        // .children
        // .filter(t => t.type === 'text')
        // .reduce((acc, t) => acc + t.content, '')
        .trim();
      updateTitle?.(env.title, level);
    }

    originalHeadingOpen??= self.renderToken.bind(self);
    return originalHeadingOpen(...args);
  };
};
