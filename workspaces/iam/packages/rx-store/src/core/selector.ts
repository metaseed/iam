
export type Selector<S, T> = (state: S) => T

export function select<S, T>(projector: (state: S) => T);
export function select<S, S1, T>(s1: Selector<S, S1>, projector: (state: S1) => T);
export function select<S, S1, S2, T>(s1: Selector<S, S1>, s2: Selector<S, S2>, projector: (s1: S1, s2: S2) => T);
export function select<S, S1, S2, S3, T>(s1: Selector<S, S1>, s2: Selector<S, S2>, s3: Selector<S, S3>, projector: (s1: S1, s2: S2, s3: S3) => T);
export function select<S, S1, S2, S3, S4, T>(s1: Selector<S, S1>, s2: Selector<S, S2>, s3: Selector<S, S3>, s4: Selector<S, S4>, projector: (s1: S1, s2: S2, s3: S3, s4: S4) => T);
export function select<S, S1, S2, S3, S4, S5, T>(s1: Selector<S, S1>, s2: Selector<S, S2>, s3: Selector<S, S3>, s4: Selector<S, S4>, s5: Selector<S, S5>, projector: (s1: S1, s2: S2, s3: S3, s4: S4, s5: S5) => T);
export function select<S>(...args: any[]) {
  const selectors = [...args];
  const projector = selectors.pop();
  return (state: S) => {
    const param = selectors.map(p => p(state));
    return projector(...param);
  }
}
