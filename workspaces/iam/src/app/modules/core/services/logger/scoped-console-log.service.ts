export let defaultLogFunctionPrdScreen = [console.assert.name, console.debug.name, console.trace.name, console.log.name];
let logFunctionPrdScreen: string[] = [];
/**
 * in function we can not use LogService, so have to patch the console global object.
 *
 * call this function in app init at prod env.
 */
export function screenConsoleLog(screeLogFunctions?: string[]) {
  logFunctionPrdScreen = screeLogFunctions ?? defaultLogFunctionPrdScreen;
  // direct call on console(no proxy) are screened
  for (const funcName of logFunctionPrdScreen) {
    console[funcName] = () => undefined;
  }
}

/**
 * only these functions are supported by scope function.
 */
const scopedConsoleFunctions = [
  console.debug.name, console.log.name, console.info.name, console.warn.name,
  console.error.name, console.count.name, console.assert.name, console.trace.name
];
export function scope(cons: Console, prefix: string) {
  if (!prefix.startsWith('@')) prefix = '@' + prefix;

  return new Proxy(cons, {
    get(target, propKey, receiver) {
      // screen call via proxy
      if (logFunctionPrdScreen.includes(propKey as string))
        return () => undefined;

      const origMethod = target[propKey];
      if (!scopedConsoleFunctions.includes(propKey as string))
        return origMethod;

      return function (...args) {
        if (origMethod === cons.assert) {
          const [arg0, ...argRest] = args;

          return origMethod.apply(cons, [arg0, prefix, ...argRest]);
        }

        return origMethod.apply(cons, [prefix + '>', ...args]);
      };

    }
  });
}
