
import { _getHandler } from './api-handler';

class ApiService {
  getHandler;

  constructor(handler) {
    this.getHandler = handler;
  }

  getEventData = () => {
    return this.getHandler('event-data', '/api/data.json');
  };

  getUserData = () => {
    return this.getHandler('user-data', '/api/data-user.json');
  };

  getTaskTypes = () => {
    return this.getHandler('task-types', '/api/task-types.json');
  };

  getStatusTypes = () => {
    return this.getHandler('status-types', '/api/status-types.json');
  };

  getEventTypes = () => {
    return this.getHandler('event-types', '/api/event-types.json');
  };
}

export const api = new ApiService(_getHandler);
