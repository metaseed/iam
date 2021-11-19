import MarkdownIt from "markdown-it";
// to hight line numbers, pase the line numbers to highlight plugin by the env object
const regex = /{([ ,\d-]+)}/;
export default function fence(md: MarkdownIt) {
  const originalRule = md.renderer.rules.fence;
  md.renderer.rules.fence = function (...args) {
    const [tokens, idx, options, env, self] = args;
    const token = tokens[idx];
    if (!token.info || !regex.test(token.info)) {
      return originalRule(...args);
    }

    env.highlightLineNumbers = regex.exec(token.info)[1];
    const r = originalRule(...args);
    env.highlightLineNumbers = undefined;
    return r;
  };
};
