import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

import Header from '../src/shared/header/index';

describe('Header', () => {
  it('renders the text Dashboard', () => {
    render(<Header />);

    const text = screen.getByText('Dashboard');
    expect(text).toBeInTheDocument();
  });

  it('renders the text Dashboard and TITLE', () => {
    render(<Header title="TEST-TITLE" />);

    const text = screen.getByText('Dashboard');
    const title = screen.getByText('TEST-TITLE');
    expect(text).toBeInTheDocument();
    expect(title).toBeInTheDocument();
  });
});
