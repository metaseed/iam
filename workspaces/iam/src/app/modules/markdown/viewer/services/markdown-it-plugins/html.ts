// import htmlparser2 from "htmlparser2";
// import 'playground-elements'
declare let require: any;
import { environment } from "environments/environment";
import { Parser } from "htmlparser2";
import { loadModuleScript } from "../exec-script";
export const html = (incrementalDom, enableIDOM) => md => {
  const originalHtmlBlockRule = md.renderer.rules.html_block;
  const originalHtmlInlineRule = md.renderer.rules.html_inline;

  const { elementClose, elementOpenStart, attr, elementOpenEnd, elementOpen, elementVoid, text, skipNode, skip } = incrementalDom;
  const sanitizeName = name => name.replace(/[^-:\w]/g, '');

  md.renderer.rules.html_block = function (...args) {
    const [tokens, idx, , env, self] = args;
    const content = tokens[idx].content.trimStart();
    if (enableIDOM) {
      if (content.startsWith('<i-')) {
        let tag, text;
        let attr = [];
        const iDOMParser = new Parser(
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
            elementOpen(tag, '', undefined, ...attr);
            skip();
            elementClose(tag);
          };
        }

      }
    }
    if (content.match(/^<playground-.*>/)) {
    //  // b5054c5318212ffd.js:1 Uncaught ReferenceError: require is not defined
      // (async () => {
      //   await import(
      //     // https://webpack.js.org/api/module-methods/#magic-comments
      //     /* webpackChunkName: "code-playground" */
      //     /* webpackMode: "lazy" */
      //     /* webpackPrefetch: true */
      //     /* webpackPreload: true */
      //     "./playground.js");
      // })()
      //  (async () => {
      //    await import(`${currentBaseUrl}playground/main.js`);
      //   })();
        const currentBaseUrl = environment.baseUrl;
      loadModuleScript(`${currentBaseUrl}playground/main.js`);
      // loadModuleScript("https://unpkg.com/playground-elements?module");

      // https://stackoverflow.com/questions/53178938/dynamically-loading-a-module-that-is-not-in-a-script-tag-with-type-module

    }

    return originalHtmlBlockRule(...args);
  };

  md.renderer.rules.html_inline = function (...args) {
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
