import { OperatorFunction } from "rxjs";
import { backoff } from "./operators/backoff";

export const interval = i => { const t = (i - 1) % 6; return 40 * t * t };

export const defaultEffectErrorOperator: OperatorFunction<unknown, unknown> = backoff({
  maxTries: 100,// Infinity, there may have alternate error with success
  interval,
  failIfConsecutiveErrors: 5
});
