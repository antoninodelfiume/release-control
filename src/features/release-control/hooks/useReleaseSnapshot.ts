import { releaseFixture } from '../release.fixture';
import type { ReleaseSnapshot } from '../release.types';
import type { ReleaseApi } from '../services/ReleaseApi';

export type ReleaseLoadState =
  | { status: 'loading' }
  | { status: 'success'; data: ReleaseSnapshot }
  | { status: 'empty' }
  | { status: 'error'; message: string };

export function useReleaseSnapshot(api: ReleaseApi) {
  void api;
  // TODO 06: scrivi il test dell'hook, poi aggiungi stato, Effect e cleanup.
  const state: ReleaseLoadState = { status: 'success', data: releaseFixture };
  return { state, retry: () => undefined };
}
