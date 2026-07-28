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

function updateKnownCheck(
  state: ReviewState,
  checkId: string,
  status: ReviewStatus,
): ReviewState {
  const currentStatus = state.statusByCheckId[checkId];
  if (!currentStatus || currentStatus === status) return state;

  return {
    statusByCheckId: { ...state.statusByCheckId, [checkId]: status },
  };
}

export function releaseReviewReducer(
  state: ReviewState,
  action: ReviewAction,
): ReviewState {
  switch (action.type) {
    case 'checkPassed':
      return updateKnownCheck(state, action.checkId, 'passed');
    case 'checkBlocked':
      return updateKnownCheck(state, action.checkId, 'blocked');
    case 'checkReopened':
      return updateKnownCheck(state, action.checkId, 'pending');
    case 'reviewReset': {
      if (
        Object.values(state.statusByCheckId).every(
          (status) => status === 'pending',
        )
      ) {
        return state;
      }

      return {
        statusByCheckId: Object.fromEntries(
          Object.keys(state.statusByCheckId).map((checkId) => [checkId, 'pending']),
        ),
      };
    }
  }
}

export function summarizeReview(state: ReviewState): ReviewSummary {
  const statuses = Object.values(state.statusByCheckId);
  const passed = statuses.filter((status) => status === 'passed').length;
  const blocked = statuses.filter((status) => status === 'blocked').length;
  const pending = statuses.length - passed - blocked;
  return {
    total: statuses.length,
    pending,
    passed,
    blocked,
    progress: statuses.length === 0 ? 0 : Math.round((passed / statuses.length) * 100),
    outcome:  blocked > 0
        ? 'blocked'
        : statuses.length > 0 && passed === statuses.length
          ? 'ready'
          : 'in-progress',
  };
}
