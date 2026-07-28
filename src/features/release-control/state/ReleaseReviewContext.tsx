/* eslint-disable react-refresh/only-export-components */
import {
  createContext,
  type Dispatch,
  type ReactNode,
  useContext,
} from 'react';
import type { ReleaseCheck } from '../release.types';
import {
  createInitialReviewState,
  type ReviewAction,
  type ReviewState,
} from './releaseReviewReducer';

const ReleaseReviewStateContext = createContext<ReviewState | null>(null);
const ReleaseReviewDispatchContext = createContext<Dispatch<ReviewAction> | null>(
  null,
);

export function ReleaseReviewProvider({
  checks,
  children,
}: {
  checks: ReleaseCheck[];
  children: ReactNode;
}) {
  const state = createInitialReviewState(checks);
  const dispatch: Dispatch<ReviewAction> = () => undefined;

  // TODO 03: sostituisci i valori statici con useReducer.
  return (
    <ReleaseReviewStateContext.Provider value={state}>
      <ReleaseReviewDispatchContext.Provider value={dispatch}>
        {children}
      </ReleaseReviewDispatchContext.Provider>
    </ReleaseReviewStateContext.Provider>
  );
}

export function useReleaseReviewState() {
  const state = useContext(ReleaseReviewStateContext);
  if (!state) {
    throw new Error('useReleaseReviewState richiede ReleaseReviewProvider.');
  }
  return state;
}

export function useReleaseReviewDispatch() {
  const dispatch = useContext(ReleaseReviewDispatchContext);
  if (!dispatch) {
    throw new Error('useReleaseReviewDispatch richiede ReleaseReviewProvider.');
  }
  return dispatch;
}
