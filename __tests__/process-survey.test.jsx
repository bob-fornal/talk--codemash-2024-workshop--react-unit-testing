import { act, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

jest.mock('next/router', () => ({
  useRouter() {
    return {
      route: '/0',
      pathname: '',
      query: { eventId: '0' },
      asPath: '',
      isReady: true
    };
  },
}));

import TaskPage from '../src/pages/task/process-survey/[eventId]';

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
            "key": "process-survey",
            "assignedTo": "bob.fornal",
            "statusType": "pending",
            "dateCreated": "2023-01-01T13:31:00.000Z"
          }
        ]
      }
    ]),
  };
});

describe('Task Page - Process Survey', () => {
  it('renders the correct Event Id', async () => {
    await act(async () => {
      render(<TaskPage />);
    });

    const eventId = screen.getByText('Event Id: 0');
    expect(eventId).toBeInTheDocument();
  });
});
