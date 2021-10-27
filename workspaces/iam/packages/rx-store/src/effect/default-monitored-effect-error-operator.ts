import { backoff, BackoffStateReporter } from "../core";
import { interval } from "../core/side-effect.internal";

export const getDefaultMonitoredEffectErrorOperator =
  (reporter: BackoffStateReporter) => backoff({
    maxTries: Infinity,
    interval,
    failIfConsecutiveErrors: 5,
    stateReporter: reporter
  });
