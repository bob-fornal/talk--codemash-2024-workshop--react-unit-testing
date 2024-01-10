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
