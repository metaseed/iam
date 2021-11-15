import { Inject, Injectable, InjectionToken, isDevMode, Optional } from "@angular/core";

export let defaultLogFunctionPrdScreen = [console.assert.name, console.debug.name, console.trace.name, console.log.name];

export function screenConsoleLog() {
  for (const funcName in defaultLogFunctionPrdScreen) {
    console[funcName] = () => undefined;
  }
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
