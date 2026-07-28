import { ReleaseControlPage } from './features/release-control/components/ReleaseControlPage';
import { releaseFixture } from './features/release-control/release.fixture';
import { ReleaseReviewProvider } from './features/release-control/state/ReleaseReviewContext';

export function App() {
  // TODO 07: usa useReleaseSnapshot e rendi loading, error, empty e success.
  return (
    <ReleaseReviewProvider checks={releaseFixture.checks}>
      <ReleaseControlPage snapshot={releaseFixture} />
    </ReleaseReviewProvider>
  );
}
