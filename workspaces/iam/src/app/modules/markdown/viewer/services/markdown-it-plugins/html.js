module.exports = incrementalDom => md => {
  md.renderer.rules.html_block = function(...args) {
    const [tokens, idx, , env, self] = args;
    const { elementClose, elementOpen, elementVoid, text, skipNode, skip } = incrementalDom;
    const originalRule = md.renderer.rules.html_block;
    return () => {
      const content = tokens[idx].content.trimStart();
      if (content.startsWith('<i-')) {
        const tag = content.match(/^<(i-.*)>/)[1];
        if (tag) {
          elementOpen(tag);
          skip();
          elementClose(tag);
        }
      }
      return originalRule(...args);
    };
  };

  md.renderer.rules.html_inline = function(...args) {
    const [tokens, idx, , env, self] = args;
    const { elementClose, elementOpen, elementVoid, text, skipNode, skip } = incrementalDom;
    const originalRule = md.renderer.rules.html_inline;

    return () => {
      const content = tokens[idx].content.trimStart();
      if (content.startsWith('<i-')) {
        const tag = content.match(/^<(i-.*)>/)[1];
        if (tag) {
          elementOpen(tag);
          skip();
        }
      } else if (content.startsWith('</i-')) {
        const tag = content.match(/^<\/(i-.*)>/)[1];
        if (tag) {
          elementClose(tag);
        }
      }
      return originalRule(...args);
    };
  };
};
