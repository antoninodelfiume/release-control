import { render, screen } from '@testing-library/react';
import { App } from './App';

describe('App starter', () => {
  it('mostra una baseline completa e non attiva ancora la review', () => {
    render(<App />);

    expect(
      screen.getByRole('heading', { name: 'Portale Ordini 4.8.0' }),
    ).toBeInTheDocument();
    expect(screen.getAllByRole('listitem')).toHaveLength(8);
    expect(screen.getByRole('button', { name: 'Azzera review' })).toBeDisabled();
  });
});
