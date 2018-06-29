import { tap } from 'rxjs/operators';

export const tapObservable = <T>(info)=> {
  return tap<T>(
    a=> {
      console.log('%c--------------------DEBUG:Tap.next', "color: #60e2ee;");
      console.error('%c'+info+':next',"color: #60e2ee;");
      console.count(info+':next');
      console.info(a);
      // console.trace(info+'%c:next',"color: green;");//
      // console.log((new Error().stack));
    },
    err => {
      console.error('----------------------DEBUG:Tap.error');
      console.count(info+':error');
    },
    () => {
      console.info('%c----------------------DEBUG:Tap.complete',"color:yellow");
      console.error('%c'+info+':complete', "color: yellow;");
      console.count(info+':complete');
    }
  );
}
