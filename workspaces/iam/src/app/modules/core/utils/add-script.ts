function loadError(oError) {
  throw new URIError('The script ' + oError.target.src + ` didn't load correctly.`);
}

export function affixScriptToHead(url, onloadFunction) {
  const newScript = document.createElement('script');
  newScript.onerror = loadError;
  if (onloadFunction) {
    newScript.onload = onloadFunction;
  }
  document.head.appendChild(newScript);
  newScript.src = url;
}

export function prefixScript(url, onloadFunction) {
  const newScript = document.createElement('script');
  newScript.onerror = loadError;
  if (onloadFunction) {
    newScript.onload = onloadFunction;
  }
  document.currentScript.parentNode.insertBefore(newScript, document.currentScript);
  newScript.src = url;
}

export function addFunctionToHeader(fun: Function) {
  const newScript = document.createElement('script');
  newScript.onerror = err => console.log('could not add function: ' + fun.toString());
  document.head.appendChild(newScript);
  newScript.text = fun.toString();
}
