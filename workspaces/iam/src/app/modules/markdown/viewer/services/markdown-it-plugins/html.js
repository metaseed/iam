module.exports = (incrementalDom, enableIDOM) => md => {
  const originalRule = md.renderer.rules.html_block;
  md.renderer.rules.html_block = function(...args) {
    const [tokens, idx, , env, self] = args;
    if (enableIDOM) {
      const { elementClose, elementOpen, elementVoid, text, skipNode, skip } = incrementalDom;
      return () => {
        // return function to bypass
        const content = tokens[idx].content.trimStart();
        if (content.startsWith('<i-')) {
          const tag = content.match(/^<(i-[^>]+)>/)[1];
          if (tag) {
            elementOpen(tag);
            skip();
            elementClose(tag);
          }
        }
        return originalRule(...args);
      };
    } else {
      return originalRule(...args);
    }
  };

  md.renderer.rules.html_inline = function(...args) {
    const [tokens, idx, , env, self] = args;
    if (enableIDOM) {
      const { elementClose, elementOpen, elementVoid, text, skipNode, skip } = incrementalDom;
      return () => {
        const content = tokens[idx].content.trimStart();
        if (content.startsWith('<i-')) {
          const tag = content.match(/^<(i-.*)>/)[1];
          if (tag) {
            elementOpen(tag);
            skip();
          }
        } else if (content.startsWith('</i-')) {
          const tag = content.match(/^<\/(i-[^>]+)>/)[1];
          if (tag) {
            elementClose(tag);
          }
        }
        return originalRule(...args);
      };
    } else {
      return originalRule(...args);
    }
  };
};
