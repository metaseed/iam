// app level scope, to share additional function and variable that can be used without `this` keyword.
const scope = {};
// app level this obj for all scripts, use this to reference it;
// so we could share data between scripts.
const thisObject = {};

/**
 * execute scripts
 * @param thisObj 'this' is an app level obj to share data between scripts
 * @param scriptsScope app level scope to share some global predefined functions.
 * @param localScope we can setup a 'console' proxy is in this scope.
 * @param script code to execute.
 */
export const scopedEval = function scopedEval(script, localScope, thisObj=thisObject, scriptsScope=scope) {
  const context = { ...scriptsScope, ...localScope };
  // create new Function with keys from context as parameters, 'script' is the last parameter.
  const evaluator = Function.apply(null, [...Object.keys(context), 'script',
  `"use strict";
  try{${script}}
  catch (e) {
    console.error(e);
  }`]);
  // call the function with values from context and 'script' as arguments.
  evaluator.apply(thisObj, [...Object.values(context), script]);
}

/**
 * create a proxy for console. that will also write to the consoleElement
 * @param consoleElement the ui element to show the console logs, i.e. a div.
 * @returns {Proxy}
 */
export const consoleProxy = consoleElement => new Proxy(console, {
  get: function (target, propKey) {
    const originalMethod = target[propKey];

    return function (...args) {
      // get time with milliseconds
      const now = new Date();
      const time = now.getHours().toString().padStart(2,'0') + ':' + now.getMinutes().toString().padStart(2,'0') + ':' + now.getSeconds().toString().padStart(2,'0') + '.' + now.getMilliseconds().toString().padStart(3,'0');
      // text to show
      const text = document.createTextNode(`${time}: ${args.join(' ')}\n`);
      const span = document.createElement('span');
      span.appendChild(text);
      if (propKey === 'error') {
        span.style.color = 'red';
      } else if (propKey === 'warn') {
        span.style.color = 'orange';
      } else if (propKey === 'info') {
        span.style.color = 'blue';
      } else if (propKey === 'debug') {
        span.style.color = 'gray';
      }
      consoleElement.appendChild(span);
      // original console logs
      originalMethod.apply(target, args);
    }
  }
});
