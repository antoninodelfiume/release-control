import {
    ReleaseReviewProvider,
  useReleaseReviewDispatch,
  useReleaseReviewState,
} from './ReleaseReviewContext';
import { releaseFixture } from '../release.fixture';
import userEvent from '@testing-library/user-event';
import { render, screen } from '@testing-library/react';

function ReviewProbe() {
  const state = useReleaseReviewState();
  const dispatch = useReleaseReviewDispatch();

  return (
    <>
      <output>{state.statusByCheckId['frontend-build']}</output>
      <button
        type="button"
        onClick={() =>
          dispatch({ type: 'checkPassed', checkId: 'frontend-build' })
        }
      >
        Supera controllo
      </button>
    </>
  );
}

it('distribuisce stato e dispatch ai discendenti', async () => {
  const user = userEvent.setup();
  render(
    <ReleaseReviewProvider checks={releaseFixture.checks}>
      <ReviewProbe />
    </ReleaseReviewProvider>,
  );

  expect(screen.getByText('pending')).toBeInTheDocument();
  await user.click(screen.getByRole('button', { name: 'Supera controllo' }));
  expect(screen.getByText('passed')).toBeInTheDocument();
});