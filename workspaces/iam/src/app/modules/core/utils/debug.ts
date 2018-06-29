import { tap } from "rxjs/operators";

export const tapObservable = <T>(info)=>tap<T>(a=>{
  console.log('DEBUG:Tap info--------------------'+info)
  console.log(a);
},err=>{
  console.log('DEBUG:Tap.err----------------------'+info)
  console.error(err)
},()=>{
  console.log('DEBUG:Tap.complete----------------------'+info)
});
