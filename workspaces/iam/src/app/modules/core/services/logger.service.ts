import { Injectable, isDevMode } from "@angular/core";

@Injectable({ providedIn: 'root' })
export class LogService {
  private _prdScreen = [console.assert.name, console.debug.name, console.trace.name, console.log.name]
  public get prdScreen() { return this._prdScreen; }
  public set prdScreen(v) { this._prdScreen = v; this.initialize(); }

  public assert: typeof console.assert;
  public debug: typeof console.debug;
  public trace: typeof console.trace;
  public log: typeof console.log;
  // above are screened out in prd env
  public info: typeof console.info;
  public warn: typeof console.warn;
  public error: typeof console.error;

  constructor() {
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
      return () => { };
    }
    return func;
  }

}
