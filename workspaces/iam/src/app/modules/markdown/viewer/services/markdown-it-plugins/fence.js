const regex = /{([ ,\d-]+)}/;
export const fence = md => {
  const originalRule = md.renderer.rules.fence;
  md.renderer.rules.fence = function(...a) {
    const [tokens, idx, options, env, self] = a;
    const token = tokens[idx];
    if (!token.info || !regex.test(token.info)) {
      return originalRule(...a);
    }

    env.highlightLineNumbers = regex.exec(token.info)[1];
    const r = originalRule(...a);
    env.highlightLineNumbers = undefined;
    return r;
  };
};
