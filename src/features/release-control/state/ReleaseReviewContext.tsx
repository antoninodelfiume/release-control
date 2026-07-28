/* eslint-disable react-refresh/only-export-components */
import {
  createContext,
  type Dispatch,
  type ReactNode,
  useContext,
  useReducer,
} from "react";
import type { ReleaseCheck } from "../release.types";
import {
  createInitialReviewState,
  releaseReviewReducer,
  type ReviewAction,
  type ReviewState,
} from "./releaseReviewReducer";

const ReleaseReviewStateContext = createContext<ReviewState | null>(null);
const ReleaseReviewDispatchContext =
  createContext<Dispatch<ReviewAction> | null>(null);

export function ReleaseReviewProvider({
  checks,
  children,
}: {
  checks: ReleaseCheck[];
  children: ReactNode;
}) {
  const [state, dispatch] = useReducer(
    releaseReviewReducer,
    checks,
    createInitialReviewState,
  );
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
    throw new Error("useReleaseReviewState richiede ReleaseReviewProvider.");
  }
  return state;
}

export function useReleaseReviewDispatch() {
  const dispatch = useContext(ReleaseReviewDispatchContext);
  if (!dispatch) {
    throw new Error("useReleaseReviewDispatch richiede ReleaseReviewProvider.");
  }
  return dispatch;
}
