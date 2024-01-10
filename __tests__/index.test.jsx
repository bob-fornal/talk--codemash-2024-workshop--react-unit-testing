import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

import Home from '../src/pages/index';

jest.mock('../src/pages/dashboard', () => {
  const mock = () => (<div>Dashboard</div>);
  return mock;
});

describe('Home', () => {
  it('renders the text for Home', () => {
    render(<Home />);

    const text = screen.getByText('Dashboard');
    expect(text).toBeInTheDocument();
  });
});
