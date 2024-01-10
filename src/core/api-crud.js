
export const createEvent = (_storage, newEventData) => {
  const key = 'event-data';
  const storedData = _storage.getItem(key);
  const parsedData = JSON.parse(storedData);

  parsedData.push(newEventData);
  _storage.setItem(key, parsedData);
};

export const setEventUser = (_storage, eventId, user) => {
  const key = 'event-data';
  const storedData = _storage.getItem(key);
  const parsedData = JSON.parse(storedData);

  const eventIndex = parsedData.findIndex((item) => item.eventId === eventId);
  parsedData[eventIndex].assignedTo = user;
  _storage.setItem(key, parsedData);
};

export const setEventStatus = (_storage, eventId, status) => {
  const key = 'event-data';
  const storedData = _storage.getItem(key);
  const parsedData = JSON.parse(storedData);

  const event = parsedData.filter((item) => item.eventId === eventId)[0];
  event.statusType = status;
  _storage.setItem(key, parsedData);
};

export const setTaskUser = (_storage, eventId, taskKey, user) => {
  const key = 'event-data';
  const storedData = _storage.getItem(key);
  const parsedData = JSON.parse(storedData);

  const event = parsedData.filter((item) => item.eventId === eventId)[0];
  const task = event.tasks.filter((item) => item.key === taskKey)[0];
  task.assignedTo = user;
  _storage.setItem(key, parsedData);
};

export const setTaskStatus = (_storage, eventId, taskKey, status) => {
  const key = 'event-data';
  const storedData = _storage.getItem(key);
  const parsedData = JSON.parse(storedData);

  const event = parsedData.filter((item) => item.eventId === eventId)[0];
  const task = event.tasks.filter((item) => item.key === taskKey)[0];
  task.statusType = status;
  _storage.setItem(key, parsedData);
};
