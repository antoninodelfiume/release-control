import { releaseFixture } from '../release.fixture';
import type { ReleaseSnapshot } from '../release.types';
import type { ReleaseApi } from './ReleaseApi';

export type ReleaseApiScenario = 'success' | 'error-once' | 'empty';

type SimulatedReleaseApiOptions = {
  scenario?: ReleaseApiScenario;
  delayMs?: number;
};

function cloneSnapshot(snapshot: ReleaseSnapshot): ReleaseSnapshot {
  return {
    ...snapshot,
    checks: snapshot.checks.map((check) => ({ ...check })),
  };
}

export function readReleaseApiScenario(search: string): ReleaseApiScenario {
  const scenario = new URLSearchParams(search).get('scenario');
  return scenario === 'error-once' || scenario === 'empty' ? scenario : 'success';
}

export function createSimulatedReleaseApi({
  scenario = 'success',
  delayMs = 450,
}: SimulatedReleaseApiOptions = {}): ReleaseApi {
  let errorDelivered = false;
  return {
    async getRelease(signal) {

      return new Promise<ReleaseSnapshot>((resolve, reject) => {
        let settled = false;

        function rejectAbort() {
          if (settled) return;
          settled = true;
          clearTimeout(timerId);
          reject(new DOMException('Richiesta annullata.', 'AbortError'));
        }

        const timerId = window.setTimeout(() => {
          if (settled) return;
          settled = true;
          signal.removeEventListener('abort', rejectAbort);

          if (scenario === 'error-once' && !errorDelivered) {
            errorDelivered = true;
            reject(new Error('Impossibile caricare i controlli del rilascio.'));
            return;
          }

          const snapshot = cloneSnapshot(releaseFixture);
          resolve(scenario === 'empty' ? { ...snapshot, checks: [] } : snapshot);
        }, delayMs);

        if (signal.aborted) {
          rejectAbort();
          return;
        }
        signal.addEventListener('abort', rejectAbort, { once: true });
      });

    },
  };
}
