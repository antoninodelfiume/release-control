import type { ReleaseSnapshot } from '../release.types';

export type ReleaseApi = {
  getRelease: (signal: AbortSignal) => Promise<ReleaseSnapshot>;
};
