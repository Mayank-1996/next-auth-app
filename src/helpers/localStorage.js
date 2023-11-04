export const getLocalStorage = (id) => {
  const item = JSON.parse(localStorage.getItem(String(id)));
  if (item) {
    return item;
  }
  return null;
};
export const setLocalStorage = (id, value) => {
  localStorage.setItem(String(id), JSON.stringify(value));
};

export const deleteLocalStorage = (id) => {
  const item = JSON.parse(localStorage.getItem(String(id)));
  if (item) {
    localStorage.removeItem(String(id));
    return true;
  }

  return;
};
