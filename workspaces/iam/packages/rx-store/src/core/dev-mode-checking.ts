let _devMode = true;
export function isDevMode() {
  return _devMode;
}

/**
 export class AppModule {
  constructor(){
    if(environment.production){
      enableProdMode();
    }
  }
}
 */
export function enableProdMode() {
  _devMode = false;
}
