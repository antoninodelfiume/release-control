import { releaseFixture } from '../release.fixture';
import {
    createInitialReviewState,
    releaseReviewReducer,
    summarizeReview,
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

    it('gestisce blocco, riapertura e reset', () => {
        const state = createInitialReviewState(releaseFixture.checks);
        const blocked = releaseReviewReducer(state, {
            type: 'checkBlocked',
            checkId: 'api-contract',
        });
        const reopened = releaseReviewReducer(blocked, {
            type: 'checkReopened',
            checkId: 'api-contract',
        });
        const passed = releaseReviewReducer(reopened, {
            type: 'checkPassed',
            checkId: 'frontend-build',
        });

        expect(blocked.statusByCheckId['api-contract']).toBe('blocked');
        expect(reopened.statusByCheckId['api-contract']).toBe('pending');
        expect(releaseReviewReducer(passed, { type: 'reviewReset' })).toEqual(state);
    });

    it('ignora un id sconosciuto', () => {
        const state = createInitialReviewState(releaseFixture.checks);

        expect(
            releaseReviewReducer(state, { type: 'checkPassed', checkId: 'missing' }),
        ).toBe(state);
        expect(releaseReviewReducer(state, { type: 'reviewReset' })).toBe(state);
    });

    it('deriva conteggi, progresso ed esito', () => {
        const initial = createInitialReviewState(releaseFixture.checks);
        const passed = releaseReviewReducer(initial, {
            type: 'checkPassed',
            checkId: 'frontend-build',
        });
        const blocked = releaseReviewReducer(passed, {
            type: 'checkBlocked',
            checkId: 'api-contract',
        });

        expect(summarizeReview(blocked)).toMatchObject({
            total: 8,
            pending: 6,
            passed: 1,
            blocked: 1,
            progress: 13,
            outcome: 'blocked',
        });
    });

    it('non considera pronta una review senza controlli', () => {
        expect(summarizeReview({ statusByCheckId: {} })).toEqual({
            total: 0,
            pending: 0,
            passed: 0,
            blocked: 0,
            progress: 0,
            outcome: 'in-progress',
        });
    });
});