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
  scenario: _scenario = 'success',
  delayMs: _delayMs = 450,
}: SimulatedReleaseApiOptions = {}): ReleaseApi {
  void _scenario;
  void _delayMs;
  return {
    async getRelease(signal) {
      void signal;
      // TODO 05: aggiungi latenza, scenari, copie difensive e abort.
      return cloneSnapshot(releaseFixture);
    },
  };
}
