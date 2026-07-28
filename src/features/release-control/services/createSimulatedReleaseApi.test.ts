import { createSimulatedReleaseApi, readReleaseApiScenario } from './createSimulatedReleaseApi';

describe('createSimulatedReleaseApi', () => {
  it('restituisce copie indipendenti del rilascio', async () => {
    const api = createSimulatedReleaseApi({ delayMs: 0 });
    const first = await api.getRelease(new AbortController().signal);
    const second = await api.getRelease(new AbortController().signal);

    expect(first.checks).toHaveLength(8);
    expect(first).not.toBe(second);
    expect(first.checks[0]).not.toBe(second.checks[0]);
  });

  it('fallisce una volta e permette il retry', async () => {
    const api = createSimulatedReleaseApi({ scenario: 'error-once', delayMs: 0 });

    await expect(api.getRelease(new AbortController().signal)).rejects.toThrow(
      'Impossibile caricare i controlli del rilascio.',
    );
    await expect(api.getRelease(new AbortController().signal)).resolves.toMatchObject({
      checks: expect.any(Array),
    });
  });

  it('restituisce una lista vuota nello scenario empty', async () => {
    const api = createSimulatedReleaseApi({ scenario: 'empty', delayMs: 0 });

    await expect(api.getRelease(new AbortController().signal)).resolves.toMatchObject({
      checks: [],
    });
  });

  it('annulla la Promise senza consumare error-once', async () => {
    const api = createSimulatedReleaseApi({ scenario: 'error-once', delayMs: 10 });
    const controller = new AbortController();
    const abortedRequest = api.getRelease(controller.signal);
    controller.abort();

    await expect(abortedRequest).rejects.toMatchObject({ name: 'AbortError' });
    await expect(api.getRelease(new AbortController().signal)).rejects.toThrow(
      'Impossibile caricare i controlli del rilascio.',
    );
  });
});
