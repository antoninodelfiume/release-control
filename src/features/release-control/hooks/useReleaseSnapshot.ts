import { useCallback, useEffect, useRef, useState } from 'react';
import type { ReleaseSnapshot } from '../release.types';
import type { ReleaseApi } from '../services/ReleaseApi';

export type ReleaseLoadState =
  | { status: 'loading' }
  | { status: 'success'; data: ReleaseSnapshot }
  | { status: 'empty' }
  | { status: 'error'; message: string };

function isAbortError(error: unknown) {
  return (
    (error instanceof DOMException && error.name === 'AbortError') ||
    (typeof error === 'object' &&
      error !== null &&
      'name' in error &&
      error.name === 'AbortError')
  );
}

function getErrorMessage(error: unknown) {
  return error instanceof Error
    ? error.message
    : 'Errore imprevisto durante il caricamento.';
}

export function useReleaseSnapshot(api: ReleaseApi) {
  const [state, setState] = useState<ReleaseLoadState>({ status: 'loading' });
  const [requestToken, setRequestToken] = useState(0);
  const latestRequestId = useRef(0);

  const retry = useCallback(() => {
    setRequestToken((currentToken) => currentToken + 1);
  }, []);

  useEffect(() => {
    const controller = new AbortController();
    const requestId = latestRequestId.current + 1;
    latestRequestId.current = requestId;
    setState({ status: 'loading' });

    void api
      .getRelease(controller.signal)
      .then((snapshot) => {
        if (
          controller.signal.aborted ||
          requestId !== latestRequestId.current
        ) {
          return;
        }
        setState(
          snapshot.checks.length === 0
            ? { status: 'empty' }
            : { status: 'success', data: snapshot },
        );
      })
      .catch((error: unknown) => {
        if (
          controller.signal.aborted ||
          requestId !== latestRequestId.current ||
          isAbortError(error)
        ) {
          return;
        }
        setState({ status: 'error', message: getErrorMessage(error) });
      });

    return () => {
      controller.abort();
    };
  }, [api, requestToken]);

  return { state, retry };
}