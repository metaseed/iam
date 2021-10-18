import { catchError, Observable, OperatorFunction } from "rxjs";

const MAX_NUMBER_OF_RETRY_ATTEMPTS = 10;

export function errorRetry<T>(
  retryAttempt: number = MAX_NUMBER_OF_RETRY_ATTEMPTS,
  errorHandler?: (e) => void,
  ): OperatorFunction<T, T> {
    let retryAttemptLeft = retryAttempt;
  return catchError<T, Observable<T>>(
    (error, caught) => {
      if (errorHandler) errorHandler(error);
      if (retryAttemptLeft < 1) {
        throw new Error(`retried ${retryAttempt} but still has error, stop retrying!`);
      }

      retryAttemptLeft--;
      return caught;
    })
}
