
import { } from 'jasmine';
import { NEVER } from 'rxjs';
import { map, of } from 'rxjs';
import { state, StateObservable, StateSubject } from '../src';

describe('StateObservable', () => {
  it('should add last value after state it in the last pipe', () => {
    const o$ = of(1, 2).pipe(map(o => ++o), state) as unknown as StateObservable<number>;
    o$.subscribe();

    expect(o$.value).toBe(3);
  });

  it('should add last value after apply on Observable', () => {
    const o$ = state(of(1, 2).pipe(map(o => ++o)));
    o$.subscribe();

    expect(o$.value).toBe(3);
  });

  it('should be undefined if no value emitted', ()=> {
    const o$ = state(NEVER.pipe(map(o=>++o)));
    o$.subscribe();
    expect(o$.value).toBe(undefined)
  });
});

describe('StateSubject', () => {
  it('value should be undefined if not send any value, should keep the last send value', () => {
    const s_ = new StateSubject<number>();
    const o$ = s_.pipe(map(o=>++o), state) as unknown as StateObservable<number>;
    o$.subscribe();
    expect(s_.value).toBe(undefined);

    s_.next(1);
    s_.next(2);
    expect(o$.value).toBe(3);
    expect(s_.value).toBe(2);
  })
})
