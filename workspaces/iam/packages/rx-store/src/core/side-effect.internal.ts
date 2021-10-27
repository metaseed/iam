import { OperatorFunction } from "rxjs";
import { backoff } from "./operators/backoff";

export const interval = i => { const t = (i - 1) % 6; return 40 * t * t };

export const defaultEffectErrorOperator: OperatorFunction<unknown, unknown> = backoff({
  maxTries: Infinity,
  interval,
  failIfConsecutiveErrors: 5
});
