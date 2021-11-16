const htmlparser2 = require("htmlparser2");

module.exports = (incrementalDom, enableIDOM) => md => {
  const originalHtmlBlockRule = md.renderer.rules.html_block;
  const originalHtmlInlineRule = md.renderer.rules.html_inline;

  const { elementClose,elementOpenStart, attr, elementOpenEnd, elementOpen, elementVoid, text, skipNode, skip } = incrementalDom;
  const sanitizeName = name => name.replace(/[^-:\w]/g, '');

  md.renderer.rules.html_block = function(...args) {
    const [tokens, idx, , env, self] = args;
    if (enableIDOM) {
      const content = tokens[idx].content.trimStart();
      if (content.startsWith('<i-')) {
        let tag,text;
        let attr = [];
        const iDOMParser = new htmlparser2.Parser(
          {
            // onopentag: name => elementOpenEnd(sanitizeName(name)),
            onopentagname: name => tag = name,//elementOpenStart(sanitizeName(name)),
            onattribute: (name, value) => {
              const sanitizedName = sanitizeName(name)
              if (sanitizedName !== '') //attr(sanitizedName, value)
              {
                attr.push(name);
                attr.push(value);
              }
            },
            ontext: d => text = d,//text(d),
            // onclosetag: name => elementClose(sanitizeName(name)),
          },
          {
            decodeEntities: true,
            lowerCaseAttributeNames: false,
            lowerCaseTags: false,
          }
        )

        iDOMParser.write(content);
        iDOMParser.end();
        // return function to bypass markdown-idom
        if (tag) {
          return () => {
            elementOpen(tag,'',undefined,...attr);
            skip();
            elementClose(tag);
          };
        }

      }
    }
    return originalHtmlBlockRule(...args);
  };

  md.renderer.rules.html_inline = function(...args) {
    const [tokens, idx, , env, self] = args;
    if (enableIDOM) {
      const content = tokens[idx].content.trimStart();
      if (content.startsWith('<i-')) {
        const tag = content.match(/^<(i-.*)>/)[1];
        if (tag) {
          return () => {
            elementOpen(tag);
            skip();
          };
        }
      } else if (content.startsWith('</i-')) {
        const tag = content.match(/^<\/(i-[^>]+)>/)[1];
        if (tag) {
          return () => elementClose(tag);
        }
      }
    }
    return originalHtmlInlineRule(...args);
  };
};
