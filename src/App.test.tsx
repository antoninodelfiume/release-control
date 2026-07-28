import { render, screen } from '@testing-library/react';
import type { ReleaseApi } from './features/release-control';
import { releaseFixture } from './features/release-control/release.fixture';
import { App } from './App';
describe("App starter", () => {
  it("mostra loading e rilascio caricato", async () => {
    const api: ReleaseApi = {
      getRelease: vi.fn().mockResolvedValue(releaseFixture),
    };
    render(<App api={api} />);

    expect(
      screen.getByRole("heading", { name: "Caricamento controlli" }),
    ).toBeInTheDocument();
    expect(
      await screen.findByRole("heading", { name: "Portale Ordini 4.8.0" }),
    ).toBeInTheDocument();
  });
});
