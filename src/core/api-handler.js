
export const _getHandler = async (key, url) => {
  const storedData = localStorage.getItem(key);

  if (storedData === null) {
    const response = await fetch(url);
    const parsedData = await response.json();
    localStorage.setItem(key, JSON.stringify(parsedData));
    return Promise.resolve(parsedData);
  } else {
    return Promise.resolve(JSON.parse(storedData));
  }
};
