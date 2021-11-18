import { Inject, Injectable, InjectionToken, isDevMode, Optional } from "@angular/core";
import { TupleType } from "typescript/lib/tsserverlibrary";

export let defaultLogFunctionPrdScreen = [console.assert.name, console.debug.name, console.trace.name, console.log.name];

/**
 * in function we can not use LogService, so have to patch the console global object.
 */
export function screenConsoleLog() {
  for (const funcName in defaultLogFunctionPrdScreen) {
    console[funcName] = () => undefined;
  }
}

const scopedConsoleFunctions = [
  console.debug.name, console.log.name, console.info.name, console.warn.name,
  console.error.name, console.count.name, console.assert.name, console.trace.name
];
export function scope(cons: Console, prefix: string) {

  return new Proxy(cons, {
    get(target, propKey, receiver) {
      const origMethod = target[propKey];
      if (!scopedConsoleFunctions.includes(propKey as string))
        return origMethod;

      const proxyFunc = function (...args) {
        if (origMethod === cons.assert) {
          const [arg0, ...argRest] = args;

          return origMethod.apply(cons, [arg0, prefix, ...argRest]);
        }

        return origMethod.apply(cons, [prefix + '>', ...args]);
      };

      return proxyFunc;
    }
  });
}


export const LOG_SERVICE_PRD_FUNCTION_SCREEN_TOKEN = new InjectionToken<string[]>('LOG_SERVICE_FUNCTION_SCREEN_TOKEN');
@Injectable({ providedIn: 'root' })
export class LogService {
  private _prdScreen = defaultLogFunctionPrdScreen;

  public assert: typeof console.assert;
  public debug: typeof console.debug;
  public trace: typeof console.trace;
  public log: typeof console.log;
  // above are screened out in prd env
  public info: typeof console.info;
  public warn: typeof console.warn;
  public error: typeof console.error;

  constructor(@Inject(LOG_SERVICE_PRD_FUNCTION_SCREEN_TOKEN) @Optional() prdScreen: string[]) {
    this._prdScreen = prdScreen ?? this._prdScreen;
    this.initialize();
  }

  private initialize() {
    this.assert = this.envCheck(console.assert);
    this.debug = this.envCheck(console.debug);
    this.trace = this.envCheck(console.trace);
    this.log = this.envCheck(console.log);
    this.info = this.envCheck(console.info);
    this.warn = this.envCheck(console.warn);
    this.error = this.envCheck(console.error);
  }

  private envCheck(func: (...args) => any, funcName?: string) {
    if (!isDevMode() && this._prdScreen.includes(funcName ?? func.name)) {
      return () => undefined;
    }
    return func;
  }

}
