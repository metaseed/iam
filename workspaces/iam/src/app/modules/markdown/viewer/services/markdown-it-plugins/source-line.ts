import * as MarkdownIt from 'markdown-it';
export function sourceLine(
  md: MarkdownIt,
  {
    permalinkClass = 'edit-it',
    permalinkBefore = false,
    permalinkSymbol = `<i class="material-icons edit-it-icon">edit</i>` // "¶",
  } = {}
) {
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
  md.core.ruler.push('source_line', state => {
    const tokens = state.tokens;

    tokens
      .filter(t => t.map)
      .forEach(token => {
        const parentMap = JSON.stringify(token.map); // start from 0
        token.attrSet('data-source-lines', parentMap);
        token.attrSet('class', 'edit-it-content');
        token.attrSet('onmouseenter', 'md_edit_mouseenter()');
        token.attrSet('onmouseleave', 'md_edit_mouseleave()');
        const linkTokens = [
          Object.assign(new state.Token('link_open', 'a', 1), {
            attrs: [
              ['class', permalinkClass],
              ['onclick', 'md_edit_event(event.target.parentElement.parentElement)'],
              ['aria-hidden', 'true']
            ]
          }),
          Object.assign(new state.Token('html_block', '', 0), {
            content: permalinkSymbol
          }),
          new state.Token('link_close', 'a', -1)
        ];

        if (token.children) {
          token.children.forEach(tk => {
            if (tk.map) {
              tk.attrSet('data-source-lines', JSON.stringify(tk.map));
            } else {
              tk.attrSet('data-source-lines', parentMap);
            }
          });
          token.attrSet('data-source-lines-children', parentMap);

          token.children.push(...linkTokens);
        } else if (token.type === 'fence') {
          // code
        }
      });
      return null;// null is ok for core ruler
  });
}
