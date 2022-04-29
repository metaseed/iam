export let defaultLogFunctionPrdScreen =
  [console.assert.name, console.debug.name, console.trace.name, console.log.name];

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
 * hard to scope assert, so remove it from here
 */
const scopedConsoleFunctions = [
  console.debug.name, console.log.name, console.info.name, console.warn.name,
  console.error.name, console.count.name, console.trace.name
];

/**
 * usage:
 * logger = Logger(`${this.constructor.name}`)
 * logger = Logger('DocumentsEffects');
 */
export function Logger(scopePrefix, cons: Console = console) {
  if (!scopePrefix.startsWith('@')) scopePrefix = '@' + scopePrefix;

  return new Proxy(cons, {
    get(target, propKey, receiver) {
      // screen call via proxy is not needed
      // if (logFunctionPrdScreen.includes(propKey as string))
      //   return () => undefined;

      const origMethod = target[propKey];
      if (!scopedConsoleFunctions.includes(propKey as string))
        return origMethod;

      return origMethod.bind(cons, scopePrefix + '>');

    }
  });
}
