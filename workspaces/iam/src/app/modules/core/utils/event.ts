export class Event<T extends EventInit> extends EventTarget {
  constructor(public name: string) {
    super()
  }

  add(handler: EventListenerOrEventListenerObject){
    this.addEventListener(this.name, handler);
  }

  remove(handler: EventListenerOrEventListenerObject){
    this.removeEventListener(this.name, handler);
  }

  get listeners(){
    return this.eventListeners(this.name);
  }

  dispatch(e: T){
    this.dispatchEvent(new globalThis.Event(this.name, e))
  }
}
