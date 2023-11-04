export const setCookie = (id, value, duration) => {
  const d = new Date();
  d.setTime(d.getTime() + duration * 24 * 60 * 60 * 1000);
  document.cookie = `${id}=${value};expires=${d.toUTCString()}`;
};
