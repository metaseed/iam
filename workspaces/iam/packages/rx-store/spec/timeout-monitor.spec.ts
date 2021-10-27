import { pipe, tap } from "rxjs";
import { MonitoredStateSubject } from "../src/effect";

describe('timeout-monitor', () => {
  it('monitored side effect', () => {
    let c = 0;
    const e = new MonitoredStateSubject<number>().addMonitoredEffect(state => {
      return pipe(
        tap(a => {c = a;})

      )
    }, {type: 'dddd'});
    e.next(3)
    expect(c).toBe(3);
  })
});
