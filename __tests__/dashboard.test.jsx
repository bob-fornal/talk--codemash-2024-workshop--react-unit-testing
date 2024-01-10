import { act, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

import Dashboard from '../src/pages/dashboard/index';

jest.mock('../src/core/api-handler.js', () => {
  return {
    _getHandler: () => Promise.resolve([
      {
        "eventId": 0,
        "eventType": "onboarding",
        "assignedTo": "bob.fornal",
        "statusType": "pending",
        "dateCreated": "2023-01-01T13:30:00.000Z",
        "tasks": [
          {
            "key": "customer-interview",
            "assignedTo": "bob.fornal",
            "statusType": "pending",
            "dateCreated": "2023-01-01T13:31:00.000Z"
          }
        ]
      }
    ]),
  };
});

describe('Dashboard', () => {
  it('renders the text for Dashboard and Filter', async () => {
    await act(async () => {
      render(<Dashboard />);
    });

    const eventType = screen.getByText('Event Type');
    const assignedTo = screen.getByText('Assigned To');
    const status = screen.getByText('Status');
    const dateCreated = screen.getByText('Date Created');
    const filter = screen.getByText('Filter');

    expect(eventType).toBeInTheDocument();
    expect(assignedTo).toBeInTheDocument();
    expect(status).toBeInTheDocument();
    expect(dateCreated).toBeInTheDocument();
    expect(filter).toBeInTheDocument();
  });

  it('renders the text for Tasks when toggle-button is clicked', async () => {
    await act(async () => {
      render(<Dashboard />);
    });

    await act(async() => {
      const button = screen.getByTestId('toggle-button');
      button.click();
    });
    const tasks = screen.getByText('Tasks');
    expect(tasks).toBeInTheDocument();
  });
});
