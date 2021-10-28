let _devMode = true;
export function isDevMode() {
  return _devMode;
}

export function enableProdMode(){
  _devMode = false;
}
