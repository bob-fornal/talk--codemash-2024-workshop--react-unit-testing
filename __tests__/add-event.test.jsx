import { act, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

import AddEvent from '../src/pages/dashboard/add-event';

describe('Add Event', () => {
  it('renders the text for Add Event Button', async () => {
    await act(async () => {
      render(<AddEvent />);
    });

    const eventType = screen.getByText('Add Event');
    expect(eventType).toBeInTheDocument();
  });

  it('renders the modal when add-event-button is clicked', async () => {
    await act(async () => {
      render(<AddEvent />);
    });

    await act(async() => {
      const button = screen.getByTestId('add-event-button');
      button.click();
    });
    const tasks = screen.getByText('Add an Event');
    const textField = screen.getByTestId('event-id-field');
    expect(tasks).toBeInTheDocument();
    expect(textField).toBeInTheDocument();
  });

  it('renders the modal when add-event-button then cancel-button is clicked', async () => {
    await act(async () => {
      render(<AddEvent />);
    });

    await act(async() => {
      const button = screen.getByTestId('add-event-button');
      button.click();
    });
    await act(async() => {
      const button = screen.getByTestId('cancel-button');
      button.click();
    });
    const eventType = screen.getByText('Add Event');
    expect(eventType).toBeInTheDocument();
  });

  it('renders the modal when add-event-button then submit-button is clicked', async () => {
    await act(async () => {
      render(<AddEvent />);
    });

    await act(async() => {
      const button = screen.getByTestId('add-event-button');
      button.click();
    });
    await act(async() => {
      const button = screen.getByTestId('submit-button');
      button.click();
    });
    const eventType = screen.getByText('Add Event');
    expect(eventType).toBeInTheDocument();
  });
});
