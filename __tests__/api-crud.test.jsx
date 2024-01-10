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
