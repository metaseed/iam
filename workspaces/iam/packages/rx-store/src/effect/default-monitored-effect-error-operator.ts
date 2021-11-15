import { EMPTY, tap, timer } from "rxjs";
import { error } from "../core";
import { OperationStatus } from "./operation-status";

const MAX_RETRIES = Infinity;
// retry at a pace:  0, 50, 200, 450, 800, 1250ms, 1800; repeat... and skip the item from source that triggers error if 5 consecutive errors happens
const INTERVAL = i => { const t = (i - 1) % 7; return 50 * t * t }
const failIfConsecutiveErrors = 5;
const failIfErrors = 15;

export const getDefaultMonitoredEffectErrorOperator =
  (startStatus: OperationStatus, stateReporter: (status: OperationStatus) => void) =>
    error(status => {
      if (status.errors >= MAX_RETRIES) return null; // stop

      stateReporter(startStatus.Error.with(status.error));

      if (status.consecutiveErrors < failIfConsecutiveErrors &&
        // errors since item emit from source(of(item))
        status.errors < failIfErrors) {
        const interval = typeof INTERVAL === 'function' ? INTERVAL(status.errors) : INTERVAL;
        return timer(interval).pipe(tap(() => stateReporter(startStatus.Retry.with(status.error)))); // retry after timer emit.
      }

      stateReporter(startStatus.Fail.with(status.error));
      const reason = status.consecutiveErrors > failIfConsecutiveErrors ? `consecutiveError: ${status.consecutiveErrors}>=${failIfConsecutiveErrors}\n` : `errors: ${status.errors}>=${failIfErrors}`;
      console.warn(`backoff: skip item process because of consecutive errors happened: ${reason} error:`, status.error);
      return EMPTY; // fail and  not throw, it's swallowed. we just stop retry and report fail status
    });
