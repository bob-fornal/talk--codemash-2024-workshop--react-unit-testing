import { act, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

import ActionsMenu from '../src/shared/actions-menu';

describe('Actions Menu', () => {
  it('renders the text for Add Event Button', async () => {
    await act(async () => {
      render(<ActionsMenu eventId={999} taskId={'TASK'} />);
    });

    const eventType = screen.getByText('Actions');
    expect(eventType).toBeInTheDocument();
  });

  it('renders the menu when actions-menu-button is clicked', async () => {
    await act(async () => {
      render(<ActionsMenu eventId={999} taskId={'TASK'} />);
    });

    await act(async() => {
      const button = screen.getByTestId('actions-menu-button');
      button.click();
    });
    const assignTo = screen.getByText('Assign To');
    const consoleData = screen.getByText('Console Data');
    expect(assignTo).toBeInTheDocument();
    expect(consoleData).toBeInTheDocument();
  });

  it('renders the menu when actions-menu-button then actions-menu-assign-to is clicked', async () => {
    await act(async () => {
      render(<ActionsMenu eventId={999} taskId={'TASK'} />);
    });

    await act(async() => {
      const button = screen.getByTestId('actions-menu-button');
      button.click();
    });
    await act(async() => {
      const button = screen.getByTestId('actions-menu-assign-to');
      button.click();
    });
    const eventType = screen.getByText('Actions');
    expect(eventType).toBeInTheDocument();
  });
});
