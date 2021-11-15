import { OperatorFunction } from "rxjs";
import { backoff } from "./operators/backoff";

// retry at a pace:  0, 40, 160, 360, 640, 1000 ms; repeat... and skip the item from source that triggers error if 5 consecutive errors happens
export const interval = i => { const t = (i - 1) % 6; return 40 * t * t };

export const defaultEffectErrorOperator: OperatorFunction<unknown, unknown> = backoff(Infinity, interval, 5);

