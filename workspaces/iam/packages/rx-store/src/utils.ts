export const curry =
(f: Function, ...a:any[]) => (...args:any[])=> {
  args = [...a,...args];
  if(args.length === f.length) return f(...args);
  return curry(f,...args);
}
