import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { releaseFixture } from '../release.fixture';
import { ReleaseReviewProvider } from '../state/ReleaseReviewContext';
import { ReleaseControlPage } from './ReleaseControlPage';
function renderPage() {
  render(
    <ReleaseReviewProvider checks={releaseFixture.checks}>
      <ReleaseControlPage snapshot={releaseFixture} />
    </ReleaseReviewProvider>,
  );
}

it('filtra i controlli senza modificare la review', async () => {
  const user = userEvent.setup();
  renderPage();

  await user.click(
    screen.getByRole('button', {
      name: 'Segna come bloccato: Contratti API compatibili',
    }),
  );
  await user.click(screen.getByRole('button', { name: 'Bloccati' }));

  expect(screen.getByText('Contratti API compatibili')).toBeInTheDocument();
  expect(screen.queryByText('Build di produzione verificata')).not.toBeInTheDocument();
});