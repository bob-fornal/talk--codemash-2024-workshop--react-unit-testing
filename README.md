# React Unit Testing Workshop

Welcome to the React Testing Workshop!

In this session, we will walk you through setting up a project and learning how to test in React using Jest and the React Testing Library.

Please follow the instructions below to set up your environment.

## Workshop Instructions

### Prerequisites

Installed:

* Node.js and npm (or yarn) installed on your computer. If you don't have them installed, please follow the instructions on the [official Node.js website](https://nodejs.org/en/download/).
* Git installed (or GUI tool).

### Setup

#### 1. Clone the repository

First, you need to clone the repository from GitHub. Make sure you clone the correct branch (main). You can do this by running the following command in your terminal or command prompt:

```bash
git clone -b walk-through https://github.com/bob-fornal/talk--codemash-2024-workshop--react-unit-testing.git
```

#### 2. Install dependencies

Navigate to the project directory and run the following command to install the required dependencies:

```bash
npm install
```

## Running the project

To run the project, execute the following command in the project directory:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Walk-Through

### Running tests

To run tests, open a different terminal in the project directory and run the following command:

```bash
npm run test
```

Press a to run all tests.

### Testing Actions Menu

```javascript
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
```

### Testing Add Events

```javascript
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
```

### Testing API CRUD

```javascript
import '@testing-library/jest-dom';

import {
  createEvent,
  setEventUser,
  setEventStatus,
  setTaskUser,
  setTaskStatus,
} from '../src/core/api-crud.js';

describe('api crud code', () => {
  const mockData = [
    {
      eventId: 0,
      assignedTo: 'bob.fornal',
      statusType: 'pending',
      tasks: [
        {
          key: 'customer-interview',
          assignedTo: 'bob.fornal',
          statusType: 'pending',
        }
      ]
    }
  ];

  it('expects "createEvent" to handle a new event', () => {
    const storage = {
      getItem: () => JSON.stringify([]),
      setItem: () => ({}),
    };
    jest.spyOn(storage, 'setItem');

    createEvent(storage, 'NEW-EVENT-DATA');
    expect(storage.setItem).toHaveBeenCalledWith('event-data', ['NEW-EVENT-DATA']);
  });

  it('expects "setEventUser" to handle an event user change', () => {
    const storage = {
      getItem: () => JSON.stringify(mockData),
      setItem: () => ({}),
    };
    jest.spyOn(storage, 'setItem');
    const expected = JSON.parse(JSON.stringify(mockData));
    expected[0].assignedTo = 'jen.manno';

    setEventUser(storage, 0, 'jen.manno');
    expect(storage.setItem).toHaveBeenCalledWith('event-data', expected);
  });

  it('expects "setEventStatus" to handle an event status change', () => {
    const storage = {
      getItem: () => JSON.stringify(mockData),
      setItem: () => ({}),
    };
    jest.spyOn(storage, 'setItem');
    const expected = JSON.parse(JSON.stringify(mockData));
    expected[0].statusType = 'completed';

    setEventStatus(storage, 0, 'completed');
    expect(storage.setItem).toHaveBeenCalledWith('event-data', expected);
  });

  it('expects "setTaskUser" to handle an event user change', () => {
    const storage = {
      getItem: () => JSON.stringify(mockData),
      setItem: () => ({}),
    };
    jest.spyOn(storage, 'setItem');
    const expected = JSON.parse(JSON.stringify(mockData));
    expected[0].tasks[0].assignedTo = 'jen.manno';

    setTaskUser(storage, 0, 'customer-interview', 'jen.manno');
    expect(storage.setItem).toHaveBeenCalledWith('event-data', expected);
  });

  it('expects "setTaskStatus" to handle an event user change', () => {
    const storage = {
      getItem: () => JSON.stringify(mockData),
      setItem: () => ({}),
    };
    jest.spyOn(storage, 'setItem');
    const expected = JSON.parse(JSON.stringify(mockData));
    expected[0].tasks[0].statusType = 'done';

    setTaskStatus(storage, 0, 'customer-interview', 'done');
    expect(storage.setItem).toHaveBeenCalledWith('event-data', expected);
  });
});
```

### Testing API Handler

```javascript
import '@testing-library/jest-dom';

import { _getHandler } from '../src/core/api-handler.js';

describe('api handler code', () => {
  it('expects "getHandler" to handle stored null', async () => {
    jest.spyOn(localStorage, 'getItem');
    localStorage.getItem = jest.fn(() => null);
    jest.spyOn(localStorage, 'setItem');
    localStorage.setItem = jest.fn();
    global.fetch = jest.fn(() => Promise.resolve({
      json: () => Promise.resolve({ name: 'TEST' }),
    }));

    const result = await _getHandler('key', 'url');
    expect(result).toEqual({ name: 'TEST' });
  });

  it('expects "getHandler" to handle stored data', async () => {
    jest.spyOn(localStorage, 'getItem');
    localStorage.getItem = jest.fn(() => JSON.stringify({ name: 'TEST' }));

    const result = await _getHandler('key', 'url');
    expect(result).toEqual({ name: 'TEST' });
  });
});
```

### Testing APIs

```javascript
import '@testing-library/jest-dom';

import { api } from '../src/core/api.js';

jest.spyOn(api, 'getHandler').mockImplementation(() => 'TEST');

describe('api code', () => {
  it('expects "getEventData" to send the correct values', () => {
    const data = api.getEventData();
    expect(data).toEqual('TEST');
    expect(api.getHandler).toHaveBeenCalledWith('event-data', '/api/data.json');
  });

  it('expects "getUserData" to send the correct values', () => {
    const data = api.getUserData();
    expect(data).toEqual('TEST');
    expect(api.getHandler).toHaveBeenCalledWith('user-data', '/api/data-user.json');
  });

  it('expects "getTaskTypes" to send the correct values', () => {
    const data = api.getTaskTypes();
    expect(data).toEqual('TEST');
    expect(api.getHandler).toHaveBeenCalledWith('task-types', '/api/task-types.json');
  });

  it('expects "getStatusTypes" to send the correct values', () => {
    const data = api.getStatusTypes();
    expect(data).toEqual('TEST');
    expect(api.getHandler).toHaveBeenCalledWith('status-types', '/api/status-types.json');
  });

  it('expects "getEventTypes" to send the correct values', () => {
    const data = api.getEventTypes();
    expect(data).toEqual('TEST');
    expect(api.getHandler).toHaveBeenCalledWith('event-types', '/api/event-types.json');
  });
});
```

### Testing Background Search Google

```javascript
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

import TaskPage from '../src/pages/task/background-search--google/[eventId]';

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
            "key": "background-search--google",
            "assignedTo": "bob.fornal",
            "statusType": "pending",
            "dateCreated": "2023-01-01T13:31:00.000Z"
          }
        ]
      }
    ]),
  };
});

describe('Task Page - Background Search Google', () => {
  it('renders the correct Event Id', async () => {
    await act(async () => {
      render(<TaskPage />);
    });

    const eventId = screen.getByText('Event Id: 0');
    expect(eventId).toBeInTheDocument();
  });
});
```

### Testing Background Search Lexis-Nexis

```javascript
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

import TaskPage from '../src/pages/task/background-search--lexis-nexus/[eventId]';

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
            "key": "background-search--lexis-nexus",
            "assignedTo": "bob.fornal",
            "statusType": "pending",
            "dateCreated": "2023-01-01T13:31:00.000Z"
          }
        ]
      }
    ]),
  };
});

describe('Task Page - Background Search Lexis Nexus', () => {
  it('renders the correct Event Id', async () => {
    await act(async () => {
      render(<TaskPage />);
    });

    const eventId = screen.getByText('Event Id: 0');
    expect(eventId).toBeInTheDocument();
  });
});
```

### Testing Customer Interview

```javascript
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

import TaskPage from '../src/pages/task/customer-interview/[eventId]';

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

describe('Task Page - Customer Interview', () => {
  it('renders the correct Event Id', async () => {
    await act(async () => {
      render(<TaskPage />);
    });

    const eventId = screen.getByText('Event Id: 0');
    expect(eventId).toBeInTheDocument();
  });
});
```

### Testing Dashboard

```javascript
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
```

### Testing Header

```javascript
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
```

### Testing INDEX (HOME)

```javascript
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
```

### Testing Management Approval

```javascript
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

import TaskPage from '../src/pages/task/management-approval/[eventId]';

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
            "key": "management-approval",
            "assignedTo": "bob.fornal",
            "statusType": "pending",
            "dateCreated": "2023-01-01T13:31:00.000Z"
          }
        ]
      }
    ]),
  };
});

describe('Task Page - Management Approval', () => {
  it('renders the correct Event Id', async () => {
    await act(async () => {
      render(<TaskPage />);
    });

    const eventId = screen.getByText('Event Id: 0');
    expect(eventId).toBeInTheDocument();
  });
});
```

### Testing Order Check

```javascript
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

import TaskPage from '../src/pages/task/order-check/[eventId]';

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
            "key": "order-check",
            "assignedTo": "bob.fornal",
            "statusType": "pending",
            "dateCreated": "2023-01-01T13:31:00.000Z"
          }
        ]
      }
    ]),
  };
});

describe('Task Page - Order Check', () => {
  it('renders the correct Event Id', async () => {
    await act(async () => {
      render(<TaskPage />);
    });

    const eventId = screen.getByText('Event Id: 0');
    expect(eventId).toBeInTheDocument();
  });
});
```

### Testing Peer Review

```javascript
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

import TaskPage from '../src/pages/task/peer-review/[eventId]';

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
            "key": "peer-review",
            "assignedTo": "bob.fornal",
            "statusType": "pending",
            "dateCreated": "2023-01-01T13:31:00.000Z"
          }
        ]
      }
    ]),
  };
});

describe('Task Page - Peer Review', () => {
  it('renders the correct Event Id', async () => {
    await act(async () => {
      render(<TaskPage />);
    });

    const eventId = screen.getByText('Event Id: 0');
    expect(eventId).toBeInTheDocument();
  });
});
```

### Testing Process Survey

```javascript
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
```
