
import { } from 'jasmine'; // import all from jasmine
import { NEVER, scan } from 'rxjs';
import { map, of } from 'rxjs';
import { StateObservable, state, StateSubject } from '../src/core';

const stateful = state();
describe('StateObservable', () => {
  it('should add last value after state it in the last pipe', () => {
    const o$ = of(1, 2).pipe(map(o => ++o), stateful) as StateObservable<number>;
    o$.subscribe();

    expect(o$.state).toBe(3);
  });

  it('should add last value after state it in the last pipe', () => {
    let r;
    const o$ = stateful(of(1, 2).pipe(map(o => ++o))).addEffect(scan((acc, v)=> r = acc+v));
    o$.subscribe();

    expect(o$.state).toBe(3);
    expect(r).toBe(5);
  });

  it('should add last value after apply on Observable', () => {
    const o$ = stateful(of(1, 2).pipe(map(o => ++o)));
    o$.subscribe();

    expect(o$.state).toBe(3);
  });

  it('should be undefined if no value emitted', ()=> {
    const o$ = stateful(NEVER.pipe(map(o=>++o)));
    o$.subscribe();
    expect(o$.state).toBe(undefined)
  });
});

describe('StateSubject', () => {
  it('value should be undefined if not send any value, should keep the last send value', () => {
    const s_ = new StateSubject<number>();
    expect(s_.state).toBe(undefined);

    const o$ = s_.pipe(map(o=>++o), stateful) as StateObservable<number>;
    o$.subscribe();

    expect(s_.state).toBe(undefined);
    s_.next(1);
    s_.next(2);
    expect(o$.state).toBe(3);
    expect(s_.state).toBe(2);
  });

  it('should not emit any value if init-state is undefined', () => {
    const s_ = new StateSubject<number>();
    expect(s_.state).toBe(undefined);
    s_.subscribe(()=> {throw new Error("should not come here")})
  });
  it('should emit init value if init-state is not undefined', () => {
    const s_ = new StateSubject<number>(2);
    expect(s_.state).toBe(2);
    let v = -1;
    s_.subscribe(o=> {v = o})
    expect(v).toBe(2);
    v = -1;
    s_.subscribe(o=> v = o)
    expect(v).toBe(2);

  });
  it('should have buffer 1', () => {
    const s_ = new StateSubject<number>(2);
    expect(s_.state).toBe(2);

    s_.next(3);
    s_.next(4);
    let v = -1;
    s_.subscribe(o=> v = o)
    expect(v).toBe(4)
    v = -1;
    s_.subscribe(o=> v = o)
    expect(v).toBe(4)
    expect(s_.state).toBe(4)
  });
})
