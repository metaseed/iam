import { pipe, tap } from "rxjs";
import { EffectStateSubject } from "../src/effect";

describe('timeout-monitor', () => {
  it('monitored side effect', () => {
    let c = 0;
    const e = new EffectStateSubject<number>().addMonitoredEffect(state => {
      return pipe(
        tap(a => {c = a;})

      )
    }, {type: 'dddd'});
    e.next(3)
    expect(c).toBe(3);
  })
});
