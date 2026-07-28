import { act, renderHook, waitFor } from '@testing-library/react';
import { releaseFixture } from '../release.fixture';
import type { ReleaseSnapshot } from '../release.types';
import type { ReleaseApi } from '../services/ReleaseApi';
import { useReleaseSnapshot } from './useReleaseSnapshot';

function createDeferred<T>() {
  let resolve!: (value: T) => void;
  let reject!: (reason?: unknown) => void;
  const promise = new Promise<T>((resolvePromise, rejectPromise) => {
    resolve = resolvePromise;
    reject = rejectPromise;
  });
  return { promise, resolve, reject };
}

describe('useReleaseSnapshot', () => {
  it('passa da loading a success', async () => {
    const deferred = createDeferred<typeof releaseFixture>();
    const api: ReleaseApi = { getRelease: vi.fn(() => deferred.promise) };
    const { result } = renderHook(() => useReleaseSnapshot(api));

    expect(result.current.state.status).toBe('loading');
    act(() => deferred.resolve(releaseFixture));

    await waitFor(() => expect(result.current.state.status).toBe('success'));
  });

  it('classifica una lista vuota come empty', async () => {
    const api: ReleaseApi = {
      getRelease: vi.fn().mockResolvedValue({ ...releaseFixture, checks: [] }),
    };
    const { result } = renderHook(() => useReleaseSnapshot(api));

    await waitFor(() => expect(result.current.state.status).toBe('empty'));
  });

  it('mostra l’errore e ripete la richiesta', async () => {
    const api: ReleaseApi = {
      getRelease: vi
        .fn()
        .mockRejectedValueOnce(new Error('Servizio non disponibile.'))
        .mockResolvedValueOnce(releaseFixture),
    };
    const { result } = renderHook(() => useReleaseSnapshot(api));

    await waitFor(() => expect(result.current.state.status).toBe('error'));
    act(() => result.current.retry());
    await waitFor(() => expect(result.current.state.status).toBe('success'));
    expect(api.getRelease).toHaveBeenCalledTimes(2);
  });

  it('ignora una risposta obsoleta arrivata dopo il retry', async () => {
    const firstRequest = createDeferred<typeof releaseFixture>();
    const secondRequest = createDeferred<typeof releaseFixture>();
    const latestSnapshot = { ...releaseFixture, version: '4.8.1' };
    const api: ReleaseApi = {
      getRelease: vi
        .fn()
        .mockReturnValueOnce(firstRequest.promise)
        .mockReturnValueOnce(secondRequest.promise),
    };
    const { result } = renderHook(() => useReleaseSnapshot(api));

    act(() => result.current.retry());
    await waitFor(() => expect(api.getRelease).toHaveBeenCalledTimes(2));

    act(() => secondRequest.resolve(latestSnapshot));
    await waitFor(() =>
      expect(result.current.state).toMatchObject({
        status: 'success',
        data: { version: '4.8.1' },
      }),
    );

    await act(async () => {
      firstRequest.resolve(releaseFixture);
      await firstRequest.promise;
    });
    expect(result.current.state).toMatchObject({
      status: 'success',
      data: { version: '4.8.1' },
    });
  });

  it('annulla la richiesta quando il componente si smonta', () => {
    let receivedSignal: AbortSignal | undefined;
    const api: ReleaseApi = {
      getRelease: vi.fn((signal: AbortSignal): Promise<ReleaseSnapshot> => {
        receivedSignal = signal;
        return new Promise<ReleaseSnapshot>(() => undefined);
      }),
    };
    const { unmount } = renderHook(() => useReleaseSnapshot(api));

    expect(receivedSignal?.aborted).toBe(false);
    unmount();
    expect(receivedSignal?.aborted).toBe(true);
  });
});
