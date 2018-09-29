module.exports = (incrementalDom, enableIDOM) => md => {
  const originalRule = md.renderer.rules.html_block;
  md.renderer.rules.html_block = function(...args) {
    const [tokens, idx, , env, self] = args;
    if (enableIDOM) {
      const { elementClose, elementOpen, elementVoid, text, skipNode, skip } = incrementalDom;
      const content = tokens[idx].content.trimStart();
      if (content.startsWith('<i-')) {
        // return function to bypass
        const tag = content.match(/^<(i-[^>]+)>/)[1];
        if (tag) {
          return () => {
            elementOpen(tag);
            skip();
            elementClose(tag);
          };
        }
      }
    }
    return originalRule(...args);
  };

  md.renderer.rules.html_inline = function(...args) {
    const [tokens, idx, , env, self] = args;
    if (enableIDOM) {
      const { elementClose, elementOpen, elementVoid, text, skipNode, skip } = incrementalDom;
      const content = tokens[idx].content.trimStart();
      if (content.startsWith('<i-')) {
        const tag = content.match(/^<(i-.*)>/)[1];
        if (tag) {
          return () => {
            elementOpen(tag);
            skip();
          };
        } else if (content.startsWith('</i-')) {
          const tag = content.match(/^<\/(i-[^>]+)>/)[1];
          if (tag) {
            return () => elementClose(tag);
          }
        }
      }
    }
    return originalRule(...args);
  };
};
