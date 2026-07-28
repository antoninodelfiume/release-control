import type { ReleaseCheck, ReviewStatus } from '../release.types';

export type ReviewState = {
  statusByCheckId: Record<string, ReviewStatus>;
};

export type ReviewAction =
  | { type: 'checkPassed'; checkId: string }
  | { type: 'checkBlocked'; checkId: string }
  | { type: 'checkReopened'; checkId: string }
  | { type: 'reviewReset' };

export type ReviewSummary = {
  total: number;
  pending: number;
  passed: number;
  blocked: number;
  progress: number;
  outcome: 'in-progress' | 'blocked' | 'ready';
};

export function createInitialReviewState(checks: ReleaseCheck[]): ReviewState {
  return {
    statusByCheckId: Object.fromEntries(
      checks.map((check) => [check.id, 'pending'] satisfies [string, ReviewStatus]),
    ),
  };
}

export function releaseReviewReducer(
  state: ReviewState,
  action: ReviewAction,
): ReviewState {
  if (action.type === 'checkPassed') {
    if (!(action.checkId in state.statusByCheckId)) return state;
    // TODO 02: aggiungi blocco, riapertura, reset e protezione degli id.
    return {
      statusByCheckId: {
        ...state.statusByCheckId,
        [action.checkId]: 'passed',
      },
    };
  }

  return state;
}

export function summarizeReview(state: ReviewState): ReviewSummary {
  const total = Object.keys(state.statusByCheckId).length;

  // TODO 02: deriva i conteggi e l'esito dallo stato corrente.
  return {
    total,
    pending: total,
    passed: 0,
    blocked: 0,
    progress: 0,
    outcome: 'in-progress',
  };
}
