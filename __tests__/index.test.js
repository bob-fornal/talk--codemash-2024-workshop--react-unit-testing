import { render, screen, waitFor } from '@testing-library/react';
import Home from '../src/app/page.tsx';
import '@testing-library/jest-dom';

describe('Home', () => {
  it('renders a heading', async () => {
    await waitFor(() => {
      render(<Home />);
    });

    const demo = screen.getByText('DEMO CODE');
    expect(demo).toBeInTheDocument();
  });
});