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
