
import { S } from '@angular/cdk/keycodes';
import { } from 'jasmine';
import { NEVER } from 'rxjs';
import { map, of } from 'rxjs';
import { IStateObservable, StateObservable, StateSubject } from '../src';

describe('StateObservable', () => {
  it('should add last value after state it in the last pipe', () => {
    const o$ = of(1, 2).pipe(map(o => ++o), StateObservable) as IStateObservable<number>;
    o$.subscribe();

    expect(o$.value).toBe(3);
  });

  it('should add last value after apply on Observable', () => {
    const o$ = StateObservable(of(1, 2).pipe(map(o => ++o)));
    o$.subscribe();

    expect(o$.value).toBe(3);
  });

  it('should be undefined if no value emitted', ()=> {
    const o$ = StateObservable(NEVER.pipe(map(o=>++o)));
    o$.subscribe();
    expect(o$.value).toBe(undefined)
  });
});

describe('StateSubject', () => {
  it('value should be undefined if not send any value, should keep the last send value', () => {
    const s_ = new StateSubject<number>();
    expect(s_.value).toBe(undefined);

    const o$ = s_.pipe(map(o=>++o), StateObservable) as IStateObservable<number>;
    o$.subscribe();

    expect(s_.value).toBe(undefined);
    s_.next(1);
    s_.next(2);
    expect(o$.value).toBe(3);
    expect(s_.value).toBe(2);
  });

  it('should not emit any value if init-state is undefined', () => {
    const s_ = new StateSubject<number>();
    expect(s_.value).toBe(undefined);
    s_.subscribe(()=> {throw new Error("should not come here")})
  });
  it('should emit init value if init-state is not undefined', () => {
    const s_ = new StateSubject<number>(2);
    expect(s_.value).toBe(2);
    let v = -1;
    s_.subscribe(o=> {v = o})
    expect(v).toBe(2);
    v = -1;
    s_.subscribe(o=> v = o)
    expect(v).toBe(2);

  });
  it('should have buffer 1', () => {
    const s_ = new StateSubject<number>(2);
    expect(s_.value).toBe(2);

    s_.next(3);
    s_.next(4);
    let v = -1;
    s_.subscribe(o=> v = o)
    expect(v).toBe(4)
    v = -1;
    s_.subscribe(o=> v = o)
    expect(v).toBe(4)
    expect(s_.value).toBe(4)
  });
})
