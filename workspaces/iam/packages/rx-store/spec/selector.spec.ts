
import { select } from "../src/core/selector";

describe('selector', () => {
  it('basic', () => {
    type A = {a:number,b:number,c:{d:number}}
    const state:A = {a:1,b:3,c:{d:4}}

    const se = select((s:A)=>s.a+s.b, (s:A)=>s.a+s.c.d, (p1,p2)=> p1+p2)
    expect(se(state)).toBe(9);
  })
});
