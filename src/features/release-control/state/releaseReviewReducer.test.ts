import { releaseFixture } from '../release.fixture';
import {
  createInitialReviewState,
  releaseReviewReducer,
} from './releaseReviewReducer';

describe('releaseReviewReducer', () => {
  it('registra un controllo superato senza mutare lo stato precedente', () => {
    const state = createInitialReviewState(releaseFixture.checks);

    const nextState = releaseReviewReducer(state, {
      type: 'checkPassed',
      checkId: 'frontend-build',
    });

    expect(nextState).not.toBe(state);
    expect(nextState.statusByCheckId).not.toBe(state.statusByCheckId);
    expect(state.statusByCheckId['frontend-build']).toBe('pending');
    expect(nextState.statusByCheckId['frontend-build']).toBe('passed');
  });
});