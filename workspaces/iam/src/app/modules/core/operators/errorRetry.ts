import { catchError, Observable, OperatorFunction } from "rxjs";

const MAX_NUMBER_OF_RETRY_ATTEMPTS = 10;

export function errorRetry<T>(
  errorHandler: (e) => void,
  retryAttemptLeft: number = MAX_NUMBER_OF_RETRY_ATTEMPTS): OperatorFunction<T, T> {
  return catchError<T, Observable<T>>(
    (error, caught) => {
      if (errorHandler) errorHandler(error);
      if (retryAttemptLeft <= 1) {
        return caught; // last attempt
      }
      // return catchError(selector)(caught) to catch error from caught and continue
      return errorRetry<T>(
        errorHandler,
        retryAttemptLeft - 1
      )(caught);
    })
}
